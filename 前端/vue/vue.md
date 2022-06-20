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
