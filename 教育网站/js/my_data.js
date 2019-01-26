
$(function(){
	//订单菜单导航鼠标hover效果
	$(".my_registration").hover(function(){
		$('.my_registration i').css("background-image","url(img/my_order2.png)");
	},function(){
		$('.my_registration i').css("background-image","url(img/my_order1.png)");
	});
	
	//手机号码
	var mobile = $(".phone_number").text();
	var mphone = mobile.substr(0,3) +"****"+ mobile.substr(7)
	$('.phone_number').text(mphone);
	
})
                      




