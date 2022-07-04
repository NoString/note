<template>
  <div id="app">
    <h1>通过app.vue调用标签时传递参数,实现相同组件,不同参数</h1>
    <HelloWorld name="参数1" gender="参数2" :age="19"/>
    <hr>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
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
  margin-top: 60px;
}
</style>
