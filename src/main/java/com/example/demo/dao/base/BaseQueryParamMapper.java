package com.example.demo.dao.base;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-28 10:47
 **/
public interface BaseQueryParamMapper<T extends Serializable, P extends Serializable> {
    /**
     * @Param: [param]
     * @return: java.util.ArrayList<T>
     * @Author: niuruobing
     * @Date: 2019/2/28
     * @Description: 根据条件查询列表
     */
    ArrayList<T> findList(P param);

    /**
     * @Param: [param]
     * @return: int
     * @Author: niuruobing
     * @Date: 2019/2/28
     * @Description: 根据条件查询总记录数
     */
    int findCount(P param);
}
