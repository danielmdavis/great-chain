class CreateShelves < ActiveRecord::Migration[5.2]
  def change
    create_table :shelves do |t|
      t.boolean :want, null: false
      t.boolean :have, null: false
      t.belongs_to :user

      t.timestamps
    end
  end
end
