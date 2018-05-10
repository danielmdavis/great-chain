class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :description, null: false
      t.integer :vote, null: false
      t.belongs_to :influence
      t.belongs_to :user

      t.timestamps
    end
  end
end
