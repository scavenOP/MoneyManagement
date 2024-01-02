package com.niladri.MoneyManagement.Controller;

import com.niladri.MoneyManagement.DTO.Login_DTO;
import com.niladri.MoneyManagement.DTO.SignUp_DTO;
import com.niladri.MoneyManagement.Repository.User_Repository;
import com.niladri.MoneyManagement.Services.User_Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final User_Service userService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin("*")
    public void signUp(@RequestBody SignUp_DTO signUp_dto){
        userService.saveUser(signUp_dto);

    }

//    api from login which send 200 status with username if login is successful and sttaus code 401 if login is unsuccessful
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin("*")
    public ResponseEntity<String> login(@RequestBody Login_DTO login_dto){
        if(userService.checkUser(login_dto)){
            return new ResponseEntity<String>(login_dto.getUsername(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<String>("Login Failed",HttpStatus.UNAUTHORIZED);
        }
    }



}
