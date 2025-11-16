class ApplicationController < ActionController::API
    # Includes custom error handling methods.
    include ErrorHandler

    def alive
        render json: { current_time: Time.now }
    end
    
    # Handles requests to undefined routes.
    def route_not_found
        render json: { error: "Route not found" }, status: :not_found
    end
end
