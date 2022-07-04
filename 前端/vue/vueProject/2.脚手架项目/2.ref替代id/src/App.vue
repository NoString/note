<template>
  <div id="app">
    <h1 ref="common">这是一个普通标签</h1>
    <img src="./assets/logo.png">
    <button @click="show">点我显示</button>
    <HelloWorld ref="special"></HelloWorld>
    <ParameterFromOutside></ParameterFromOutside>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
    },
  methods: {
    show (v1) {
      console.log('展示一个普通标签:' + this.$refs.common)
      console.log('展示一个特殊标签:' + this.$refs.special)
    }
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
