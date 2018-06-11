class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :shelf

  after_create :create_shelf

  def create_shelf
    Shelf.create(user_id: self.id)
  end

end
