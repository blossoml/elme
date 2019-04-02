$(function(){
 $(".left_ul").on("click","li",function(){
   $(".jieshao>div").hide();
   $(".jieshao>div").eq($(this).index()).show();
 })
})