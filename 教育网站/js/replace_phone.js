
$(function(){
	//订单菜单导航鼠标hover效果
	$(".my_registration").hover(function(){
		$('.my_registration i').css("background-image","url(img/my_order2.png)");
	},function(){
		$('.my_registration i').css("background-image","url(img/my_order1.png)");
	});
	//点击关闭二级目录
	$(".ddqr .ghsj i").click(function(){
		window.location.href = "my_data.html";
	})
	
})
                      




