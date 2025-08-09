package com.aifinance.service;

import com.aifinance.model.Transaction;
import com.aifinance.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {
    private final TransactionRepository repository = new TransactionRepository();

    public List<Transaction> list() { return repository.findAll(); }
    public Transaction create(Transaction t) { return repository.save(t); }
    public void delete(UUID id) { repository.deleteById(id); }
}


