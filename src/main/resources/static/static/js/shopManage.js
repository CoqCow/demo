var totalPage = 1;
var currentPage = 1;
var pageSize = 10;
buildForm(1);
buildRegion();
/**
 * 查询
 */
$(".queryFocus").bind("click", function () {
    buildForm(1);
    return false;
});
/**
 * 上一页
 */
$("#pageUp").bind("click", function () {
    var page = currentPage - 1;
    if (page < 1) {
        return false;
    }
    buildForm(page);
    return false;
});
/**
 * 下一页
 */
$("#pageDown").bind("click", function () {
    var page = currentPage + 1;
    if (page > totalPage) {
        return false;
    }
    buildForm(page);
    return false;
});

/**
 * 跳转到指定页
 * @returns {boolean}
 */
function sureClick() {
    var pageNum = $("#goToPage").val();
    pageClick(parseInt(pageNum));
    return false;
}

/**
 * 跳指定页逻辑
 * @param pageIndex
 * @returns {boolean}
 */
function pageClick(pageIndex) {
    if (!isLegalSearch(pageIndex)) {
        $("#goToPage").val("");
        return false;
    }
    $("#pageIndex").val(pageIndex);
    buildForm(pageIndex);
    return false;
}

$("#region").bind("change", function () {
    buildCity();
    return false;
});

/**
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
    if (pageIndex > getTotalPage()) {
        alert('超过总页数，请输入正确的页数！');
        return isLegal;
    }
    isLegal = true;
    return isLegal;
}

/**
 * 时间转换
 * @param date
 * @returns {string}
 */
function toLocalDate(date) {
    if (date == null || date == undefined) {
        return "";
    }
    var timestamp4 = new Date(date);
    return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
}

/**
 * 团长状态转换
 * @param openTeamStatus
 * @returns {string}
 */
function getOpenTeamStatus(openTeamStatus) {
    //1 删除 2 待审核
    if (openTeamStatus == 1) {
        return "未开通";
    }
    if (openTeamStatus == 2) {
        return "已开通";
    }
    if (openTeamStatus == 3) {
        return "待完善";
    }
    return "未知:" + openTeamStatus;
}

/**
 * 审核状态转换
 * @param status
 * @returns {string}
 */
function getStatus(status) {
    //1 删除 2 待审核 3 审核通过 4 审核拒绝
    if (status == 1) {
        return "退回重填";
    }
    if (status == 2) {
        return "待审核";
    }
    if (status == 3) {
        return "审核通过";
    }
    if (status == 4) {
        return "关闭店铺";
    }
    if (status == 5) {
        return "暂不推广";
    }
    return "未知:" + status;
}

/**
 * 微信名转换
 * @param json
 * @returns {*}
 */
function getWxName(json) {
    try {
        json = $.parseJSON(json);
    } catch (er) {
        return "";
    }
    if (json == undefined || json == "" || json == null) {
        return "";
    }
    if (json.nickName == undefined || json.nickName == "" || json.nickName == null) {
        return "";
    }
    return json.nickName;
}

/**
 * 默认属性转换
 * @param erp
 * @returns {*}
 */
function getAttr(erp) {
    if (erp == undefined || erp == null || erp == "") {
        return "";
    }
    return erp;
}

/**
 * 后台获取信息
 * @param pageIndex
 * @returns {boolean}
 */
function buildForm(pageIndex) {
    $("#goToPage").val("");
    var status = $("#status").val();
    var pin = $("#qpin").val();
    var handler = $("#handler").val();
    var source = $("#source").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    /*                        var region = $("#region").find("option:selected").text();*/
    var regionId = $('#region').val();
    if (regionId == -1) {
        regionId = null;
    }
    var city = $("#city").find("option:selected").text();

    var openTeamStatus = $("#openTeamStatusSelect").val();
    if (openTeamStatus == -1) {
        openTeamStatus = null;
    }

    var data = {
        pageNo: pageIndex,
        pageSize: pageSize,
        pin: pin,
        status: status,
        erp: handler,
        source: source,
        startTime: startDate,
        endTime: endDate,
        regionId: regionId,
        openTeamStatus: openTeamStatus
    };

    var cityVal = $("#city").val();
    if (cityVal != "") data.city = city;
    $.ajax({
               url: '/community/shop/list',
               type: 'get',
               dataType: 'json',
               data: data,
               success: function (data) {
                   $("#tbody").empty();
                   data.result.forEach(function (item, index) {
                       var str = "";
                       str += "<tr>";
                       str += "<td class=\"textL\">";
                       str += item.id;
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += getOpenTeamStatus(item.openTeamStatus);
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += getStatus(item.status);
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += "PIN: " + item.pin + "<br>" + "unionId: " + item.unionId + "<br>" + "店铺名称: " + getAttr(item.shopName) + "<br>" + "手机号: " + item.mobile + "<br>" + "姓名: " + item.accountName + "<br>" + "微信名: " + getWxName(item.wxUserInfo);
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += "区域: " + getAttr(item.region) + "<br>" + "省市: " + getAttr(item.province) + "<br>" + "市: " + getAttr(item.city) + "<br>" + "区: " + getAttr(item.district) + "<br>" + "镇: " + getAttr(item.town) + "<br>" + "详细地址: " + getAttr(item.detialAddr);
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += "操作人: " + getAttr(item.erp) + "<br>" + "操作时间: " + toLocalDate(item.updateTime)
                              + "<br>"+"<input class='btn btn-default delete btn-sm ' type='button' onclick=queryOperationRecord(" + item.id + ") value='查看操作记录' >";
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += toLocalDate(item.createTime);
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += toLocalDate(item.firstCheckTime);
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       str += "<span id=\"examinePic" + item.id + "\" style=\"border-bottom:1px solid #000000;cursor:pointer;\" onclick='getPic(" + item.id + ", 1)'>查看资质图片</span> &nbsp;&nbsp;<br><br>"
                       str += "<span id=\"examinePicZM" + item.id + "\" style=\"border-bottom:1px solid #000000;cursor:pointer;\" onclick='getPic(" + item.id + ", 2)'>查看身份证正面</span> &nbsp;&nbsp;<br><br>"
                       str += "<span id=\"examinePicFM" + item.id + "\" style=\"border-bottom:1px solid #000000;cursor:pointer;\" onclick='getPic(" + item.id + ", 3)'>查看身份证反面</span> &nbsp;&nbsp;<br><br>"
                       str += "<span id=\"examinePicOM" + item.id + "\" style=\"border-bottom:1px solid #000000;cursor:pointer;\" onclick='getPic(" + item.id + ", 4)'>查看历史身份证</span> &nbsp;&nbsp;"
                       str += "</td>";
                       str += "<td class=\"textL\">";
                       if(item.status == 1){
                           //无操作
                       }else if(item.status == 2){
                           str += "<button type=\"button\" class=\"btn btn-primary \" onclick='statusChange(" + item.id + ",3)'>审核通过</button> &nbsp;&nbsp;";
                           str += "<button type=\"button\" class=\"btn btn-primary \" onclick='shwoReBackEditModal(" + item.id + ")'>退回重填</button> &nbsp;&nbsp;";
                           str += "<button type=\"button\" class=\"btn btn-primary \" onclick='statusChange(" + item.id + ",5)'>暂不推广</button> &nbsp;&nbsp;";
                       }else if (item.status == 3){
                           if (item.openTeamStatus == 1){
                               str += "<button type=\"button\" class=\"btn btn-primary \" onclick='statusChange(" + item.id + ",4)'>关闭店铺</button> &nbsp;&nbsp;";
                               str += "<button type=\"button\" class=\"btn btn-primary \" onclick='openTeamStatusChange(" + item.id + ",3)'>开通团长</button> ";
                           }else if (item.openTeamStatus == 2 || item.openTeamStatus == 3) {
                               str += "<button type=\"button\" class=\"btn btn-primary \" onclick='statusChange(" + item.id + ",4)'>关闭店铺</button> &nbsp;&nbsp;";
                               str += "<button type=\"button\" class=\"btn btn-primary \" onclick='openTeamStatusChange(" + item.id + ",1)'>关闭团长</button>";
                           }

                       }else if (item.status == 4){
                           str += "<button type=\"button\" class=\"btn btn-primary \" onclick='statusChange(" + item.id + ",6)'>激活店铺</button> &nbsp;&nbsp;";
                           str += "<button type=\"button\" class=\"btn btn-primary \" onclick='shwoReBackEditModal(" + item.id + ")'>退回重填</button> &nbsp;&nbsp;";
                       }else if (item.status == 5){
                           str += "<button type=\"button\" class=\"btn btn-primary \" onclick='statusChange(" + item.id + ",3)'>审核通过</button> &nbsp;&nbsp;";
                           str += "<button type=\"button\" class=\"btn btn-primary \" onclick='shwoReBackEditModal(" + item.id + ")'>退回重填</button> &nbsp;&nbsp;";
                       }
                       str += "</td>";
                       str += "</tr>";
                       $("#tbody").append(str);
                   });


                   totalPage = Math.ceil(data.total / pageSize);
                   $("#totalpage").text("共" + totalPage + "页");
                   $("#pageNo").text(pageIndex);
                   currentPage = pageIndex;
               },
               error: function () {
                   $("#tbody").empty();
               }
           });
    return false;
}

/**
 * 查看店长操作记录
 * @param id
 */
function queryOperationRecord(id) {
    window.location.href = "/community/shop/query/record?bizType=1&commandValue=" + id;
}

/**
 * 【分页显示】：
 * 获取总页数
 */
function getTotalPage() {
    return totalPage;
}

//判断该对象是否是正的整数组成
function isPositiveInteger(number) {
    var result = false;
    var reg = /^[0-9]*[1-9][0-9]*$/;
    if (reg.test(number)) {
        result = true;
    }
    return result;
}

/**
 * 获取区域信息
 */
function buildRegion() {
    //清空下拉数据
    $("#region").html("");
    $.ajax({
               url: '/common/getRegions',
               type: 'get',
               dataType: 'json',
               success: function (data) {
                   if (data.code == 200) {
                       /*
                       //从服务器获取数据进行绑定
                       $.each(data.data, function (i, item) {
                           str += "<option value=" + i + ">" + item + "</option>";
                       })
                       //将数据添加到行销区域这个下拉框里面
                       $("#region").append(str);
                       */
                       $("#region").empty();
                       if (data.size > 1) {
                           $("#region").append("<option value=\"-1\" selected>全部</option>");
                       }
                       for (var key in data.data) {
                           var regionName = data.data[key];
                           if (regionName != "集团") {
                               var str = "<option value=\"" + key + "\">" + regionName + "</option>";
                               $("#region").append(str);
                           }
                       }

                   } else {
                       alert(data.msg);
                       window.location.href = "/no/verify";
                   }
                   buildCity();
               }
           });
}

/**
 * 获取城市信息
 */
function buildCity() {
    var region = $("#region").find("option:selected").text();
    var regionVal = $("#region").val();
    if (regionVal == "") {
        $("#city").html("<option value=''>===请选择===</option>");
        return;
    }
    //清空下拉数据
    $("#city").html("");

    var str = "<option  value=\"\">===请选择===</option>";
    $.ajax({
               url: '/community/shop/getCitys',
               type: 'get',
               dataType: 'json',
               data: {
                   region: region
               },
               success: function (data) {
                   if (data.code == 200) {
                       if (!data.data){
                           return;
                       }
                       //从服务器获取数据进行绑定
                       $.each(data.data, function (i, item) {
                           str += "<option value=" + i + ">" + item + "</option>";
                       });
                       //将数据添加到行销区域这个下拉框里面
                       $("#city").append(str);
                   }
               }
           });
}



/**
 * 显示退回重填原因modal
 */
function shwoReBackEditModal(id) {
    $("input[name='resetReason']:checked").each(function() {
        $(this).attr('checked',false);
    });
    $('#resetModalId').val(id);
    $('#resetModal').modal('show');
}

/**
 * 退回重填原因modal确认
 */
function resetModalConfirm() {
    var id = $("#resetModalId").val();
    $('#resetModal').modal('hide');
    statusChange(id,1);
}
/**
 * 修改审核状态
 * @param id
 * @param change
 */
function statusChange(id, states) {
    var commandType;
    var resetReasonChecked = [];
    var cause = [];
    if (states == 1){//退回重填
        flag = 0;
        $("input[name='resetReason']:checked").each(function() {
            resetReasonChecked.push($(this).val());
            cause.push($(this).val());
        });
        if (resetReasonChecked.length == 0){
           alert("请至少选择一个原因");
           return;
        }
        commandType = 5;
    }else if (states == 5){//暂不推广
        var flag = confirm("暂不推广后，店铺人气榜和附近店铺将清除此店铺信\n"
                           + "息，后台操作退回重填方可重新注册，或直接审核通\n"
                           + "过，用户将无需再次注册填写信息，立即成为店主。");
        if (flag === false) {
            return;
        }
        commandType = 6;
    }else if (states == 4){//关闭店长
        var flag = confirm("关闭店铺会同时关闭店长权限，店铺人气榜和附近\n"
                           + "店铺将清除此店铺信息，确认关闭店铺吗？");
        if (flag === false) {
            return;
        }
        commandType = 7;
    }else if (states == 3){//审核通过
        var flag = confirm("确认审核通过吗？");
        if (flag === false) {
            return;
        }
        commandType = 4;
    }else if (states == 6){//激活店铺
        var flag = confirm("确认激活店铺吗？");
        if (flag === false) {
            return;
        }
        commandType = 8;
    }
    $.ajax({
               url: '/community/shop/updateStatus',
               type: 'get',
               dataType: 'json',
               data: {
                   id: id,
                   status: states,
                   resetReasonChecked:resetReasonChecked,
                   commandType:commandType,
                   cause:cause
               },
               success: function (data) {

                   var msgDiv = "<div>"+data.msg+"</div>";
                   $("#tooltipModalText").append(msgDiv);
                   $('#tooltipModal').modal("show");

                   setTimeout(function () {
                       $('#tooltipModal').modal('hide');
                       $("#tooltipModalText").empty();

                       if (data.code == 200) {
                           pageClick(currentPage);
                       }

                   }, 2000);
               }, error: function (jqXHR, textStatus, errorThrown ) {
                   console.log(jqXHR,textStatus,errorThrown);
                   alert(errorThrown );
               }
           });
}

//修改店长团长权限逻辑
function openTeamStatusChange(id, openTeamStatus) {
    var commandType;
    if (openTeamStatus == 1){
        var flag = confirm("确认关闭团长吗？");
        if (flag === false) {
            return;
        }
        commandType = 10;
    } else if(openTeamStatus == 3){
        var flag = confirm("确认开通团长吗？");
        if (flag === false) {
            return;
        }
        commandType = 9;
    }else {
        return;
    }

    $.ajax({
               url: '/community/shop/updateOpenTeamStatus',
               type: 'get',
               dataType: 'json',
               data: {
                   id: id,
                   openTeamStatus: openTeamStatus,
                   commandType:commandType
               },
               success: function (data) {
                   var msgDiv = "<div>"+data.msg+"</div>";
                   $("#tooltipModalText").append(msgDiv);
                   $('#tooltipModal').modal("show");

                   setTimeout(function () {
                       $('#tooltipModal').modal('hide');
                       $("#tooltipModalText").empty();

                       if (data.code == 200) {
                           pageClick(currentPage);
                       }

                   }, 2000);

               }, error: function (jqXHR, textStatus, errorThrown ) {
                    console.log(jqXHR,textStatus,errorThrown);
                    alert(errorThrown );
                }
           });
}


/**
 * 获取资质图片信息
 * @param id
 * @param bj
 */
function getPic(id, bj) {
    $.ajax({

               url: '/community/shop/getPic',
               type: 'get',
               dataType: 'json',
               data: {
                   id: id
               },
               success: function (data) {
                   if (data.code == 200) {
                       if (bj == 1) {
                           if (data.url) {
                               window.open(data.url, '_blank');
                           } else {
                               $("#examinePic" + id).text("相关信息未上传信息").attr('style', 'color:#f00');
                           }
                       }
                       if (bj == 2) {
                           if (data.IDFirst) {
                               window.open(data.IDFirst, '_blank');
                           } else {
                               $("#examinePicZM" + id).text("相关信息未上传信息").attr('style', 'color:#f00');
                           }
                       }
                       if (bj == 3) {
                           if (data.IDSecond) {
                               window.open(data.IDSecond, '_blank');
                           } else {
                               $("#examinePicFM" + id).text("相关信息未上传信息").attr('style', 'color:#f00');
                           }
                       }
                       if (bj == 4) {
                           if (data.IDOld) {
                               window.open(data.IDOld, '_blank');
                           } else {
                               $("#examinePicOM" + id).text("相关信息未上传信息").attr('style', 'color:#f00');
                           }
                       }
                   } else {
                       alert("获取资质信息失败");
                   }
               }
           });
}
