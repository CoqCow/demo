package com.example.demo.aop;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.common.ApiEnum;
import com.example.demo.util.UUIDUtil;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.xml.crypto.Data;

import afu.org.checkerframework.checker.oigj.qual.O;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-22 14:28
 **/
@Aspect
@Component
public class BaseAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseAspect.class);

    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping) ||" +
            "@annotation(org.springframework.web.bind.annotation.GetMapping) ||" +
            "@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void annotationPointCut() {
    }

    @Around("annotationPointCut()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        MDC.clear();
        MDC.put("requestId", UUIDUtil.generateUUID());
        return exe(joinPoint, joinPoint.getArgs());
    }

    private Object exe(ProceedingJoinPoint joinPoint, Object[] args) throws Throwable {
        Object result = null;
        //拦截实体类
        Class targetClass = joinPoint.getTarget().getClass();
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        //获取拦截的方法名称、请求参数
        String methodName = methodSignature.getName();
        if (args != null && args.length > 0) {
            JSONObject.toJSON(args);
        }
        //方法执行前打印入参
        LOGGER.info("请求执行开始，方法名《" + methodName + "》入参《》");
        //方法添加@CheckLogin注解，检验登录信息

        //真是方法试行
        result = joinPoint.proceed();

        //方法执行完成，打印出参
        LOGGER.info("请求执行结束，方法名《" + methodName + "》出参《》");
        return result;
    }

    /**
     * @Param: []
     * @return: com.example.demo.common.ApiEnum
     * @Author: niuruobing
     * @Date: 2019/2/25
     * @Description:
     */
    private ApiEnum checkLogin() {
        return ApiEnum.SUCCESS;
    }
}
