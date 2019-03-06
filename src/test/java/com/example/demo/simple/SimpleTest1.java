package com.example.demo.simple;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.example.demo.domain.Person;

import org.junit.Test;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-03-03 08:29
 **/
public class SimpleTest1 {

    public static void main(String[] args) {
        String s = "var name1 = ['[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]', '[闭嘴]', '[睡]', '[大哭]', '[尴尬]', '[发怒]', '[调皮]',\n" +
                "            '[呲牙]', '[惊讶]', '[难过]', '[酷]', '[冷汗]', '[抓狂]', '[吐]', '[偷笑]', '[愉快]', '[白眼]', '[傲慢]', '[饥饿]', '[困]', '[惊恐]'];\n";
        System.out.println(s.replaceAll("'","\""));
    }

    public static int test() {
        int i = 0;
        try {
            i = i / 0;
            return i + 1;
        } catch (Exception e) {
            return i = i + 2;
        } finally {
            return i = i + 3;
        }
    }
}
