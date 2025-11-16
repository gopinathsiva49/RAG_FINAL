class RagPromptService
  def initialize(query:, contexts:, role: "weight-loss assistant")
    @query = query
    @contexts = contexts
    @role = role
  end

  def build_prompt
    <<~PROMPT
      You are a #{@role}. Answer the user's question based on the context below.

      Context:
      #{@contexts.map(&:content).join("\n\n")}

      User Question:
      #{@query}

      Answer concisely and clearly.
    PROMPT
  end

  def call
    prompt = build_prompt
    response = OpenAIClient.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      }
    )
    response.dig("choices", 0, "message", "content")
  end
end
