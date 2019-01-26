
$(function(){
	//订单菜单导航鼠标hover效果
	$(".personal_data ").hover(function(){
		$('.personal_data i').css("background-image","url(img/personal_data2.png)");
	},function(){
		$('.personal_data i').css("background-image","url(img/personal_data1.png)");
	});
	//点击弹出详情层
	$(".more_axq").click(function(){
		$(".zhezhaocen ,.details_div").show();
	});
	$(".guanbi").click(function(){
		$(".zhezhaocen ,.details_div").hide();
	})
})
  

