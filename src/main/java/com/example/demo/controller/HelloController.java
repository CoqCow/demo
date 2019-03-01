package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.annotation.CheckLogin;
import com.example.demo.annotation.FreeParam;
import com.example.demo.common.MyThreadLocal;
import com.example.demo.common.Request;
import com.example.demo.common.Response;
import com.example.demo.dao.UserDao;
import com.example.demo.dao.base.BaseQueryParam;
import com.example.demo.dao.queryparam.UserQueryParam;
import com.example.demo.request.LoginRequest;
import com.example.demo.util.RequestUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-21 19:31
 **/
@Controller
@RequestMapping("/hello")
@Slf4j
public class HelloController {
    @Autowired
    private UserDao userDao;

    @RequestMapping("/t1")
    @ResponseBody
    @CheckLogin
    public Response hello(@RequestBody Request request) {
        log.info("执行到这里了");
        LoginRequest loginRequest = RequestUtil.convertRequestBizBean(LoginRequest.class, request);
        if (null == loginRequest) {
            return Response.error("请求参数错误哦");
        }
        UserQueryParam userQueryParam = new UserQueryParam(loginRequest);
        userQueryParam.setAge(100);
        return Response.error("成功" + JSONObject.toJSON(userDao.findList(userQueryParam)));
    }

    @RequestMapping("/t2")
    @ResponseBody
    @FreeParam
    public Response free(String file) {
        return Response.error("不走统一逻辑" + file);
    }

}
