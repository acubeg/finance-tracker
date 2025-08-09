package com.aifinance.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public class Transaction {
    public enum Type { INCOME, EXPENSE }

    private UUID id;
    @NotNull
    private LocalDate date;
    @NotBlank
    private String description;
    @NotBlank
    private String category;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private Type type;

    public Transaction() {}

    public Transaction(UUID id, LocalDate date, String description, String category, BigDecimal amount, Type type) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.type = type;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }
}


