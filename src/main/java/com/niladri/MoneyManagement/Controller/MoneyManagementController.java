package com.niladri.MoneyManagement.Controller;

import com.niladri.MoneyManagement.DTO.Spend_Transaction_DTO;
import com.niladri.MoneyManagement.Models.Spend_Transaction;
import com.niladri.MoneyManagement.Services.Spend_Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/MoneyManagement")
@RequiredArgsConstructor
public class MoneyManagementController {

    private final Spend_Service spend_service;
    private final DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.ENGLISH);

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

    @GetMapping("/category/{category}")
    @ResponseStatus(HttpStatus.OK)
    public List<Spend_Transaction> GetAllSpendTransactionByCategory(@PathVariable String category){
        return spend_service.GetAllSpendTransactionByCategory(category);
    }
    @GetMapping("dates/{startDate}/{endDate}")
    @ResponseStatus(HttpStatus.OK)
    public List<Spend_Transaction> GetAllSpendTransactionBetweenDates(@PathVariable String startDate, @PathVariable String endDate){
        try {
            return spend_service.GetAllSpendTransactionBetweenDates(format.parse(startDate), format.parse(endDate));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
