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

ActiveRecord::Schema.define(version: 20170622231035) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "multicasts", id: :bigserial, force: :cascade do |t|
    t.bigint   "profile_id",  null: false
    t.bigint   "survivor_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["profile_id"], name: "index_multicasts_on_profile_id", using: :btree
    t.index ["survivor_id"], name: "index_multicasts_on_survivor_id", using: :btree
  end

  create_table "profiles", id: :bigserial, force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "data",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.bigint   "survivor_id", null: false
    t.index ["survivor_id", "name"], name: "index_profiles_on_survivor_id_and_name", unique: true, using: :btree
    t.index ["survivor_id"], name: "index_profiles_on_survivor_id", using: :btree
  end

  create_table "survivors", id: :bigserial, force: :cascade do |t|
    t.string   "provider",          null: false
    t.string   "uid"
    t.string   "token"
    t.datetime "expiration"
    t.string   "friendly_name",     null: false
    t.string   "primary_profile"
    t.datetime "profile_timestamp"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["friendly_name"], name: "index_survivors_on_friendly_name", unique: true, using: :btree
    t.index ["provider", "uid"], name: "index_survivors_on_provider_and_uid", unique: true, using: :btree
  end

  add_foreign_key "multicasts", "profiles"
  add_foreign_key "multicasts", "survivors"
  add_foreign_key "profiles", "survivors"
end
