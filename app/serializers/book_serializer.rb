class BookSerializer < ActiveModel::Serializer
  attributes :name, :year, :thinker, :id, :shelf_id
end
