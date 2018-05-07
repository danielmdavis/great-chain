class Influence < ApplicationRecord

  belongs_to :teacher, class_name: "Thinker"
  belongs_to :student, class_name: "Thinker"

end
