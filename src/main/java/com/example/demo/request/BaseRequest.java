package com.example.demo.request;

import java.io.Serializable;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-28 10:53
 **/
public class BaseRequest implements Serializable {

    private static final Integer MAX_PAGE = 1000;
    private static final Integer MAX_PAGE_SIZE = 100;
    /**
     * 偏移量
     */
    private Integer pageNo = 1;

    /**
     * 每页多少条
     */
    private Integer pageSize = 10;


    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    /**
     * 参数值最大过滤
     */
    public Integer getPageNo() {
        if (pageNo == null || pageNo < 1 || pageNo > MAX_PAGE) {
            return 1;
        }
        return pageNo;
    }

    public Integer getPageSize() {
        if (pageSize == null || pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
            return 10;
        }
        return pageSize;
    }
}
