# 微服务

把一个整合的服务,拆分成一个个小服务

# Spring boot

创建项目需要选择web框架

![](https://gitee.com/zhssss/image/raw/master/202112071518826.png)

- 通过修改application.properties文件来改一些配置

```properties
#修改内嵌tomcat端口号
server.port=8081 
```

- 通过在resources目录下创建一个banner.txt来修改启动横幅

## 基础理论

每个spring boot的maven配置中都有一个父工程,它在里面已经把需要的jar包导入过了

在spring boot中,他们把某一方面的jar包集合成一个start,例如spring-boot-starter-web,它里面就包含了许多关于web的jar包

```java
@SpringBootApplication //标注是一个spring b
```

## yaml

yaml是一种类似xml的文件,用于存放配置,但是多了一些语法,而且yaml对于空格有着严格的要求,每个value前面必须要有一个空格

spring boot的yaml必须命名为application.yaml

```yaml
#对空格要求非常高
#普通的值, key: value
name: zhu

# 对象,name和age就相当于student下的项
student:
  name: zhu
  age: 3

#行内写法
student2: {name: zhu, age: 3}

#数组
pet:
  - cat
  - dog
  - pig

#行内写法
pet2: [cat, dog, pig]
```

## 给一个类赋值

```java
package org.zhs.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
//获取application.yaml里面user1对象的值
@ConfigurationProperties(prefix = "user1")
public class User {

    private String name;
    private int age;
    private boolean sex;
}
```

```yaml
user1:
  name: zhu
  age: 22
  sex: true
```

```java
package org.zhs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zhs.pojo.User;

@SpringBootTest
class Springboot01BasicApplicationTests {
    //让这个对象自动装配
    @Autowired
    private User user;
    @Test
    void contextLoads() {
        System.out.println(user);
    }

}
```

## JSR-303

一种数据校验,可以判断该对象的属性在实例化的时候,传递的值是否在指定范围

```xml
        <dependency>
            <groupId>org.hibernate.validator</groupId>
            <artifactId>hibernate-validator</artifactId>
            <version>6.0.16.Final</version>
        </dependency>
```

```java
package org.zhs.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Null;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
//获取application.yaml里面user1对象的值
@ConfigurationProperties(prefix = "user1")
//开启数据校验
@Validated
public class User {
    //不能为空
    //https://www.jianshu.com/p/554533f88370
    @Null
    private String name;

    private int age;
    private boolean sex;
}

```

## Spring boot环境配置

配置文件优先级:

1. ./config/application.yaml
2. ./aaplication.yaml
3. .src/main/java/config/application.yaml
4. .src/main/java/application.yaml

设置自动装配某套环境

```yaml
server:
  port: 8080
spring:
  profiles:
    active: dev
---
server:
  port: 8081
spring:
  profiles: dev

---
server:
  port: 8082
spring:
  profiles: test

```

# Spring boot开发

## 静态资源目录(排名分先后)

1. src/main/resources/resources
2. src/main/resources/static
3. src/main/resources/public

网站首页可以放在以上三个目录下的任意一个,名字被限定为:index.html



## Templates目录

相当于WEB-INF目录,里面的东西只能通过controller来跳转

```xml
<!--这两个依赖没写版本号,因为spring boot已经写好了-->
<dependency>
            <groupId>org.thymeleaf</groupId>
            <artifactId>thymeleaf-spring5</artifactId>
        </dependency>
        <dependency>
            <groupId>org.thymeleaf.extras</groupId>
            <artifactId>thymeleaf-extras-java8time</artifactId>
 </dependency>
```

然后直接在templates下写html,在controller写跳转,就和SpringMVC一样

需要先在html里导入thymleaf的语法

https://www.thymeleaf.org/index.html

```xml
<!DOCTYPE html>
<!--导入thymleaf语法-->
<html lang="en" xmlns:th="http://www.thymleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!--让thymleaf接管一个标签,只需要在他前面添加一个th:,例如以前设置text,现在设置th:text-->
<div th:text="${msg}"></div>
</body>
</html>
```

```java
package org.zhs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class HelloController {

    @RequestMapping("/h")
    public String hello(Model model){
        model.addAttribute("msg","hello spring boot");
        return "Hello";
    }
}

```

## 扩展SpringMVC

写一个类,注解 @Configuration  实现:WebMvcConfigurer,重写里面的方法即可

# 404页面

只需要在templates里创建一个error目录,然后创建一个404.html放进去(写404,报404时会找它,同理500也是)

# Mybatis

update user set password=password(‘0901593322’) where user=’root’ and host=’localhost’; 

# druid

阿里巴巴提供的一个sql数据源,除了可以进行数据库操作外,还可以通过访问web页面的方式来查看一些数据库操作的记录

```xml
<!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.8</version>
</dependency>

```

## 项目结构

http://localhost:8080/druid

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>org.zhs</groupId>
    <artifactId>springboot_project2</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>springboot_project2</name>
    <description>springboot_project2</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.8</version>
        </dependency>
        <!-- druid需要用到log4j,所以自行添加log4j功能-->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>

        <dependency>
<!--            JDBC-->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
<!--            MySQL-->
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.5.6</version>
            </plugin>
        </plugins>
    </build>

</project>
```

```yaml
spring:
  datasource:
    username: root
    password: 0901593322
#    serviceTimezone:设置时区
#    useUnicode:设置编码
#    characterEncoding:设置编码格式
    url: jdbc:mysql://localhost:3306/springboot?serviceTimezone=UTC&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.mysql.cj.jdbc.Driver
#    设置为druid数据源
    type: com.alibaba.druid.pool.DruidDataSource
    initialSize: 5
    maxActive: 10
    maxWait: 3000
    filters: stat,wall,log4j
    maxPoolPreparedStatementPerConnectionSize: 20
    useGlobalDataSourceStat: true
    connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
```

```java
package org.zhs.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.HashMap;
@Configuration
public class DruidConfig {
//    绑定配置文件的私有化配置.配置文件里有一个datasource的配置
    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druidDataSource(){
        return new DruidDataSource();
    }
    @Bean
    public ServletRegistrationBean statViewServlet(){
//       先创建访问这个网页的链接,然后再设置密码等内容,一定要加/druid/*  被坑过
        ServletRegistrationBean<StatViewServlet> bean = new
                ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");

        HashMap<String, String> initparameter = new HashMap<>();
        initparameter.put("loginUsername","admin");
        initparameter.put("loginPassword","0901593322");
//        设置谁可以访问,设置成localhost代表只能本机访问
        initparameter.put("allow","");

//        他的参数需要传递一个map,然后在map里通过键值对的形式来进行设置
        bean.setInitParameters(initparameter);

        return bean;

    }
}
```

# swagger

```xml
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.9.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.9.2</version>
        </dependency>
```

https://gitee.com/zhssss/swaggerProject

# 异步加载,邮件,定时器

异步加载

```java
@EnableAsync//如果要使用多线程,必须添加该注解在SpringbootEmailThreadTimingApplication
@Async//加了这个注解,他会自动为当前方法开启一个线程执行,不过要在主main方法里添加@EnableAsync
```

邮件和定时器没看

dubbo和zookeeper
