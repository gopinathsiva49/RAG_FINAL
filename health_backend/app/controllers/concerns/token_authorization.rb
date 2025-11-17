module TokenAuthorization
    extend ActiveSupport::Concern

    included do
        before_action :authorize_request
    end

    private

    def authorize_request
        token = request.headers['Authorization']
        if token.blank?
            raise AppErrors::AuthError, I18n.t('auth.token_missing')
        end

        begin
            decoded = JsonWebToken.decode(token)
            @current_user = User.find_by(id: decoded[:user_id])
            raise AppErrors::AuthError, I18n.t('auth.invalid_token_user') unless @current_user
            
            unless @current_user.is_logged_in
                raise AppErrors::AuthError, I18n.t('auth.user_not_logged_in')
            end
            
            if @current_user.status.to_i.zero?
                raise AppErrors::AuthError, I18n.t('auth.user_inactive')
            end
        rescue JWT::ExpiredSignature
            raise AppErrors::AuthError, I18n.t('auth.token_expired')
        rescue JWT::DecodeError
            raise AppErrors::AuthError, I18n.t('auth.invalid_token')
        end
    end

    def current_user
        @current_user
    end

end