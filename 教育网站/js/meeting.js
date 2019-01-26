
$(function(){
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
	$('.meeting_div').click(function(){
		//window.location.href="meeting_buy.html"
		window.open('meeting_buy.html')
	})
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

	
	
})


























