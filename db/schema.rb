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

ActiveRecord::Schema.define(version: 2018_05_09_203512) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string "name", null: false
    t.integer "year", null: false
    t.string "image"
    t.bigint "shelf_id"
    t.bigint "thinker_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shelf_id"], name: "index_books_on_shelf_id"
    t.index ["thinker_id"], name: "index_books_on_thinker_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "description", null: false
    t.integer "vote", null: false
    t.bigint "influence_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["influence_id"], name: "index_comments_on_influence_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "influences", force: :cascade do |t|
    t.bigint "teacher_id"
    t.bigint "student_id"
    t.index ["student_id"], name: "index_influences_on_student_id"
    t.index ["teacher_id"], name: "index_influences_on_teacher_id"
  end

  create_table "shelves", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_shelves_on_user_id"
  end

  create_table "thinkers", force: :cascade do |t|
    t.string "name", null: false
    t.integer "born"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
