package com.niladri.MoneyManagement.Services;

import com.niladri.MoneyManagement.DTO.Spend_Transaction_DTO;
import com.niladri.MoneyManagement.Models.Spend_Transaction;
import com.niladri.MoneyManagement.Repository.Spend_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class Spend_Service {
    private final Spend_Repository spend_repository;

    @Autowired
    private final MongoTemplate mongoTemplate;

    public void AddSpendTransaction(Spend_Transaction_DTO spend_transaction_dto){
        try{
            Spend_Transaction spend_transaction = Spend_Transaction.builder()
                    .date(spend_transaction_dto.getDate())
                    .description(spend_transaction_dto.getDescription())
                    .amount(spend_transaction_dto.getAmount())
                    .category(spend_transaction_dto.getCategory())
                    .user(spend_transaction_dto.getUser())
                    .build();

            spend_repository.save(spend_transaction);
        }
        catch (Exception e){
            System.out.println(e);
        }
    }

    public List<Spend_Transaction>GetAllSpendTransactions(String user){
        Query query = new Query();
        query.addCriteria(Criteria.where("user").is(user));
        return mongoTemplate.find(query, Spend_Transaction.class);

    }
    public List<Spend_Transaction> GetAllSpendTransactionByCategory(String user,String category){

        Query query = new Query();
        query.addCriteria(Criteria.where("user").is(user));
        query.addCriteria(Criteria.where("category").is(category));
        return mongoTemplate.find(query, Spend_Transaction.class);
    }
    public List<Spend_Transaction> GetAllSpendTransactionBetweenDates(String user,Date startDate, Date endDate){

        Query query = new Query();
        query.addCriteria(Criteria.where("user").is(user).and("date").gte(startDate).lte(endDate));
        return mongoTemplate.find(query, Spend_Transaction.class);
    }
}
