package com.aifinance.repository;

import com.aifinance.model.Transaction;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class TransactionRepository {
    private final Map<UUID, Transaction> store = new ConcurrentHashMap<>();

    public List<Transaction> findAll() {
        return new ArrayList<>(store.values());
    }

    public Optional<Transaction> findById(UUID id) {
        return Optional.ofNullable(store.get(id));
    }

    public Transaction save(Transaction t) {
        if (t.getId() == null) t.setId(UUID.randomUUID());
        store.put(t.getId(), t);
        return t;
    }

    public void deleteById(UUID id) {
        store.remove(id);
    }
}


