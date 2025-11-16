class ApplicationController < ActionController::API
    
    def alive
        render json: { current_time: Time.now }
    end

    def route_not_found
        render json: { error: "Route not found" }, status: :not_found
    end
end
