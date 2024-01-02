package com.niladri.MoneyManagement.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.NonNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.Collections;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user")
public class User{
    @Id
    private String id;

    private String username;

    private String password;

}
