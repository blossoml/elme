<template>
  <div id="app">  
    <v-header>   </v-header>   
    <router-link to="/goods">商品</router-link>
    <router-link to="/ratings">评价</router-link>
    <router-link to="/seller">商家</router-link>
    <router-view/>  
  </div>
</template>

<script>
import header from './components/head/head.vue'
export default {
  name: 'App',
  components:{
    'v-header':header /*组件注册*/
  }
}
</script>
<style   lang="scss">
$background:rgb(226, 215, 215);
body{
  background: $background;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
