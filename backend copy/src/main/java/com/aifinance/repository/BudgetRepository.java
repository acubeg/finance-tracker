package com.aifinance.repository;

import com.aifinance.model.Budget;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class BudgetRepository {
    private final Map<UUID, Budget> store = new ConcurrentHashMap<>();

    public List<Budget> findAll() {
        return new ArrayList<>(store.values());
    }

    public Budget save(Budget b) {
        if (b.getId() == null) b.setId(UUID.randomUUID());
        store.put(b.getId(), b);
        return b;
    }

    public void deleteById(UUID id) {
        store.remove(id);
    }
}


