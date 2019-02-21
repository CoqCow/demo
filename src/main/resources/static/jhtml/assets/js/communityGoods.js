var table;
$(document).ready(function () {
    table = $('#datatable').dataTable({
        "bJQueryUI": false,
        "bPaginate": true,// 分页按钮
        "bFilter": false,// 搜索栏
        "bLengthChange": false,// 每行显示记录数
        "bInfo": true,// Showing 1 to 10 of 23 entries 总记录数没也显示多少等信息
        "bWidth": true,
        "iDisplayLength": 10,// 每页显示行数
        "bStateSave": true,//状态保存
        "processing": true, //打开数据加载时的等待效果
        "serverSide": true,//打开后台分页
        "sAjaxSource": "/goods/list",
        "fnServerData": retrieveData,
        "sScrollY": "280px", //是否开启垂直滚动，以及指定滚动区域大小,可设值：'disabled','2000px'
        "bPaginate": true,
        "columns": [
            {"mData": "seqNum", 'sClass': 'log-align', "bSortable": false},
            {"mData": "skuId", 'sClass': 'log-align', "bSortable": false},
            {"mData": "skuName", "bSortable": false},
            {"mData": "couponKey", 'sClass': 'log-align', "bSortable": false},
            {"mData": "couponRuleId", 'sClass': 'log-align', "bSortable": false},
            {"mData": "region", 'sClass': 'log-align', "bSortable": false},
            {"mData": "erp", 'sClass': 'log-align', "bSortable": false},
            {
                "mData": "createTime", 'sClass': 'log-align', "bSortable": false, "mRender": function (data, type, full) {
                var d = new Date(data);
                var dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-')
                    + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
                return dformat;
            }
            },
            {
                "mData": "category", 'sClass': 'log-align', "bSortable": false, "mRender": function (data, type, full) {
                var btn = "<a href='javascript:delData(" + full.id + ");' class='btn btn-default radius'>"
                    + "<i class='icon-trash'></i>删除</a>";
                return btn;
            }
            }
        ],
        /*是否开启主题*/
        "bJQueryUI": true,
        "oLanguage": {    // 语言设置
            "sProcessing": "处理中...",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sZeroRecords": "没有检索到数据",
            "sSearch": "检索:",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "前一页",
                "sNext": "后一页",
                "sLast": "尾页"
            }
        },
    });
});

// 3个参数的名字可以随便命名,但必须是3个参数,少一个都不行
function retrieveData(sSource, aoData, fnCallback) {
    var pageNo = aoData[3].value / aoData[4].value + 1;
    var pageSize = aoData[4].value;
    var skuId = $('#input_sku').val();
    var seqNum = $('#input_seq').val();
    var couponUrl = $('#input_coupon').val();
    var regionId = $('#input_region').val();
    if (regionId == -1) {
        regionId = null;
    }
    $.ajax({
        url: sSource,//这个就是请求地址对应sAjaxSource
        data: {
            "type": 2,
            "pageNo": pageNo,
            "pageSize": pageSize,
            "skuId": skuId,
            "seqNum": seqNum,
            "couponUrl": couponUrl,
            "regionId": regionId
        },
        type: 'get',
        dataType: 'json',
        async: false,
        cache: false,	//禁用缓存
        success: function (result) {
            var returnData = {};
            returnData.draw = aoData.draw;
            returnData.recordsTotal = result.totalItems; //返回数据全部记录
            returnData.recordsFiltered = result.totalItems; //后台不实现过滤功能，每次查询均视作全部结果
            returnData.data = result.data; //返回的数据列表
            fnCallback(returnData);//把返回的数据传给这个方法就可以了,datatable会自动绑定数据的

            $("#input_region").empty();

            // /*                   console.log(result.goodsRegionMap);*/
            // if (regionId == -1 || regionId) {
            //     $("#input_region").append("<option value=\"-1\" selected>请选择</option>");
            // } else {
            //     $("#input_region").append("<option value=\"-1\">请选择</option>");
            // }
            if(result.size > 1){
                $("#input_region").append("<option value=\"-1\" selected>全部</option>");
            }
            for (var key in result.goodsRegionMap) {
                var regionName = result.goodsRegionMap[key];
                if(regionName=="集团"){
                    return;
                }
                if (regionId == key) {
                    var str = "<option value=\"" + key + "\" selected>" + regionName + "</option>";
                    $("#input_region").append(str);
                } else {
                    var str = "<option value=\"" + key + "\">" + regionName + "</option>";
                    $("#input_region").append(str);
                }

            }


        },
        error: function (msg) {
        }
    });
}

function addData(req_data) {
    var skuId = $('#input_sku').val();
    var seqNum = $('#input_seq').val();
    var categoryId = $('#input_cname').val();
    var commissionRatio = 0.0;
    var type = 2;//商品
    var couponUrl = $('#input_coupon').val();
    var regionId = $('#input_region').val();
    if (regionId == -1) {
        regionId = null;
        alert("请选择具体的区域");
        return;
    }
    if (!validate()) {
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/recommend/add",
        data: {
            "skuId": skuId,
            "seqNum": seqNum,
            "categoryId": categoryId,
            "commissionRatio": commissionRatio,
            "type": type,
            "couponUrl": couponUrl,
            "regionId": regionId
        },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            if (result.code == 200) {
                alert("添加成功！");
                clear();
                table.fnDraw();
            } else {
                alert(result.message);
            }
        },
        error: function () {
            alert("请求失败,访问：cshop.jd.com 检查网络是否通畅 或联系管理员")
        }
    });
}

function validate() {
    if (!$('#input_sku').val() || !$('#input_seq').val()) {
        alert("缺少添加数据");
        return false;
    } else {
        return true;
    }

}

function clear() {
    $("#input_coupon").val("");
    $('#input_sku').val("");
    $('#input_seq').val("");
    $('#input_comm').val("");
    $('#input_key').val("");
    $('#input_rule').val("");
}

function delData(id) {
    var sure = confirm('确定删除?');
    if (sure && isPositiveInteger(id)) {
        $.ajax({
            type: "POST",
            url: "/goods/remove",
            data: {"id": id, "type": 2},
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if (result == 1) {
                    alert("删除成功");
                    table.fnDraw();
                } else {
                    alert(result);
                }
            },
            error: function () {
                alert("请求失败,参数错误 或联系管理员")
            }
        });
    }
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

function listCategory() {
    var category;
    $.ajax({
        type: "get",
        url: "/goods/list/category",
        dataType: 'json',
        success: function (result) {
            cateGorydom(result);
        },
        error: function () {
            category = [
                {
                    "categoryId": 1,
                    "categoryName": "精选",
                    "score": "1"
                }
            ]
            cateGorydom(category);
            alert("请求分类列表失败,已托底默认分类")
        }
    });
}

function cateGorydom(category) {
    for (var i = 0; i < category.length; i++) {
        var option = document.createElement("option");
        $(option).val(category[i].categoryId);
        $(option).text(category[i].categoryName);
        $('#input_cname').append(option);
    }
}

function uploadBtn() {
    var filepath = $("#filepath").get(0).files[0];//上传的文件file
    var data = new FormData();
    data.append('filepath', filepath);
    $.ajax({
        url: "/recommend/putExcel",
        type: "POST",
        cache: false,
        processData: false,
        contentType: false,
        data: data,
        success: function (data) {
            alert(data.message);
            if (data.data > 0) {
                window.location.href = '/recommend/errorlist';
            }
            table.fnDraw();
        }
    })
}