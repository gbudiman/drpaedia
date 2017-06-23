class CreateMulticasts < ActiveRecord::Migration[5.0]
  def change
    create_table :multicasts, id: false do |t|
      t.bigserial              :id, primary_key: true
      t.belongs_to             :profile, index: true, type: :bigint, null: false, foreign_key: true
      t.belongs_to             :survivor, index: true, type: :bigint, null: false, foreign_key: true

      t.timestamps
    end
  end
end
