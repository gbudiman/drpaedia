class AddNormallySyncedToSurvivor < ActiveRecord::Migration[5.0]
  def change
    add_column :survivors, :normally_synced, :boolean, default: true
  end
end
