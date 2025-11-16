class CreateContexts < ActiveRecord::Migration[8.1]
  def change
    create_table :contexts do |t|
      t.text :content, null: false
      t.vector :embedding, limit: 1536, null: false  # pgvector column
      t.timestamps
    end
  end
end
