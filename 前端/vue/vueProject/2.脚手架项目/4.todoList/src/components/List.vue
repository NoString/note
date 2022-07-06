<template lang="html">
    <div>
        <ul class="todo-main">
        <Item v-for="todo in todos" :key="todo.id" :obj="todo" :changeData="changeData" :deleteItem="deleteItem"/>
      </ul>
    </div>
</template>
<script>
 import Item from "./Item";
export default {
    name:'List',
    components:{Item},
    props:['todos','changeData','deleteItem']
}
</script>
<style lang="css" scoped>
    
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>