module VectorSearchable
  extend ActiveSupport::Concern

  class_methods do
    def search(query, limit: 5)
      embedding_response = OpenAIClient.embeddings(
        parameters: { model: "text-embedding-3-small", input: query }
      )
      query_embedding = embedding_response.dig("data", 0, "embedding")
      nearest_neighbors(:embedding, query_embedding, distance: :cosine).first(limit)
    end
  end
end
