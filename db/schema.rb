# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_05_07_191911) do

  create_table "books", force: :cascade do |t|
    t.string "name", null: false
    t.integer "year", null: false
    t.integer "shelf_id"
    t.integer "thinker_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shelf_id"], name: "index_books_on_shelf_id"
    t.index ["thinker_id"], name: "index_books_on_thinker_id"
  end

  create_table "influences", force: :cascade do |t|
    t.integer "teacher_id"
    t.integer "student_id"
    t.index ["student_id"], name: "index_influences_on_student_id"
    t.index ["teacher_id"], name: "index_influences_on_teacher_id"
  end

  create_table "shelves", force: :cascade do |t|
    t.boolean "want", null: false
    t.boolean "have", null: false
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_shelves_on_user_id"
  end

  create_table "thinkers", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
