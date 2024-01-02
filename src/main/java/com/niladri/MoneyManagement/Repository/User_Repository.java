package com.niladri.MoneyManagement.Repository;

import com.niladri.MoneyManagement.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface User_Repository extends MongoRepository<User,String> {
    User findByUsername(String username);
}
