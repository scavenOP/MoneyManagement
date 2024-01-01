package com.niladri.MoneyManagement.Controller;

import com.niladri.MoneyManagement.DTO.Spend_Transaction_DTO;
import com.niladri.MoneyManagement.Models.Spend_Transaction;
import com.niladri.MoneyManagement.Services.Spend_Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/MoneyManagement")
@RequiredArgsConstructor
public class MoneyManagementController {

    private final Spend_Service spend_service;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public void AddSpendTransaction(@RequestBody Spend_Transaction_DTO spend_transaction_dto){
        spend_service.AddSpendTransaction(spend_transaction_dto);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<Spend_Transaction> GetAllSpendTransactions(){
        return spend_service.GetAllSpendTransactions();
    }
}
