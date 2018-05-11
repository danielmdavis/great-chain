class Book < ApplicationRecord

  validates :name, presence: true, uniqueness: true
  validates :year, presence: true

  belongs_to :thinker

end
