package com.example.demo.common;

import java.io.Serializable;
import java.util.Map;

import lombok.Data;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-25 11:34
 **/
@Data
public class Request implements Serializable {
    //通用参数
    private String appid;
    private Integer port;
    private String client;
    private String location;
    private String agent;
    private String ip;
    private String pin;
    private String clientVersion;
    private String referer;
    private String uuid;
    private String networkType;
    private String token;
    //业务参数
    private Map<String, Object> param;
}
