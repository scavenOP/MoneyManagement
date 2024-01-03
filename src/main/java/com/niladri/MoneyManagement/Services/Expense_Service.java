package com.niladri.MoneyManagement.Services;

import com.niladri.MoneyManagement.Models.Spend_Transaction;
import com.niladri.MoneyManagement.Repository.Spend_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class Expense_Service {




    private final Spend_Repository spendRepository;
    private final Spend_Service spendService;

    public String GetCurrentMonthExpense(String username){
        Integer Expense=0;
//      get current month 1st day in a date variable
        Calendar c = Calendar.getInstance();   // this takes current date
        c.set(Calendar.DAY_OF_MONTH, 1);
        Date MonthsFirstDate=c.getTime();

        Calendar c1 = Calendar.getInstance();   // this takes current date
        c1.set(Calendar.DATE, c1.getActualMaximum(Calendar.DATE));
        Date MonthsLastDate=c1.getTime();

        List<Spend_Transaction> spend_transactions = spendService.GetAllSpendTransactionBetweenDates(username,MonthsFirstDate,MonthsLastDate);

        for(Spend_Transaction spend_transaction:spend_transactions){
            Expense+=spend_transaction.getAmount();
        }
        return Expense.toString();


    }

    public String GetCurrentYearExpense(String username) {
        Integer Expense = 0;
//      get current month 1st day in a date variable
        Calendar c = Calendar.getInstance();   // this takes current date
        c.set(Calendar.DAY_OF_YEAR, 1);
        Date YearsFirstDate = c.getTime();

        Calendar c1 = Calendar.getInstance();   // this takes current date
        int year = Calendar.getInstance().get(Calendar.YEAR);
        c1.set(Calendar.YEAR, year);
        c1.set(Calendar.MONTH, 11); // 11 = december
        c1.set(Calendar.DAY_OF_MONTH, 31); // new years eve

        Date YearsLastDate = c1.getTime();


        List<Spend_Transaction> spend_transactions = spendService.GetAllSpendTransactionBetweenDates(username, YearsFirstDate, YearsLastDate);

        for (Spend_Transaction spend_transaction : spend_transactions) {
            Expense += spend_transaction.getAmount();
        }
        return Expense.toString();
    }

}
