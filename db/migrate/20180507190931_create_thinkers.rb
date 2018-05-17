class CreateThinkers < ActiveRecord::Migration[5.2]
  def change
    create_table :thinkers do |t|
      t.string :name, null:false
      t.integer :born
      t.string :image

      t.timestamps
    end
  end
end
