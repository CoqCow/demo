/**
 * @author fuxiaoxiang2
 * @constructor
 */
buildRegion();

function CshopSendFrom() {
    this.regionId;
    this.activeId;
    this.teamId;
    this.teamName;
    this.skuId;
    this.shopName;
    this.unionId;
    this.accountName;
    this.mobile;
    this.logisticOrderId;
    this.sendStatus = 0;//默认为待发货
    this.pageNo = 1;//分页偏移量
    this.pageSize = 10;//分页大小
}

function buildRegion() {
    //清空下拉数据
    $("#regionId").html("");
    $.ajax({
        url: '/common/getRegions',
        async: false,
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
                $("#regionId").empty();
                if (data.size > 1) {
                    $("#regionId").append("<option value=\"-1\" selected>全部</option>");
                }
                for (var key in data.data) {
                    var str = "<option value=\"" + key + "\">" + data.data[key] + "</option>";
                    $("#regionId").append(str);
                }
            } else {
                alert(data.msg);
                window.location.href = "NoVerify";
            }
        }
    });
}

//全局变量
var cshopSendFrom = new CshopSendFrom();//定义表单对象
cshopSendFrom.regionId = $("#regionId").val();
var totalPage = 1;
var currentPage = 1;
buildSendForm(cshopSendFrom, true);
/**
 * 方法
 * 上一页
 */
$("#pageUp").bind("click", function () {
    var page = currentPage - 1;
    if (page < 1) {
        return false;
    }
    cshopSendFrom.pageNo = page;
    buildSendForm(cshopSendFrom, false);
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
    cshopSendFrom.pageNo = page;
    buildSendForm(cshopSendFrom, false);
    return false;
});

/**
 * 方法
 * 跳转到指定页
 * @returns {boolean}
 */
function changePageNo() {
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
        return;
    }
    $("#pageIndex").val(pageIndex);
    cshopSendFrom.pageNo = pageIndex;
    buildSendForm(cshopSendFrom, false);
    return false;
}

/**
 * 方法
 * 将状态值转换成意义
 * @param param
 * @returns {*}
 */
function getStatus(param) {
    if (param === 0) {
        return "待发货";
    } else if (param === 1) {
        return "已发货";
    } else if (param === 2) {
        return "店长已收货";
    } else if (param === 3) {
        return "核销完成";
    } else {
        return "未知";
    }
}

function verification(param) {
    if (param == null) {
        return 0;
    }
    return param;
}

function dealAddress(param1, param2, param3, param4, param5) {
    var param = param2 + param3;
    if ("城区" == param4) {
        param4 = null;
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

function verificationRegionId(regionName) {
    if (regionName == "东北") {
        return 1;
    } else if (regionName == "华北") {
        return 2;
    } else if (regionName == "华东") {
        return 3;
    } else if (regionName == "华南") {
        return 4;
    } else if (regionName == "华中") {
        return 5;
    } else if (regionName == "西北") {
        return 6;
    } else if (regionName == "西南") {
        return 7;
    } else if (regionName == "集团") {
        return 8;
    } else {
        return 0;
    }
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

function isPositiveInteger(number) {
    var result = false;
    var reg = /^[0-9]*[1-9][0-9]*$/;
    if (reg.test(number)) {
        result = true;
    }
    return result;
}

/**
 * 输入手机格式验证
 */
function verifiMobile(param) {
    var rightMobile = /^[1][0-9]{10}$/;
    if (!rightMobile.test(param)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 方法
 * 按条件查询
 */
function querySendByCondition() {
    console.log("send ok");
    cshopSendFrom = new CshopSendFrom();
    cshopSendFrom.regionId = $("#regionId").val();
    cshopSendFrom.activeId = $("#activeId").val().trim();
    cshopSendFrom.teamId = $("#teamId").val();
    cshopSendFrom.teamName = $("#teamName").val().trim();
    cshopSendFrom.skuId = $("#skuId").val().trim();
    cshopSendFrom.shopName = $("#shopName").val().trim();
    cshopSendFrom.unionId = $("#unionId").val().trim();
    cshopSendFrom.accountName = $("#verderName").val().trim();
    cshopSendFrom.mobile = $("#verderMobile").val().trim();
    cshopSendFrom.logisticOrderId = $("#logisticId").val().trim();
    cshopSendFrom.sendStatus = $("#sendStatus").val().trim();
    if (cshopSendFrom.mobile !== '' && !verifiMobile(cshopSendFrom.mobile)) {
        alert("请输入正确的手机号");
        return;
    }
    buildSendForm(cshopSendFrom, false);
}

$(document).on("click", ".send", function () {
    var teamsId = $(this).closest('tr').find('.id').val() == null ? null : $(this).closest('tr').find('.id').val();
    var sendCompanys = $(this).closest('tr').find('.company').val() == null ? null : $(this).closest('tr').find('.company').val();
    var sendIds = $(this).closest('tr').find('.logisticId').val() == null ? null : $(this).closest('tr').find('.logisticId').val();
    $("#sendTeamId").empty();
    $("#sendTeamId").append(teamsId);
    buildModel(sendCompanys, sendIds, 2);
    $("#sendModel").modal('show');
});
$(document).on("click", ".update", function () {
    var teamsId = $(this).closest('tr').find('.id').val() == null ? null : $(this).closest('tr').find('.id').val();
    var updateLogisticCompany = $(this).closest('tr').find('.company').val() == null ? null : $(this).closest('tr').find('.company').val();
    var updateLogisticIdSend = $(this).closest('tr').find('.logisticId').val() == null ? null : $(this).closest('tr').find('.logisticId').val();
    $("#updateTeamId").empty();
    $("#updateTeamId").append(teamsId);
    buildModel(updateLogisticCompany, updateLogisticIdSend, 3);
    $("#updateModel").modal('show');
});
$(document).on("click", ".show", function () {
    $("#showTeamId").empty();
    var queryTeam = $(this).closest('tr').find('.id').val() == null ? null : $(this).closest('tr').find('.id').val();
    var queryCompanys = $(this).closest('tr').find('.company').val() == null ? null : $(this).closest('tr').find('.company').val();
    var logisticIds = $(this).closest('tr').find('.logisticId').val() == null ? null : $(this).closest('tr').find('.logisticId').val();
    $("#showTeamId").append(queryTeam);
    buildModel(queryCompanys, logisticIds, 1);
    $("#showModel").modal('show');
});

function buildModel(companys, logisticIds, flag) {
    if (companys == null || companys == "") {
        return;
    }
    var company = companys.split(";");
    var logistic = logisticIds.split(";");
    if (flag === 1) {
        for (var i = 0; i < company.length; ++i) {
            var logisticCompany = company[i];
            var logisticId = logistic[i];
            $("#showWrapper").append('<div class="remove-ready" style="margin-top: -25px"><div class="form-group row"><label class="control-label" style="margin-left: 10px">物流:</label>' +
                '<input  style="width:170px" readonly  value="' + logisticCompany + '">' +
                '<label class="control-label" style="margin-left: 10px;">单号:</label>' +
                '<input  style="width:170px" readonly  value="' + logisticId + '">' +
                '</div></div>');
        }
    } else if (flag === 2) {
        for (var j = 0; j < company.length; ++j) {
            var logisticSendName = company[j];
            var logisticSendId = logistic[j];
            $("#selectWrapper").append('<div class="remove-ready" style="margin-top:-25px"><div class="form-group row"><label class="control-label"  style="margin-left:10px">物流:</label>' +
                '<input style="width:170px" type="text" readonly  value="' + logisticSendName + '" name="logisticCompany[]">' +
                '<label class="control-label" style="margin-left: 10px;">单号:</label>' +
                '<input style="width:170px" type="text" readonly value="' + logisticSendId + '" name="logisticId[]">' +
                '</div></div>');
        }
    } else {
        for (var k = 0; k < company.length; ++k) {
            var logisticUpdateCompany = company[k];
            var logisticUpdateId = logistic[k];
            $("#updateWrapper").append('<div class="remove-ready" style="margin-top:-25px"><div class="form-group row"><label class="control-label" style="margin-left:10px">物流:</label>' +
                '<input style="width:170px" type="text" value="' + logisticUpdateCompany + '" name="updateCompany[]" placeholder="仅可输入一个物流公司" maxlength="20">' +
                '<label class="control-label" style="margin-left: 10px;">单号:</label>' +
                '<input style="width:170px" value="' + logisticUpdateId + '" name="updateId[]"  placeholder="仅可输入一个物流单号" maxlength="20">' +
                '</div></div>');
        }
    }
}

/**
 *
 * @param cshopSendFrom
 * @returns {boolean}
 */
function buildSendForm(cshopSendFrom, flag) {
    if (cshopSendFrom.regionId == -1) {
        cshopSendFrom.regionId = null;
    }
    console.log("send message");
    $("#gotopage").val("");
    $.ajax({
        url: '/active/list/send',
        type: 'GET',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            pageNo: cshopSendFrom.pageNo,//分页偏移量
            pageSize: cshopSendFrom.pageSize,//分页大小
            regionId: cshopSendFrom.regionId,
            activeId: cshopSendFrom.activeId,
            teamId: cshopSendFrom.teamId,
            teamName: cshopSendFrom.teamName,
            skuId: cshopSendFrom.skuId,
            shopName: cshopSendFrom.shopName,
            unionId: cshopSendFrom.unionId,
            accountName: cshopSendFrom.accountName,
            mobile: cshopSendFrom.mobile,
            logisticOrderId: cshopSendFrom.logisticOrderId,
            sendStatus: cshopSendFrom.sendStatus
        },
        success: function (data) {
            console.log(data);
            $("#tbody").empty();
            if (data.sendViewList === null || data.sendViewList === undefined) {
                if (flag) {
                    return;
                }
                alert(data.msg);
                console.log(data.msg);
                return;
            }
            if (data.code == '501') {
                alert(data.msg);
            }
            data.sendViewList.forEach(function (item) {
                var str = "";
                str += "<tr>";
                str += "<td class=\"textL\">";
                str += item.regionName;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.activeId;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.teamName;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.teamId;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.skuId;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.shopName;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.startTime;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.endTime;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.unionId;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.accountName;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.mobile;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += dealAddress(item.detialAddr, item.province, item.city, item.town, item.district);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.effectOrder);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += verification(item.effectSaleNum);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getStatus(item.sendStatus);
                str += "</td>";
                str += "<td class=\"textL\">";
                if (item.sendStatus == 0 && ((item.logisticCompany == null || item.logisticCompany == ""))) {
                    str += "未上传";
                } else {
                    str += "已上传";
                }
                str += "</td>";
                str += "<td class=\"textL\">";
                if ((item.logisticCompany != null && item.logisticCompany != "") || (item.logisticOrderId != null && item.logisticOrderId != "")) {
                    str += "<input class=\"btn btn-default show btn-sm\" type=\"button\" value=\"查看详情\" >";
                } else {
                    str += "";
                }
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.operator;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.operatorTime;
                str += "</td>";
                str += "<td class=\"textL\">";
                if (item.sendStatus === 0) {
                    str += "<input class=\"btn btn-default send btn-sm\" type=\"button\" value=\"发货\" >";
                } else if (item.sendStatus === 1) {
                    str += "<input class=\"btn btn-default update btn-sm\" type=\"button\" value=\"修改\" >";
                }
                str += "</td>";
                str += "<td class=\"textL\">";
                if (item.sendStatus == 0 && ((item.logisticCompany != null && item.logisticCompany != "") || (item.logisticOrderId != null && item.logisticOrderId != ""))) {
                    str += "<input class=\"btn btn-default checkTeamId btn-sm\" style=\"zoom:170%;\" type=\"checkbox\" name=\"checkname\" value=" + item.teamId + " >";
                } else {
                    str += "";
                }
                str += "<input class=\"btn btn-default id btn-sm\" type=\"hidden\" value=" + item.teamId + ">";
                str += "<input class=\"btn btn-default company btn-sm\" type=\"hidden\" value=" + item.logisticCompany + ">";
                str += "<input class=\"btn btn-default logisticId btn-sm\" type=\"hidden\" value=" + item.logisticOrderId + ">";
                str += "</td>";
                str += "</tr>";
                $("#tbody").append(str);
            });
            totalPage = Math.ceil(data.totalSendPage / cshopSendFrom.pageSize);
            $("#totalpage").text("共" + totalPage + "页");
            $("#pageNo").text(cshopSendFrom.pageNo);
            currentPage = cshopSendFrom.pageNo;
        },
        error: function () {
            $("#tbody").empty();
        }
    });
    return false;
}

function SendSkuForm() {
    this.teamId;
    this.logisticCompany;
    this.logisticIdSend;
    this.operator;
}

var sendSkuForm = new SendSkuForm();

function sendSku() {
    var teamId = $("#sendTeamId").text().trim();
    var logisticCompany = "";
    var logisticIdSend = "";
    var logisticCompanys = document.getElementsByName("logisticCompany[]");
    var logisticIds = document.getElementsByName("logisticId[]");
    for (var i = 0; i < logisticCompanys.length; i++) {
        var logisticCompanyInput = $(logisticCompanys[i]).val().trim();
        var logisticIdInput = $(logisticIds[i]).val().trim();
        if ((logisticCompanyInput == "商家自送" || logisticCompanyInput == "厂家自送") && !(logisticIdInput == "" || logisticIdInput == null)) {
            alert("填写错误，请检查");
            return;
        }
        if ((logisticCompanyInput != "商家自送" && logisticCompanyInput != "厂家自送") && (logisticIdInput == "" || logisticIdInput == null)) {
            alert("填写错误，请检查");
            return;
        }
        if (i === logisticCompanys.length - 1) {
            logisticCompany += logisticCompanyInput;
            logisticIdSend += logisticIdInput;
            break;
        }
        logisticCompany += logisticCompanyInput + ";";
        logisticIdSend += logisticIdInput + ";";
    }
    alert("保存成功");
    sendSkuForm.teamId = teamId;
    sendSkuForm.logisticCompany = logisticCompany;
    sendSkuForm.logisticIdSend = logisticIdSend;
    sendSkuRealMethod(sendSkuForm);
}

function sendNoSku() {
    var teamId = $("#sendTeamId").text().trim();
    var logisticCompany = $("#logisticCompany").val().trim();
    var logisticIdSend = $("#logisticIdSend").val().trim();
    if (logisticCompany.length != 0 || logisticIdSend.length != 0) {
        alert("请勿输入物流相关信息");
        return;
    }
    sendSkuForm.teamId = teamId;
    sendSkuForm.logisticCompany = logisticCompany;
    sendSkuForm.logisticIdSend = logisticIdSend;
    sendSkuRealMethod(sendSkuForm);
}

function sendSkuRealMethod(sendSkuForm) {
    $.ajax({
        url: '/active/update/send',
        type: 'GET',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            teamId: sendSkuForm.teamId,
            logisticCompany: sendSkuForm.logisticCompany,
            logisticIdSend: sendSkuForm.logisticIdSend
        },
        success: function (data) {
            cancelSend();
            if (data.code == 200) alert(data.msg);
            else console.log("update failed");
            buildSendForm(cshopSendFrom, true);
            $("#sendModel").modal('hide');
            $("#updateModel").modal('hide');
        }
    });
}

function updateSku() {
    var teamId = $("#updateTeamId").text().trim();
    var logisticCompany = "";
    var logisticIdSend = "";
    var logisticCompanys = document.getElementsByName("updateCompany[]");
    var logisticIds = document.getElementsByName("updateId[]");
    for (var i = 0; i < logisticCompanys.length; i++) {
        var logisticCompayInput = $(logisticCompanys[i]).val();
        var logisticIdInput = $(logisticIds[i]).val().trim();
        if ((logisticCompayInput == "商家自送" || logisticCompayInput == "厂家自送") && !(logisticIdInput == "" || logisticIdInput == null)) {
            alert("填写错误，请检查");
            return;
        }
        if ((logisticCompayInput != "商家自送" && logisticCompayInput != "厂家自送") && (logisticIdInput == "" || logisticIdInput == null)) {
            alert("填写错误，请检查");
            return;
        }
        if (i === logisticCompanys.length - 1) {
            logisticCompany += logisticCompayInput;
            logisticIdSend += logisticIdInput;
            break;
        }
        logisticCompany += logisticCompayInput + ";";
        logisticIdSend += logisticIdInput + ";";
    }
    sendSkuForm.teamId = teamId;
    sendSkuForm.logisticCompany = logisticCompany;
    sendSkuForm.logisticIdSend = logisticIdSend;
    sendSkuRealMethod(sendSkuForm);
}

function queryWaybillbyTeamId(teamId) {
    console.log("ok");
    $.ajax({
        url: '/active/waybill/querybyTeamId',
        type: 'GET',
        dataType: 'json',
        async: false,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: {
            teamId: teamId
        },
        success: function (data) {
            console.log(data);
            if (data.code == 200 && data.data != null) {
                $("#logisticCompany").val(data.data.carrier);
                $("#logisticIdSend").val(data.data.waybillCode);
            } else {
                console.log(data);
            }

        }
    });
}

//物流信息下处理
function uploadLogisticMessage() {
    var logisticFile = $("#logisticPath").get(0).files[0];//上传的文件file
    var data = new FormData();
    data.append('logisticFile', logisticFile);
    $.ajax({
        url: "/active/send/upload",
        type: "POST",
        cache: false,
        processData: false,
        contentType: false,
        data: data,
        success: function (data) {
            if (data.code == 200) {
                alert(data.msg);
            } else {
                if (data.code == 403) {
                    var str = data.successCount + "条上传成功,部分上传失败," + "您可点击【发货】单独操作，或修改错误信息后批量导入,具体错误信息如下:";
                    for (var key in data.data) {
                        var msg = data.data[key];
                        str +="\r\n"+"EXCEL表行:"+key+","+msg;
                    }
                    alert(str);
                } else {
                    alert(data.msg);
                }
            }
            buildSendForm(cshopSendFrom, true);
        }
    })
}

function checkAll() {
    var all = document.getElementById('all');//获取到点击全选的那个复选框的id
    var one = document.getElementsByName('checkname');//获取到复选框的名称
    for (var i = 0; i < one.length; i++) {
        one[i].checked = all.checked;
    }
}

function batchSend() {
    var teamIdList = new Array();
    $("#sendMessageTable").find('input[name="checkname"]:checked').each(function () {
        teamIdList.push($(this).val());
    });
    if (teamIdList.length === 0 || teamIdList == null) {
        alert("数据未勾选");
        return;
    }
    console.log(teamIdList);
    $.ajax({
        url: "/active/send/batch",
        async: false,
        dataType: "json",
        data: {
            'teamIdList': teamIdList
        },
        success: function (result) {
            if (result.code == 200) {
                alert(result.msg);
            } else {
                alert(result.msg);
            }
            buildSendForm(cshopSendFrom, true);
        }
    });
}

//取消发货按钮
function cancelSend() {
    var removeName = document.getElementsByClassName("remove-ready");
    var len = removeName.length;
    var i = len - 1;
    while (i >= 0) {
        removeName[i].remove();
        i--;
    }
    FieldCount = 1;
    x = 1;
}

var FieldCount = 1;
var x = 1;
//动态添加输入框
$(document).ready(function () {
    var MaxInputs = 21;
    var AddButton = $("#addMoreInput");
    var InputsWrapper = $("#selectWrapper");
    // var x = InputsWrapper.length;//initlal text box count; //to keep track of text box added
    $(AddButton).click(function (e)  //on add input button click
    {
        if (x < MaxInputs) //max input box allowed
        {
            x++; //text box added increment
            if (FieldCount < 10) {
                FieldCount = "0" + FieldCount;
            }
            $(InputsWrapper).append('<div class="remove-ready" style="margin-top:-25px"><div class="form-group row"><label style="margin-left:10px" for="logisticCompany' + (FieldCount) + '" class="control-label">物流:</label>' +
                '<input name="logisticCompany[]"  style="width:170px" id="logisticCompany' + (FieldCount) + '" placeholder="仅可输入一个物流公司" maxlength="20">' +
                '<label for="logisticIdSend' + (FieldCount) + '" class="control-label" style="margin-left:10px;">单号:</label>' +
                '<input name="logisticId[]" style="width:170px" type="text" id="logisticIdSend' + (FieldCount) + '" placeholder="仅可输入一个物流单号" maxlength="20">' +
                '<a href="#" id="removeInput' + (FieldCount) + '" class="btn btn-default removeLocal" style="margin-left: 5px; padding: 2px; padding-left:10px;padding-right:10px;"><span aria-hidden="true">-</span></a></div></div>');
            FieldCount++;//add input box
        }
        return false;
    });

    $("body").on("click", ".removeLocal", function (e) { //user click on remove text
        if (x > 1) {
            $(this).parent('div').parent('div').remove(); //remove text box
            x--; //decrement textbox
            FieldCount--;
        }
        return false;
    })
});
// getLogistics();
//
// //拉取物流公司列表
// function getLogistics() {
//     var result = "";
//     $.ajax({
//         url: '/common/getLogistics',
//         async: false,
//         type: 'get',
//         dataType: 'json',
//         success: function (data) {
//             if (data.code == 200) {
//                 for (var key in data.data) {
//                     result += "<option value=\"" + key + "\">" + data.data[key] + "</option>";
//                 }
//             } else {
//                 alert(data.msg);
//                 window.location.href = "NoVerify";
//             }
//         }
//     });
//     return result;
// }