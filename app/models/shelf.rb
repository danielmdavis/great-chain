class Shelf < ApplicationRecord

  validates :want, presence: true
  validates :have, presence: true

  has_many :books
  belongs_to :user

end
