package com.aifinance.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public class Budget {
    private UUID id;
    @NotBlank
    private String category;
    @NotBlank
    private String month; // YYYY-MM
    @NotNull
    private BigDecimal monthlyLimit;

    public Budget() {}

    public Budget(UUID id, String category, String month, BigDecimal monthlyLimit) {
        this.id = id;
        this.category = category;
        this.month = month;
        this.monthlyLimit = monthlyLimit;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }
    public BigDecimal getMonthlyLimit() { return monthlyLimit; }
    public void setMonthlyLimit(BigDecimal monthlyLimit) { this.monthlyLimit = monthlyLimit; }
}


