
$(function(){
	$(".meeting_nav a").click(function(){
		$(this).addClass("djys").siblings().removeClass("djys");
		var index = $(this).index();
		$(".meeting_dh>div").eq(index).show().siblings().hide();
	})
	

	
	
})


























