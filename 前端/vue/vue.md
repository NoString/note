# 基础

先安装vuedevtools,直接在谷歌应用商店可以找到

- html成为容器,vue对象成为实例,他们两个需要先绑定再使用
- 通过Vue.config可以配置一些初始化变量
- vue里的容器和实例只能一对一绑定, 无法一对多和多对一
- 通过Vue对象来动态标签体内容

```vue	
<body>
		<!-- 容器部分 -->
		<div id="root">
			<h1>hello {{name}}</h1> <!-- 插值语法:双括号可以写js表达式,例如写一个函数调用,Date.now()-->
		</div>
		<!-- vue部分 -->
		<script type="text/javascript">
			Vue.config.productionTip = false; //关闭vue在浏览器控制台里的tip
			var x = new Vue({
				el: '#root', //绑定容器
				data:{
					name: 'mybatis' //给容器中的占位符设置值
				}
			});
		</script>
	</body>
```

![image-20220615163025927](https://raw.githubusercontent.com/NoString/image/main/note/202206151630010.png)

- 通过vue来动态标签属性

```vue	
<body>
		<div id="root">
			<!-- 给标签属性动态设置值,通过在标签属性的前面加上':' -->
			<a :href="base.url">内容</a> 
		</div>
		<script>
			new Vue({
				el: '#root',
				data:{ //多层json
					base:{
						url:'http://www.baidu.com'
					}
				}
			});
		</script>
	</body>
```

![image-20220615204223636](https://raw.githubusercontent.com/NoString/image/main/note/202206152042734.png)

- 通过vue来双向绑定

```vue
<body>
		<div id="root">
			<!-- 最原生的写法是v-model:value = "", 这是简写方法, 通过更改输入框的数据来动态修改data里的数据 -->
			<!-- 这种绑定方法只能适用于有value属性的标签,入 input, radio -->
			双向数据绑定<input type="text" v-model="inputVal">
		</div>
		<script>
			new Vue({
				el: '#root',
				data:{
					inputVal : "这是一组双向绑定"
				}
			})
		</script>
	</body>
```

![image-20220616090407772](https://raw.githubusercontent.com/NoString/image/main/note/202206160904956.png)

![image-20220616090420172](https://raw.githubusercontent.com/NoString/image/main/note/202206160904299.png)

# mvvm

model → view → viewmodel

model是数据, view是html页面, viewmodel是vue,  数据通过vue来绑定到html, html被vue监听来返回值给数据

- viewmodel代表vue, 所以一般vue的实例对象变量名叫vm

![image-20220616154401880](https://raw.githubusercontent.com/NoString/image/main/note/202206161544109.png)

# 数据代理

A对象的一个属性绑定了B对象某个属性的值后, 修改A对象的值可以连同B一起修改

- vue的数据代理是通过setter和getter方法来实现的,必要要调用这两个方法才可以实现动态代理
- 通过Vue.set(1,2,3);来添加响应式数据

- 通过ES6的Object.defineProperty去修改对象属性

```vue
<script>
			let age = 19;
			let student = {
				name: 'lbw'
			}
			//通过object类来修改类中的属性. 1.对象		2.属性名		3.配置项
			Object.defineProperty(student,'age',{
				value: age, //设置age属性的值
				enumerable:true	,//设置属性是否可以被枚举(遍历)
				writable:true,	//设置属性是否可以被修改
				configurable:true	,//设置属性是否可以被删除
				//调用该对象时,运行方法体内容
				get() {
					console.log(age);
					return age;
				},
				//修改该对象时,调用该方法
				set(val){
					console.log(val);
					age = val;
				}
			})
		</script>
```

# 事件处理

## 点击事件

```vue
<body>
		<div id="root">
			<!-- 通过v-on来绑定vue点击事件,默认会传event过去 -->
			<button v-on:click="c1">第一种绑定事件</button>
			<!-- 通过@来绑定vue点击事件,默认会传event过去 -->
			<button @click="c2">第二种绑定事件</button>
			<!-- 通过@来绑定vue点击事件,然后通过括号来设置参数,$event表示点击事件,66表示第二个参数的值 -->
			<button @click="c3($event,66)">第三种绑定事件</button>
			
		</div>
		
		<script>
			const vm = new Vue({
				el: '#root',
				data:{
					
				},
				// 通过methods参数来配置方法, 里面配置的方法前面不需要加function参数
				methods: {
					c1() {
						alert("第一种点击事件");
					},
					c2(event){
						console.log(event);
					},
					c3(event,v1){
						console.log(event + "-----" + v1);
					}
					
				},
			});
		</script>
	</body>
```

![image-20220616214428016](https://raw.githubusercontent.com/NoString/image/main/note/202206162144140.png)

## 事件修饰符

vue提供了一些事件修饰符可以更改默认的事件

例如<a>标签默认会跳转一个页面,可以通过prevent来阻止它的跳转

prevent:阻止默认事件发生

stop:阻止事件冒泡

once:事件只触发一次

capture:使用事件捕捉模式

self:只有event.target是当前操作的元素才触发事件

passive:事件的行为立即执行,不用等待回调

```vue
<!-- 它会阻止a标签默认的href事件 -->
<a href="http://www.baidu.com" @click.prevent="show"></a> 
```

## 键盘事件

```vue
<body>
		<div id="root">
			<!-- 通过@keyup来绑定键盘点击事件,keyup表示按下抬起, keydown表示仅按下 -->
			<input type="text" id="in" value="" @keyup="up"/>
		</div>
		
		<script>
			new Vue({
				el: "#in",
				methods: {
					up(event) {
						// 打印event对象
						console.log(event);
						// 打印所按下的键盘字符的唯一标识码
						console.log(event.keyCode);
						// 打印当前input框中的所有值
						console.log(event.target.value);
					}
				},
			})
		</script>
	</body>
```

# 计算属性

将data里的属性进行拼接后返回

```vue
	<body>
		<div id="root">
			<!-- 调用计算属性获取值 -->
			<h1>{{full}}</h1>
		</div>
		<script>
			new Vue({
				el:"#root",
				data:{
					first:"张",
					second:"三"
				},
				computed: {
					// 本质上是获取到first和second的值,进行拼接后返回
					full:{
						get(){
							return this.first + this.second;
						}
					}
				},
			})
		</script>
	</body>
```

![image-20220617161632933](https://raw.githubusercontent.com/NoString/image/main/note/202206171616017.png)

## 简写版本

```vue
<!-- 简写版本 -->
	<body>
		<div id="root">
			<!-- 调用计算属性获取值 -->
			<h1>{{full}}</h1>
		</div>
		<script>
			new Vue({
				el:"#root",
				data:{
					first:"张",
					second:"三"
				},
				computed: {
					// 本质上是获取到first和second的值,进行拼接后返回
					full(){
						return this.first + "-" + this.second
					}
				},
			})
		</script>
	</body>
```

# 监视属性

监视属性是来监视vue里data里参数值的变化

```vue
<body>
		<div id="root">
			<h1>台州今天:{{text}}</h1>
			<button type="button" @click="change">点我更改</button>
		</div>
		<script>
			new Vue({
				el:"#root",
				data:{
					rain: true
				},
				methods: {
					change(event) {
						return this.rain = !this.rain
					}
				},
				computed: {
					text() {
						return this.rain ? "下雨了" : "天晴了"
					}
				},
				// 第一种检测模式, 如果rain的值发生变化,会将新值和旧值发过来
				watch: {
                    //开启深度监视,假设rain的值是一个对象,对象里的属性值发生变化,可以检测到
                    deep:true,
					rain(newValue, oldValue) {
						console.log("new=====>" + newValue);
						console.log("old=====>" + oldValue);
					}
				},
			})
		</script>
	</body>
```

另一种方式

```vue
<body>
		<div id="root">
			<h1>台州今天:{{text}}</h1>
			<button type="button" @click="change">点我更改</button>
		</div>
		<script type="text/javascript">
			const vm = new Vue({
				el:"#root",
				data:{
					rain: true
				},
				methods: {
					change(event) {
						
						return this.rain = !this.rain
					}
				},
				computed: {
					text() {
						return this.rain ? "下雨了" : "天晴了"
					}
				},
				
			})
			vm.$watch('rain',{
				handler(newOne,oldOne){
					console.log("另一种方式来监测");
					console.log(newOne);
					console.log(oldOne);
				}
			})
		</script>
	</body>
```

# 样式绑定

```vue
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript" src="../js/vue.js"></script>
		<style>
			.first{
				
			},
			.second{
				
			}
		</style>
	</head>
	<body>
		<div id="root">
			<div :class="sty" :click="changeStyle">点击改变样式</div>
		</div>
		<script type="text/javascript">
			new Vue({
				el:'#root',
				data:{
					sty:'first'
					
				},
				methods: {
					changeStyle() {
						this.sty = 'second'
					}
				},
			})
		</script>
	</body>
</html>
```

# 列表渲染

```vue
<body>
		<div id="root">
			<h2>数组遍历</h2>
			<ul>
				<!-- 通过一个forin来遍历data里面的people数组,第一个值为形参,通过形参获取对象属性.第二个值为下标. -->
				<!-- 这个key相当于每个item的唯一标识, key尽量设置为数据中的唯一标识而不是index,因为当向前插入数据时,index会错乱 -->
				<li v-for="(person,index) in people" :key="person.id">
					名字:{{person.name}}---年龄:{{person.age}}
				</li>
			</ul>
			<h2>遍历对象</h2>
			<ul>
				<li v-for="(item,index) in car" :key="index">
					参数{{index}}是:{{item}}
				</li>
			</ul>
		</div>
		<script type="text/javascript">
			new Vue({
				el:'#root',
				data:{
					people:[
						{id:1, name:'p1', age:18},
						{id:2, name:'p2', age:19},
						{id:3, name:'p3', age:20},
					],
					car:{
						name: 'x3',
						price: '40W',
						color:	'block'
					}
				}
			})
		</script>
	</body>
```

![image-20220618155614396](https://raw.githubusercontent.com/NoString/image/main/note/202206181556479.png)

# 过滤器

```vue
<body>
		<div id="root">
			<h2>{{times | formatTime}}</h2>
			<!-- 通过管道符连接过滤器,并且传参 -->
			<h2>{{times | formatTime('参数p1')}}</h2>
		</div>
		<script>
			new Vue({
				el: '#root',
				data:{
					times: 1655704813
				},
				filters: {
					// value是times, p1可以设置默认值
					formatTime(value,p1 = '12321321') {
						console.log(value);
						console.log(p1);
						return value;
					}
				}
			})
		</script>
	</body>
```

![image-20220620141436502](https://raw.githubusercontent.com/NoString/image/main/note/202206201414635.png)

# 生命周期

```vue
	<body>
		<div id="root">
			
		</div>
		<script>
			new Vue({
				el: '#root',
				data:{
					a:1
				},
				beforeCreate(){
					console.log('data里的数据加载之前调用该方法');
				},
				created(){
					console.log('data里的数据加载之后,可以对data的数据进行操作了');
				},
				beforeMount(){
					console.log('所有的DOM挂在之前,此时操作DOM是无效的');
				},
				mounted(){
					console.log('所有DOM加载之后调用该方法,此时操作DOM和data都是有效的,一般写一些初始化在该方法');
				},
				beforeUpdate(){
					console.log('data里的数据更改之前调用该方法');
				},
				updated(){
					console.log('data里的数据更新之后调用该方法');
				}
				
				
				
			})
		</script>
	</body>
```

# 组件化

## 脚手架

- 安装脚手架首先要安装NodeJs
- 先用cmd更换阿里镜像:npm config set registry https://registry.npm.taobao.org
- 通过npm安装vue: npm install -g @vue/cli
- 通过vue来创建一个新项目: vue create hellovue
- 创建成功之后,会新生成一个目录,进去之后运行 npm run serve可以开启一个小型服务
- 通过npm run build将vue文件生成为正常的html文件

### 目录结构

src-assets: 放静态资源

src-components:放组件







vue页面上的所有内容定义为组件,一个组件包含html,css,js. 实现应用中局部功能的代码和资源的集合

- 组件不能配置el属性
- 组件里的data一定要写成函数式,返回值为一个对象
- 在vm里注册组件时,如果是多个单词,用单引号包裹起来,用-链接, 例如: 'my-school', 创建单个文件也是这样
- 组件的本质是一个VueComponent对象,只不过vue帮忙实例化
- 每次调用Vue.extend都是返回一个全新的对象,所以每个组件都是内存中独立的个体.

### 通过vue中的ref替代原生的id标签

```vue
<template>
  <div id="app">
    <h1 ref="common">这是一个普通标签</h1>
    <img src="./assets/logo.png">
    <button @click="show">点我显示</button>
    <HelloWorld ref="special"></HelloWorld>
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

```

![image-20220704133431542](https://raw.githubusercontent.com/NoString/image/main/note/202207041334633.png)

### mixin

通过mixin可以导入某个js文件里封装的js代码,达到代码复用

### 插件

通过Vue.use(插件名)来使用

### 限制style的作用域

```vue
<templeter>

</templeter>
<script>
</script>

<!-- vue默认会将所有的style汇总为一个文件,这样就导致同名的style就会出现冲突,通过scoped标签将style的作用域限制于局部-->
<style scoped>
</style>
```

指定style语法

```vue
<!--也可以写less,但是不会-->
<style lang="css">

</style>
```

## 组件化编码流程

1. 实现静态组件,抽取组件,使用组件实现静态页面效果
2. 实现动态数据
3. 实现交互
