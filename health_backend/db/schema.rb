# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_11_16_103638) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "vector"

  create_table "contexts", force: :cascade do |t|
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.vector "embedding", limit: 1536, null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "deleted_at", precision: nil
    t.string "email", null: false
    t.string "first_name", null: false
    t.boolean "is_logged_in", default: false
    t.datetime "last_login_at", precision: nil
    t.datetime "last_logout_at", precision: nil
    t.string "last_name", null: false
    t.integer "num_logins", default: 0
    t.integer "num_logouts", default: 0
    t.string "password_digest", null: false
    t.string "phone"
    t.integer "status", default: 0
    t.datetime "updated_at", null: false
  end
end
