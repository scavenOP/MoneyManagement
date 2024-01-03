package com.niladri.MoneyManagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Spend_Transaction_DTO {
    public String user;
    public Date date;
    public String category;
    public String description;
    public Integer amount;
}