# ErrorHandler module provides centralized error handling for controllers
module ErrorHandler
    extend ActiveSupport::Concern
    
    included do
        # Rescue from all StandardError exceptions in the including controller
        rescue_from StandardError do |e|
            handle_standard_error(e)
        end
    end

    private

    # Handles StandardError exceptions
    def handle_standard_error(e)
        # Log the error message
        Rails.logger.error e.message
        # Look up the error cause symbol using the exception's class
        error_key = e.exception.class
        error_cause = AppErrors::ERROR_CAUSE[error_key] || :internal_server_error
        # Prepare the error response
        error_response = {
            status: "failure",
            error: e.message
        }
        # Render the error response as JSON with the appropriate status
        render json: error_response, status: error_cause
    end
end