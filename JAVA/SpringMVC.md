# 基础MVC架构

M(model):数据模型,提供要展示的数据和行为(dao和service),

V(view):jsp和response,指一些返回给用户的内容

C(controll):servlet,接受用户请求

# maven

# ![MVC添加框架支持1](https://gitee.com/zhssss/image/raw/master/202112071518829.png)

![](https://gitee.com/zhssss/image/raw/master/202112071518823.png)

确保项目中有依赖

![](https://gitee.com/zhssss/image/raw/master/202112071518825.png)



```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.11</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>javax.servlet.jsp</groupId>
        <artifactId>jsp-api</artifactId>
        <version>2.2</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>

</dependencies>
```

# SpringMVC

通过一个dispatchServlet来管理所有的servlet

```jsp
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/10/18
  Time: 9:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%--第一步,先创建一个返回页面--%>
${msg}
</body>
</html>

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
<!--    第二步-->
<!--配置一个dispatchServlet,这是SpringMVC的核心,相当于在所有Servlet上加了一层代理,用户先访问它,然后它转发给
我们的Servlet,这个东西也成为"请求分发器",前端控制器
这个类是SpringMVC自带的-->
    <servlet>
        <servlet-name>SpringServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<!--        此外，还需要给这个Servlet绑定一个配置文件,通过这个配置文件来控制自己写的servlet-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
<!--            成功绑定-->
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
<!--        服务器启动,Dispatch启动-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringServlet</servlet-name>
<!--        设置为"/",这样所有请求都会走这个Servlet-->
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
<!--    第三步-->
<!--    SpringMVC的核心三要要素-->
<!--    处理映射器-->
    <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
<!--    处理适配器-->
    <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
<!--    视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
<!--        匹配前缀-->
        <property name="prefix" value="/WEB-INF/jsp/"/>
<!--        匹配后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>

<!--    设置访问页面-->
    <bean id="/firstpage" class="org.zhs.controller.FirstServlet"/>
</beans>
```

```java
package org.zhs.controller;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
* 第四步,写servlet*/
public class FirstServlet implements Controller {
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ModelAndView mv = new ModelAndView();
        //业务代码,假设处理完业务,有这么一个值
        String result = "I'm a result";
        //存入一个键值对,键对应jsp里面要取的键
        mv.addObject("msg",result);

        //视图跳转,写上jsp的名字,前缀和后缀都已经写在xml配置文件了
        mv.setViewName("hello");
        return mv;
    }
}

```

## 使用注解的方式

```jsp
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/10/18
  Time: 11:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
${msg}
</body>
</html>

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>SpringMVC</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringMVC</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">
<!--    设置自动扫面所有controller-->
    <context:component-scan base-package="org.zhs.controller"/>
<!--    设置SpringMVC不加载静态资源,例如:html,css,js之类的-->
    <mvc:default-servlet-handler/>
<!--    代替手动配置BeanNameUrlHandlerMapping和SimpleControllerHandlerAdapter-->
    <mvc:annotation-driven/>

<!--    视图解析器还是需要手动创建-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

```java
package org.zhs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

//通过注解的方式定义这个类
@Controller
@RequestMapping("myweb") //此时访问这些servlet需要到localhost:8080/"网站名"/myweb/
public class FirstServlet {
    //方法名无所谓,但是一定要返回值
    @RequestMapping("h1")//此时访问这些servlet需要到localhost:8080/"网站名"/myweb/h1
    public String MyServlet(Model model){
        //封装数据,让jsp读取出来
        model.addAttribute("msg","some info");
        //返回的字符串就是返回jsp的名字,前面已经做了自负拼接,所以直接写名字
        return "hello";
    }
}
```

# RestFul

restful是一种访问风格,不再通过地址栏的name=xxx来传递参数,而是通过localhost:8080/xxx/xxx来携带参数

他通过请求的方式让后台执行不同的操作,例如get请求就是读,post请求就是写,delete请求是删除

```jsp
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/10/18
  Time: 16:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
${msg}
</body>
</html>

```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>SpringMVCServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc_servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringMVCServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <context:component-scan base-package="org.zhs.controller"/>
    <mvc:default-servlet-handler/>
    <mvc:annotation-driven/>

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

```java
package org.zhs.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class MyRestful {
    //通过设置@PathVariable来控制Restful风格,然后就可以通过/后面的不同角标来获取值
    //其次可以通过method来指定合法的请求方式
    @RequestMapping(value = "/myweb/{first}/{second}", method = RequestMethod.GET)
    //@RequestMapping("/myweb/{first}/{second}") 如果不指定请求方式,可以简写成这个样子
    public String firstRestful(Model m, @PathVariable String first, @PathVariable String second){
        String allString = first+second;
        m.addAttribute("msg",allString);
        return "hello";
    }

    //这是直接把请求方式写死的Mapping,只能接收这种请求
    /*
    @PatchMapping
    @PostMapping
    @PutMapping
    @DeleteMapping

     */
    @GetMapping("/web/{first}/{second}")
    public String secondRestful(Model m, String first, String second){
        System.out.println("执行了第二个方法");
        String allString = first+second;
        m.addAttribute("msg",allString);
        return "hello";
    }
}
```

# 设置重定向和转发

看gitee

# 通过web网页传参数 or 对象 向servlet

看gitee

# 乱码问题

从此,这两个配置成为死代码

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>SpringMVCServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc_servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringMVCServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
<!--配置过滤器,将所有请求编码转为utf-8-->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

# JSON

主要是前端不懂什么是对象,只能用JSON喽

```xml
<!--maven-->
<dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.60</version>
    </dependency>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>SpringMVCServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc_servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringMVCServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    <!--配置过滤器,将所有请求编码转为utf-8-->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        https://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <context:component-scan base-package="org.zhs.controller"/>
    <mvc:default-servlet-handler/>
    <!--死代码,返回json不会乱码-->
    <mvc:annotation-driven/>
        

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```
