package com.aifinance.controller;

import com.aifinance.model.Transaction;
import com.aifinance.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Transaction> list() { return service.list(); }

    @PostMapping
    public Transaction create(@Valid @RequestBody Transaction t) { return service.create(t); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) { service.delete(id); }
}


