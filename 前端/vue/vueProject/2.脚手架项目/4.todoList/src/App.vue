<template>
  <div id="app">
    <InputBox/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import InputBox from './components/InputBox'
import Footer from './components/Footer'
import List from './components/List'

export default {
  name: 'App',
  components: {
    HelloWorld,
    InputBox,
    Footer,
    List
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
