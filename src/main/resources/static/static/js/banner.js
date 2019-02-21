/**
 * 对象
 * form对象
 * @constructor
 */
function UnionBannerForm()
{
    this.id;//banner id
    this.pageNo = 1;//分页偏移量
    this.pageSize = 10;//分页大小
    this.orderField;//sql排序字段
    this.dir;//sql排序方式
    this.sort;//排序
    this.category;//类别
    this.position;//图片位置
    this.imgLink;//图片链接
    this.title;//标题
    this.appkey;//接入方
    this.startTime;//有效时间开始时间
    this.endTime;//有效时间结束时间
    this.status;//状态
}

//全局变量
var bannerForm = new UnionBannerForm();//定义表单对象
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
    bannerForm.pageNo = page;
    buildForm(bannerForm);
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
    bannerForm.pageNo = page;
    buildForm(bannerForm);
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
    bannerForm.pageNo = pageIndex;
    buildForm(bannerForm);
    return false;
}

//js时间转换工具
/* function toLocalDate(date) {
     if(date == null || date == undefined){
         return "";
     }
     var timestamp4 = new Date(date);
     return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
 }*/
/**
 * 方法
 * 将状态值转换成意义
 * @param param
 * @returns {*}
 */
function getStatus(param) {
    if (param == 0) {
        return "已删除";
    } else if (param == 1) {
        return "未删除";
    } else {
        return param;
    }
}

/**
 * 方法
 * 将位置值转换成意义
 * @param param
 * @returns {*}
 */
function getPosition(param) {
    if (param == undefined || param == null || param == "") {
        return "无";
    } else if (param == 1) {
        return "首部";
    } else if (param == 2) {
        return "中部";
    } else if (param == 3) {
        return "尾部";
    } else {
        return param;
    }

}

/**
 * 方法
 * 将类别值转换成意义
 * @param param
 * @returns {*}
 */
function getCategory(param) {
    if (param == undefined || param == null || param == "") {
        return "无";
    } else if (param == 1) {
        return "B端首页";
    } else if (param == 2) {
        return "C端首页";
    } else if (param == 3) {
        return "搜索页";
    } else if (param == 4) {
        return "详情页";
    } else {
        return param;
    }
}


/**
 * 方法
 * 判断是否为空
 * @param param
 * @returns {*}
 */
function getDefault(param) {
    /*    if(param == undefined || param == null || param == ""){
            return "无";
        }*/
    return param;
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

buildForm(bannerForm);

/**
 * 方法
 * 按条件查询
 */
function queryByCondition() {
    console.log("haha");
    alert("你好");
    bannerForm = new UnionBannerForm();
    bannerForm.title = $("#title").val().trim();
    bannerForm.appkey = $("#appkey").val().trim();
    //前端插件原因，导致手动拼接---《注意》
    var timeForm = $("#startTime").val().trim() + " 00:00:00";
    bannerForm.startTime = timeForm.trim();
    timeForm = $("#endTime").val().trim() + " 23:59:59";
    bannerForm.endTime = timeForm.trim();
    if ($("#status").val().trim() == -1) {
        bannerForm.status = null;
    } else {
        bannerForm.status = $("#status").val().trim();
    }

    buildForm(bannerForm);
}

/**
 * 方法
 * 触发添加模态框
 */
function addBannerModalShow() {
    $("#titleModle").val("");
    $("#appkeyModle").val("");
    $("#sortModle").val("");
    $("#categoryModle").val("");
    $("#positionModle").val("");
    $("#imgLinkModle").val("");
    $("#startTimeModle").val("");
    $("#endTimeModle").val("");
    $("#file").val("");
    $("#uploadBannerFileInput").show();
    $("#id").val("");
    $("#bannerModal").modal('show');
}

/**
 * 方法
 * 上传banner
 */
function uploadBanner() {
    var file = $("#file").get(0).files[0];//上传的文件file
    var data = new FormData();
    data.append('file', file);
    data.append("title", $("#titleModle").val() == null ? null : $("#titleModle").val().trim());
    data.append("appkey", $("#appkeyModle").val() == null ? null : $("#appkeyModle").val().trim());
    data.append("sort", $("#sortModle").val() == null ? null : $("#sortModle").val().trim());
    data.append("category", $("#categoryModle").val() == null ? null : $("#categoryModle").val().trim());
    data.append("position", $("#positionModle").val() == null ? null : $("#positionModle").val().trim());
    data.append("imgLink", $("#imgLinkModle").val() == null ? null : $("#imgLinkModle").val().trim());
    var timeData = $("#startTimeModle").val() == null ? null : $("#startTimeModle").val().trim() + " 00:00:00";
    data.append("addStartTime", timeData.trim());
    timeData = $("#endTimeModle").val() == null ? null : $("#endTimeModle").val().trim() + " 23:59:59";
    data.append("addEndTime", timeData.trim());
    data.append("id", $("#id").val() == null ? null : $("#id").val().trim());
    //发生ajax请求
    saveBannerAjax(data);
    $("#bannerModal").modal('hide')
}

/**
 * 点击事件
 * 更新按钮点击事件
 */
$(document).on("click", ".update", function () {
    /*console.log($(this).siblings(".id").val().trim());*/
    var id = $(this).siblings(".id").val() == null ? null : $(this).siblings(".id").val().trim();
    queryBannerByIdAjax(id);
});

/**
 * 点击事件
 * 删除按钮点击事件
 */
$(document).on("click", ".delete", function () {
    /* console.log($(this).siblings(".id").val().trim());*/
    var id = $(this).siblings(".id").val() == null ? null : $(this).siblings(".id").val().trim();

    var data = new FormData();
    data.append("id", id);
    data.append("status", 0);
    saveBannerAjax(data);
});

/**
 * ajax
 * 添加、更新
 * @param data 前端数据
 */
function saveBannerAjax(data) {
    console.log("data:"+data);
    $.ajax({
        url: "/banner/add",
        type: "POST",
        cache: false,
        processData: false,
        contentType: false,
        data: data,
        success: function (data) {
            /*alert(data.message);
            if(data.data > 0 ){
                window.location.href =  'http://jingtiao.jd.com/recommend/errorlist';
            }*/
            alert(data.msg);
            buildForm(bannerForm);
        }
    });
}

/**
 * ajax
 * 通过id查询需要修改的banner ajax
 * @param id
 */
function queryBannerByIdAjax(id) {
    $("#titleModle").val("");
    $("#appkeyModle").val("");
    $("#sortModle").val("");
    $("#categoryModle").val("");
    $("#positionModle").val("");
    $("#imgLinkModle").val("");
    $("#startTimeModle").val("");
    $("#endTimeModle").val("");
    $("#file").val("");
    $("#uploadBannerFileInput").hide();
    $("#id").val("");

    $.ajax({
        url: '/banner/query/list',
        type: 'get',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (data) {
            console.log(data.unionBannerViewList);
            data.unionBannerViewList.forEach(function (item, index) {
                $("#titleModle").val(item.title);
                $("#appkeyModle").val(item.appkey);
                $("#sortModle").val(item.sort);
                $("#categoryModle").val(item.category);
                $("#positionModle").val(item.position);
                $("#imgLinkModle").val(item.imgLink);
                $("#startTimeModle").val(item.startTime);
                $("#endTimeModle").val(item.endTime);
                $("#id").val(item.id);
                $("#bannerModal").modal('show');
            });
        }
    })
}

/**
 * ajax
 * 分页按条件查询ajax
 * @param unionBannerForm
 * @returns {boolean}
 */
function buildForm(unionBannerForm) {
    $("#gotopage").val("");
    console.log(unionBannerForm);
    $.ajax({
        url: '/banner/query/list',
        type: 'get',
        dataType: 'json',
        data: {
            pageNo: unionBannerForm.pageNo,//分页偏移量
            pageSize: unionBannerForm.pageSize,//分页大小
            orderField: unionBannerForm.orderField,//排序字段
            dir: unionBannerForm.dir,//排序方式
            title: unionBannerForm.title,//标题
            appkey: unionBannerForm.appkey,//接入方
            startTime: unionBannerForm.startTime,//有效时间开始时间
            endTime: unionBannerForm.endTime,//有效时间结束时间
            status: unionBannerForm.status//状态
        },
        success: function (data) {
            $("#tbody").empty();
            console.log(data.unionBannerViewList);
            data.unionBannerViewList.forEach(function (item, index) {
                var str = "";
                str += "<tr>";
                str += "<td class=\"textL\">";
                str += item.title;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += item.appkey;
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getDefault(item.sort);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getCategory(item.category);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getPosition(item.position);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getDefault(item.imgLink);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getDefault(item.startTime);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getDefault(item.endTime);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getDefault(item.createTime);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += getStatus(item.status);
                str += "</td>";
                str += "<td class=\"textL\">";
                str += "<a href=\"" + getDefault(item.imgUrl) + "\" target=\"_blank\">";
                str += "<img src=\"" + getDefault(item.imgUrl) + "\" alt=\"图片路径\" class=\"img-rounded\" style=\"display: block; width: 90px; height: 70px;\">";
                str += "</a>"
                str += "</td>";
                str += "<td class=\"textL\">";
                str += "<input class=\"btn btn-default update\" type=\"button\" value=\"修改\" >";
                str += "<input class=\"btn btn-default delete\" type=\"button\" value=\"删除\" >";
                str += "<input class=\"btn btn-default id\" type=\"hidden\" value=" + item.id + ">";
                str += "</td>";
                str += "</tr>";
                $("#tbody").append(str);
            });


            totalPage = Math.ceil(data.total / unionBannerForm.pageSize);
            $("#totalpage").text("共" + totalPage + "页");
            $("#pageNo").text(unionBannerForm.pageNo);
            currentPage = unionBannerForm.pageNo;

        },
        error: function () {
            $("#tbody").empty();
        }
    });
    return false;
}