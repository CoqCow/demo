package com.example.demo.dao.base;

import com.example.demo.request.BaseRequest;

import java.io.Serializable;

import lombok.Data;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-28 10:51
 **/
@Data
public abstract class BaseQueryParam implements Serializable {
    /**
     * 偏移量
     */
    private Integer offset;

    /**
     * 每页记录数
     */
    private Integer pageSize;

    public BaseQueryParam() {
    }

    public BaseQueryParam(BaseRequest baseRequest) {
        this.pageSize = baseRequest.getPageSize();
        this.offset = (baseRequest.getPageNo() - 1) * this.pageSize;
    }
}
