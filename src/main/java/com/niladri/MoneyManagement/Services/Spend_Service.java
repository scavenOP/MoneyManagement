package com.niladri.MoneyManagement.Services;

import com.niladri.MoneyManagement.DTO.Spend_Transaction_DTO;
import com.niladri.MoneyManagement.Models.Spend_Transaction;
import com.niladri.MoneyManagement.Repository.Spend_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

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
                    .Amount(spend_transaction_dto.getAmount())
                    .build();

            spend_repository.save(spend_transaction);
        }
        catch (Exception e){
            System.out.println(e);
        }
    }

    public List<Spend_Transaction>GetAllSpendTransactions(){
            return spend_repository.findAll();

    }

}
