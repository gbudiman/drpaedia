class Multicast < ApplicationRecord
  belongs_to :survivor
  validates :survivor, presence: true

  belongs_to :profile
  validates :profile, presence: true

  def self.list_guest_profiles guest_id:
    result = {}
    Multicast
      .joins('INNER JOIN profiles ON multicasts.profile_id = profiles.id')
      .joins('INNER JOIN survivors ON profiles.survivor_id = survivors.id')
      .select('survivors.friendly_name AS owner_name',
              'profiles.name AS profile_name',
              'profiles.id AS profile_id')
      .where(survivor_id: guest_id).each do |row|
        result[row.profile_id] = "#{row.owner_name}/#{row.profile_name}"
    end

    return result
  end
end
