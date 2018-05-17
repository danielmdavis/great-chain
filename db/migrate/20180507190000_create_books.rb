class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :name, null: false
      t.integer :year, null: false
      t.string :image
      t.belongs_to :shelf
      t.belongs_to :thinker

      t.timestamps
    end
  end
end
