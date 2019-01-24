package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by niuruobing2 on 2019/1/24.
 */
@Controller
public class IndexController {
    @RequestMapping("/active/query/index")
    public String index1(){
        return "cshopActiveAttend";
    }


    @RequestMapping("/active/index/send")
    public String index2(){
        return "cshopActiveSend";
    }

    @RequestMapping("/active/index/authority")
    public String index3(){
        return "cshopAuthority";
    }
}
