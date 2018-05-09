class Thinker < ApplicationRecord

  validates :name, presence: true, uniqueness: true
  has_many :books 

  has_many :studentships, class_name: "Influence", foreign_key: :student_id
  has_many :teachers, through: :studentships, source: :teacher

  has_many :teacherships, class_name: "Influence", foreign_key: :teacher_id
  has_many :students, through: :teacherships, source: :student

end
