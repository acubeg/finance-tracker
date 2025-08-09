package com.aifinance.controller;

import com.aifinance.model.Budget;
import com.aifinance.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    private final BudgetService service;

    public BudgetController(BudgetService service) { this.service = service; }

    @GetMapping
    public List<Budget> list() { return service.list(); }

    @PostMapping
    public Budget save(@Valid @RequestBody Budget b) { return service.save(b); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) { service.delete(id); }
}


