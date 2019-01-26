
$(function(){

	$(".nav_tx").hover(function(){
		$(".nav_ejcd").css("display","block")
	},function(){
		$(".nav_ejcd").css("display","none")
	})
	// nav二级菜单
    $(".nav_dh li a").click(function () {
        $(this).addClass("active").parents().siblings("li").find("a").removeClass("active");    	
    });
    //二级菜单点击跳转页面
	$(".my_registration").click(function(){
		window.location.href="my_registration.html"
	});
	$(".my_data").click(function(){
		window.location.href="my_data.html"
	});
	$(".tuichu").click(function(){
		$(".nav_tx").hide();
		$(".login_div").show();
	});
   	
   	$(".login_div span").click(function(){
		window.location.href="login.html"
	});


    
   
})


