class Survivor < ApplicationRecord
  devise :omniauthable, omniauth_providers: [:facebook]
  validates :provider, :friendly_name, presence: true

  has_many :profiles, dependent: :destroy
  has_many :multicasts, dependent: :destroy

  def self.handshake(provider:, expiration:, uid:, friendly_name:)
    res = Survivor.find_or_initialize_by(provider: provider, uid: uid)
    res.friendly_name ||= friendly_name
    res.expiration = expiration

    res.save

    return res
  end

  def sync data:
    upstream_last_update = self.profile_timestamp
    downstream_last_update = Time.at(data[:config][:timestamp] / 1000)

    ap upstream_last_update
    ap downstream_last_update

    if upstream_last_update == nil || downstream_last_update > upstream_last_update
      update_upstream data: data, 
                      timestamp: downstream_last_update, 
                      primary: data[:config][:primary]


      ap 'Upstream'
      return 'synchronized'      
    else
      ap 'Downstream'
      return compose_downstream
    end
  end

  def update_upstream data:, timestamp:, primary:
    ActiveRecord::Base.transaction do
      data[:profiles].each do |profile_name, profile_data|
        Profile.update_upstream(survivor_id: self.id,
                                name: profile_name,
                                data: profile_data)
      end

      self.profile_timestamp = timestamp
      self.primary_profile = primary
      save
    end
  end

  def compose_downstream
    return {
      config: {
        timestamp: (Time.now.to_f * 1000).to_i,
        primary: self.primary_profile
      },
      profiles: Profile.compose_downstream(survivor_id: self.id)
    }
  end
end
