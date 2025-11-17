class Context < ApplicationRecord
    include VectorSearchable
    has_neighbors :embedding
end
