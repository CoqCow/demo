var treeData = null;
$(function () {
    $('body').off('click','#showLimitAreaModel').on('click','#showLimitAreaModel', function () {
        var query = {};
        var skuId = $(this).attr('data-skuid');
        skuId && (query.skuId = skuId);
        initLimitAreaModel(query);
    });
});

/**
 * @description 初始化限购区域弹窗
 */
function initLimitAreaModel (query) {
    $('#limitAreaModel').modal('show');

    var treeId = 'limitAreaTree';
    var treeDom = $('#'+treeId);
    treeDom.removeClass('error').addClass('loading');
    loadTree(function (res) {
        treeData = res;

        var tree = $.fn.zTree.getZTreeObj(treeId);
        tree && tree.destroy();
        tree = initTree(treeId, res);
        loadTreeChecked(query, function (res) {
            checkedTree(tree, res);
            treeDom.removeClass('error').removeClass('loading');
        }, function (){
            treeDom.removeClass('loading').addClass('error');
        });
    }, function (){
        treeDom.removeClass('loading').addClass('error');
    });
}

/**
 * @description 加载tree数据
 * @param {Function} fn 异步加载完成后回调函数
 */
function loadTree (fn, fnerror) {
    if (treeData !== null && typeof fn === 'function') {
        fn.call(this, treeData);
        return ;
    }

    $.ajax({
               type:"post",
               dataType: "json",
               url:"/common/area/List",
               async:true,
               success: function (res) {
                   if (typeof fn === 'function') {
                       fn.call(this, res.areaListMappingViews);
                   }
               },
               error: function(err) {
                   if (typeof fnerror === 'function') {
                       fnerror.call(this, err);
                   }
               }
           });
}

/**
 * @description 加载tree中选中checked选中值
 * @param {Function} fn 异步加载完成后回调函数
 */
function loadTreeChecked (query, fn, fnerror) {
    if (!query) {
        query = {};
    }
    $.ajax({
               type:"post",
               dataType: "json",
               url:"/active/query/area?&skuId="+query.skuId,
               async:true,
               success: function (res) {
                   if (typeof fn === 'function') {
                       var data = {};
                       $.each(res, function(key, item){
                           $.extend(true, data, item);
                       });
                       fn.call(this, data);
                   }
               },
               error: function(err) {
                   if (typeof fnerror === 'function') {
                       fnerror.call(this, err);
                   }
               }
           });
}

/**
 * @description 初始化树
 * @param {String} id
 * @param {Object} data
 */
function initTree (id, data) {
    var setting = {
        view: {
            selectedMulti: false,
            showIcon: false
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "ps", "N": "ps" }
        },
        data: {
            key: {
                name: "name",
                children: "children"
            },
            simpleData: {
                enable: true
            }
        }
    };
    return $.fn.zTree.init($('#'+id), setting, data);
}


function checkedTree (tree, data) {
    $.each(data, function(id, item) {
        var node = tree.getNodesByParam('id', id, null)[0];
        if (Object.prototype.toString.call(node) === "[object Object]") {
            tree.checkNode(node, true, true);
        }
    });
}