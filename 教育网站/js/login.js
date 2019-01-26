
$(function(){

	//支付方式切换
	$(".qiehuan span").click(function(){
		$(this).addClass("qiehuan_active").siblings().removeClass("qiehuan_active");
		var index=$(this).index();
		$(".register_loginer>div").eq(index).show().siblings().hide();
	})
	
	
})
//手机验证码的JS
	var InterValObj; //timer变量，控制时间
	var count = 60; //间隔函数，1秒执行
	var curCount;//当前剩余秒数
	function SendMessage(){  //1.获取旧手机验证码
		var json={Mobile:gp.request.Mobile};
		AjaxCommonPost("/CommonApi/v1/SendMessage/SendOldPhoneCode", json, function (result) {
			//debugger;
			if (result && result.IsSucceed) {
				//设置button效果，开始计时
	            curCount = count;
	            $(".hqyzm").attr("disabled", "true");
	            $(".hqyzm").val(curCount + "秒");
	            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	            alert(result.Msg);
			}else {
	            alert(result.Err);
	        }
		});
	};

//timer处理函数
	function SetRemainTime() {
	    if (curCount == 0) {
	        window.clearInterval(InterValObj);//停止计时器
	        $(".hqyzm").removeAttr("disabled");//启用按钮
	        $(".hqyzm").val("获取验证码");
	    }
	    else {
	        curCount--;
	        $(".hqyzm").val(curCount + "秒");
	    }
	}		