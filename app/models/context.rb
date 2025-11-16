class Context < ApplicationRecord
    validates :content, presence: true
end
