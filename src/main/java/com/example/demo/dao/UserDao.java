package com.example.demo.dao;

import com.example.demo.dao.base.BaseCrudMapper;
import com.example.demo.dao.base.BaseQueryParamMapper;
import com.example.demo.dao.queryparam.UserQueryParam;
import com.example.demo.domain.User;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserDao extends BaseCrudMapper<User>, BaseQueryParamMapper<User, UserQueryParam> {

}
