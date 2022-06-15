# 基础

提供创建connection,statement,resultset的能力

执行sql的能力

循环sql，把sql结果创建成对象，然后把对象装箱到list集合的能力

关闭资源的能力

开发人员只需要提供sql语句

# SQL mapper

sql映射，把表中的一行数据映射为一个java对象，操作这个对象就相当于操作表中的数据

# Data Access Object

数据访问，对数据库执行增删改查

```xml
第一步，设置POM.xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
<!--  父工程-->
  <groupId>org.zhs</groupId>
  <artifactId>Mybatis_study</artifactId>
  <packaging>pom</packaging>
  <version>1.0-SNAPSHOT</version>
    
  <dependencies>
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
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
  </dependency>
</dependencies>

</project>

```

```xml
第二步，在项目的resouces文件夹创建mybatis-config.xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
<!--通过default选择默认配置环境-->
    <environments default="development">
<!--        单个环境标签-->
        <environment id="development">
<!--            事务管理,通过JDBC进行事务管理-->
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;userUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;failOverReadOnly=false&amp;useJDBCCompliantTimezoneShift=true&amp;useLegacyDatetimeCode=false&amp;serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="123"/>
            </dataSource>
        </environment>
    </environments>
<!--    每一个实现sql抽象接口的xml文件都需要在这里注册-->
    <mappers>
        <mapper resource="com/zhs/dao/UserMapper.xml"/>
    </mappers>
</configuration>

```

```java
//第三步，写一个工具类
package com.zhs.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;


public class MybatisUtil {
    private static SqlSessionFactory build;
    static {
        try {
            //获取mybatis配置文件，里面是一些数据库连接信息
            String resource = "mybatis-config.xml";
            //获取配置文件的数据流
            InputStream resourceAsStream = Resources.getResourceAsStream(resource);
            //获取一个工厂，用于制作执行sql的sqlsession
            build = new SqlSessionFactoryBuilder().build(resourceAsStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static SqlSession getSqlsession(){
        //通过工厂制作Sqlsession并返回
        return build.openSession(); //设置参数为true，自动commit
    }
}

    
```

```java
//获取到sqlsession之后就可以操作数据库了，开始创建实体类，Dao接口，Dao接口的xml配置文件
package com.zhs.entity;

public class User {
    private int id;
    private String name;
    private String pwd;

    public User() {
    }

    public User(int id, String name, String pwd) {
        this.id = id;
        this.name = name;
        this.pwd = pwd;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}


```

```java
//创建一个dao接口，用来操作实体类。
package com.zhs.dao;

import com.zhs.entity.User;

import java.util.List;

public interface UserDao {
     List<User> getUserList();
}

```

```xml
<!--接口实现xml-->
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--绑定需要操作的接口类-->
<mapper namespace="com.zhs.dao.UserDao">
<!--    id：上面绑定过接口类之后，需要实现接口类里面的抽象方法，把ID设置成抽象方法名就可以实现这个方法-->
<!--    resultType：设置实体类，获取一行参数，得到一个实体类-->
    <select id="getUserList" resultType="com.zhs.entity.User">
        select * from mybatis.user
    </select>
</mapper>
```

```xml
<!--maven配置，取消过滤xml和properties-->
 <build>
    <resources>
      <resource>
        <directory>src/main/resources</directory>
        <includes>
          <include>**/*.properties</include>
          <include>**/*.xml</include>
        </includes>
        <filtering>true</filtering>
      </resource>
      <resource>
        <directory>src/main/java</directory>
        <includes>
          <include>**/*.properties</include>
          <include>**/*.xml</include>
        </includes>
        <filtering>true</filtering>
      </resource>
    </resources>
  </build>
```

# CRUD（增删改查）

增删改都需要提交事务

如果一张表的字段太多，可以考虑使用map来存放仅需要的键值对，而不是创建对象

# 项目配置文件解析（mybatis-config.xml）

```xml
configuration（配置）
properties（属性）
settings（设置）
typeAliases（类型别名）
typeHandlers（类型处理器）
objectFactory（对象工厂）
plugins（插件）
environments（环境配置）
	environment（环境变量）
	transactionManager（事务管理器）：有两个，一个是JDBC，一个是MANAGED，用spring不用学MANAGED
	dataSource（数据源）：POOLED创建一个连接之后，保持这个连接池，再来用户需要操作数据库也不用重新连接（最推荐）,UNPOOLED不要求数据库性能，每次连接之后断开，JNDI 
databaseIdProvider（数据库厂商标识）
mappers（映射器）
```

## 1.通过properties设置连接

```properties
设置外部配置文件,resources.db.properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=utf8&amp;autoReconnect=true&amp;failOverReadOnly=false&amp;useJDBCCompliantTimezoneShift=true&amp;useLegacyDatetimeCode=false&amp;serverTimezone=UTC
username=root
password=123
```

```xml
<properties resource="db.properties"/>

<environments default="development">
<!--        单个环境标签-->
        <environment id="development">
<!--            事务管理,通过JDBC进行事务管理-->
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/>
                <property name="url" value="${url}}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
```

## 2.给类设置别名

```xml
    <typeAliases>
<!--        手动为单个类设置别名-->
        <typeAlias type="org.zhs.entity.User" alias="user"/>
        <!--给这个包下的所有类设置别名，默认为类型，但首字母小写：User.class = user-->
        <package name="org.zhs.entity"/>
        
        
    </typeAliases>
```

## 3.生命周期

### SqlSessionFactoryBuilder

他的作用就是为了创建一个SqlSessionFactory，创建完成之后就没用了，可以放在初始化

### SqlSessionFactory

他是一个池，用于创建sqlsession，每个sqlsession都会通过这个池来操作数据库，它的生命周期应该贯穿整个程序

### SqlSession

他是携带请求发送给SqlSessionFactory，可以并发发送，结束之后记得关闭

## 4.resultmap

当数据库的字段名和实体类的属性不相同时，用得到

# 日志

SLF4J 

##  LOG4J 

可以控制输出的目的地，例如，控制台，本地文件，GUI组件。 而且还可以控制日志输出格式，所有的设置都通过配置文件修改，不需要动代码

```xml
<!--Maven配置文件-->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>

```



 LOG4J2

 JDK_LOGGING

 COMMONS_LOGGING

## STDOUT_LOGGING

```xml
<!--设置setting的log，设置logImpl-->
<configuration>
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>
<!--通过default选择默认配置环境-->
    <typeAliases>
<!--        手动为单个类设置别名-->
        <typeAlias type="org.zhs.entity.User" alias="user"/>
        <!--给这个包下的所有类设置别名，默认为类型，但首字母小写：User.class = user-->
        <package name="org.zhs.entity"/>
    </typeAliases>
    
    <environments default="development">
<!--        单个环境标签-->
        <environment id="development">
<!--            事务管理,通过JDBC进行事务管理-->
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=utf8&amp;autoReconnect=true&amp;failOverReadOnly=false&amp;useJDBCCompliantTimezoneShift=true&amp;useLegacyDatetimeCode=false&amp;serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="123"/>
            </dataSource>
        </environment>
    </environments>
<!--    每一个实现sql抽象接口的xml文件都需要在这里注册-->
    <mappers>
        <mapper resource="com/zhs/dao/UserMapper.xml"/>
    </mappers>
</configuration>
```

NO_LOGGING

# 注解

```java
public interface UserMapper {
    //以注解的方式开发
    @Select("SELECT * FROM user")
    List<User> getAllUser();
    
    //Param的参数要和#{}对上，基本和String需要加@Param，引用不需要
    @Select("SELECT * FROM user WHERE id = #{id}")
    List<User> getUserById(@Param("id") int id);

}



```

# 动态SQL

动态SQL是根据不同的条件生成不同的SQL

根据if条件来写sql，本质还是SQL，只不过通过if来动态拼接

https://mybatis.org/mybatis-3/zh/dynamic-sql.html

```xml
 <sql id="if-title">
        <if test="title != null">
            title = #{title}
        </if>
 </sql>
 <select id="queryBlogIf" parameterType="map" resultType="blog">
        select * from user
        <where>
            <include refid="if-title"></include>
        </where>
 </select>
```

# 缓存

每次查询都跑到硬盘里，这种方式太占用资源，将每次查询的内容放在缓存（内存）中可以减少访问（查询/读）速度

mybatis有两个缓存**一级缓存**，**二级缓存**

- 映射语句文件中的所有 select 语句的结果将会被缓存。
- 映射语句文件中的所有 insert、update 和 delete 语句会刷新缓存。
- 缓存会使用最近最少使用算法（LRU, Least Recently Used）算法来清除不需要的缓存。
- 缓存不会定时进行刷新（也就是说，没有刷新间隔）。
- 缓存会保存列表或对象（无论查询方法返回哪种）的 1024 个引用。
- 缓存会被视为读/写缓存，这意味着获取到的对象并不是共享的，可以安全地被调用者修改，而不干扰其他调用者或线程所做的潜在修改。

## 一级缓存

默认开启，每个sqlsession都会缓存

## 二级缓存

默认关闭，需要在namespace上设置，针对一个xml文件设置二级缓存

步骤1，在全局配置添加开启标签

```xml
<!--mybatis-config.xml-->
<configuration>
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
        <setting name="cacheEnabled" value="true"/>
    </settings>
</configuration>
```

步骤2，在mapper中开启缓存

```xml
<mapper namespace="com.zhs.dao.UserDao">
    <cache
            eviction="FIFO" 
            flushInterval="60000"
            size="512"
            readOnly="true"/>
</mapper>
<!--
eviction:
LRU – 最近最少使用：移除最长时间不被使用的对象。
FIFO – 先进先出：按对象进入缓存的顺序来移除它们。
SOFT – 软引用：基于垃圾回收器状态和软引用规则移除对象。
WEAK – 弱引用：更积极地基于垃圾收集器状态和弱引用规则移除对象。

flushInterval:
60000=60秒  （刷新间隔）属性可以被设置为任意的正整数，设置的值应该是一个以毫秒为单位的合理时间量。 默认情况是不设置，也就是没有刷新间隔，缓存仅仅会在调用语句时刷新。

size：
（引用数目）属性可以被设置为任意正整数，要注意欲缓存对象的大小和运行环境中可用的内存资源。默认值是 1024。

readOnly
（只读）属性可以被设置为 true 或 false。只读的缓存会给所有调用者返回缓存对象的相同实例。 因此这些对象不能被修改。这就提供了可观的性能提升。而可读写的缓存会（通过序列化）返回缓存对象的拷贝。 速度上会慢一些，但是更安全，因此默认值是 false。
-->
```

