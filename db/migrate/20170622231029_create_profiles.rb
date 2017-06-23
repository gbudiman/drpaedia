class CreateProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :profiles, id: false do |t|
      t.bigserial              :id, primary_key: true
      t.string                 :name, null: false
      t.text                   :data, null: false
      
      t.timestamps

      t.belongs_to             :survivor, index: true, type: :bigint, null: false, foreign_key: true
    end

    add_index :profiles, [:survivor_id, :name], unique: true
  end
end
