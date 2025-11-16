class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :phone
      t.string :password_digest, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.boolean :is_logged_in, default: false
      t.integer :num_logins, default: 0
      t.integer :num_logouts, default: 0
      t.integer :status, default: 0 # 0: inactive, 1: active
      t.timestamp :last_login_at
      t.timestamp :last_logout_at
      t.timestamp :deleted_at
      t.timestamps
    end
  end
end
