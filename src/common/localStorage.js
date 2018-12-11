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