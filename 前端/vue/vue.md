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