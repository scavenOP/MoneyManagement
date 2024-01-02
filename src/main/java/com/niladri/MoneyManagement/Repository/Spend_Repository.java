package com.niladri.MoneyManagement.Repository;

import com.niladri.MoneyManagement.Models.Spend_Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Spend_Repository extends MongoRepository<Spend_Transaction,String>{

}
