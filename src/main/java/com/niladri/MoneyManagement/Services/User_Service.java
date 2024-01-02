package com.niladri.MoneyManagement.Services;

import com.niladri.MoneyManagement.DTO.Login_DTO;
import com.niladri.MoneyManagement.DTO.SignUp_DTO;
import com.niladri.MoneyManagement.Models.User;
import com.niladri.MoneyManagement.Repository.User_Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class User_Service {

    private final User_Repository userRepository;

    public void saveUser(SignUp_DTO signUp_dto){
        User user = User.builder()
                .username(signUp_dto.getUsername())
                .password(signUp_dto.getPassword())
                .build();
        userRepository.save(user);
    }

    public boolean checkUser(Login_DTO login_dto){
        User user = userRepository.findByUsername(login_dto.getUsername());
        if(user==null){
            return false;
        }
        if(user.getPassword().equals(login_dto.getPassword())){
            return true;
        }
        else{
            return false;
        }
    }

}
