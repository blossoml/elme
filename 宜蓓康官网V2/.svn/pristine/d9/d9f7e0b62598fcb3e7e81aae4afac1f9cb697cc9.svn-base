$(document).ready(function(){  
   // $(".p2").addClass("animated").addClass("slideInUp");
    //$(".p1").addClass("animated").addClass("slideInDown");
   // $(".p2").on('animationend', function() { 
        var comtainer = document.querySelector('.swiper-container');  
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',       
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            effect: 'fade',       
            loop:true,
            autoplay:1200,
        });
        comtainer.onmouseenter = function () {
        swiper.stopAutoplay();
        };
        comtainer.onmouseleave = function () {
        swiper.startAutoplay();
        }  
    // })
  
  /*产业化平台动画*/
   $(".chanye_li").hover(function(){	
        $(this).find(".shuzi").css("color","#fff");
        $(this).find(".firstcen").stop().animate({
            height:0
           },300);
        $(this).find(".outer_circle").stop().animate({
        	opacity:1
        },300);       
        $(this).find(".shuzi").stop().animate({
        	top:"171px"     	
        },300);
        $(this).find(".inner_circle").stop().animate({
          top:0
        })
        $(this).find(".dot").css("display","none");
        $(this).find(".zhezhao").stop().animate({ 
                   height:"410px"
        },300);
        $(this).find(".zhezhao2").stop().animate({
           top:0
        },300);
    },function(){
        $(this).find(".firstcen").stop().animate({
            height:"410px"
           },300)       
        $(this).find(".zhezhao").stop().animate({ 
                   height:0
        },300);
        $(this).find(".zhezhao2").stop().animate({
           top:"-410px"
        },300);   
        $(this).find(".outer_circle").stop().animate({
        	opacity:0
        },300);
        $(this).find(".inner_circle").stop().animate({
          top:"-60px"
        },300)
        $(this).find(".shuzi").stop().animate({
        	top:"222px"    	
        },300);
        $(this).find(".dot").css("display","block");
        $(".zhezhao").stop().animate({ 
                   height:"0"
        },300); 
        $(this).find(".shuzi").css("color","#666")   
    })
    /**核心业务动画 */
    $(".hexin_li").hover(function(){        
        $(this).find(".hexin_hr").stop().animate({
            opacity: 1,
            width: "100%"
        }, 350);
        $(this).find(".hexin_p1").stop().animate({
            top: "-20px"
        }, 300);     
        $(this).find(".hexin_p2").stop().animate({
                top: "-20px"
        }, 400);          
        $(this).find(".hexin_detail").stop().animate({
                top: "-20px"
         }, 500);       
    },function(){
        $(this).find(".hexin_hr").stop().animate({
            opacity: 0,
            width: 0
        }, 350);
        $(this).find(".hexin_p1").stop().animate({
            top:0
        }, 300);     
        $(this).find(".hexin_p2").stop().animate({
                top:0
        }, 400);          
        $(this).find(".hexin_detail").stop().animate({
            top:0
        }, 500);       
    })
    /**业务范围动画 */
    $(".divli").hover(function(){
        $(this).find(".wenzi2").stop().animate({
            height:"100%",
            bottom:0
        },200)
        $(this).find(".wenzi1").stop().animate({
           bottom:"-100px"
        },200)
    },function(){
        $(this).find(".wenzi2").stop().animate({
            height:0,
            bottom:"100px"
        },200)
        $(this).find(".wenzi1").stop().animate({        
            bottom:0
        },200)
    })
});

