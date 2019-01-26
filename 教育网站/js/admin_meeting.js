
$(function(){
	
	
	//支付方式切换
	$(".pay_way span").click(function(){
		$(this).addClass("pay_ys").siblings().removeClass("pay_ys");
		
	});
	//支付方式
	$(".qr_btn").click(function(){
		$(".zhezhaocen ").show();
		if($("span.weixin").hasClass("pay_ys")){
			$(".weixin_pay").show();
			$(".zhifubao_pay").hide();
		}else if($("span.zhifubao").hasClass("pay_ys")){
			$(".weixin_pay").hide();
			$(".zhifubao_pay").show();
		}
	});
	$(".zhezhaocen").click(function(){
		$(".zhezhaocen ,.weixin_pay , .zhifubao_pay").hide();
	});
	
})
                      




