package com.niladri.MoneyManagement.Controller;

import com.niladri.MoneyManagement.DTO.Spend_Transaction_DTO;
import com.niladri.MoneyManagement.Models.Spend_Transaction;
import com.niladri.MoneyManagement.Services.Expense_Service;
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
@RequiredArgsConstructor
public class MoneyManagementController {

    private final Spend_Service spend_service;
    private final Expense_Service expense_service;
    private final DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.ENGLISH);

    private final String corsOrigin = "*";

    @PostMapping("/api/MoneyManagement")
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin()
    public void AddSpendTransaction(@RequestBody Spend_Transaction_DTO spend_transaction_dto){
        spend_service.AddSpendTransaction(spend_transaction_dto);
    }

    @GetMapping("/api/MoneyManagement/{user}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = corsOrigin)
    public List<Spend_Transaction> GetAllSpendTransactions(@PathVariable String user){

        return spend_service.GetAllSpendTransactions(user);
    }

    @GetMapping("category/{user}/{category}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = corsOrigin)
    public List<Spend_Transaction> GetAllSpendTransactionByCategory(@PathVariable String user, @PathVariable String category){
        return spend_service.GetAllSpendTransactionByCategory(user,category);
    }
    @GetMapping("dates/{user}/{startDate}/{endDate}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = corsOrigin)
    public List<Spend_Transaction> GetAllSpendTransactionBetweenDates(@PathVariable String user,@PathVariable String startDate, @PathVariable String endDate){
        try {
            return spend_service.GetAllSpendTransactionBetweenDates(user,format.parse(startDate), format.parse(endDate));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("currentMonthExpense/{user}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = corsOrigin)
    public String GetCurrentMonthExpense(@PathVariable String user){
        return expense_service.GetCurrentMonthExpense(user);
    }

    @GetMapping("currentYearExpense/{user}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = corsOrigin)
    public String GetCurrentYearExpense(@PathVariable String user){
        return expense_service.GetCurrentYearExpense(user);
    }
}
