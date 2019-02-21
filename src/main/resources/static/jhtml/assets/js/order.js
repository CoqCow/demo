//查询条件
var userId;
var orderId;
var orderStatus = null; //订单状态 0全部
var startDate; //查询开始时间
var endDate;   //查询结束时间
var requestData={};
var table;
$(document).ready(function () {
        //时间插件初始化
        $(".dateTimeSet").dynDateTime({
             showsTime: true,
             ifFormat: "%Y-%m-%d %H:%M:00",
             onOpen: function(s) {
             var dom = $(".calendar")[0];
             var top = parseInt(dom.style.top, 10);
             dom.style.top = top + document.body.scrollTop + "px";
         }
        });
    table= $('#datatable').dataTable({ "bJQueryUI": false,
                                         "bPaginate" : true,// 分页按钮
                                         "bFilter" : false,// 搜索栏
                                         "bLengthChange" : true,// 每行显示记录数
                                         "bInfo" : true,// Showing 1 to 10 of 23 entries 总记录数没也显示多少等信息
                                         "bWidth":true,
                                         "iDisplayLength" : 10,// 每页显示行数
                                         "bStateSave": true,//状态保存
                                         "processing": true, //打开数据加载时的等待效果
                                         "serverSide": true,//打开后台分页
                                         "sAjaxSource": "/order/list",
                                         "fnServerData": retrieveData,
                                         "columns": [
                                             { "mData": "orderId", 'sClass':'log-align', "bSortable": false},
                                             { "mData": "pin", 'sClass':'log-align', "bSortable": false},
                                             { "mData": "jingtiaoOrderDetailSkuVos",'sClass':'log-align', "bSortable": false,"mRender" : function(data, type, full) {
                                                var skulist="";
                                                     for (var i = 0; i < data.length; i++) {
                                                        skulist+="<div>"+data[i].skuId+"</div>";
                                                    }
                                                 return skulist;
                                             }},
                                             { "mData": "jingtiaoOrderDetailSkuVos",'sClass':'log-align', "bSortable": false,"mRender" : function(data, type, full) {
                                                var comm="";
                                                     for (var i = 0; i < data.length; i++) {
                                                         var ygCosFee= !data[i].ygCosFee ? 0 : data[i].ygCosFee;
                                                         var price = !data[i].price ? 0: data[i].price;
                                                         var commissionRate = !data[i].commissionRate ?  0: data[i].commissionRate;
                                                        comm+="<div>"+ygCosFee+"元&nbsp;&nbsp;&nbsp;&nbsp;价格:"+price+"元&nbsp;&nbsp;&nbsp;&nbsp;佣金比例:"+commissionRate+"%</div>";
                                                    }
                                                 return comm;
                                             }},
                                            { "mData": "jingtiaoOrderDetailSkuVos",'sClass':'log-align', "bSortable": false,"mRender" : function(data, type, full) {
                                                var userId="";
                                                     for (var i = 0; i < data.length; i++) {
                                                         var jingtiaoUserId= !data[i].jingtiaoUserId ? "" : data[i].jingtiaoUserId;
                                                        userId+="<div>"+jingtiaoUserId+"</div>";
                                                    }
                                                 return userId;
                                             }},
                                             { "mData": "createTime", 'sClass':'log-align', "bSortable": false,"mRender" : function(data, type, full) {

                                                 return "<div>下单时间："+full.orderTimeStr+"</div><div>完成时间："+full.finishTimeStr;
                                             }},
                                             { "mData": "orderState", 'sClass':'log-align', "bSortable": false, "mRender" : function(data, type, full) {
                                                 var stateStr;
                                                 switch(data){
                                                      case 0: stateStr="无效";
                                                      break;
                                                      case 1:stateStr="完成";
                                                      break;
                                                      case 2:stateStr="已付款";
                                                      break;
                                                      case 3:stateStr="待付款";
                                                      break;
                                                      default: stateStr="未知"; 
                                                      break;
                                                 }
                                                 return stateStr;
                                             }}

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
function retrieveData( sSource,aoData, fnCallback) {
    var pageNo = aoData[3].value/aoData[4].value+1;
    var pageSize = aoData[4].value;
    requestData.pageNo=pageNo;
    requestData.pageSize=pageSize;
    $.ajax({
               url : sSource,//这个就是请求地址对应sAjaxSource
               data : requestData,//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
               type : 'get',
               dataType : 'json',
               async : false,
               cache: false,	//禁用缓存
               success : function(result) {
                   var returnData = {};
                   if(result.code ==200){
                       returnData.draw = aoData.draw;
                       returnData.recordsTotal = result.data.total; //返回数据全部记录
                       returnData.recordsFiltered = result.data.total; //后台不实现过滤功能，每次查询均视作全部结果
                       returnData.data = result.data.result; //返回的数据列表
                       fnCallback(returnData);//把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
                   }else{
                       alert("code:"+result.code+"message:"+result.message);
                   }

               },
               error : function(msg) {
               }
           });
}
function query_order (req_data){
    userId = $('#input_userId').val();
    orderId = $('#input_orderId').val();
    orderStatus =  $('#input_state').val(); //订单状态 0全部
    startDate = $('#input_startTime').val(); //查询开始时间
    endDate =  $('#input_endTime').val();  //查询结束时间
    if(userId){
        requestData.userId=userId;
    }else{
        delete requestData["userId"];
    }
    if(orderId){
        requestData.orderId=orderId;
    }else {
        delete requestData["orderId"];
    }
    if(orderStatus){
        requestData.orderStatus=orderStatus;
    }else {
        delete requestData["orderStatus"];
    }
    if(startDate){
        requestData.startDate=startDate;
    }else{
        delete requestData["startDate"];
    }
    if(endDate){
        requestData.endDate=endDate;
    }else{
        delete requestData["endDate"];
    }
    console.log(requestData);
    table.fnDraw();
}
//判断该对象是否是正的整数组成
function isPositiveInteger(number) {
    var result = false;
    var reg = /^[0-9]*[1-9][0-9]*$/;
    if(reg.test(number)) {
        result = true;
    }
    return result;
}
