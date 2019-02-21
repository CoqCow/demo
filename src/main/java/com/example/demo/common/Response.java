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
}
