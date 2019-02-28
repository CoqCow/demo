package com.example.demo.domain;

import java.io.Serializable;

import lombok.Data;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-21 14:29
 **/
@Data
public class User implements Serializable {
    private Long id;
    private String name;
    private int age;
}
