class Multicast < ApplicationRecord
  belongs_to :survivor
  validates :survivor, presence: true

  belongs_to :profile
  validates :profile, presence: true
end
