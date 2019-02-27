package com.example.demo.util;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.common.Request;

import lombok.extern.slf4j.Slf4j;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-27 16:51
 **/
@Slf4j
public class RequestUtil {
    /**
     * @Param: [clazz, request]
     * @return: T
     * @Author: niuruobing
     * @Date: 2019/2/27
     * @Description: 请求业务参数转换请求实体
     */
    public static <T> T convertRequestBizBean(Class<T> clazz, Request request) {
        try {
            String param = JSONObject.toJSONString(request.getParam());
            return JSONObject.parseObject(param, clazz);
        } catch (Exception ex) {
            log.error("convertRequestBizBean error clazz:{},colorRequest:{}", clazz, request);
        }
        return null;
    }
}
