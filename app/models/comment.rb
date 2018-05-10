class Comment < ApplicationRecord

  validates :description, presence: true

  belongs_to :influence
  belongs_to :user
end
