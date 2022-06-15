# 基础

解耦和，项目更容易维护

在spring中所有的对象都成为bean,每个bean都需要有无参的构造方法



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--    创建一个类对象，让spring来管理-->
    <bean id="user" class="org.zhs.entity.User" name="otherName"/>

</beans>
```

```java
public class Test1 {
    @Test
    public void getPara(){
        //死代码，获取spring的对象内容
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        User user = (User) context.getBean("otherName");
        System.out.println(user);
    }

}

```

---



# IOC(控制反转)

把对象的创建，赋值，管理工作都交给代码以外的容器(Spring)来实现。通过容器的概念，可以减少代码的改动，而实现不同的功能

控制：创建对象，对象的赋值，对象之间的关系管理

反转：把原来开发人员管理，创建对象的权利移交给容器实现，由容器替代开发人员

正转：开发人员主动的管理的方式来写代码，例如：手动new对象



默认通过Spring创建对象是通过无参构造，如果使用有参，需要写成下面的样子

通过有参构造可以通过这种方式来设置

```xml
<bean id="user" class="org.zhs.entity.User">
    <!--一个constructor就是一个构造函数里的参数-->
        <constructor-arg name="id" value="50"/>
</bean>
```

Spring配置文件

```xml
<!--别名，通过context调用别名即可-->
  <bean id="user" class="org.zhs.entity.User">
        <constructor-arg name="id" value="50"/>
  </bean>
<alias name="user" alias="otherName"/>
<!--别名，通过name设置多个别名， 可以通过 空格 , ; 来分割-->

<bean id="user" class="org.zhs.entity.User" name="firstName,secondName thirdName;fourName">
        <constructor-arg name="id" value="50"/>
    </bean>
```

```xml
<!--导入其他Spring的xml配置文件-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
<!--    创建一个类对象，让spring来管理-->
    <import resource="application.xml"/>

</beans>
```

## 依赖注入

依赖：bean里面的对象创建依赖Spring

注入：bean里面的对象中的所有属性都由容器来注入，称为"构造器注入"，这种注入方法依赖于实体类的set方法，一定要设置set方法

不同的参数

```java
//实体类
package org.zhs.entity;

import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

@Data
public class User {
    private String string1;
    private Address address1;
    private String[] array1;
    private List<String> list1;
    private Map<String,Object> map1;
    private Set<String> set1;
    private String setNull;
    private Properties prop;
}
// User(string1=content, address1=Address(address=随便一个地址), array1=[第一个参数, 第二个参数], list1=[list的第一个参数, list的第二个参数], map1={第一个键=第一个值, 第二个键=第二个值}, set1=[set集合的第一个值, set集合的第二个值], setNull=null, prop={url=jdbc:mysql://localhost:3306, driver=JDBC})

```

```xml
<!--设置xml件，给实体类设置参数-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
   <bean id="address1" class="org.zhs.entity.Address">
      <property name="address" value="随便一个地址"/>
   </bean>
   <bean id="user" class="org.zhs.entity.User">
<!--      给String设置参数-->
      <property name="string1" value="content"/>
<!--      给实体类中的对象设置参数-->
      <property name="address1" ref="address1"/>
<!--      给数组设置参数-->
      <property name="array1">
         <array>
            <value>第一个参数</value>
            <value>第二个参数</value>
         </array>
      </property>
<!--      给List设置参数-->
      <property name="list1">
         <list>
            <value>list的第一个参数</value>
            <value>list的第二个参数</value>
         </list>
      </property>
<!--      给map设置参数-->
      <property name="map1">
         <map>
            <entry key="第一个键" value="第一个值"/>
            <entry key="第二个键" value="第二个值"/>
         </map>
      </property>
<!--      给set集合设置参数-->
      <property name="set1">
         <set>
            <value>set集合的第一个值</value>
            <value>set集合的第二个值</value>
         </set>
      </property>
<!--      设置空值（非空参）-->
      <property name="setNull" >
         <null/>
      </property>
<!--设置properties文件,key是键，标签内是值-->
      <property name="prop">
         <props>
            <prop key="driver">JDBC</prop>
            <prop key="url">jdbc:mysql://localhost:3306</prop>
         </props>
      </property>
   </bean>

</beans>
```

## bean的作用域

- 单例模式（singleton）：默认模式，被设置成单例的对象，在内存中只会存储一份

```xml
<bean id="address1" class="org.zhs.entity.Address" scope="singleton"></bean>
```

- 原型模式（prototype）：每次获取对象都会创建一个新的对象，消耗更多的内存，但是多线程更方便

```xml
<bean id="address1" class="org.zhs.entity.Address" scope="prototype"></bean>
```

```java
public class Test1 {
    @Test
    public void entity(){
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        User user = (User) context.getBean("user");
        User user2 = (User) context.getBean("user");//如果是单例，此时这两个user都是同一个，如果是原型，那么他们是不同的两个
        System.out.println(user);
    }
}

```

## bean自动装配

- xml装配
- java装配

```java
//配置类
@Configuration  //声明是一个配置类
@ComponentScan("org.zhs")//设置要扫的包，可以不配置
public class SpringConfig {

    @Bean  //绑定一个类，返回值为本类
    public User getUser(){
        return new User();
    }
}
```

```java
//实体类
@Component
public class User {

    @Value("一个名字") //设置Value
    private String name;

    public User() {
    }

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```

```java
//测试类
public class MyTest {

    @Test
    public void Test1(){
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
        User getUser = context.getBean("getUser", User.class);
        System.out.println(getUser.getName());
    }
}

```



- 隐式装配

常用搭配：注解用来设置value，用bean来配置类

```xml
@Autowired:通过类型自动装配，需要实体类里面的参数类型有一个对应的类
@Nullable：写在方法的参数前面，表示此值可以为null
@Resource：通过名字进行装配
----------------------------------------------------------------------------------------------------------------------------------------
@Component：自动装配该类到spring上，不需要再往xml文件里写bean标签了，他的id设置为类名的首字母小写，及UserDetail = context.getBean("userDetail");
	@Repository：功能与Component相同，Dao类设置这个注解
	@Service：功能与Component相同，Service类设置这个注解
	@Controller：功能与Component相同，Controller（servlet）类设置这个注解

@Scope()：设置作用域，默认为单例，@Scope("prototype")

@Bean：设置本类为Spring容器类
@ComponentScan("org.zhs")
@Import("config2.class")：导入其他Spring配置类
```

```yaml
@Value("${super.pwd}")  获取它的值

super:
  pwd: xltys1995
```



隐式装配就是通过注解的方式来给实体类设置参数

```xml
<!--隐式装配的xml文件，注意，xml的配置需要添加一些新规则-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">
<!--需要设置这行参数，否则无法使用隐式装配-->
    <context:annotation-config/>
    <!--    指定要扫描的包，spring只会让这个包下的注解生效-->
    <context:component-scan base-package="org.zhs.entity"/>
    
    <bean id="pet" class="org.zhs.entity.Pet"/>
    <bean id="person" class="org.zhs.entity.Person"/>
</beans>
```

```java
package org.zhs.entity;

import org.springframework.beans.factory.annotation.Autowired;

public class Person {
    
    //此处添加Autowired注解，他会自动绑定pet类
    @Autowired
    private Pet pet;

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }
}

```

```java
package org.zhs.entity;

public class Pet {
    public void sound(){
        System.out.println("宠物发出声音");
    }
}

```



---



# AOP（面向切面编程）



## 代理模式

- 静态代理

在原有的代码上套一层,原有代码仅实现业务,然后套的这一层来进行一些额外操作,例如:日志功能.用户在调用的时候调用代理类,之后代理类再去调用业务类

- 动态代理
  1. 和静态代理角色一样,也是接口,实现类,代理类,
  2. 动态代理的代理类是动态生成的,不是手动写的
  3. 动态代理分为,接口动态代理和类动态代理

简而言之,在业务上面加一个代理层,让用户的请求先打到代理层,代理曾处理完之后在发送给业务类 

主要的两个类,invocationHandler和Proxy

**看SpringStudy-Spring05_DynamicProxy**

```java
package org.zhs.utils;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ProxyInvocationHandler implements InvocationHandler {
    private Object target;



    public Object getProxy(Object target){
        this.target = target;
        //第一个参数,获取一个类加载器,通过反射获取本类的类加载器
        //第二个参数,获取需要代理的接口,为什么不是类,因为类已经实现了这个接口,已经算是接口的一个子类了,虽然这里获取的是接口
        //但是穿参的时候可以穿一个实现该接口的类
        //第三个参数,传输一个InvocationHandler接口的实现类,直接传输本类即可
        return Proxy.newProxyInstance(this.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                this);
    }
    //invoke本身就是反射中用来执行反射类里方法的一个方法
    //
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //第一个参数是对象,获取这个对象里面的方法
        System.out.println("执行了:"+method.getName()+"方法");
        Object result = method.invoke(target, args);

        return result;
    }
}

```



## 面向切面编程

通过预编译和运行时动态代理来实现程序的同一维护

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringStudy</artifactId>
        <groupId>org.zhs</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>Spring06_DunamicProxyBySpring</artifactId>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
<dependencies>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjrt</artifactId>
        <version>1.9.4</version>
    </dependency>


    <!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.6</version>
    </dependency>

    <!-- https://mvnrepository.com/artifact/org.aopalliance/com.springsource.org.aopalliance -->
    <dependency>
        <groupId>org.aopalliance</groupId>
        <artifactId>com.springsource.org.aopalliance</artifactId>
        <version>1.0.0</version>
    </dependency>
</dependencies>
</project>
```





```xml
<!--使用aop的配置文件,和纯spring不一样-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--    创建一个类对象，让spring来管理-->
    <bean id="userService" class="org.zhs.service.SQLServiceImple"/>
    <bean id="firstLog" class="org.zhs.log.FirstLog"/>

    <aop:config>
<!--        设置一个切入点
        expression:一个表达式,表示了哪个类,哪个方法
        *:表示所有
        org.zhs.service.SQLServiceImple.* 表示这个类中的所有方法
        (..) 表示方法可以为携带参数
        -->
        <aop:pointcut id="pointcut" expression="execution(* org.zhs.service.SQLServiceImple.*(..))"/>


<!--    执行环绕增加
        把log作为切入类
        在pointcut时切入-->
        <aop:advisor advice-ref="firstLog" pointcut-ref="pointcut"/>
    </aop:config>


</beans>
```

方法二实现:

 定义一个类来实现切面,狂神spring-22

通过注释实现切面代理

```xml
<!--配置文件-->
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--    开启注释配置-->
    <aop:aspectj-autoproxy/>
    <!--    创建一个类对象，让spring来管理-->
    <bean id="userService" class="org.zhs.service.SQLServiceImple"/>
    <bean id="firstLog" class="org.zhs.log.FirstLog"/>



</beans>
```

```java
//动态代理
package org.zhs.log;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

//这个注解表示,这个类是动态代理类
@Aspect
public class FirstLog  {
    //代理方法执行前需要执行的语句
    @Before("execution(* org.zhs.service.SQLServiceImple.*(..))")
    public void before(){
        System.out.println("方法执行前");
    }
    //代理方法执行后需要执行的语句
    @After("execution(* org.zhs.service.SQLServiceImple.*(..))")
    public void after(){
        System.out.println("方法执行后");
    }
}


```

# 整合MyBatis

```xml
   <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.15</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.2</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.3.9</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.3.10</version>
        </dependency>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjrt</artifactId>
            <version>1.9.6</version>
        </dependency>


        <!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.9.6</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.aopalliance/com.springsource.org.aopalliance -->
        <dependency>
            <groupId>org.aopalliance</groupId>
            <artifactId>com.springsource.org.aopalliance</artifactId>
            <version>1.0.0</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.2</version>
        </dependency>
    </dependencies>
<!--让maven读取properties和xml文件-->
 <build>
<!-- 默认不编译properties和xml，添加这行让它编译-->
    <resources>
      <resource>
        <directory>src/main/java</directory>
        <includes>
          <include>**/*.properties</include>
          <include>**/*.xml</include>
        </includes>
        <filtering>false</filtering>
      </resource>
    </resources>
  </build>
```

狂神spring24-28
