package com.example.demo.common;

/**
 * @program: union-jingtiao
 * @author: niuruobing
 * @create: 2019-02-22 10:36
 **/
public enum ApiEnum {
    //成功
    SUCCESS(200, "success"),
    ERROR(500, "服务端异常"),
    FUN_ERROR(510, "方法不存在"),
    PARAM_INVALID(400, "参数错误"),
    PARAM_TO_LONG(499, "批量接口参数过多"),
    NO_CHANGE(498, "无效请求"),
    TOKEN_INVALID(401, "token不合法"),
    PERMISSION_DENIED(403, "无访问权限"),
    USER_NOT_EXISTED(410, "联盟用户不存在，请检查unionId是否正确"),
    MOBILE_INVALID(411, "手机号不正确"),
    MOBILE_EXISTED(412, "手机号码已存在"),
    IS_COMPANY(413, "企业用户暂不允许注册"),
    LONG_OUT(420, "未登录"),
    NOT_UNION(430, "非联盟用户"),
    IS_UNION(431, "联盟用户"),
    NOT_JINGTIAO(440, "非京挑用户"),
    IS_JINGTIAO(441, "京挑用户"),
    JINGTIAO_USER_NOT_EXISTED(442, "京挑用户不存在，请检查参数是否正确"),
    NO_ROLE_JINGTIAO(433, "非京挑店长"),
    CODE_NOT_EXISTED(434, "邀请码不正确"),
    NOT_JINGTIAO_SHOP(435, "非京挑用户"),
    IS_JINGTIAO_USER(456, "已注册京挑"),
    MAIN_STATION_MOBILE_NOT_EXIST(457, "主站手机号不存在"),
    PIN_NOT_EXIST(458, "京东PIN不存在"),
    MUST_CATEGORY(470,"类目id不能为空"),
    NULL_GOODS(471,"该商品不存在"),
    REPET_GOODS(472,"添加商品已存在"),
    NULL_BABNER(473,"banner不存在"),
    UNKNOWN(-1, "未知错误"),

    C_IS_YOUJIA_USER(601,"已注册友家"),
    C_REGISTER_FAILD(602,"注册友家失败"),
    C_NOT_SHOP(603, "店铺不存在"),
    C_UPDATE_FALID(604, "更新失败"),
    C_NO_SUBCRIBE_SHOP(605, "没有关注店铺"),
    C_NO_YOUJIA_USER(606, "非友家用户"),
    C_POSITION_ERROR(607,"经纬度不合规"),
    C_SEND_LIMIT(608,"模板消息已达发送上限"),
    C_SHOP_GOODS_LIMIT(609,"选品达上限"),
    C_SHOP_NOT_ACCESS(610,"该店铺非审核通过状态"),
    C_WX_INFO_ERROR(611,"微信信息json解析错误"),
    C_SHOP_GOODS_EXISTS(612,"选品重复"),
    C_DELETE_FAILD(613,"删除失败"),
    C_SHOP_AREA_ISNULL(614,"店长省、市、区有为空"),
    C_SHOP_UNPL_ISNULL(615,"UNPL为空"),
    C_SHOP_QRCODE_EXPIRED(616,"二维码已过期"),
    C_SHOP_QRCODE_IVALID(617,"二维码无效"),
    C_COMSHOP_LAG_IS_NULL(618,"店长经纬度为空"),
    C_COMSHOP_LAG_IVALID(619,"地址距离不在店长覆盖范围内");;


    private int code;
    private String value;

    ApiEnum(int code, String value) {
        this.code = code;
        this.value = value;
    }

    public int getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
