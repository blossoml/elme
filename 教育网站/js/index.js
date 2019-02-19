
$(function(){
	
	//学习4大板块
    $('.four_plate li .plate_div').hover(function(){
		$(this).stop().animate({
			top:'-30',
		},300);
		$(this).css("box-shadow", "0 0 20px 3px #ddd");
	},function(){
    	$(this).stop().animate({
			top:'0',
		},300);
		$(this).css("box-shadow", "0 0 0");
	});
	
	//培训会议
	$('.meeting_div').hover(function(){
		$(this).stop().animate({
			top:'-30',
		},300);
		$(this).css({"border":"8px solid #18599e","box-shadow": "0 0 30px 3px #ddd" ,"cursor":"pointer"});
	},function(){
    	$(this).stop().animate({
			top:'0',
		},300);
		$(this).css({"border":"8px solid #fff","box-shadow": "0 0 0"});
	});
	//控制培训会议标题文字多少
	$(".meeting_htitle").each(function(){
		var maxwidth=12;
		if($(this).text().length>maxwidth){
			$(this).text($(this).text().substring(0,maxwidth));
			$(this).text($(this).text()+"...");
		}
	});
	//控制培训会议内容文字多少
	$(".meeting_nr").each(function(){
		var maxwidth=45;
		if($(this).text().length>maxwidth){
			$(this).text($(this).text().substring(0,maxwidth));
			$(this).text($(this).text()+"...");
		}
	});
	//培训会议点击跳转页面
	$(".meeting_div").click(function(){
		//window.location.href="meeting_buy.html"
		window.open('meeting_buy.html')
	});
	
	lunbo();//banner轮播
	
	
})

//banner轮播
var i = 0;
var timer;  
function lunbo(){
	$(".banner_img").eq(0).show().siblings().hide();//第一张图片显示 其余的图片隐藏
	$(".work_units>div").eq(0).show().siblings().hide();
		mStrat();
    $("#tabs li").hover(function () {//鼠标移上去之后
        clearInterval(timer);//停止计时器
        i=$(this).index();//获取当前鼠标放上去的下标
        Show();
    }, function () {//鼠标离开之后
        mStrat();
    });
    $(".prev_page").click(function () {//点击左箭头的时候执行的事件
        clearInterval(timer);//停止计时器
        i--;
        if (i == -1) {
            i = 2;
        }
            Show();
            mStrat();
    });
    $(".next_page").click(function () {
        clearInterval(timer);//停止计时器
        i++;
        if (i == 3) {
            i = 0;
        }
        Show();
        mStrat();
    });
    
}
function Show() {
	//$(".banner_img").eq(i).show().siblings().hide();
    $(".banner_img").eq(i).stop(true,true).fadeIn(300).siblings().stop(true,true).fadeOut(300);
    $(".work_units>div").eq(i).show().siblings().hide();
    $("#tabs li").eq(i).addClass("bg").siblings().removeClass("bg");//添加和移除li的背景
}
function mStrat() {
    timer = setInterval(function () {//计时器 间隔3秒针 执行下一张图片
        i++;
        if (i == 3) {
            i = 0;
        }
       // Show();
    }, 3000);
}












//$(function(){
//	template.config("escape", false); 
//	//banner轮播开始
//	var n=0;
//	var imgLength=$(".b-img a").length;
//	var ctWidth=imgLength*100;
//	var itemWidth=1/imgLength*100;
//	$(".b-img").width(ctWidth+"%");
//	$(".b-img a").width(itemWidth+"%");
//	$(".b-list").width(imgLength*60);
//	if(imgLength>1)
//	{
//		for(var i=0;i<imgLength;i++){
//			var listSpan=$("<span></span>")
//			$(".b-list").append(listSpan);
//		}
//	}
//	$(".b-list span:eq(0)").addClass("spcss").siblings("span").removeClass("spcss");
//
//	$(".b-list span").click(function(){
//		var lsIndex=$(this).index();
//		n=lsIndex;
//		var ctPosit=n*100;
//		$(".b-img").animate({"left":"-"+ctPosit+"%"},400);
//		$(this).addClass("spcss").siblings("span").removeClass("spcss");
//		})
//	function rollEnvent(){
//			if(n==imgLength-1)
//			{
//				var ctPosit=(n+1)*100;
//				$(".banner").append($(".b-img").clone());
//				$(".b-img:last").css("left","100%");
//				$(".b-img:first").animate({"left":"-"+ctPosit+"%"},1000);
//				$(".b-img:last").animate({"left":"0"},1000);
//				var setTime0=setTimeout(function () {
//	            $(".banner .b-img:first").remove();
//	            }, 1000);
//				n=0;
//				$(".b-list span:eq(0)").addClass("spcss").siblings("span").removeClass("spcss");
//				}
//			else{
//				n++;
//				var ctPosit=n*100;
//				$(".b-img").animate({"left":"-"+ctPosit+"%"},1000);
//				$(".b-list span:eq("+n+")").addClass("spcss").siblings("span").removeClass("spcss");
//			}
//		}
//	var slidesetInterval=setInterval(rollEnvent,3000);
//	$(".banner").hover(function(){
//		clearInterval(slidesetInterval);
//	},function(){
//		slidesetInterval=setInterval(rollEnvent,3000);
//	});
//	//banner轮播结束
//
//	
//
//	
//	//查看更多按钮
//	$(".ckgd_btn i").hide();
//	$(".ckgd_btn").hover(function(){
//		$(".ckgd_btn ").css('color','#fff');
//		$(".ckgd_btn i").show();
//	},function(){
//		$(".ckgd_btn i").hide();
//	})
//	
////产业报告点击图片轮播开始
////  //前一张
////  $('.cpbg_nr_prev').click(function () { 
////   	$(".cpbg_nr_xq ul.cpbg_nr_lb").children().last().prependTo($(".cpbg_nr_xq ul.cpbg_nr_lb"));//把ul的最后一个子元素添加到开头第一个
////      $(".cpbg_nr_xq ul.cpbg_nr_lb").css('marginLeft','-372px');  //初始化把ul的marginleft左移220
////      $(".cpbg_nr_xq ul.cpbg_nr_lb").stop().animate({marginLeft:"0px"},500);          
////  })
////  //下一张
////  $('.cpbg_nr_next').click(function () { 
////   	$(".cpbg_nr_xq ul.cpbg_nr_lb>li").eq(0).appendTo($(".cpbg_nr_xq ul.cpbg_nr_lb"));  //把ul的最后一个子元素添加到开头第一个
////      $(".cpbg_nr_xq ul.cpbg_nr_lb").css('marginLeft','0px');  //初始化把ul的marginleft左移220
////      $(".cpbg_nr_xq ul.cpbg_nr_lb").stop().animate({marginLeft:"-402px"},500);          
////  })
//	//下一张
//	//	$('.cpbg_nr_next').click(moveLeft);
//	//  function moveLeft(){
//	//	     $(".cpbg_nr_xq ul.cpbg_nr_lb").stop().animate({marginLeft:"-372px"},500, function () {  
//	//	            $(".cpbg_nr_xq ul.cpbg_nr_lb>li").eq(0).appendTo($(".cpbg_nr_xq ul.cpbg_nr_lb"));  
//	//	            $(".cpbg_nr_xq ul.cpbg_nr_lb").css('marginLeft','0px');  
//	//	        });  
//	//	   }
//	    // 自动轮播
//	//	var timer = setInterval(moveLeft,3000)
//	//  //hover时停掉定时器
//	// $('.gameTab').mouseenter(function(){
//	//  clearTimeout(timer)
//	// })
//	// $('.gameTab').mouseleave(function(){
//	//  timer=setInterval(moveLeft,3000)
//	// })
////产业报告点击图片轮播结束
//        
////专家寄语点击图片轮播开始
//	var i = 0;
//	$(".zj_jsnr li").eq(0).show().siblings().hide();
//  //前一张	
//	$('.og_prev i').click(function () { 
//   	$(".zjdiv_photo ul.zj_photo").children().last().prependTo($(".zjdiv_photo ul.zj_photo"));//把ul的最后一个子元素添加到开头第一个
//      $(".zjdiv_photo ul.zj_photo").css('marginLeft','0px');  //初始化把ul的marginleft左移220
//      $(".zjdiv_photo ul.zj_photo").stop().animate({marginLeft:"0px"},500);  
//      i--;
//      if (i == -1) {
//          i = 2;
//      }
//      $(".zj_jsnr li").eq(i).show().siblings().hide();
//  })
//  //下一张
//  $('.og_next i').click(function () { 
//   	$(".zjdiv_photo ul.zj_photo>li").eq(0).appendTo($(".zjdiv_photo ul.zj_photo"));  //把ul的最后一个子元素添加到开头第一个
//      $(".zjdiv_photo ul.zj_photo").css('marginLeft','0px');  //初始化把ul的marginleft左移220
//      $(".zjdiv_photo ul.zj_photo").stop().animate({marginLeft:"0px"},500); 
//      i++;
//      if (i == 3) {
//          i = 0;
//      }
//      $(".zj_jsnr li").eq(i).show().siblings().hide();
//  })
//  
//
//  
//  LoadcpbgData();
//  LoadTeamData()
//	
//})
//
///**
// * 产业报告列表开始
// * @param {array 产业报告} cpbglists 
// */
//function LoadcpbgData(){
//	//ArticleType=gp.request.ArticleType;
//	AjaxPost("http://wb.e100com.com/Api/Research/ResearchArticle/LoadResearchArticleList", {}, function (result) {
//		if (result && result.IsSucceed) {
//			var data = result.Data;
//			if (data) {				
//				if (data.list && data.list.length > 0) {
//					BindcpbgDom(data.list.slice(0,4));
//				}
//			}
//			cpbglb();
//		}
//		
//	});
//}
//function BindcpbgDom(cpbglists) {
//	var template_html="";
//	template_html = template("cpbglists_template", { cpbglists: cpbglists });
//	$('#cpbglists_dom').html(template_html);
//}
////产业报告列表轮播
//function cpbglb(){
//	//产业报告
//	$(".cpbg_tp").hover(function() {
//		$(this).find("img").stop().animate({"width":392,"height":220});
//		$(this).find(".tp_zzc").css("display","block");
//	}, function() {
//		$(this).find("img").stop().animate({"width":372,"height":200});
//		$(this).find(".tp_zzc").css("display","none");
//	})
//	//前一张
//  $('.cpbg_nr_prev').click(function () { 
//   	$(".cpbg_nr_xq ul.cpbg_nr_lb").children().last().prependTo($(".cpbg_nr_xq ul.cpbg_nr_lb"));//把ul的最后一个子元素添加到开头第一个
//      $(".cpbg_nr_xq ul.cpbg_nr_lb").css('marginLeft','-372px');  //初始化把ul的marginleft左移220
//      $(".cpbg_nr_xq ul.cpbg_nr_lb").stop().animate({marginLeft:"0px"},500);          
//  })
//  //下一张
//  $('.cpbg_nr_next').click(function () { 
//   	$(".cpbg_nr_xq ul.cpbg_nr_lb>li").eq(0).appendTo($(".cpbg_nr_xq ul.cpbg_nr_lb"));  //把ul的最后一个子元素添加到开头第一个
//      $(".cpbg_nr_xq ul.cpbg_nr_lb").css('marginLeft','0px');  //初始化把ul的marginleft左移220
//      $(".cpbg_nr_xq ul.cpbg_nr_lb").stop().animate({marginLeft:"-402px"},500);          
//  })
//  //控制标题文字多少
//	$(".cpbg_title_nr").each(function(){
//		var maxwidth=58;
//		if($(this).text().length>maxwidth){
//			$(this).text($(this).text().substring(0,maxwidth));
//			$(this).html($(this).html()+"...");
//		}
//	});
//  
//}
///**
// * 产业报告列表结束
// */
//
///**
// * 团队介绍列表开始
// * @param {array 团队介绍} teamlists 
// */
//function LoadTeamData(){
//
//	AjaxPost("http://wb.e100com.com/Api/Research/TeamPerson/LoadList", {}, function (result) {
//		if (result && result.IsSucceed) {
//			var data = result.Data;
//			if (data) {				
//				if (data.list && data.list.length > 0) {
//					BindTeamListDom(data.list.slice(0,4));
//				}
//			}
//			teamCss();
//		}
//		
//	});
//}
//
//function BindTeamListDom(teamlists) {
//	var template_html="";
//	template_html = template("our_team_template", { teamlists: teamlists });
//	$('#our_team_dom').html(template_html);
//}
//function teamCss(){
//	 //控制我们的团队文字多少
//	$(".dd_jieshao span").each(function(){
//		var maxwidth=27;
//		if($(this).text().length>maxwidth){
//			$(this).text($(this).text().substring(0,maxwidth));
//			$(this).html($(this).html()+"...");
//		}
//	});
//	//团队图片
//  $('.our_team_nr li').hover(function(){
//  	$(this).stop().animate({
//			bottom:'5',
//		},300);
//		$('.dixian',this).stop().css('height','3px');
//		$('.dixian',this).stop().animate({
//			left:'0',
//			width:'100%',
//			right:'0'
//		},300);
//		$(this).css("box-shadow", "0 0 10px 1px #ddd");
//	},function(){
//		$(this).css("box-shadow", "0 0 0");
//  	$(this).stop().animate({
//			bottom:'0',
//		},300);
//		$('.dixian',this).stop().animate({
//			left:'0',
//			width:'0'
//		},300);
//	});
//}
/**
 * 团队介绍列表结束
 *  
 */























