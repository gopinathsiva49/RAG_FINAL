class User < ApplicationRecord
    has_secure_password
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true,
                        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :phone, presence: true, uniqueness: true

    def mark_login!
        update!(
            num_logins: num_logins + 1,
            last_login_at: Time.current,
            is_logged_in: true
        )
    end

    def mark_logout!
        update!(
            num_logouts: num_logouts + 1,
            last_logout_at: Time.current,
            is_logged_in: false
        )
    end

end
