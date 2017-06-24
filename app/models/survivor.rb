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
    downstream_last_update = Time.at((data[:config][:timestamp] || 0) / 1000)

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

      profile_to_delete = Array.new
      Profile.where(survivor_id: self.id).each do |r|
        profile_id = r.id
        profile_name = r.name

        if data[:profiles][profile_name.to_sym] == nil
          profile_to_delete.push(r.id)
        end
      end

      Profile.where(id: profile_to_delete).destroy_all

      self.profile_timestamp = timestamp
      self.primary_profile = primary
      save
    end
  end

  def compose_downstream
    return {
      config: {
        timestamp: (self.profile_timestamp.to_f * 1000).to_i,
        primary: self.primary_profile
      },
      profiles: Profile.compose_downstream(survivor_id: self.id)
    }
  end

  def search query:
    result = Array.new
    Survivor
      .where('id != ?', self.id)
      .where('friendly_name ILIKE :query', query: "#{query}%").each do |row|
      result.push({id: row.id, name: row.friendly_name})
    end

    return result
  end

  def get_shared_profile
    result = Hash.new
    Profile
      .joins('LEFT JOIN multicasts ON multicasts.profile_id = profiles.id')
      .joins('LEFT JOIN survivors ON multicasts.survivor_id = survivors.id')
      .where('profiles.survivor_id = :owner_id', owner_id: self.id)
      .select('profiles.name AS profile_name', 
              'multicasts.id AS multicast_id',
              'survivors.friendly_name AS guest_name').each do |row|

      result[row.profile_name] ||= Array.new

      if row.multicast_id
        result[row.profile_name].push({
          multicast_id: row.multicast_id,
          guest_name: row.guest_name
        })
      end
    end

    return result
  end
end
