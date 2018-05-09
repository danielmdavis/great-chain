class CreateShelves < ActiveRecord::Migration[5.2]
  def change
    create_table :shelves do |t|
      t.belongs_to :user

      t.timestamps
    end
  end
end
