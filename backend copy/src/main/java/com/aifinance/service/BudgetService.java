package com.aifinance.service;

import com.aifinance.model.Budget;
import com.aifinance.repository.BudgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BudgetService {
    private final BudgetRepository repository = new BudgetRepository();

    public List<Budget> list() { return repository.findAll(); }
    public Budget save(Budget b) { return repository.save(b); }
    public void delete(UUID id) { repository.deleteById(id); }
}


