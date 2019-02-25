package com.example.demo.common;

import lombok.Data;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-25 11:34
 **/
@Data
public class Request {
    private String appid;
    private Integer port;
    private String client;
    private String location;
    private String upg;
    private String urg;
    private String agent;
    private String ip;
    private String pin;
    private String umg;
    private String functionId;
    private String clientVersion;
    private String referer;
    private String uuid;
    private String networkType;
    private String body;
    private String param;//业务参数
}
