class User < ApplicationRecord
    has_secure_password
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true,
                        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :phone, presence: true, uniqueness: true,
                        length: { in: 10..15 },
                        format: { with: /\A[0-9]+\z/, message: "must be numeric" }
end
