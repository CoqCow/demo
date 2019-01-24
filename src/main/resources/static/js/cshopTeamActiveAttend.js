var activeId = $("#activeIdMsg").text();
console.log(activeId);

/**
 * 团购相关js处理
 * @author fuxiaoxiang2
 * @create 2018/11/02
 */
function CShopAttendForm() {
    this.activeId = activeId;
    this.pageNo = 1;//分页偏移量
    this.pageSize = 10;//分页大小
}

var cshopAttendForm = new CShopAttendForm();
var totalPage = 1;
var currentPage = 1;
/**
 * 方法
 * 上一页
 */
$("#pageUp").bind("click", function () {
    var page = currentPage - 1;
    if (page < 1) {
        return false;
    }
    cshopAttendForm.pageNo = page;
    buildCShopAttendForm(cshopAttendForm);
    return false;
});
/**
 * 方法
 * 下一页
 */
$("#pageDown").bind("click", function () {
    var page = currentPage + 1;
    if (page > totalPage) {
        return false;
    }
    cshopAttendForm.pageNo = page;
    buildCShopAttendForm(cshopAttendForm);
    return false;
});

/**
 * 方法
 * 跳转到指定页
 * @returns {boolean}
 */
function pageChange() {
    var pageNo = $("#goToPage").val();
    pageClick(parseInt(pageNo));
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
        $("#goToPage").val("");
        return false;
    }
    $("#pageIndex").val(pageIndex);
    cshopAttendForm.pageNo = pageIndex;
    buildCShopAttendForm(cshopAttendForm);
    return false;
}

/**
 * 方法
 * 【分页显示】：
 * 获取总页数
 */
function getTotalPage() {
    return totalPage;
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
    if (pageIndex > getTotalPage()) {
        alert('超过总页数，请输入正确的页数！');
        return isLegal;
    }
    isLegal = true;
    return isLegal;
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

// function queryCShopAttendMsg() {
//     console.log("success");
//     cshopAuthorityForm.activeId = $("#activeId").text().trim();
//     buildCShopAttendForm(cshopAuthorityForm);
// }

function bulidActiveId(param) {
    $("#activeId").empty();
    var activeId = "活动ID：" + param;
    $("#activeId").append(activeId);
}

function buildTeamName(param) {
    $("#teamName").empty();
    var teamName = "团购活动简称：" + param;
    $("#teamName").append(teamName);
}

function buildSaleCount(param) {
    $("#saleCount").empty();
    var saleCount = "活动已售库存：" + param;
    $("#saleCount").append(saleCount);
}

function buildRemainCount(param) {
    $("#remainCount").empty();
    var remainCount = "活动剩余库存：" + param;
    $("#remainCount").append(remainCount);
}

    function buildAttendSituation(param1, param2, param3, param4,param5,param6,param7) {
    $("#attendSituation").empty();
    var attendSituation = "   参与情况 " + "已开团:" + param1 + "    达到成团标准:" + param2 +" 总计订单(提单):"+ param3+"    总计已支付订单(实时):" + param4 + "   总计已支付销量(实时):" + param5+" 总计待付款订单(实时):"+param6+" 总计待付款销量(实时):"+param7;
    $("#attendSituation").append(attendSituation);
}

function isTeamStatus(param) {
    if (param == 1) {
        return "是";
    } else {
        return "否";
    }
}
function dealAttendAddress(param1, param2, param3, param4, param5) {
    var param = param2 + param3;
    if ("城区" == param4) {
        param4=null;
    }
    if (param4 != null && param5 == null) {
        param = param + param4;
    } else if (param4 == null && param5 != null) {
        param = param + param5;
    } else if (param4 != null && param5 != null) {
        param = param + param4 + param5;
    }
    param = param + "\n" + param1;
    return param;
}
/**
 * 返回详情页
 */
function backDetailView() {
    window.location.href = "/active/query/index";
}

function verification(param) {
    if (param == null) {
        return 0;
    }
    return param;
}

/**
 * 导出报表
 */
function exportTable() {
    var activeId =cshopAttendForm.activeId;
    window.location.href="/active/export/table?activeId=" + activeId;
    console.log("ok");
}
buildCShopAttendForm(cshopAttendForm);

function buildCShopAttendForm(cshopAttendForm) {
    console.log("ok");
    $.ajax({
        url: '/active/list/attend',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        data: {
            activeId: cshopAttendForm.activeId,
            pageNo: cshopAttendForm.pageNo,//分页偏移量
            pageSize: cshopAttendForm.pageSize//分页大小
        },
        success: function (data) {
            $("#tbody").empty();
            if (data.cShopActiveAttendViewList === null || data.cShopActiveAttendViewList === undefined) {
                console.log(data.cShopActiveAttendViewList);
                return;
            }
            var teamId = null;
            data.cShopActiveAttendViewList.forEach(function (item) {//构建上方数据
                teamId = item.teamId;
                bulidActiveId(activeId);
                buildTeamName(item.teamName);
                buildSaleCount(item.saleCount);
                buildRemainCount(item.remainCount);
                buildAttendSituation(item.beginTeamCount, item.receiveTeamCount, item.totalOrder, item.totalEffectOrder,item.totalEffectSale,item.totalNoPayOrder,item.totalNoPayNum);
            });
            if (teamId === null) {
                return;
            }
            if(data.code=='501'){
                alert(data.msg);
            }
            data.cShopActiveAttendViewList.forEach(function (item, index) {
                var str = "";
                str += "<tr>";
                str += "<td class=\"textL\">";
                str += item.teamId;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.unionId;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.shopName;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.accountName;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.mobile;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += dealAttendAddress(item.detialAddr,item.province,item.city,item.town,item.district);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += isTeamStatus(item.isTm);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.effectNum);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.nopayNum);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.sumOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.effectOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.nopayOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.nopayCancelOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.payCancelOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.payCustomCancelOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.nopayfCusCancelOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.nopaysCusCancelOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.nopayTimeoutOrder);
                str += "</td>";
                str += "</tr>";
                $("#tbody").append(str);
            });

            totalPage = Math.ceil(data.totalAttendList / cshopAttendForm.pageSize);
            $("#totalpage").text("共" + totalPage + "页");
            $("#pageNo").text(cshopAttendForm.pageNo);
            currentPage = cshopAttendForm.pageNo;

        },
        error: function () {
            $("#tbody").empty();
        }
    });
    return false;
}
