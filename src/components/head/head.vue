<template>
  <div >
   这是头部
  </div>
</template>

<script>
export default {
name: 'vhead',
  data () {
    return {
   
    }
  },
  mounted(){
    debugger;
    //获取用户信息
    this.$get('/v1/cities?type=hot').then((res)=>{
      console.log(res);
    })
  }
}
</script>

<style   lang="scss">
@import  '@/commonStyle/common.scss';


</style>
