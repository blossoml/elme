import { EWOULDBLOCK } from "constants";

/**
 * 存储localStorage
 */
export const setStore=(name,content)=>{
    if(!name) return;
    if(typeof content!=='string'){
        content=JSON.stringify(content);
    }
    window.localStorage.setItem(name,content);
}
/**
 * 获取localStorage
 */
export const getStore=name=>{
 if(!name) return;
 return window.localStorage.getItem(name);
}
/**
 * 删除localStorage
 */
export const removeStore=name=>{
    if(!name) return;
    window.localStorage.removeItem(name);
}
/**
 *  获取style样式，style.border只能获取行内样式，获取不到外部的样式
 * 
 */  
/*
export const getStyle=(ele,attr,NumberMode = 'int')=>{
    let target;
    if(attr==='scrollTop'){
        target=ele.scrollTop;
    }else if(ele.currentStyle){
        target=ele.currentStyle[attr];
    }else{
        target= document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取opacity时需要获取小数parseFloat
    return NumberMode=='float'? parseFloat(target) : parseInt(target);
}*/
export const loadMore={
    directives:{
        'load-more':{
            bind(el,binding){
                let windowHeight = window.screen.height;
				let height;
				let setTop;
				let paddingBottom;
				let marginBottom;
				let requestFram;
				let oldScrollTop;
				let scrollEl;
				let heightEl;
				let scrollType = el.attributes.type && el.attributes.type.value;
                let scrollReduce = 2;
                if(scrollType==2){
                    scrollEl = el;
					heightEl = el.children[0];
                }else {
					scrollEl = document.body;//body元素
					heightEl = el;
                }
                el.addEventListener('touchstart', () => {
					height = heightEl.clientHeight;
					if (scrollType == 2) {
						height = height
					}
					setTop = el.offsetTop;
					paddingBottom = getStyle(el, 'paddingBottom');
					marginBottom = getStyle(el, 'marginBottom');
                }, false)
                el.addEventListener('touchmove', () => {
					loadMore();
                }, false)
                el.addEventListener('touchend', () => {
					oldScrollTop = scrollEl.scrollTop;
					moveEnd();
                }, false)
                const moveEnd = () => {
					requestFram = requestAnimationFrame(() => {
						if (scrollEl.scrollTop != oldScrollTop) {
							oldScrollTop = scrollEl.scrollTop;
							moveEnd()
						} else {
                            cancelAnimationFrame(requestFram);
                            //重新数据元素取高度
							height = heightEl.clientHeight;
							loadMore();
						}
					})
                }
                const loadMore = () => {
					if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
						binding.value();
					}
				}
             }
        }
    }
}
/**
 * 改变css的位置
*/
export const cssTransform=(el,attr,val)=>{
    if(!el.transform){
		el.transform = {};
	}
    if(val==0||val!=undefined) {
        let sVal="";
        el.transform[attr]=val;       
        for(var s in el.transform)
        { switch(s){
                case "rotate":
				case "skewX":
				case "skewY":
                    sVal +=s+"("+el.transform[s]+"deg) ";
                case "translateX":
                case "translateY":
                case "translateZ":
                    sVal +=s+"("+el.transform[s]+"px) ";
                    break;   
                case "scaleX":
                case "scaleY":
                case "scale": 
                    sVal +=s+"("+el.transform[s]+") ";
                    break;	
            }                   
        } //设置transform 的值
         el.style.WebkitTransform = el.style.transform = sVal;   
    }else{
        val  = el.transform[attr];
        if(typeof val == "undefined" ) {
			if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
				val = 1;
			} else {
				val = 0;
			}
		}
		return val;
    }
} 
/**
 *滑动行为
 *最大移动距离为document.querySelector('.scroll').offsetHeight+document.querySelector('#foot_guide').offsetHeight-667
 */
/**
 *noBack： 没有回弹效果
  dis:剩余空间,
  wrap:固定高度元素
  child:非固定高度可滑动元素
 */
export const mscroll=(wrap,child,callBack,dis,noBack=false)=>{ 
    var startPoint=0;
    var startY=0;   
    var minY=wrap.clientHeight-dis-child.offsetHeight;
    if(minY>0)
    return;/*如果非固定高度小于容器高度那么直接return*/
    var step=1;
    var lastY=0;
    var lastDis=0;
    var lastTime=0;
    var lastTimeDis=1;
    var isMove=true;
    var isFirst=true;
    var notClick=false;//判断是否为点击事件或者滑动事件
    var Tween = {
		easeOut: function(t, b, c, d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		backOut: function(t, b, c, d, s){
			if (typeof s == 'undefined') {
				s = 1.70158;  
			}
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		} 
    };
    cssTransform(child,"translateZ",0.01);
    wrap.addEventListener('touchstart',function(e){
        minY=wrap.clientHeight-dis-child.offsetHeight;
        clearInterval(child.scroll);
        if(callBack&&callBack.start){
            callBack.start();
        }//开始运动的坐标位置
        startPoint={pageY:e.changedTouches[0].pageY,pageX:e.changedTouches[0].pageX};
        startY=cssTransform(child,"translateY");//开始运动的偏移量
        step=1;//步长
        lastY=startPoint.pageY;
        lastTime=new Date().getTime();
        lastDis=0;
        lastTimeDis=1;
        isMove=true;//判断是竖向拉动
        isFirst=true;
        notClick=false;
    })
    wrap.addEventListener('touchmove',function(e){
        notClick=true;
        if(!isMove)
        {
            return;
        }
        var nowPoint=e.changedTouches[0];
        var disX=nowPoint.pageY-startPoint.pageY;
        var disY = nowPoint.pageY - startPoint.pageY;
        if(isFirst){
            isFirst=false;
            if(Math.abs(disY)<Math.abs(disX)){
                isMove=false;
                return;
            }
        }
        var t=startY+disY;
        var nowTime=new Date().getTime();
        if(t>0)/*下拉拉到顶部了*/{
           /* step=1-t/wrap.clientHeight;
            t=parseInt(t*step);
            if(noBack)
            {*/
                t=0;
           // }
        }
        if(t<minY)/*上拉拉到底部了 */
        {
            if(noBack)
            {
                t=minY;
            }else{
            var over=minY-t;/*over为正数*/
            step=1-over/wrap.clientHeight;//步长与over成反比
            over=parseInt(over*step*0.5);
            t=minY-over;//translateY的值   
            }              
        }
        lastDis=nowPoint.pageY-lastY;//最后的距离差
        lastTimeDis = nowTime - lastTime; //最后的时间差
        lastY=nowPoint.pageY;//最后的Y坐标值
        lastTime=nowTime;//改变最后时间  
        cssTransform(child,"translateY",t);
        if(callBack&&callBack.in){       
            callBack.in();
        }
    });
    wrap.addEventListener('touchend',function(e){//松手后的缓冲运动
        if(!notClick){
            return;         
        }
        var speed=(lastDis/lastTimeDis)*120; //速度
        speed = isNaN(speed)?0:speed;
        var t = cssTransform(child,"translateY");
        var target=t+speed;
        var type="easeOut";
        var time=Math.abs(speed*.9);//抛物线
        time= time<300?300:time;//时间限制在300毫秒
        if(target>0){
            target=0;
            type="easeOut";
        }
        if(target < minY) {
            target = minY;
            type ="backOut";
        }
        move(target,time,type);
		if(callBack&&callBack.end){
            callBack.end();
        }      
    })
    /*
		start 手指按下
		in 滑动中
		end 手指抬起
		over 滑动结束
    */
    function move(target,time,type) {
		var t = 0;//当前时间
		var b = cssTransform(child,"translateY");//初始值
		var c = target - b;//变化量
        var d = Math.ceil(time/20);//持续时间
        clearInterval(child.scroll);
        child.scroll = setInterval(
			function() {
				t++;
				if(t > d) {
					clearInterval(child.scroll);
					if(callBack&&callBack.over){
						callBack.over();
					}
				} else {
					var top = Tween[type](t,b,c,d);
					cssTransform(child,"translateY",top);
                    if(callBack&&callBack.in){
						callBack.in();
					}
				}
			},20
		);
    }
}

/**
 * 页面到到达底部需要加载更多
*/
/*
export const loadMore=(ele,callback)=>{
    let windowHeight=window.screen.height;
    let height;
    let offsetTop;
    let paddingBottom;
    let marginBottom;
    let requestFram;
    let oldScrollTop;
    document.body.addEventListener('scroll',() => {
        loadMore();
     }, false)//事件在冒泡阶段执行
      //运动开始时获取元素高度和offsetTop,padding,marginBottom
     element.addEventListener('touchstart',()=>{
       height=ele.offsetHeight;//元素的内容高+paddIng+边框
       //此时获取相对于body的高度
       offsetTop=ele.offsetTop;//获取对象相对于由offsetParent属性指定的父坐标(css定位的元素或body元素)距离顶端的高度。
       paddingBottom=getStore(ele,'paddingBottom');//获取元素底部的margin值
       marginBottom=getStyle(ele,'marginBottom');
     },{passive:true}) //不阻止proventDefault    
     element.addEventListener('touchmove',() => {
        loadMore();  
     },{passive: true})
      
     //运动结束判断是否有惯性运动，惯性运动是否达到底部
     element.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
     },{passive: true})

     const moveEnd=()=>{
      requestFram=requestAnimationFrame(() => {
          if(document.body.scrollTop!=oldScrollTop){
              //如果页面在惯性运动中
              oldScrollTop=document.body.scrollTop;
              loadMore();
              moveEnd();//继续执行moveEnd函数
          }else{
            cancelAnimationFrame(requestFram);//取消该动画事件
            //为了防止鼠标抬起时候已经渲染好数据导致重新获取
            height=element.offsetHeight;
            loadMore();
          }
      })
     }
     //定义一个判断加载更多的方法
     const loadMore=()=>{
      if(document.body.scrollTop+windowHeight>=height+offsetTop+paddingBottom+marginBottom){
      callback();//到达页面底部的时候触发回调函数
      }
     }     
}*/