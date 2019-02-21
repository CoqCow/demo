    $(function(){

        plan.init();
    })

    var plan = {
    	init:function(){
    		this.render();
    	},
    	render:function(){
			this.bindevent();
    	},
    	bindevent:function(){
			$("#createPlan1").click(function(){
					$("#myPopup").show();

			});
			//
			$("#createPlan2").click(function(){
				$("#infoWrapperBody").hide();
					$("#infoWrapper").show();
			});
			$("#saveBtn").click(function(){
					var tbHtml = '<tr data-id="5091"><td class="listCheckbox"><ul class="checkbox-group" ref="checkbox"><li class="checkbox-option multiple" data-id=""><span class="checkbox"></span><span class="checkbox-label"></span></li></ul></td><td>plan_001</td><td>5091</td><td>0</td><td>0</td><td>0%</td><td>0</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr>';
					var tips = $(this).attr("tips");
					$("#tBody2").append(tbHtml);
					$("#infoWrapper").hide();
					$("#infoWrapperBody").show();
			});
			$("#detail-edit-cancel").click(function(){
					$("#infoWrapper").hide();
					$("#infoWrapperBody").show();
			});

			$("#popOK").click(function(){
					var tbHtml = '<tr data-id="5091"><td class="listCheckbox"><ul class="checkbox-group" ref="checkbox"><li class="checkbox-option multiple" data-id=""><span class="checkbox"></span><span class="checkbox-label"></span></li></ul></td><td>plan_001</td><td>5091</td><td>0</td><td>0</td><td>0%</td><td>0</td><td>0.00</td></tr>';
					var tips = $(this).attr("tips");
					$("#tBody").append(tbHtml);
					$("#myPopup").hide();
			});
			$("#popClose").click(function(){
					$("#myPopup").hide();
			});
			$("#adPlanList .advertise-header li").click(function(){
				var index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				$(".advertise-content-wrapper").eq(index).show().siblings(".advertise-content-wrapper").hide();
			});



    	}

    };
