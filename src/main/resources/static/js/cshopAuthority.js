/**
 * 区域权限js处理
 * @author fuxiaoxiang2
 * @create 2018/12/25
 */
function CShopAuthorityForm() {
    this.id;
    this.erp;
    this.regionName;
    this.erpLevel;
    this.pageNo = 1;//分页偏移量
    this.pageSize = 10;//分页大小
}

var cshopAuthorityForm = new CShopAuthorityForm();
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
    cshopAuthorityForm.pageNo = page;
    buildCShopAuthorityForm(cshopAuthorityForm);
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
    cshopAuthorityForm.pageNo = page;
    buildCShopAuthorityForm(cshopAuthorityForm);
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
    cshopAuthorityForm.pageNo = pageIndex;
    buildCShopAuthorityForm(cshopAuthorityForm);
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
buildCShopAuthorityForm(cshopAuthorityForm);
function buildCShopAuthorityForm(cshopAuthorityForm) {
    console.log("ok");
    $.ajax({
        url: '/active/list/authority',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        data: {
            pageNo:cshopAuthorityForm.pageNo,
            pageSize:cshopAuthorityForm.pageSize,
            erp: cshopAuthorityForm.erp,
            regionName:cshopAuthorityForm.regionName,
            erpLevel:cshopAuthorityForm.erpLevel
        },
        success: function (data) {
            $("#tbody").empty();
            if (data.cShopAuthorityViewList === null || data.cShopAuthorityViewList === undefined) {
                alert(data.msg);
                return;
            }
            console.log(data.msg);
            data.cShopAuthorityViewList.forEach(function (item, index) {
                var str = "";
                str += "<tr>";
                str += "<td class=\"textL\">";
                str += item.erp;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.regionName;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += erpLevel(item.erpLevel);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.createTime;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.modifyTime;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.operator;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += "<input class=\"btn btn-default deleteRecord btn-sm\" type=\"button\" value=\"删除\" >";
                str += "<input class=\"btn btn-default updateRecord btn-sm\" type=\"button\" value=\"修改\" >";
                str += "<input class=\"btn btn-default id btn-sm\" type=\"hidden\" value=" + item.id + ">";
                str += "<input class=\"btn btn-default erp btn-sm\" type=\"hidden\" value=" + item.erp + ">";
                str += "</td>";
                str += "</tr>";
                $("#tbody").append(str);
            });
            totalPage = Math.ceil(data.totalAuthorityCount / cshopAuthorityForm.pageSize);
            $("#totalpage").text("共" + totalPage + "页");
            $("#pageNo").text(cshopAuthorityForm.pageNo);
            currentPage = cshopAuthorityForm.pageNo;

        },
        error: function () {
            $("#tbody").empty();
        }
    });
    return false;
}
function saveAuthorityRecord() {
    cshopAuthorityForm = new CShopAuthorityForm();
    cshopAuthorityForm.erp = $("#erp").val().trim();
    cshopAuthorityForm.regionName = $("#regionName").val().trim();
    cshopAuthorityForm.erpLevel = $("#erpLevel").val().trim();
    saveAuthority(cshopAuthorityForm);
}

function saveAuthority(cshopAuthorityForm) {
    console.log(cshopAuthorityForm);
    $.ajax({
        url: '/active/save/authority',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        data: {
            erp:cshopAuthorityForm.erp,
            regionName:cshopAuthorityForm.regionName,
            erpLevel:cshopAuthorityForm.erpLevel
        },
        success: function (data) {
            cshopAuthorityForm.erp =null;
            cshopAuthorityForm.regionName = null;
            cshopAuthorityForm.erpLevel = null;
            if(data.code==='200'){
                console.log(data.msg);
            }else{
                alert(data.msg);
            }
            buildCShopAuthorityForm(cshopAuthorityForm);
        }
    });
    return false;
}
function deleteRecord(param) {
    $.ajax({
        url: '/active/delete/authority',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        type: 'GET',
        dataType: 'json',
        data: {
            id: parseInt(param)
        },
        success: function (data) {
            cshopAuthorityForm.id =null;
            cshopAuthorityForm.regionName = null;
            cshopAuthorityForm.erpLevel = null;
            if(data.code==='200'){
                console.log(data.msg);
            }else {
                alert(data.msg);
            }
            buildCShopAuthorityForm(cshopAuthorityForm)
        }
    });
    return false;
}
$(document).on("click", ".deleteRecord", function () {
    var id = $(this).siblings(".id").val() == null ? null : $(this).siblings(".id").val().trim();
    if(confirm("确认删除?")){
        deleteRecord(id);
    }else {
        return;
    }
});
$(document).on("click", ".updateRecord", function () {
    var id = $(this).siblings(".id").val() == null ? null : $(this).siblings(".id").val().trim();
    var erp = $(this).siblings(".erp").val() == null ? null : $(this).siblings(".erp").val().trim();
    $("#updateId").empty();
    $("#updateId").append(id);
    $("#updateErp").empty();
    $("#updateErp").append(erp);
    $("#updateRegionName").val("");
    $("#updateErpLevel").val("");
    $("#updateModel").modal('show');
});
function updateAuthority() {
    var updateId = $("#updateId").text().trim();
    var updateRegionName = $("#updateRegionName").val().trim();
    var updateErpLevel = $("#updateErpLevel").val().trim();
    cshopAuthorityForm.id = updateId;
    cshopAuthorityForm.regionName = updateRegionName;
    cshopAuthorityForm.erpLevel = updateErpLevel;
    updateAuRecord(cshopAuthorityForm);
}
function updateAuRecord(cshopAuthorityForm) {
    console.log("ok");
    $.ajax({
        url: '/active/update/authority',
        type: 'GET',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            id: cshopAuthorityForm.id,
            regionName: cshopAuthorityForm.regionName,
            erpLevel: cshopAuthorityForm.erpLevel
        },
        success: function (data) {
            if(data.code==='200'){
                console.log(data.msg);
            }else{
                alert(data.msg);
            }
            cshopAuthorityForm.id =null;
            cshopAuthorityForm.regionName = null;
            cshopAuthorityForm.erpLevel = null;
            buildCShopAuthorityForm(cshopAuthorityForm);
            $("#updateModel").modal('hide');
        }
    });
}
function erpLevel(param) {
    if(param === 0) {
        return "可以删除";
    }else{
        return "不可删除";
    }
}