<template>
<div class="loading_container">
    <div class="load_img" :style="{backgroundPositionY:-(positionY%7)*2.5+'rem/$fensu'}"></div>
    <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
			<ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
	</svg>
</div>
</template>
<script>
export default {
    data(){
        return{
            positionY:0,
            timer:null
        }
    },
    mounted(){
        //dom挂载后
        this.timer=setInterval(()=>{
            this.positionY++;  /*改变backgoundPositionY的改变显示的背景图像,上移动*/
        },600)
    },
    beforeDestroy(){
        //组件销毁前清除定时器
        clearInterval(this.timer);
    } 
}
</script>
<style lang="scss" scoped>
 @import '../common/mixin'; 
 $fensu:1.6;
 @keyframes load {
    0%{ transform: translateY(0px);}
    50%{ transform: translateY(-50px);}
    100%{transform: translateY(0px);}     
 }
 @keyframes ellipse{
     0% {transform: scale(1);}
     50%{transform: scale(0.3);}
     100%{transform: scale(1);}     
 }
 .loading_container{
     position:fixed;
     top:50%;
     left:50%;
     transform: translate(-50%, -50%);
     @include wh(2.5rem/$fensu,2.5rem/$fensu);
 }
.load_img{
    @include wh(100%,100%);
    background: url(../images/icon_loading.png) no-repeat 0 0;
    background-size: 2.5rem/$fensu auto;
    transform: translateY(0px);
    //load动画 0.6s 无限循环 慢速开始和慢速结束
    animation: load .6s infinite ease-in-out;
    position: relative;
    z-index: 11;
}
.load_ellipse{
    position: absolute;
    @include wh(2.6rem/$fensu ,2rem/$fensu);
    top:2.2rem/$fensu;//top 值2.2rem/$fensu,left值0.2rem/$fensu
    left:0.2rem/$fensu;
    z-index: 10;
    animation: ellipse .6s infinite ease-in-out; 
}
</style>
