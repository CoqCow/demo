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

			$(".tabNav li").click(function(){
				var index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				$(".tabContent .pageWrap ").eq(index).show().siblings(".pageWrap").hide();
			});



    	}

    };
