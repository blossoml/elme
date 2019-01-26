
$(function(){
	$(".close_btn").click(function(){       
		if($(".chryxx_div").length==1){
			alert("必须保留1个");
			$(".close_btn").removeAttr('onclick');
			return ;
		}
	});
})

function add_hybtn(){
//	var x = document.getElementById("chryxx_div");
//	var chryxx_div= x.innerHTML;
	//var chryxx_div= $("#chryxx_div").html();
	var chryxx_ddiv=$("#chryxx_div").clone();
	$(".chryxx").append(chryxx_ddiv);
	$(".close_btn").click(function(){       
		if($(".chryxx_div").length==1){
			alert("必须保留1个");
			$(".close_btn").removeAttr('onclick');
			return ;
		}else{
			$(this).parents("#chryxx_div").remove();
			
		}
	});
	
}
 
          

              













