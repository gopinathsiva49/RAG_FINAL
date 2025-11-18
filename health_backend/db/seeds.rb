# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'json'

file_path = Rails.root.join("db", "context_embeddings.json")
contexts = JSON.parse(File.read(file_path))

contexts.each do |ctx|
  Context.create!(
    content: ctx["content"],
    embedding: ctx["embedding"]
  )
end

puts "Seeded #{contexts.size} weight-loss contexts successfully!"


# file_path = Rails.root.join("db", "context_embeddings.json")

# # Step 1: Read the JSON file
# contexts = JSON.parse(File.read(file_path))

# # Step 2: Generate embeddings and update objects
# contexts.each_with_index do |ctx, index|
#   puts "Processing #{index + 1}/#{contexts.size} - #{ctx["title"]}"

#   embedding_response = OpenAIClient.embeddings(
#     parameters: {
#       model: "text-embedding-3-small",
#       input: ctx["content"]
#     }
#   )

#   embedding = embedding_response.dig("data", 0, "embedding")
#   ctx["embedding"] = embedding
# end

# # Step 3: Write output back to the same file
# File.open(file_path, "w") do |f|
#   f.write(JSON.pretty_generate(contexts))
# end

# puts "Updated embeddings written to #{file_path}"

