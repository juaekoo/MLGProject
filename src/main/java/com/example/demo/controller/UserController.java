package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //회원가입 로직
    @PostMapping("/signin")
    public boolean join(@RequestBody User user){

        boolean b = userService.joinUser(user);
        System.out.println("b = " + b);

        return b; //상태코드 넘겨주기
    }

   /* @GetMapping("/test")
    public List<User> find(@RequestBody User user){
        return userService.validateDuplicateUser(user);
    }*/

    /*회원목록 조회*/
    //일단 나중에 form도 만들어야 함 0414지원석
}