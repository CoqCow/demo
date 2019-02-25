package com.example.demo.util;


import java.nio.ByteBuffer;
import java.util.UUID;

/**
 * uuid工具
 *
 * @author wangsiyuan
 */
public class UUIDUtil {

    public static String generateUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("-", "");
    }
}
