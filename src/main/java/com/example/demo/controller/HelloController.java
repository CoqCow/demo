package com.example.demo.controller;

import com.example.demo.annotation.CheckLogin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-21 19:31
 **/
@Controller
@RequestMapping("/hello")
public class HelloController {
    @RequestMapping("/t1")
    @ResponseBody
    @CheckLogin
    public String hello() {
        return "hello world";
    }
}
