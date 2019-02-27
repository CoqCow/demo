package com.example.demo.controller;

import com.example.demo.annotation.CheckLogin;
import com.example.demo.common.MyThreadLocal;
import com.example.demo.common.Request;
import com.example.demo.common.Response;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
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
    public Response hello(@RequestBody Request request) {
        return Response.error("成功");
    }
}
