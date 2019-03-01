package com.example.demo.dao.queryparam;

import com.example.demo.dao.base.BaseQueryParam;
import com.example.demo.request.LoginRequest;

import lombok.Data;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-28 20:22
 **/
@Data
public class UserQueryParam extends BaseQueryParam {

    /**
     * 用户姓名
     */
    private String name;
    /**
     * 用户年龄
     */
    private int age;

    public UserQueryParam() {
    }

    public UserQueryParam(LoginRequest request) {
        super(request);
    }
}
