<template>
  <div id="app">
     <div class="todo-container">
    <div class="todo-wrap">
      <InputBox :addData="addData"/>
      <List :todos="todos" :changeData="changeData" :deleteItem="deleteItem"></List>
     <Footer :todos="todos"></Footer>
    </div>
  </div>
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
  },
  data(){
        return {
            todos:[
                {id:'001',content:'抽烟',done:true},
                {id:'002',content:'喝酒',done:false},
                {id:'003',content:'烫头',done:false},
            ]
        }
    },
    methods:{
      addData(obj){
        this.todos.unshift(obj)
      },
      changeData(id){
        this.todos.forEach((todo) => {
          if(todo.id === id) todo.done = !todo.done
        })
      },
      deleteItem(id){
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id
        })
      }
    }
}
</script>

<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}





</style>
