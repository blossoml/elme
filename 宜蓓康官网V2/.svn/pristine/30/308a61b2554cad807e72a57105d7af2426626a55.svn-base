$(document).ready(function () {
    var $items = $(".news_list");
    $items.hover(function () {      
        $(this).addClass("active");
        $(this).stop().animate({
            top:"-20px"
        }, 500);
        $(this).find(".slider").stop().animate({
            left:"0",
            "z-index":"900"
        }, 300);
    }, function () {
        // out
        $(this).removeClass("active");
        $(this).stop().animate({
            top:"0"
        }, 500);
        $(this).find(".slider").stop().animate({
            left:"-140px"
        }, 300);
    }
    );
})

