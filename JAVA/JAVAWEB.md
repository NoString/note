# http服务器

静态资源：文档，图片，视频，html，css，js，静态文件被索要时，浏览器直接通过输出流来发给请求的浏览器

动态资源：命令不能被浏览器执行，只能被服务端编译和执行。例如class文件，动态文件被索要时，服务端创建java对象，得出结果后以二进制的方式返回流

# HTML

- 标签分为双目标签和单目标签
- 所有的html文件都需要声明在一个html标签之内
- head：定义一些基础的参数信息
- body：负责通知浏览器将指定内容通过指定的方式展示
- 请求参数只能通过超链接（a标签）和表单（form）来携带参数 

```html
<!--继承关系-->
<body>
	<div id="two"> div和两个p是父子关系
		<p></p>	两个p是兄弟关系，按照自上而下，第一个P是哥哥
		<p></p>
	</div>
</body>

```



```html
<!--基础标签-->
<html>
    <meta charset="utf-8">
    <!--双目标签 -->
    <p>段落标签，被括起来的标签被当成一个段落</p>
    
    <h1>标题标签，从h1到h6</h1>
    
    <ol>
		<li>这是一个有序标签</li>
		<li>ol标签内的li标签会自增长</li>
	</ol>
    
    <ul>
		<li>这是一个无序标签</li>
		<li>ol标签内的li标签不会自增长，只会在前面有一个点</li>
	</ul>
    
    

	<table>
		<tr>
			<td>这是一个表格标签</td>
			<td>表格第二列</td>
			<td>表格第三列</td>
		</tr>
		<tr>
			<td>第二行第一列</td>
			<td>第二行第二列</td>
			<td>第二行第三列</td>
		</tr>
	</table>
        

</html>
```



```html
 <!--表单
如果表单需要携带参数，必须要在form之内，且声明name属性-->

<!--超链接-->
<a href="http://www.baidu.com">超链接名称，一定是get方式</a> 
    <!--表单提交通过不同的请求方式-->
    <form action="http://www.baidu.com" method="post">
			<input type="submit" value="访问百度" />
	</form>


    <!--带着默认值，和键（name就是键）-->
    <form action="http://www.baidu.com">
			<input type="text" name="username" value="默认值" /> 携带参数，name是标签名称，type是输出文本框的意思，value是默认值
			<input type="submit" value="访问百度" />
        <!-- 表单域标签，input，select，textarea-->
	</form>
    
    <!--各种不同类型的input-->
		<form action="http://www.baidu.com">
			文本框<input type="text" name="username" value="默认值" /><br>
			密码框<input type="password"/><br>
			单选框（默认值：on，要有相同的名字）<input type="radio" name="single" />男
				<input type="radio" name="single" />女<br>
			多选框（默认值：on）<input type="checkbox" name="multi" />java
			<input type="checkbox" name="multi" />sql
			<input type="checkbox" name="multi" />c++<br>
			上传文件要用post)<input type="file" name="upload" id="upload" value="null" /><br>
			提交按钮<input type="submit" name="提交" id="提交" value="按钮" /><br>
			重制整个表单<input type="reset" name="reset" id="reset" value="重制" />
		</form>

  <!--select下拉表单-->
 	<form action="http://www.baidu.com" method="get">
			籍贯（下拉单选）<select name="home">
				<option value ="bj">北京</option>
				<option value ="sh">上海</option>
				<option value ="tj">天津</option>
			</select>
	</form>
    
<!--textarea标签-->
    <form action="http://www.baidu.com" method="get">
			备注信息（类似网站评论区）<textarea rows="20" cols="30">
				
			</textarea>
	</form>

<!--disabled和readOnly-->
<form action="http://www.baidu.com" method="get">
    <!--readOnly表示不可修改，disabled表示不可使用-->
			被disabled修饰，请求不会携带该参数<input type="text" name="name" id="name" value="默认值1" disabled="disabled"/><br>
			被readOnly修饰，请求会携带该参数<input type="text" name="name" id="name" value="默认值1" readonly="readonly"/><br>
</form>


```

```html
标签属性
<input type="text" id=""/> id相当于唯一编号
<input type="text" name=""/> name相当于键，浏览器的输入框相当于值

<div id="noone" style="width:300;height:300;background-color: aqua;font-size: 20;color: blueviolet;">我是一个内容</div>

<!--带有默认选择值-->
<form action="http://baidu.com" method="get">
			带有默认值<input type="radio" name="sex" id="sex" value="man" checked="checked"/>
			<input type="radio" name="sex" id="sex" value="man" />
			
</form>


<!--带有默认选择值-->
<form action="http://baidu.com" method="get">
			<select name="option">
				<option value ="bj" >北京</option>
				<option value ="nj" selected="selected">南京</option>
				<option value ="sh">上海</option>
			</select>
</form>
```



```sql
#get请求
请求时携带的参数不能超过4k
请求参数在浏览器地址展示出来
数请求参数要保存到http请求头中
要求浏览器接收到服务器返回数据之后，必须将资源内容保存在浏览器缓存中
#post请求
可以携带任意数量的请求参数
必须在浏览器地址栏上隐藏参数信息
请求参数要保存到http的请求体中
禁止浏览器将返回的信息进行保存，保证每次请求都是真实的
上传文件和发送登陆请求，以及需要每次都需要更新的数据（例如股票）都需要使用post
```

# CSS

- 用于定位浏览器中的html标签，并同一管理标签
- 如果同时有80个html标签改同一个样式，这种工作用css就不需要复制80次（避免大量重复性操作）
- CSS有9个选择器
- CSS选择器必须在head标签中声明

```css
 
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<style type="text/css">
			<!--改所有标签-->
			p{
				color: crimson;
				
			}
			<!--改单个标签-->
			#two{ 
				color: aqua;
			}
		</style>
	</head>
	<body>
		<p>我是第一个段落</p>
		<p id="two">我是第二个段落</p>
	</body>
</html>

/*继承修改*/
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<style type="text/css">
			#two p{
				color: crimson;
				
			}
			
		</style>
	</head>
	<body>
		<div id="two">
			<p>哥哥标签</p>
			<p>弟弟标签</p>
		</div>
	</body>
</html>

<!--自定义选择器-->
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<style type="text/css">
			.firstSytle{
				color: cadetblue;
				
			}
			
		</style>
	</head>
	<body>
		<div id="two" class="firstSytle">
			<p>哥哥标签</p>
			<p>弟弟标签</p>
		</div><br>
		<h1 class="firstSytle">使用自定义选择器</h1>
	</body>
</html>
```

# JAVAEE

- JAVA与服务器沟通的接口

## http服务器

- 浏览器只能发送请求给http服务器
- http服务器可以调用一些静态资源（文档，图片，视频，.html，.css，.js）
- http服务器可以嗲用一些动态资源（java类）

浏览器再向http服务器发送请求的时候会携带4个参数

1. 请求行：url，method（get/post）
2. 请求头：get请求的参数信息（明码，跟在url后面的那一段，这一段的参数会被tomcat来解析，tomcat默认字符集是utf-8）
3. 空白行：无意义，区分请求体用
4. 请求体：post请求携带的参数信息（默认被request对象解码，默认字符集是"ISO-8859-1 "

http服务器向浏览器返回数据包时也会携带4个参数

1. 响应行：http状态吗
2. 响应头：content-type（告诉浏览器如何编译这段二进制数据，例如text，image
3. 空白行：无意义，区分响应体
4. 响应体：被访问的静态文件，被访问的静态命令（html，css，js），被访问的动态资源文件的运行结果

### tomcat服务器 

去官网下载安装，然后在IDEA中配置，新建项目选JAVA web application

### servlet

- ## 指定“动态资源文件”开发步骤

动态资源类需要实现servlet接口

一般来说，servlet类都放在controller包下 

- ## 指定了web服务器调用动态资源规则

tomcat有权创建servlet接口实现类实例对象

tomcat根据实例对象的service方法处理请求

- ## 指定了web服务器管理动态资源规则 

  - Tomcat会调用实现了servlet接口的类里面的service方法。有一个类叫HttpServlet继承他，他已经实现了servlet接口的所有方法，并重写service方法，他会自动判断请求的类型，从而调用doGet/doPost方法，所以继承HttpServlet的子类，不需要重写servlet方法，只需要重写doGet和doPost
  - 实现了servlet接口的实例对象只能由web服务器来创建对象
  - 有人通过web服务器请求才会创建servlet的实例对象（也可以设置启动web服务器时让web服务器自动实例化对象）
  - 不管用多少用户访问servlet实例对象，实例对象只有一个进程。无非是多线程访问一个进程
  - web服务器关闭时，会销毁所有的servlet对象

```xml
<!--将servlet实现类注册到xml文件里（WEB-INF-web.xml）
每一个注册的动态资源必须要写两个信息-->
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>FirstServlet</servlet-name><!--声明一个变量来存储servlet实现类的类路径-->
        <servlet-class>com.example.controller.FirstServlet</servlet-class><!--声明servlet接口实现的类路径-->
        <load-on-startup>30</load-on-startup><!--默认为0，表示启动tomcat的时候不自动创建该类对象，大于0表示自动创建-->
    </servlet>
    <servlet-mapping><!--设置别名-->
        <servlet-name>FirstServlet</servlet-name><!--选择需要设置别名的标签-->
        <url-pattern>/suiyi</url-pattern><!--设置一个别名，开头一定要用“/”-->
    </servlet-mapping>
</web-app>
 
```

doGet和doPost都有两个参数：HttpServletRequest request, HttpServletResponse response。这两个参数就是浏览器发送给web服务器的请求，需要用来处理



#### HttpServletResponse

- 介绍

负责将doGet和doPost的执行结果写入到响应体中返回给浏览器

将HttpServletResponse接口修饰的对象成为“响应对象”

当doGet或者doPost执行结束之前，会销毁这个对象

- 功能

将执行结果以二进制的方式写入到响应体中

设置响应头中的content-type属性值，告诉浏览器以什么形式来解析这段响应体中的二进制数据（图片，文字，视频）

设置响应头中的location属性，从而控制浏览器向指定的服务器发送请求

```java
//返回响应内容
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String content = "我是一个响应内容";
        //通过响应对象，向tomcat索要输出流
        PrintWriter writer = response.getWriter();
        //通过输出流将相应内容以二进制的形式返回给浏览器
        writer.write(content);//write只能写入字符，字符串，ASCII码
		writer.print(50);//实际开发中都用这个，8个基本数据类型都可以放
    }

//设置返回类型
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String content = "我是一个响应内容</br>JAVA</br>SQL</br>";
        //设置回复cntent-type内容
        response.setContentType("text/html");//可以返回文本内容和html标签
        //通过响应对象，向tomcat索要输出流
        PrintWriter writer = response.getWriter();
        //通过输出流将相应内容以二进制的形式返回给浏览器
        writer.print(content);
    }
```

#### HttpServletRequest

- 概述

读取get和post请求包中的的信息

开发人员习惯将这个request对象成为“请求对象”

当doGet或者doPost执行结束之前，会销毁这个对象

- 作用

可以读取“请求行”中的信息

可以读取保存，“请求头“，”请求体“中的参数信息

可以代替浏览器向http服务器申请资源文件调用

```java
 //通过枚举来获取get和post请求携带的参数
@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()){
            String element = parameterNames.nextElement();
            System.out.println("请求的键是："+element);
            String value = request.getParameter(element);
            System.out.println("请求的值是："+value);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");//设置字符集，post的解析方式是request对象，字符集不是utf-8，get是tomcat，默认utf-8
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()){
            String element = parameterNames.nextElement();
            System.out.println("请求的键是："+element);
            String value = request.getParameter(element);
            System.out.println("请求的值是："+value);
        }
    }
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <center>
      <a href="getMethod?user=123">a发送get</a>
      <form action="getMethod" method="get">
          输入get请求参数<input type="text" name="username"><br>
          <input type="submit" value="get方式">

      </form>
      <form action="getMethod" method="post">
          输入post请求参数<input type="text" name="username"><br>
          <input type="submit" value="post方式">

      </form>
  </center>
</body>
</html>
```

#### 设置默认页面

tomcat默认有一个config配置文件，在C:\Program Files\Apache Software Foundation\Tomcat 10.0\conf\web.xml，最后一行有一个

```xml
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>
<!--这个就是tomcat配置文件里的默认欢迎页面-->
```

可以直接在项目下的：src/main/webapp/WEB-INF/web.xml文件添加上面的配置信息，并修改

#### Http状态码

- 服务器在推送响应包之前，根据本次请求处理情况，添加到响应包的状态行上

100：通知浏览器本次返回的资源不是一个独立的完整文件，需要浏览器接收到本响应包之后，再去请求其他的资源文件

200：本次请求返回的资源是一个独立完整的文件，不需要再次请求

302：本次请求返回的不是资源，而是一个地址，需要浏览器根据这个地址自动发起请求，访问该地址，或者文件（location属性）

404：找不到访问资源，路径写错了

405：仅支持post，但是用get访问了

500：访问动态资源，但是动态资源java类在运行时出错了，检查代码

#### 多重调用Servlet

##### 重定向解决方案

重定向解决方案其实就是通过sendRedirect的方式重定向到另一个内部资源，这种方式会更改用户浏览器地址的URL，且除了调用本服务器上的资源文件，也可以调用互联网上的资源文件（例如百度）

弊端：这个是用户浏览器发送到服务器，服务器返回一个链接到用户浏览器，然后浏览器再导航到新连接，这样虽然用户只发送一次请求，但是浏览器还是发送了两次请求给服务器，更耗时

```java
    //servlet1
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("one已执行");
        response.sendRedirect("/exam/two");
    }

//servlet2
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("two已执行");
    }


```

##### 请求转发解决方案

当用户访问一个动态资源文件时，让这个资源java类调用另一个，这样用户只需要向浏览器发送一次请求，节省了时间，且每个java类第二个java类调用doGet或者doPost取决于用户发送的数据包，这种方式只能访问本机中的资源文件，无法访问互联网中的资源文件

```java
        System.out.println("one已执行");
        //通过当前请求对象生成另一个请求对象的地址
        RequestDispatcher report = request.getRequestDispatcher("/two");
        //将请求对象和响应对象通过携带参数的方式来调用方法，访问另一个动态资源java类
        report.forward(request,response);
```

#### 多个servlet实现数据共享

- OneServlet工作完毕后，将产生的数据交给TwoServlet

##### ServletContext接口

- 来自于servlet规范中的一个接口，被tomcat实现
- 如果两个servlet来自同一个网站，可以通过ServletContext实现数据共享
- 习惯称之为“全局作用域对象”
- 它相当于一个map集合，第一个servlet可以通过键值对的方式存进去变量，然后第二个通过key来取
- 因为这个全局作用域是将数据存储到服务器内存当中，所以实际开发中一般只有高级工程师可以往里面放东西，我们只负责取

```java
/*
服务器创建，全局作用域创建
网站运行期间只有一个全局作用域
网站关闭，全局作用域关闭
*/
```

```java
//提交全局作用域
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //获取全局作用域对象
        ServletContext context = request.getServletContext();
        //向全局作用域对象传参数
        context.setAttribute("我是键", "我是值");
    }

//获得全局作用域
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String myKey = (String) request.getAttribute("我是键");

    }
```



##### cookie类

- 存在于servlet规范中的一个工具类
- 两个servlet来自同一个网站，并且为同一个客户服务，才可以借用cookie来进行数据共享
- cooike放的是用户私人数据
- cookie在用户第一次访问servlet的时候被创建，然后通过响应头来发送回浏览器
- cookie相当于map，也是存放键值对，但是一个cookie只能存放一个键值对，但是可以创建多个cookie同时返回给用户
- cookie生命周期
- cookie不算作用域对象，因为它不是仅仅存在于服务端内存中

cookie默认情况下，用户浏览器关闭，此cookie消亡。

cookie可以设置，让用户浏览器存放cookie至本地硬盘上，以及存活时间。如果指定存储到本地硬盘，关闭浏览器，关闭客户端计算机，关闭服务器都不会导致cookie消亡

```java
Cookie cookie = new Cookie();
cookie.setMaxAge(60);//60秒
```





##### HttpSession接口

来自servlet规范下的一个接口，被tomcat实现

两个servlet来自同一个网站，为同一位用户/浏览器服务。此时可以借助HttpSession对象进行数据共享

HttpSession使用map集合存储数据，可以存储任意数量的共享数据

Tomcat在为一个浏览器用户生成HttpSeesion对象之后，会生成一个cookie值，这个值相当于内存地址，然后返回给用户浏览器，用户下一次访问动态资源时就可以带着这个这个cookie来找到他的“柜子”，这个cookie的key是JSESSIONID

```java
getSession() 和 getSession(false)
/*不带参数的是：
用户如果有一个session对象，给用户返回他的session的cookie值
如果用户没session对象，创建一个新的session返回给用户*/
/*false的版本是：
如果用户有一个session对象，给用户返回他的session的cookie值
如果用户没有session对象，返回一个null*/
```

- HttpSession的销毁实际

用户与HttpSession的关联cookie只能放在用户的浏览器中，浏览器关闭时，意味着用户和他们的HttpSession的关联被切断，但是tomcat无法检测浏览器何时被关闭，所以通过timeout来销毁HttpSession对象，tomcat默认设置timeout时间为30分钟。

可以通过修改：当前网址/src/main/webapp/WEB-INF/web.xml

```xml
    <session-config>
        <!--5分钟-->
        <session-timeout>5</session-timeout>
    </session-config>
```



##### HttpSession和Cookie区别

Seesion就是解决cookie存储数据单一，存储数据量少的问题

存储位置：cookie的数据存储在用户内存和硬盘，HttpSession在服务端内存中

数据类型：Cookie对象存储共享数据类型只能是String，HttpSession对象可以存储任何类型，也就是说Object

数据数量：Cookie只能存储一个数据，HttpSession使用map集合存储数据，可以存储任意数量的共享数据

##### HttpServletRequest接口

就是请求对象，通过请求转发的方式来让一个servlet添加参数，转发给另一个servlet。 当一个请求对象的作用是实现数据共享，那么称之为“请求作用域对象”

通过req.setAttribute(key,value)，这种map的形式存入数据，值可以为任何类型（Object）

req.getA 

#### Servlet扩展（监听器）

监听器是用来监听“作用域对象的生命变化”（创建，销毁），“作用域对象共享数据变化的时刻”（增，删，改）

- 可被监听的对象

  ServletContext：全局作用域对象

  HttpSession：会话作用域对象

  HttpServletRequest：请求作用域对象

步骤：写一个class继承监听接口（ServletContextListener，ServletContextAttributeListener），然后在网站的XML配置文件里插入，最后重写接口方法即可

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--需要在这里注册监听器-->
    <listener>
        <listener-class>com.example.listener.Listener1</listener-class>
    </listener>
    <listener>
        <listener-class>com.example.listener.Listener2</listener-class>
    </listener>
    <servlet>
        <servlet-name>TestServlet</servlet-name>
        <servlet-class>com.example.controller.TestServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>TestServlet</servlet-name>
        <url-pattern>/test</url-pattern>
    </servlet-mapping>
</web-app>
```

#### Filter（过滤器接口）

Servlet中的接口，不提供实现，要手动实现

在Http服务器调用资源文件之前，判断其合法性，或者增强该请求

步骤：创建类并实现接口--重写doFilter--xml注册

相当于给资源文件上把锁

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--设置一个变量名，绑定filter类-->
    <filter>
        <filter-name>first</filter-name>
        <filter-class>com.filter.FirstFilter</filter-class>
    </filter>
    <!--设置一个map，绑定好filter后，再绑定资源文件，每次调用这个资源文件都会调用filter类做判断-->
    <filter-mapping>
        <filter-name>first</filter-name>
        <url-pattern>/1.jpg</url-pattern>
    </filter-mapping>
</web-app>
```

也可以在过滤器得到request和response时，向response将字符编码集设置为utf-8，这样以后再来post请求时，不需要额外设置编码

### JSP

JSP是替代serlvet里面doGet或者doPost方法里的response参数，通过，JSP方法返回响应对象（通过请求转发，转发给JSP文件）

servlet：处理业务并得到处理结果

JSP：不负责业务处理，主要任务将Servlet的处理结果写入响应体中（通过请求转发，请求转发可以通过请求作用域对象来传递参数）

```jsp
<%@ page import="com.sun.net.httpserver.HttpContext" %><%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/9/30
  Time: 16:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--在这两个标签中写JAVA命令,他就相当于一个方法体，正常方法里可以写什么，他就可以写什么-->
<%
    int a = 100;
    int b = 200;
    int c = a + b;
    for (int i = 0; i < 100; i++){

    }
    if (true){

    }
    request.getAttribute("自带request对象，当一个Servlet将请求转发给JSP，Servlet同时也需要传递request和response参数" );
    session.getAttribute("自带session对象");
    ServletContext servletContext = request.getServletContext();
    servletContext.getAttribute("自带全局作用域对象");
%>

<!--可以写html-->
<table>
    <tr>
        <td>
		<%=a%>
        </td>
    </tr>
</table>

```

#### EL表达式

降低JSP开发时，JAVA方面的开发强度

他可以在JSP文件更快捷的获取全局作用于对象中的属性

```xml
<!--传统在jsp调用java中的全局作用域对象-->
    <%
        Object item1 = application.getAttribute("item1");
        Object item2 = request.getAttribute("item2");
        Object item3 = session.getAttribute("item3");
       Student stu = application.getAttribute("stu1");
    %>
<!--使用el获取全局作用域对象的值-->
${applicationScope.item1}
${requestScope.item2}
${sessionScope.item3}
${applicationScope.stu.sname}
<!--更简化，但是有隐患，不建议使用-->
${item1}
${item2}
${item3}
${stu.sname}
<!--使用el进行数据运算和三目运算符-->
${applicationScope.item1 + requestScope.item2}
${applicationScope.item1 > 18 ? "true" : "false"}
<!--使用el获取get/post数据包中的请求数据-->
${param.username}
${param.password}
```

EL表达式可以获取实体类的参数，不是通过get和set方法，而是通过反射机制直接获取其属性

EL表达式没有遍历集合的方法，所以集合取不出来

# JAVASCRIPT

处理用户与浏览器之间交互的语言，弱类型风格语言

## 变量&数据类型

基本数据类型：

- 数字（number，不分小数）
- 字符串类型
- 布尔

```javascript
//局部变量
function fun1 (){
    var name = "嘻嘻";
}
//全局变量
var name =" 1";
function fun2(){
    name = "2"//方法体不带var，创建的变量也是全局变量
}
```

高级数据类型

- object类型：js中所有通过构造函数生成的对象都是object类型
- function类型：

特殊数据类型：

undefined：基本数据类型的null

null：高级数据类型的null，没指定内存地址

NaN：不合法的数字，123ABC

infinity：无穷大的数字， 1/0

## 函数

```javascript
<body>
<script type="text/javascript">
    function fun1(name,num){
        window.alert("名字是：" + name + "----数字是：" + num)
    }
    fun1("11",22)
    function fun2(){
        window.alert("点击输出")
        return 20;
    }

</script>
<input type="button" value="点我调用fun1" onclick="fun2()">
</body>
//匿名内部函数
var a = function fun1 (){
    
}
```

### Object对象

object是老祖宗，给这个类添加方法，相当于给所有类都添加一个方法

```javascript
var obj1 = new Object();
//添加属性
obj1.name = "1";
//添加方法
obj1.hello = function fun1 (){
    
}
```

### this

那个标签调用就指向谁

### DOM对象

### Document Object Model，文档模型对象

JavaScript不能直接操作html命令，类似于java不能直接操作数据库的表文件，需要使用DOM对象下达指令

浏览器在接收到服务器响应的html文件之后会将所有标签添加到浏览器缓存中，每加载一个**html标签**就生成一个DOM对象

在浏览器关闭时候，dom对象被销毁，或者浏览器在请求到新资源之后，本次dom将会被覆盖

### docutment，文档模型对象

document用于帮助定位浏览器中的dom对象

浏览器负责创建，浏览器会在DOM对象加载完成之后生成一个dom树（数据结构），docutment对象就是管理这棵树，浏览器关闭，document销毁

一个html对应一个document对象

```html
<!--通过id来获取值-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
  <script type="text/javascript">
    var item = document.getElementById("first").value;
    window.alert(item)
  </script>
</head>
<body>
  <p id="first">第一个标签</p>
  <input type="button"  value="第一个标签值">
</body>
</html>
```

```html
<!--通过Name来找寻值，返回的是一个数组-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
     
        var deptArray = document.getElementsByName("deptNo");
        for (var i = 0; i < deptArray.length; i++){
            var deptNo = deptArray[i]; 
        }
    </script>
</head>
<body>
    <input type="checkbox" name="deptNo" value="第一个button">
    <input type="checkbox" name="deptNo" value="第二个button">
    <input type="checkbox" name="deptNo" value="第三个button">
</body>
</html>
```

```html
<!--通过TagName获取参数，返回的是一个数组-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        
        var deptArray = document.getElementsByTagName("deptNo")
        for (var i = 0; i < deptArray.length; i++){
            var deptNo = deptArray[i];
        }
    </script>
</head>
<body>
    <input type="checkbox" name="deptNo" value="第一个button">
    <input type="checkbox" name="deptNo" value="第二个button">
    <input type="checkbox" name="deptNo" value="第三个button">
</body>
</html>
```

```html
<!--通过document调试标签样式-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function fun1(color){
            var one = document.getElementById("one");
            one.style.backgroundColor = color;
        }
    </script>
</head>
<body>
<center>
    <div id="one" style="width: 300px;height: 300px;background-color: gold">

    </div>
    红<input type="radio" name="two"  onclick="fun1('red')">
    黄<input type="radio" name="two"  onclick="fun1('yellow')">
    蓝<input type="radio" name="two"  onclick="fun1('blue')">
</center>
</body>
</html>
```

```html
<!--通过document获取标签内容（仅限双目）-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        function fun1(){
            document.getElementById("one").innerText = "改一次吧";
        }


    </script>
</head>
<body>
<h1 id="one">我是标签内容</h1><br>
<input type="button" onclick="fun1()" value="点我">

</body>
</html>
```

### 监听事件

一般分为两种，键盘和鼠标

```javascript
//单击事件
onclick:单击事件
onmouseover:监听用户何时将鼠标放到标签上方
onmouseout:监听用户何时将鼠标移出标签上方
onfocus:监听用户何时通过鼠标让当前标签获得光标
onblur:监听用户何时通过鼠标让当前标签遗失光标
```

```javascript
//键盘事件
onkeydown:监听用户何时在当前标签按下键盘
onkeyup:监听用户何时在当前标签弹起键盘
```

```javascript
//监听网页何时加载完毕

```

### 方法携带参数

javascript方法携带的参数会先存在方法里的一个内置数组，方法有用到该参数时，才会取出，也就是说，方法定义了一个参数，其实可以不传，或者多传，都不会报错

### 方法创建的实际

浏览器在调用javascript标签时，第一遍只会将所有的function的内容加载到内存里，第二遍才会去调用这些方法

```javascript
//一个简单的javascript脚本
function fun1(){
    window.alert("弹出窗口")
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--绑定脚本-->
    <script type="text/javascript" src="allScript.js">

    </script>
</head>
<body>
    <!--设置点击事件-->
<input type="button" value="buttion名" onclick="fun1()">

</body>
</html>
```

