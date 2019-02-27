package com.example.demo.aop;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.annotation.CheckLogin;
import com.example.demo.common.ApiEnum;
import com.example.demo.common.MyThreadLocal;
import com.example.demo.common.Request;
import com.example.demo.common.Response;
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

import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;

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
        try {
            //拦截实体类
            Class targetClass = joinPoint.getTarget().getClass();
            MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
            Method method = methodSignature.getMethod();
            //获取拦截的方法名称、请求参数
            String methodName = methodSignature.getName();
            //访问路径不存在
            if ("errorHtml".equals(methodName)) {
                return joinPoint.proceed();
            }
            if (args == null || args.length == 0) {
                return Response.error("入参为空");
            }
            if (!(args[0] instanceof Request)) {
                return Response.error("请求参数格式错误呢");
            }
            Request request = (Request) args[0];
            String paramStr = JSON.toJSONString(request);
            //方法执行前打印入参
            LOGGER.info("请求执行开始，方法名《" + methodName + "》入参《" + paramStr + "》");
            //Request request = JSON.parseObject(paramStr, Request.class);
            //方法添加@CheckLogin注解，检验登录信息
            CheckLogin checkLogin = method.getAnnotation(CheckLogin.class);
            if (null != checkLogin) {
                ApiEnum apiEnum = checkLogin(request.getToken());
                if (200 != apiEnum.getCode()) {
                    return Response.error(ApiEnum.LONG_OUT.getCode(), ApiEnum.LONG_OUT.getValue());
                }
            }
            //真实方法试行
            result = joinPoint.proceed();
            //方法执行完成，打印出参
            LOGGER.info("请求执行结束，方法名《" + methodName + "》出参《》");
        } catch (Exception e) {
            LOGGER.error("异常", e);
            result = Response.error("服务端error");
        } finally {
            MyThreadLocal.remove();
        }
        return result;
    }

    /**
     * @Param: []
     * @return: com.example.demo.common.ApiEnum
     * @Author: niuruobing
     * @Date: 2019/2/25
     * @Description:
     */
    private ApiEnum checkLogin(String token) {
        MyThreadLocal.set("pin", "666");
        return ApiEnum.SUCCESS;
    }
}
