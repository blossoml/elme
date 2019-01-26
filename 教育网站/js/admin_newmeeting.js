$(function(){
	//点击关闭二级目录
	$(".ddqr .xzhy i").click(function(){
		window.location.href = "admin_meeting.html";
	})
	
    var editor;
	KindEditor.ready(function (K) {
	    editor = K.create('#ArticleHtml', {
	        allowFileManager: true,
	        allowUpload: true,
	        fileManagerJson: '/KindEditor/ProcessRequest',
	        uploadJson: '/KindEditor/UploadImage',
	        urlType: "domain"
	    });
	});
})







