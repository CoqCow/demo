//定义全局变量，用于分页逻辑
var totalPage = 1;
var currentPage = 1;
var pageSize = 10;
getRegionMessage();//获取区域请求
queryTeamActive(currentPage, pageSize, 1);//根据条件获取活动信息请求

function update(id, status) {
    var flag = confirm("确认吗？");
    if (flag === false) {
        return;
    }
    $.ajax({
               url: "/active/update",
               dataType: "json",
               async: true,
               type: "POST",
               data: {
                   id: id,
                   status: status
               },
               beforeSend: function () {

               },
               success: function (result) {
                   if (result.code == 200) {
                       alert(result.msg);
                       currentPage = 1;
                       queryTeamActive(currentPage, pageSize, 1);//根据条件获取活动信息请求
                   } else {
                       alert(result.msg);
                   }
               },
               complete: function () {
                   //请求完成的处理
               },
               error: function () {
                   //请求出错处理
               }
           })
}

function getCShopAttendMsg(id) {
    window.location.href = "/active/index/attend?activeId=" + id;
}

function getCShopAttendDetial(id) {
    window.location.href = "/active/query/detail?id=" + id;
}

/**
 * 请求
 * 获取区域信息
 */
function getRegionMessage() {
    $.ajax({
               url: "/common/getRegions",    //请求的url地址
               dataType: "json",   //返回格式为json
               async: false,//请求是否异步，默认为异步，这也是ajax重要特性
               type: "GET",   //请求方式 get 或者post
               beforeSend: function () {
                   //请求前的处理
               },
               success: function (result) {
                   $("#regionId").empty();
                   if(result.code==200){
                       if(result.size > 1){
                           $("#regionId").append("<option value=\"-1\" selected>全部</option>");
                       }
                       for (var key in result.data) {
                           var str = "<option value=\"" + key + "\">" + result.data[key] + "</option>";
                           $("#regionId").append(str);
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

/**
 * 请求
 * 根据条件获取活动信息请求
 */
function queryTeamActive(pageNo, pageSize, flag) {
    $("#gotopage").val("");

    var regionId = $("#regionId").val();
    if (regionId == "-1") {
        regionId = null;
    }
    var status = $("#status").val();
    if (status == -1) {
        status = null;
    }
    $.ajax({
               url: "/active/query",    //请求的url地址
               dataType: "json",   //返回格式为json
               async: true,//请求是否异步，默认为异步，这也是ajax重要特性
               type: "POST",   //请求方式 get 或者post
               data: {
                   //活动快照信息
                   "id": $("#id").val(),
                   "name": $("#name").val(),
                   "skuId": $("#skuId").val(),
                   "shopName": $("#shopName").val(),
                   "createrErp": $("#createrErp").val(),
                   "startTimeStart": $("#startTimeStart").val(),
                   "startTimeEnd": $("#startTimeEnd").val(),
                   "endTimeStart": $("#endTimeStart").val(),
                   "endTimeEnd": $("#endTimeEnd").val(),
                   "status": status,
                   "regionId": regionId,
                   "snapshotType": 0,
                   //分页信息
                   "pageNo": pageNo,
                   "pageSize": pageSize,
                   //查询标识
                   "flag": flag
               },
               type: "POST",   //请求方式 get 或者post
               beforeSend: function () {
                   //请求前的处理
                   $("#tbody").empty();
               },
               success: function (result) {
                   console.log(result.data);
                   if (result.count != null) {
                       totalPage = Math.ceil(result.count / pageSize);
                       currentPage = 1;
                       $("#totalpage").text("共" + totalPage + "页");
                   }

                   if (result.code == 200) {
                       if (Object.keys(result.data).length == 0){
                           alert("对不起，没有查询到您想要的数据");
                       }
                       for (var index in result.data) {
                           var str = "";
                           str += "<tr>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].regionName;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].id;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].name;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].skuId;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].shopName;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].startTime;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].endTime;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].saleStock;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].remainStock;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].storeCount;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].minTmCount;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].createrErp;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].createTime;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += getStatus(result.data[index].status);
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].operator;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           str += result.data[index].modifTime;
                           str += "</td>";
                           str += "<td class=\"textL\">";
                           if (result.data[index].status == 0) {
                               str +=
                                   "<input class=\"btn btn-default update btn-sm \" type=\"button\" onclick='update(" + result.data[index].id + ",4"
                                   + ")' value=\"删除\" >";
                           } else if (result.data[index].status == 1) {
                               str +=
                                   "<input class=\"btn btn-default delete btn-sm \" type=\"button\" onclick='update(" + result.data[index].id + ",2"
                                   + ")' value=\"终止\" >";
                           }
                           if (result.data[index].status == 1 || result.data[index].status == 2 || result.data[index].status == 3) {
                               str +=
                                   "<input class=\"btn btn-default delete btn-sm \" type=\"button\" onclick=\"getCShopAttendMsg(" + result.data[index].id
                                   + ")\" value=\"参与情况\" >";
                           }
                           str +=
                               "<input class=\"btn btn-default delete btn-sm \" type=\"button\" onclick=\"getCShopAttendDetial(" + result.data[index].id
                               + ")\" value=\"查看详情\" >";
                           str += "</td>";
                           str += "</tr>";
                           $("#tbody").append(str);
                       }
                       $("#pageNo").text(currentPage);
                   }
               },
               complete: function () {
                   //请求完成的处理
               },
               error: function () {
                   //请求出错处理
                   alert("对不起，没有查询到您想要的数据");
               }
           });
}

/**
 * 方法
 * 上一页
 */
$("#pageUp").bind("click", function () {
    currentPage = currentPage - 1;
    if (currentPage < 1) {
        currentPage = 1;
        return false;
    }
    queryTeamActive(currentPage, pageSize, 2);
    return false;
});
/**
 * 方法
 * 下一页
 */
$("#pageDown").bind("click", function () {
    currentPage = currentPage + 1;
    if (currentPage > totalPage) {
        currentPage = totalPage;
        return false;
    }
    queryTeamActive(currentPage, pageSize, 2);
    return false;
});

/**
 * 方法
 * 跳转到指定页
 * @returns {boolean}
 */
function sureClick() {
    pageClick($("#gotopage").val());
    return false;
}

/**
 * 方法
 * 跳指定页逻辑
 * @param pageIndex
 * @returns {boolean}
 */
function pageClick(pageIndex) {
    if (!isLegalSearch(pageIndex)) {
        $("#gotopage").val("");
        return;
    }
    $("#pageNo").val(pageIndex);
    currentPage = parseInt(pageIndex);
    queryTeamActive(currentPage, pageSize, 2);
    return false;
}

/**
 * 方法
 * 判断pageIndex是否合法
 * 1: 是否是数字 2:是否小于1 3:是否大于总页数
 */
function isLegalSearch(pageIndex) {
    var isLegal = false;
    if (!isPositiveInteger(pageIndex)) {
        alert('请输入一个合法的页数！');
        return isLegal;
    }
    if (pageIndex < 1) {
        alert('已经是第一页，请输入正确的页数！');
        return isLegal;
    }
    if (pageIndex > totalPage) {
        alert('超过总页数，请输入正确的页数！');
        return isLegal;
    }
    isLegal = true;
    return isLegal;
}

/**
 * 方法
 * 判断pageIndex是否合法
 * 判断该对象是否是正的整数组成
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
 * 方法
 * 将状态值转换成意义
 * @param param
 * @returns {*}
 */
function getStatus(param) {
    if (param == 0) {
        return "未开始";
    } else if (param == 1) {
        return "进行中";
    } else if (param == 2) {
        return "已终止";
    } else if (param == 3) {
        return "已结束";
    } else if (param == 4) {
        return "已删除";
    } else {
        return param;
    }
}
