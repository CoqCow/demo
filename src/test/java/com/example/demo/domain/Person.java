package com.example.demo.domain;

import java.io.Serializable;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-19 18:29
 **/
public class Person<T> implements Serializable {
    private int code;
    private String msg;
    private T data;

    @Override
    public String toString() {
        return "Person{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
