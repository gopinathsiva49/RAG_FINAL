class Api::V1::AuthController < Api::V1::BaseController
    skip_before_action :authorize_request, only: [:signup, :login]

    def signup
        user = User.new(user_params)
        user.status = 1 # Set user as active on signup
        if user.save
            render json: { message: I18n.t('auth.signup_success') }, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def login
        login_param = params[:login].to_s.strip
        password = params[:password].to_s

        if login_param.blank? || password.blank?
            return render json: { error: I18n.t('auth.login_required') }, status: :bad_request
        end

        user = User.find_by("lower(email) = ?", login_param.downcase) || User.find_by(phone: login_param)
        if user&.authenticate(password)
            token = JsonWebToken.encode(user_id: user.id)
            user.mark_login! if user.respond_to?(:mark_login!)
            render json: { message: I18n.t('auth.login_success'), token: token }, status: :ok
        else
            render json: { error: I18n.t('auth.invalid_credentials') }, status: :unauthorized
        end
    end

    def logout
        current_user.mark_logout! if current_user.respond_to?(:mark_logout!)
        head :no_content
    end

    private

    def user_params
        params.require(:user).permit(
            :email,
            :first_name,
            :last_name,
            :phone,
            :password,
            :password_confirmation
        )
    end
end
