package com.example.demo.simple;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.example.demo.domain.Person;

import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-20 18:29
 **/
public class SimpleTest1 {
    @Test
    public void test1() {
        Map<String,Object> map=new HashMap<>();
        Map<String,Object> param=new HashMap<>();
        param.put("d","d");
        param.put("d1","d1");
        map.put("pin","d");
        map.put("param",param);
        map.put("pin","d");
        byte[] bytes = JSONObject.toJSONString(map, SerializerFeature.WriteMapNullValue).getBytes();
        System.out.println(new String(bytes));
    }

    @Test
    public void test2() {

    }
}
