<template>
  <div id="app">   
    <transition name="route-fade" mode="out-in">
      <!--out-in：当前元素先进行过渡，完成之后新元素过渡进入。-->     
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
 	export default {

  }
</script>
<style   lang="scss">
@import  './common/common.scss';
.router-fade-enter-active , .router-fade-leave-active {
  transition:opcity .3s;
}
.router-fade-enter, .router-fade-leave-to{
  	opacity: 0;
}
</style>
