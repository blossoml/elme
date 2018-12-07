(function(doc,win){
    var docEl=doc.documentElement,//获取文档节点
    /*判断窗口调整大小的事件*/
    resizeEvent='orientationchange' in window ?'orientationchange': 'resize',
    calc=function(){
        var clientWidth=docEl.clientWidth;
        if(clientWidth) return;
        docEl.style.fontSize=20*(clientWidth/320)+'px';/*320px宽度的字体大小为20px,分成16份*/
    }
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvent,calc,false);
    doc.addEventListener('DOMContentLoaded')
})(document,window);

/*关于domcontentLoaded的解释:
js的执行会受到标签前面样式文件的影响。如果在标签前面有样式文件，需要
样式文件加载并解析完毕后才能执行脚本，这是因为js可以查询对象的样式。
为了减少渲染被阻塞的情况，现代游览器都使用了预加载。当解析被阻塞时候,
游览器会有一个轻量级扫描器继续扫描，查找那些可能用到的url，在渲染器使用之前
将其下载下来。
DOMContentLoaded所计算的事件就是。当文档中没有脚本时候，游览器解析完文档
便能触发DOMContentLoaded事件。如果文档中包含脚本，则脚本会阻塞文档解析，
而脚本需要等位于脚本前面css加载完才能执行。在任何情况下。DOMContentLoaded
的触发不需要等图片等其他资源加载完成，
load事件，页面上所有被加载完后触发。$(function(){}),ready事件就是DOMContentLoaded
事件。写在ready方法内，就是页面被解析后，我们就可以访问整个页面所有dom元素，
缩短页面交互时间，提高页面体验
*/
