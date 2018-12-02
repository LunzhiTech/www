<template>
  <div id="app">
    <HelloWorld msg="上海伦之信息科技有限公司"/>
    <div class="footer">
      <a href="http://www.miitbeian.gov.cn">沪ICP备18044920号</a>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
  .footer{
    height: 100px;
    width: 100%;
    /*background-color: #ddd;*/
    position: fixed;
    bottom: 0;
  }
</style>
