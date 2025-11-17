# Application-wide custom error definitions and a mapping from exception classes
# to symbolic "causes" (used by controllers or an error handler to determine
# appropriate HTTP response codes / behaviour).
#
# Usage:
# - Add any new top-level custom error name as a string to CUSTOM_ERROR_LIST.
#   That will create a subclass of AppErrors::Base with the given constant name.
# - Use ERROR_CAUSE to map exception classes (including custom errors) to a
#   symbolic cause (e.g., :unauthorized, :bad_request). The error handling layer
#   can translate these symbols into HTTP statuses or messages.
#
# Notes:
# - AppErrors::Base is a minimal wrapper around StandardError for app-specific
#   exceptions. It exists to allow rescuing "AppErrors::Base" to catch all
#   application-defined errors.
# - ERROR_CAUSE is frozen to prevent accidental modification at runtime.
module AppErrors
    class Base < StandardError 
        def initialize(message = nil)
            super(message)
        end
    end
    
    # List custom error class names (as strings). A constant with each name will
    # be defined as a subclass of AppErrors::Base.
    CUSTOM_ERROR_LIST = [
        "AuthError"
    ]
    
    CUSTOM_ERROR_LIST.each do |class_name|
        const_set(class_name, Class.new(Base))
    end
    
    # Map exception classes to symbolic causes. The error handling layer should
    # translate these symbols to HTTP status codes / responses.
    ERROR_CAUSE = {
        AppErrors::AuthError => :unauthorized,
        ActionController::ParameterMissing => :bad_request
    }.freeze
end