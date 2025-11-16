class CreateContexts < ActiveRecord::Migration[8.1]
  def change
    create_table :contexts do |t|
      t.text :content, null: false
      t.jsonb :embedding, null: false, default: []  # store embedding as array
      t.timestamps
    end
  end
end
