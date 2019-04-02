$(function(){
    $(".imgW").hover(function(){
        $(this).find(".mengban").show();
        $(this).find(".inner_p").show();  
        //图片放大
        $(this).find(".imgBox").css("transform","scale(1.1)")
        $(this).find(".p1").removeClass("fadeOutUp").addClass("fadeInDown");
        $(this).find(".p2").removeClass("fadeOutDown").addClass("fadeInUp");
        $(this).find(".p18 p").removeClass("fadeInUp").addClass("fadeOutDown");
    },function(){
        //图片还原
        $(this).find(".imgBox").css("transform","scale(1)");
       
        $(this).find(".mengban").hide();
        $(this).find(".p1").removeClass("fadeInDown").addClass("fadeOutUp");
        $(this).find(".p2").removeClass("fadeInUp").addClass("fadeOutDown");
        $(this).find(".p18 p").removeClass("fadeOutDown").addClass("fadeInUp");
    })
})