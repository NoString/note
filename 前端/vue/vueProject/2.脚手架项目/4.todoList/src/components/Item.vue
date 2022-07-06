<template lang="html">
    <div>
        <li>
          <label>
            <input type="checkbox" :checked="obj.done" @change="handleChange(obj.id)"/>
            <span>{{obj.content}}</span>
          </label>
          <button class="btn btn-danger" @click="doDelete(obj.id)">删除</button>
        </li>
    </div>
</template>
<script>
export default {
    name: 'Item',
    props:['obj', 'changeData', 'deleteItem'],
    methods:{
      handleChange(id){
        this.changeData(id)
      },
      doDelete(id){
        if(confirm('确定要删除吗?')){
          this.deleteItem(id)
        }
      }
    }
}
</script>
<style lang="css" scoped>
    /*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover{
  background-color: #ddd;
}

li:hover button{
  display: block;
}

</style>