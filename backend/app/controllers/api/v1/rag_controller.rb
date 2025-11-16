class Api::V1::RagController < Api::V1::BaseController
  def search
    query = params[:query]
    if query.blank?
      return render json: { error: "Query cannot be blank" }, status: :bad_request
    end

    # Step 1: Get top contexts
    top_contexts = Context.search(query)

    # Step 2: Build prompt & get answer
    answer = RagPromptService.new(query: query, contexts: top_contexts).call

    # Step 3: Return JSON
    render json: {
      query: query,
      answer: answer,
    }
  end
end
