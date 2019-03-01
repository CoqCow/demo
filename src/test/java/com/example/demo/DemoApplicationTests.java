package com.example.demo;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.dao.UserDao;
import com.example.demo.dao.queryparam.UserQueryParam;
import com.example.demo.domain.User;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {
    @Autowired
    private UserDao userDao;

    @Test
    public void contextLoads() {
        UserQueryParam userQueryParam = new UserQueryParam();
        userQueryParam.setAge(100);
        userQueryParam.setPageSize(10);
        userQueryParam.setOffset(1);
        System.out.println(JSONObject.toJSON(userDao.findList(userQueryParam)));
    }

}

