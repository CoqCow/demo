package com.example.demo.common;

import java.io.Serializable;

import lombok.Data;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-21 18:58
 **/
@Data
public class Response<T> implements Serializable {
    private int code;
    private String msg;
    private T data;

    public static Response error(int code, String message) {
        Response resultVo = new Response();
        resultVo.setCode(code);
        resultVo.setMsg(message);
        return resultVo;
    }

    public static Response error(String message) {
        return error(ApiEnum.ERROR.getCode(), message);
    }
}
