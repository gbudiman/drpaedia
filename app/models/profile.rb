class Profile < ApplicationRecord
  serialize :data, JSON
  validates :data, :name, presence: true

  belongs_to :survivor
  validates :survivor, presence: true
  has_many :multicasts, dependent: :destroy

  def self.update_upstream survivor_id:, name:, data:
    #ap data.to_s
    profile_entry = Profile.find_or_initialize_by(survivor_id: survivor_id, name: name)
    profile_entry.data = data
    profile_entry.save
  end
end
