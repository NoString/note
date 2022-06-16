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