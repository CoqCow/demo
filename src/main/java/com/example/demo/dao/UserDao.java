package com.example.demo.dao;

import com.example.demo.domain.User;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserDao {
    @Select("select id,name,age from user where id=#{id}")
    public User findById(@Param("id") Long id);
}
