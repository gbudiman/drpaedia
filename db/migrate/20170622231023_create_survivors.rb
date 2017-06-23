class CreateSurvivors < ActiveRecord::Migration[5.0]
  def change
    create_table :survivors, id: false do |t|
      t.bigserial     :id, primary_key: true
      t.string        :provider, null: false
      t.string        :uid
      t.string        :token
      t.datetime      :expiration
      t.string        :friendly_name, null: false
      t.string        :primary_profile
      t.datetime      :profile_timestamp

      t.timestamps  
    end

    add_index :survivors, :friendly_name, unique: true
    add_index :survivors, [:provider, :uid], unique: true
  end
end
