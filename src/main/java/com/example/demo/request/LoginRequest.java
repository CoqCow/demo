package com.example.demo.request;

import lombok.Data;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-27 16:48
 **/
@Data
public class LoginRequest {
    /**
     * 用户名
     */
    private String username;
    /**
     * 密码
     */
    private String password;
}
