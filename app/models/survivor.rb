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

  def sync data:, force_upstream: false
    upstream_last_update = self.profile_timestamp
    downstream_last_update = Time.at((data[:config][:timestamp] || 0) / 1000)

    if force_upstream
      update_upstream data: data,
                      timestamp: downstream_last_update,
                      primary: data[:config][:primary],
                      normally_synced: true
    else
      if upstream_last_update == nil || downstream_last_update > upstream_last_update
        update_upstream data: data, 
                        timestamp: downstream_last_update, 
                        primary: data[:config][:primary],
                        normally_synced: true


        ap 'Upstream'
        return 'synchronized'      
      else
        ap 'Downstream'
        return compose_downstream
      end
    end
  end

  def update_upstream data:, timestamp:, primary:, normally_synced:
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
          profile_to_delete.push(profile_id)
        end
      end

      Profile.where(id: profile_to_delete).destroy_all

      self.profile_timestamp = timestamp
      self.primary_profile = primary
      self.normally_synced = normally_synced
      save
    end
  end

  def compose_downstream
    return {
      config: {
        timestamp: (self.profile_timestamp.to_f * 1000).to_i,
        primary: self.primary_profile,
        normally_synced: self.normally_synced
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

  def self.list_profiles
    result = {}
    Survivor
      .joins('LEFT JOIN profiles ON survivors.id = profiles.survivor_id')
      .select('survivors.friendly_name AS survivor_name,
               survivors.updated_at AS last_update,
               profiles.name AS profile_name')
      .order('survivors.updated_at').each do |row|
      result[row.survivor_name] ||= { last_update: row.last_update, profiles: Array.new }
      result[row.survivor_name][:profiles].push(row.profile_name)
    end

    ap result
  end

  def self.list_shares 
    Multicast
      .joins('INNER JOIN profiles ON multicasts.profile_id = profiles.id')
      .joins('INNER JOIN survivors ON profiles.survivor_id = survivors.id')
      .joins('INNER JOIN survivors AS guests ON multicasts.survivor_id = guests.id')
      .select('survivors.friendly_name AS owner',
              'guests.friendly_name AS guest')
      .all
      .group('survivors.friendly_name, guests.friendly_name')
      .order('survivors.friendly_name').each do |row|
      puts "#{row.owner} => #{row.guest}"
    end
  end
end
