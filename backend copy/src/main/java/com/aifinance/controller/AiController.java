package com.aifinance.controller;

import com.aifinance.model.Transaction;
import com.aifinance.service.AiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final AiService aiService;

    public AiController(AiService aiService) { this.aiService = aiService; }

    @PostMapping("/insights")
    public Map<String, String> insights(@RequestBody List<Transaction> transactions) {
        String result = aiService.generateInsights(transactions);
        return Map.of("content", result);
    }

    @PostMapping("/explain")
    public Map<String, String> explain(@RequestBody Transaction transaction) {
        String result = aiService.explainTransaction(transaction);
        return Map.of("content", result);
    }

    public static class CoachRequest {
        public String question;
        public List<Transaction> recent;
        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        public List<Transaction> getRecent() { return recent; }
        public void setRecent(List<Transaction> recent) { this.recent = recent; }
    }

    @PostMapping("/coach")
    public Map<String, String> coach(@RequestBody CoachRequest request) {
        String result = aiService.coach(request.question, request.recent);
        return Map.of("content", result);
    }
}


