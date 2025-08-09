package com.aifinance.service;

import com.aifinance.model.Transaction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class AiService {
    private final WebClient webClient;

    @Value("${app.ai.openai.model:gpt-4o-mini}")
    private String model;

    public AiService(@Value("${app.ai.openai.base-url:https://api.openai.com/v1}") String baseUrl,
                     @Value("${OPENAI_API_KEY:}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String generateInsights(List<Transaction> transactions) {
        StringBuilder context = new StringBuilder();
        context.append("You are a helpful finance coach. Analyze the user's transactions and provide 3-5 key insights, including any overspending patterns, category breakdowns, and actionable tips.\n");
        for (Transaction t : transactions) {
            context.append(String.format("- %s | %s | %s | %s | %s\n",
                    t.getDate(), t.getType(), t.getCategory(), t.getDescription(), t.getAmount()));
        }
        return callOpenAi(context.toString());
    }

    public String explainTransaction(Transaction t) {
        String prompt = "Explain this transaction in simple terms. Include whether it seems essential or discretionary and suggest ways to optimize if possible.\n" +
                String.format("%s | %s | %s | %s | %s", t.getDate(), t.getType(), t.getCategory(), t.getDescription(), t.getAmount());
        return callOpenAi(prompt);
    }

    public String coach(String question, List<Transaction> recent) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are a friendly personal finance coach. Answer the user's question using the recent transactions for context. Keep it concise and actionable.\n");
        prompt.append("Question: ").append(question).append("\n");
        if (recent != null && !recent.isEmpty()) {
            prompt.append("Recent Transactions:\n");
            recent.stream().limit(15).forEach(t -> prompt.append(String.format("- %s | %s | %s | %s | %s\n",
                    t.getDate(), t.getType(), t.getCategory(), t.getDescription(), t.getAmount())));
        }
        return callOpenAi(prompt.toString());
    }

    private String callOpenAi(String userContent) {
        Map<String, Object> request = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", "You are an expert personal finance assistant."),
                        Map.of("role", "user", "content", userContent)
                ),
                "temperature", 0.3
        );

        try {
            // Early validation to avoid confusing errors
            if (webClient == null) return "AI client not initialized.";
            Map response = webClient.post()
                    .uri("/chat/completions")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null) return "No response from AI.";
            List choices = (List) response.get("choices");
            if (choices == null || choices.isEmpty()) return "No choices returned by AI.";
            Map first = (Map) choices.get(0);
            Map message = (Map) first.get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            return "AI request failed. Please verify your API key and network.";
        }
    }
}


