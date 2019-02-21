getRegionMessage();

/**
 * 获取区域信息
 */
function getRegionMessage() {
    $.ajax({
               url: "/common/getRegions",    //请求的url地址
               dataType: "json",   //返回格式为json
               async: true,//请求是否异步，默认为异步，这也是ajax重要特性
               type: "GET",   //请求方式 get 或者post
               beforeSend: function () {
                   //请求前的处理
               },
               success: function (result) {
                   if(result.code ==200){
                       $("#regionId").empty();
                       if(result.size > 1){
                           $("#regionId").append("<option value=\"8\" selected>集团</option>");
                       }else {
                           for (var key in result.data) {
                               var str = "<option value=\"" + key + "\">" + result.data[key] + "</option>";
                               $("#regionId").append(str);
                           }
                       }
                   }else {
                       alert(data.msg);
                       window.location.href="NoVerify";
                   }
               },
               complete: function () {
                   //请求完成的处理
               },
               error: function () {
                   //请求出错处理
               }
           });
}

var goodMessage = null; //用于记录商品信息
/**
 * 根据skuid查询商品信息
 */
function queryGoodMessage() {
    goodMessage = null;

    var skuId = $("#skuId").val();

    if (skuId == null || skuId.trim() == "") {
        alert("请输入SKU");
        return;
    }
    $.ajax({
               url: "/active/add/query/sku",    //请求的url地址
               dataType: "json",   //返回格式为json
               async: false,//请求是否异步，默认为异步，这也是ajax重要特性
               data: {"skuId": skuId},    //参数值
               type: "POST",   //请求方式 get 或者post
               beforeSend: function () {
                   //请求前的处理
                   $("#tbody").empty();
               },
               success: function (result) {
                   //请求成功时处理
                   if (result.msg == false) {
                       alert("对不起，没有您要查询的SKU信息");
                   } else {
                       $.each(result.data, function (index, item) {
                           console.log(result.data);
                           goodMessage = item;
                           console.log(goodMessage);
                           var str = "";
                           str += "<tr>";
                           str += "<td class=\"textL\">";
                           str += getDefault(item.skuId);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getDefault(item.skuName);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getDefault(item.shopName);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getDefault(item.linePrice);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getDefault(item.price);
                           str += "</td>";
                           /*str+="<td class=\"textL\">";
                           str+=item.price;
                           str+="</td>";*/
                           str += "<td class=\"textL\">";
                           str += getDefault(item.storeCount);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getDefault(item.commissionShare);
                           if (item.commissionShare != null) {
                               str += "%";
                           }
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getDefault(item.commission);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getState(item.state);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += item.maxPurchQty;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getIs7Return(item.is7Return);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getOpenInvoice(item.openInvoice);
                           str += "</td>";
                           str += "</tr>";
                           $("#tbody").append(str);

                           $("#queryLimitArea").empty();
                           str ="<a id=\"showLimitAreaModel\"  href=\"javascript:void(0);\" data-skuid='"+item.skuId+"'  class='btn btn-default radius'><i class='ion-checkmark-round'></i>查询限制区域</a>";
                           $("#queryLimitArea").append(str);
                       });

                   }
               },
               complete: function () {
                   //请求完成的处理
               },
               error: function () {
                   //请求出错处理
                   alert("对不起，没有您要查询的SKU信息");
               }
           });
}

/**
 * 查询限制区域
 * @param skuId
 */
function queryLimitArea(skuId) {
    window.location.href = "/active/query/area?skuId=" + skuId;
}

function addActive() {
    console.log(goodMessage);
    if (goodMessage == null) {
        alert("请先查询商品sku");
        return;
    }
    if ($("#name").val().trim() == '') {
        alert("请填写团购活动名称");
        return;
    }
    if ($("#name").val().trim().length > 20) {
        alert("活动简称最大20个字");
        return;
    }
    if ($("#startTime").val().trim() == '' || $("#endTime").val().trim() == '') {
        alert("请填写开始结束时间");
        return;
    }
    if ($("#activeStock").val().trim() == '' || parseInt($("#activeStock").val().trim()) > goodMessage.storeCount) {
        alert("商品库存数不合规范");
        return;
    }
    if ($("#minTmCount").val().trim() == '' || parseInt($("#minTmCount").val().trim()) <= 1) {
        alert("最低成团件数必须大于1");
        return;
    }
    if (parseInt($("#activeStock").val().trim()) < parseInt($("#minTmCount").val().trim())) {
        alert("最小成团件数必须小于等于活动库存");
        return;
    }
    if (goodMessage.status == 1) {
        alert("对不起，非下架商品无法参与团购活动");
        return;
    }
    if ($("#regionId").val() == -1) {
        alert("对不起，请填写活动管理区域");
        return;
    }
    // 基础配额校验
    var baseQuota = $("input[name='baseQuota']:checked").val();
    if(baseQuota == null || baseQuota == ""){
        alert("未设置基础值，请进行设置");
        return;
    }
    var individualQuotaJson = $("#mySelect2").select2("val");
    if (baseQuota == 1) {
        var flagVlue = $("#baseQuotaValue").val();
        if (flagVlue == null || flagVlue == '') {
            alert("未设置基础值，请进行设置");
            return;
        }
        if (isPositiveInteger(flagVlue) && flagVlue >= parseInt($("#minTmCount").val())) {
            baseQuota = flagVlue;
        } else {
            alert("单店配额数值不可小于最低成团件数");
            return;
        }
    } else if (baseQuota == 0) {
        if (individualQuotaJson == null || individualQuotaJson == '') {
            alert("基础值为0，必须设置特殊值");
            return;
        }
    }
    if (JSON.stringify(individualQuotaJson) == 'null'){
        individualQuotaJson = null;
    }else {
        individualQuotaJson = JSON.stringify(individualQuotaJson);
    }
    if ( goodMessage.commission == null){
        alert("商品佣金不能为空");
        return;
    }
    if (parseInt($("#activeType").val()) == -1){
        alert("团购创建失败，未选择配送类型");
        return;
    }
    if ( $("#userType").val() == null){
        alert("请选择用户类型");
        return;
    }
    $.ajax({
               url: "/active/add/active",    //请求的url地址
               dataType: "json",   //返回格式为json
               async: true,//请求是否异步，默认为异步，这也是ajax重要特性
               type: "POST",   //请求方式 get 或者post
               data: {
                   //活动快照信息
                   "name": $("#name").val(),
                   "startTime": $("#startTime").val(),
                   "endTime": $("#endTime").val(),
                   "receiveTime": $("#receiveTime").val(),
                   "activeStock": $("#activeStock").val(),
                   "minTmCount": $("#minTmCount").val(),
                   "regionId": $("#regionId").val(),
                   "activeType": $("#activeType").val(),
                   "userType": $("#userType").val(),
                   "baseQuota": baseQuota,
                   "individualQuotaJson": individualQuotaJson,
                   //商品快照信息
                   "skuId": goodMessage.skuId,
                   "skuName": goodMessage.skuName,
                   "imageUrl": goodMessage.imageUrl,
                   "shopId": goodMessage.shopId,
                   "shopName": goodMessage.shopName,
                   "linePrice": goodMessage.linePrice,
                   "backPrice": goodMessage.backPrice,
                   "price": goodMessage.price,
                   "storeCount": goodMessage.storeCount,
                   "commissionShare": goodMessage.commissionShare,
                   "commission": goodMessage.commission,
                   "is7Return": goodMessage.is7Return,
                   "openInvoice": goodMessage.openInvoice,
                   "state": goodMessage.state,
                   "maxPurchQty" : goodMessage.maxPurchQty,
                   "bigImageList": JSON.stringify(goodMessage.bigImageList)
               },    //参数值
               type: "POST",   //请求方式 get 或者post
               beforeSend: function () {
                   //请求前的处理
               },
               success: function (result) {
                   alert(result.msg);
                   if (result.code == 200) {
                       window.location.href="/active/add/index";
                   }
               },
               complete: function () {
                   //请求完成的处理
               },
               error: function () {
                   //请求出错处理
               }
           });
}

/**
 * 方法
 * 默认方法，为null转换为无
 * @param param
 * @returns {*}
 */
function getDefault(param) {
    if (param == null) {
        return "无";
    } else {
        return param;
    }
}

function getValue(param) {
    if (param == null) {
        return "";
    } else {
        return param;
    }
}

/**
 * 方法
 * 将是否支持开增值发票转换成意义
 * @param param
 * @returns {*}
 */
function getState(param) {
    if (param == 0) {
        return "下架";
    } else {
        return "上架";
    }
}

/**
 * 方法
 * 将是否支持开增值发票转换成意义
 * @param param
 * @returns {*}
 */
function getOpenInvoice(param) {
    if (param == 0) {
        return "不支持";
    } else {
        return "支持";
    }
}

/**
 * 方法
 * 将是否支持7天退货值转换成意义
 * @param param
 * @returns {*}
 */
function getIs7Return(param) {
    if (param == 0) {
        return "不支持";
    } else {
        return "支持";
    }
}

/**
 * 方法
 * 判断该对象是否是正的整数组成
 * @param number
 * @returns {boolean}
 */
function isPositiveInteger(number) {
    var result = false;
    var reg = /^[0-9]*[1-9][0-9]*$/;
    if (reg.test(number)) {
        result = true;
    }
    return result;
}

/**
 * 查询店铺
 */
function queryCommunityShop() {
    var unionId = $("#individualQuotaJsonUnionId").val().trim();

    if (!isPositiveInteger(unionId)) {
        alert("对不起，查询不到结果，请重新输入");
        return;
    }
    $.ajax({
               url: '/community/shop/query',  //请求的url地址
               dataType: "json",   //返回格式为json
               type: 'POST',  //请求方式 get 或者post
               async: true,//请求是否异步，默认为异步，这也是ajax重要特性
               data: {
                   unionId: unionId
               },    //参数值
               beforeSend: function () {
                   //请求前的处理
                   $("#individualQuotaJsonShopMsg").empty();
               },
               success: function (data) {
                   console.log(data.communityShop);
                   if (data.communityShop == null) {
                       alert("对不起，查询不到结果，请重新输入");
                       return;
                   }


                   $("#individualQuotaJsonShopMsg").empty();
                   var str = "";
                   str += "<tr>";
                   str += "<td class=\"textL\"> 联盟ID:";
                   str += data.communityShop.unionId;
                   str += "</td>";
                   str += "<td class=\"textL\"> 姓名:";
                   str += data.communityShop.accountName;
                   str += "</td>";
                   str += "<td class=\"textL\"> 手机号:";
                   str += data.communityShop.mobile;
                   str += "</td>";
                   str += "<td class=\"textL\"> 地址:";
                   str += getValue(data.communityShop.province) + " " + getValue(data.communityShop.city) + " " + getValue(data.communityShop.district) + " "
                          + getValue(data.communityShop.town) + " " + getValue(data.communityShop.detialAddr);
                   str += "</td>";
                   str += "</tr>";
                   $("#individualQuotaJsonShopMsg").append(str);
               },
               complete: function () {
                   //请求完成的处理
               },
               error: function () {
                   //请求出错处理
                   alert("对不起，查询不到结果，请重新输入");
               }
           });
}

/**
 * 添加特殊限额
 */
function addIndividualQuotaJson() {

    $("#minTmCount").attr("readOnly","true");

    // 基础配额校验
    var baseQuota = $("input[name='baseQuota']:checked").val();

    if (baseQuota == 1) {
        var flagVlue = $("#baseQuotaValue").val();
        if (flagVlue == "" || flagVlue == null){
            alert("请先输出基础值");
            return;
        }
    }

    if ($("#minTmCount").val().trim() == '' || parseInt($("#minTmCount").val().trim()) <= 1) {
        alert("最低成团件数必须大于1");
        return;
    }
    //特殊配额校验
    var individualQuotaJsonFlag = $("#mySelect2").select2("val");
    if(individualQuotaJsonFlag!=null){
        if(individualQuotaJsonFlag.length>=100){
            alert("特殊值最多100个");
            return;
        }
    }

    var individualQuotaJson = $("input[name='individualQuotaJson']:checked").val();
    if (individualQuotaJson == null || individualQuotaJson == ""){
        alert("请先输入特殊值");
        return;
    }
    if (individualQuotaJson != null && individualQuotaJson != "") {
        if (individualQuotaJson == 1) {
            var flagVlue = $("#individualQuotaJsonValue").val();
            if (flagVlue == null || flagVlue == ""){
                alert("未设置特殊值，请进行设置");
                return;
            }
            if (isPositiveInteger(flagVlue) &&  flagVlue >= parseInt($("#minTmCount").val())) {
                individualQuotaJson = flagVlue;
            } else {
                alert("单店配额数值不可小于最低成团件数");
                return;
            }
        }
    }
    var unionId = $("#individualQuotaJsonUnionId").val().trim();
    if (unionId == null || unionId == '') {
        alert("请输入联盟ID");
        return;
    }

    if (!checkIndividualQuotaJson(unionId)) {
        alert("您已添加过该联盟ID，如需修改请先删除");
        return;
    }

    var isShop = false;
    //判断是否在店长池
    $.ajax({
               url: '/community/shop/query',  //请求的url地址
               dataType: "json",   //返回格式为json
               async: false,//请求是否异步，默认为异步，这也是ajax重要特性
               type: 'get',  //请求方式 get 或者post
               data: {
                   unionId: unionId
               },    //参数值
               beforeSend: function () {
                   //请求前的处理
                   $("#individualQuotaJsonShopMsg").empty();
               },
               success: function (data) {
                   console.log(data.communityShop);
                   if (data.communityShop == null) {
                       alert("输入的联盟ID非友家店长，请重新输入");
                   }else {
                       isShop = true;
                   }
               },
               complete: function () {
                   //请求完成的处理
               },
               error: function () {
                   //请求出错处理
                   alert("输入的联盟ID非友家店长，请重新输入");
               }
           });
    //当店铺存在时
    if (isShop == true) {
        var text = "";
        if (individualQuotaJson == -1) {
            text = unionId + ":不限";
        } else {
            text = unionId + ":" + individualQuotaJson;
        }

        //拼接value
        individualQuotaJson = unionId + ":" + individualQuotaJson;

        //添加到select 2 中
        var newOption = new Option(text, individualQuotaJson, true, true);
        $('#mySelect2').append(newOption).trigger('change');

    }
}

/**
 * select 2 初始化
 */
$(document).ready(function () {
    $('#mySelect2').select2(
        {
            tags: "true",
            placeholder: "空",
            width: 'resolve',
            allowClear: true,
            dropdownParent: $('#myModal')
        }
    );
    // 注册移除前置事件
    $("#mySelect2").on("select2:unselecting", function (e) {
        console.log("removing val=" + e.params.data);
        var flag = confirm("是否删除");
        if (flag == false) {
            e.preventDefault();
        }
    });
});
/**
 * 普通配额修改，触发事件
 */
$('input[type=radio][name=baseQuota]').change(function () {
    $("input[name=individualQuotaJson]").each(function () {
        //清空 特殊限额
        $(this).attr("checked", false);
        $('#mySelect2').val(null).trigger('change');
        $('#individualQuotaJsonValue').val("");

        //清空 基础限额
        if ($(this).val() == 1) {
            $("#baseQuotaValue").attr("disabled", false)
        } else {
            $("#baseQuotaValue").val("").attr("disabled", true)
        }
        $('#baseQuotaValue').val("");
    });

    $("#individualQuotaJsonShopMsg").empty();
    $("#individualQuotaJsonUnionId").val("");
    var baseQuota = $("input[name='baseQuota']:checked").val();
    if (baseQuota == -1) {
        $("#individualQuotaJson1Lable").hide();
        $("#individualQuotaJson2Lable").show();
        $("#individualQuotaJson3Lable").show();
        $("#baseQuotaValue").attr("disabled","disabled");
    }else if (baseQuota == 0){
        $("#individualQuotaJson1Lable").show();
        $("#individualQuotaJson2Lable").hide();
        $("#individualQuotaJson3Lable").show();
        $("#baseQuotaValue").attr("disabled","disabled");
    }else if (baseQuota == 1) {
        $("#individualQuotaJson1Lable").show();
        $("#individualQuotaJson2Lable").show();
        $("#individualQuotaJson3Lable").show();
        $("#baseQuotaValue").removeAttr("disabled");
    }
});

/**
 * 特殊配额修改，触发事件
 */
$('input[type=radio][name=individualQuotaJson]').change(function () {
    $('#individualQuotaJsonValue').val("");

    //特殊配额校验
    var individualQuotaJson = $("input[name='individualQuotaJson']:checked").val();
    if (individualQuotaJson == -1) {
        $("#individualQuotaJsonValue").attr("disabled","disabled");
    }else if (individualQuotaJson == 0){
        $("#individualQuotaJsonValue").attr("disabled","disabled");
    }else if (individualQuotaJson == 1) {
        $("#individualQuotaJsonValue").removeAttr("disabled");
    }
});

/**
 * check 是否已经添加改店长
 * @param unionId
 * @returns {boolean}
 */
function checkIndividualQuotaJson(unionId) {
    var individualQuotaJson = $("#mySelect2").select2("val");
    if(individualQuotaJson!=null){
        for(j = 0; individualQuotaJson[j]!=null; j++) {
            var flagiIndividualQuotaJson = individualQuotaJson[j].split(":");
            if (flagiIndividualQuotaJson[0] == unionId){
                return false;
            }
        }
    }
    return true;
}