package com.niladri.MoneyManagement.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "spend_transaction")
public class Spend_Transaction {
    @Id
    public String id;
    public Date date;
    public String category;
    public String description;
    public Integer amount;
    public String user;
}
