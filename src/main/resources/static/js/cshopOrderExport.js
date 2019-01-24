/**
 * 区域权限js处理
 * @author fuxiaoxiang2
 * @create 2018/12/25
 */
function CShopOrderExportForm() {
    this.cOrderId;
    this.createTimeBegin;
    this.createTimeEnd;
    this.flag;
    this.pageNo = 1;//分页偏移量
    this.pageSize = 10;//分页大小
}

var cshopOrderExportForm = new CShopOrderExportForm();
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
    cshopOrderExportForm.pageNo = page;
    exportOrderMessage(cshopOrderExportForm);
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
    cshopOrderExportForm.pageNo = page;
    exportOrderMessage(cshopOrderExportForm);
    return false;
});

/**
 * 方法
 * 跳转到指定页
 * @returns {boolean}
 */
function changePage() {
    var pageNo = $("#gotopage").val();
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
        $("#gotopage").val("");
        return false;
    }
    $("#pageIndex").val(pageIndex);
    cshopOrderExportForm.pageNo = pageIndex;
    exportOrderMessage(cshopOrderExportForm);
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
function exportOrder() {
    cshopOrderExportForm.cOrderId = $("#cOrderId").val();
    cshopOrderExportForm.createTimeBegin = $("#createTimeBegin").val();
    cshopOrderExportForm.createTimeEnd = $("#createTimeEnd").val();
    cshopOrderExportForm.flag = $("#flag").val();
    exportOrderMessage(cshopOrderExportForm);
}

function exportOrderMessage(cshopOrderExportForm) {
    $.ajax({
        url: '/active/export/order',
        type: 'POST',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            pageNo:cshopOrderExportForm.pageNo,
            pageSize:cshopOrderExportForm.pageSize,
            cOrderId: cshopOrderExportForm.cOrderId,
            createTimeBegin: cshopOrderExportForm.createTimeBegin,
            createTimeEnd: cshopOrderExportForm.createTimeEnd,
            flag: cshopOrderExportForm.flag
        },
        success: function (data) {
            $("#tbody").empty();
            if(data.code===200){
                console.log(data.msg);
            }else{
                alert(data.msg);
                return
            }
            data.orderReverseViewList.forEach(function (item, index) {
                var str = "";
                str += "<tr>";
                str += "<td class=\"textL\">";
                str += item.orderId;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.orderGuid;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.createTime;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += isEffect(item.flag);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verifyMessage(item.message);
                str += "</td>";
                str += "</tr>";
                $("#tbody").append(str);
            });
            totalPage = Math.ceil(data.totalReverseCount / cshopOrderExportForm.pageSize);
            $("#totalpage").text("共" + totalPage + "页");
            $("#pageNo").text(cshopOrderExportForm.pageNo);
            currentPage = cshopOrderExportForm.pageNo;
        }
    });
}
function isEffect(param) {
    if(param){
        return "有效";
    }else {
        return "无效";
    }
}
function verifyMessage(param){
    if(param ==null){
        return "";
    }
}