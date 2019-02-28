package com.example.demo.dao.base;

import java.io.Serializable;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-28 10:45
 **/
public interface BaseCrudMapper<T extends Serializable> {
    /**
     * @Param: [entity]
     * @return: java.lang.Integer 返回值为是sql影响条数，经常返回数值：1 要获取主键请用t.getId()
     * @Author: niuruobing
     * @Date: 2019/2/28
     * @Description: 插入数据
     */
    Integer insert(T entity);

    /**
     * @Param: [entity]
     * @return: java.lang.Integer
     * @Author: niuruobing
     * @Date: 2019/2/28
     * @Description: 根据主键更新
     */
    Integer update(T entity);

    /**
     * @Param: [id]
     * @return: java.lang.Integer
     * @Author: niuruobing
     * @Date: 2019/2/28
     * @Description: 根据ID删除
     */
    Integer deleteById(Long id);


    /**
     * @Param: [id]
     * @return: T
     * @Author: niuruobing
     * @Date: 2019/2/28
     * @Description: 根据主键查询
     */
    T findById(Long id);
}
