<template>
<!-- 通过app.vue调用标签时传递参数,实现相同组件,不同参数 -->
  <div>
    
    <h1>传参名字===>{{name}}</h1>
    <h2>传参性别===>{{gender}}</h2>
    <h2>传参年龄(int类型)===>{{age + 1}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  // 通过props接受参数,这是方式1,最简单的
  // props:['name','gender','age']

  // 第二种方式,可以指定数据类型
  // props:{
  //   name:String,
  //   gender:String,
  //   age:Number
  // }

  // 第三种方式,可以设置默认值和required
  props:{
    name:{
      type: String,
      required: true
    },
    gender:{
      type:String,
      required:false
    },
    age:{
      type:Number,
      default: 99
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
