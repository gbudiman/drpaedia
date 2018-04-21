class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games, id: false do |t|
      t.bigserial              :id, primary_key: true
      t.string                 :chapter, null: false
      t.date                   :start, null: false
      t.timestamps
    end

    add_index :games, [:start, :chapter], unique: true
    add_index :games, [:chapter, :start]
  end
end
