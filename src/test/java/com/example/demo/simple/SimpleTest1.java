package com.example.demo.simple;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.example.demo.domain.Person;

import org.junit.Test;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-20 18:29
 **/
public class SimpleTest1 {
    @Test
    public void test1() {
        Person<String> person = new Person<>();
        person.setCode(1);
        person.setMsg("测试代码");
        Object result = person;
        byte[] bytes = JSONObject.toJSONString(result, SerializerFeature.WriteMapNullValue).getBytes();
        System.out.println(new String(bytes));
    }

    @Test
    public void test2() {

    }
}
