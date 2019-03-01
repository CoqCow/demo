package com.example.demo.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-21 19:14
 **/
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CheckLogin {
    /**
     * 登陆校验注解 ture 强校验  false 弱校验 不加注解不校验
     */
    boolean login() default true;
}
