# 基础

- 在编写实体类的时候,属性的类型设置为包装类,设置成基本数据类型会在更新的时候导致int属性的值在数据库中等于0
- 默认支持java驼峰转换成数据库下划线,也可以手动设置

```yaml
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
```



## CRUD

查询所有内容,返回一个list集合

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;
    @Test
    void contextLoads(){
        List<User> users = userMapper.selectList(null);
        for (User user : users) {
            System.out.println(user);
        }
    }
}

```

增加一行(并获取自增主键的值)

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        User user = new User();
        user.setName("random");
        user.setAge(20);
        user.setEmail("pro6@qq.com");
        userMapper.insert(user);
//        如果主键是自增的,可以通过getid方法来获取返回的自增值
        System.out.println(user.getId());
    }
}
```

按照id来修改数据

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        User user = new User();
//        在这里设置完ID之后,它会到数据库中找一个id对应的数据
        user.setId(1L);
        //需要修改什么,改对应属性就行,如果实体类某个参数的值是null,不会产生修改操作
        user.setName("randomName");
        userMapper.updateById(user);
    }
}

```

通过主键来进行删除

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
//        通过主键来进行删除
        userMapper.deleteById(1);
    }
}
```

通过map的方式来添加条件进行删除操作

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        Map<String, Object> condition = new HashMap<>();
        condition.put("name","random");
        condition.put("email","pro6@qq.com");
//        最终的sql语句
//        DELETE FROM mp_user WHERE name = random AND email = pro6@qq.com
        userMapper.deleteByMap(condition);
    }
}
```

通过数组来进行批量删除

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
//        通过id来进行批量删除操作
        List<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        ids.add(3);
        ids.add(4);
        ids.add(5);
        ids.add(6);
        userMapper.deleteBatchIds(ids);
        
    }
}

```

通过主键进行查询(如果通过主键没有查到,返回null)

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        User user = userMapper.selectById(2);
        System.out.println(user);
    }
}

```

通过id实现批量查询

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        List<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        ids.add(3);
        ids.add(4);
        List<User> users = userMapper.selectBatchIds(ids);
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

通过map来进行多条件查询

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        HashMap<String, Object> conditions = new HashMap<>();
        conditions.put("name","jack");
        conditions.put("age",20);
        List<User> users = userMapper.selectByMap(conditions);
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

## ActiveRecord

通过对象本身调用来执行sql,省去了调用mapper

```java
//实体类

@Data
@TableName("mp_user")
//需要继承MyBatis-plus的Model类
public class User extends Model {
    @TableId(value = "id",type = IdType.AUTO)
    private Long id;
    @TableField(value = "name")
    private String name;
    @TableField(value = "age")
    private Integer age;
    @TableField(value = "email")
    private String email;
}
```

```java
//mapper类
@Component
public interface UserMapper extends BaseMapper<User> {
}

```

```java
//测试类
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        User user = new User();
        user.setName("随即名");
        user.setId(20L);
        user.setAge(30);
        user.setEmail("123@qq.com");
//        直接通过对象本身来实现insert,不再依赖userMapper
        boolean insert = user.insert();
        System.out.println(insert);
    }
}

```

## 注解

```java
//写在实体类主键上面
@TableId(value,idType)
/*
这个注释只能注册到主键上,第一个是对应数据中主键字段的名字
第二个是选择通过某种方式来赋值
IdType.AUTO	数据库主键设置为自增,用这个枚举
IdType.NONE	没有主键
IdType.INPUT	用户手动输入
IdType.ASSIGN_UUID	向数据库写数据时,不需要设置主键值,他会自动向里面添加UUID,要求实体类属性是String,数据库字段是varchar,且					长度不能低于50
*/
```

```java
//写在类上面
@TableName("mp_user")
//定义表名
```

```java
//写在非主键的属性上
@TableField(value = "name")
//定义字段名
```

## wrapper

一个接口,构造查询条件,QueryWrapper,UpdateWrapper

### 条件

| 条件        | 说明                         |
| ----------- | ---------------------------- |
| allEq       | 基于map相等                  |
| eq          | 等于 =                       |
| ne          | 不等于 <>                    |
| gt          | 大于 >                       |
| ge          | 大于等于 >=                  |
| lt          | 小于 <                       |
| le          | 小于等于 <=                  |
| between     | BETWEEN 值1 AND 值2          |
| notBetween  | NOT BETWEEN 值1 AND 值2      |
| like        | LIKE '%值%'                  |
| notLike     | NOT LIKE '%值%'              |
| likeLeft    | LIKE '%值'                   |
| likeRight   | LIKE '值%'                   |
| isNull      | 字段 IS NULL                 |
| itNotNull   | 字段 IS NOT NULL             |
| in          | 字段 IN (valule1, value2)    |
| notIn       | 字段 NOT IN(valule1, value2) |
| inSql       | 字段IN (SQL语句)             |
| notInSql    | 字段 NOT IN(sql语句)         |
| groupBy     | GROUP BY 字段                |
| orderByAsc  | 升序ORDER BY  字段  ASC      |
| orderByDesc | 降序ORDER BY 字段 DESC       |
| orderBy     | 自定义字段排序               |
| having      | 条件分组                     |
| or          | OR 语句                      |
| and         | AND 语句                     |
| apply       | 拼接sql                      |
| last        | 在sql语句后拼接自定义条件    |
| exists      | 拼接 EXISTS语句              |
| notExists   | 拼接NOT EXISTS语句           |
| nested      | 正常嵌套 不带AND 或 OR       |



# 代码

## 简单测试

pom文件

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
    <artifactId>mp</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mp</name>
    <description>mp</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
<!--        springboot for web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.3.4</version>
        </dependency>
<!--        sql server-->
        <dependency>
            <groupId>com.microsoft.sqlserver</groupId>
            <artifactId>sqljdbc4</artifactId>
            <version>4.0</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
<!--        test模块-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.78</version>
        </dependency>
        
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.5.RELEASE</version>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>

```

```yaml
#application文件
spring:
  datasource:
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
    url: jdbc:sqlserver://127.0.0.1:1433;databasename=mp
    username: sa
    password: qq0901593322
```

实体类

```java
package org.zhs.mp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("mp_user")
public class User {
    @TableId(value = "id",type = IdType.AUTO)
    private Long id;
    @TableField(value = "name")
    private String name;
    @TableField(value = "age")
    private Integer age;
    @TableField(value = "email")
    private String email;
}
```

启动类(要通过注解扫描包)

```java
package org.zhs.mp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
@MapperScan("org.zhs.mp.mapper")
public class MpApplication {

    public static void main(String[] args) {
        SpringApplication.run(MpApplication.class, args);
    }

}

```

mapper类(要继承mp的类)

```java
package org.zhs.mp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import org.zhs.mp.entity.User;

@Component
public interface UserMapper extends BaseMapper<User> {
}

```

测试类

```java
package org.zhs.mp;




import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zhs.mp.entity.User;
import org.zhs.mp.mapper.UserMapper;
import java.util.List;

@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;
    @Test
    void contextLoads(){
        System.out.println("-----这是一个测试-----");
        List<User> users = userMapper.selectList(null);
        for (User user : users) {
            System.out.println(user);
        }
    }
}
/*


-----这是一个测试-----
2021-11-18 17:55:56.917  INFO 9516 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2021-11-18 17:55:57.078  INFO 9516 --- [           main] com.zaxxer.hikari.pool.PoolBase          : HikariPool-1 - Driver does not support get/set network timeout for connections. (com.microsoft.sqlserver.jdbc.SQLServerConnection.getNetworkTimeout()I)
2021-11-18 17:55:57.110  INFO 9516 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
User(id=1, name=Jone, age=18, email=test1@baomidou.com)
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=3, name=Tom, age=28, email=test3@baomidou.com)
User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
User(id=5, name=Billie, age=24, email=test5@baomidou.com)
2021-11-18 17:55:57.163  INFO 9516 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2021-11-18 17:55:57.164  INFO 9516 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0

*/
```

## 自定义SQL

项目结构目录

![image-20211119105215773](https://gitee.com/zhssss/image/raw/master/202111191052876.png)

先导入所有mapper

```yaml
spring:
  datasource:
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
    url: jdbc:sqlserver://127.0.0.1:1433;databasename=mp
    username: sa
    password: qq0901593322

mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
#    指定sql映射文件位置
  mapper-locations: classpath*:mapper/*Mapper.xml
```

实体类

```java
package org.zhs.mp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;

@Data
@TableName("mp_user")
//需要继承MyBatis-plus的Model类
public class User extends Model {
    @TableId(value = "id",type = IdType.ASSIGN_UUID)
    private String id;
    @TableField(value = "name")
    private String name;
    @TableField(value = "age")
    private Integer age;
    @TableField(value = "email")
    private String email;
}
```

mapper接口

```java
package org.zhs.mp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.stereotype.Component;
import org.zhs.mp.entity.User;

import java.util.List;

@Component
public interface UserMapper extends BaseMapper<User> {
    List<User> getAllUser();
    User selectById(String id);
}

```

通过xml来自定义sql语句

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--namespace指定需要绑定的mapper接口-->
<mapper namespace="org.zhs.mp.mapper.UserMapper">
    
    <select id="selectById" resultType="org.zhs.mp.entity.User">
        SELECT * FROM mp_user WHERE id=#{id};
    </select>
<!--    id对应绑定mapper中的方法名,resultType对应实体类的类型,即使方法返回是一个list,但泛型设置为User,这里类型就填user-->
    <select id="getAllUser" resultType="org.zhs.mp.entity.User">
        SELECT * FROM mp_user;
    </select>
</mapper>
```

测试类

```java
package org.zhs.mp;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zhs.mp.entity.User;
import org.zhs.mp.mapper.UserMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    void selectId() {
        User user = new User();
        user.setName("随即名");
        user.setAge(30);
        user.setEmail("123@qq.com");
        User user1 = userMapper.selectById("2");
        System.out.println(user1);
    }
    
    @Test
    void selectAll(){
        List<User> allUser = userMapper.getAllUser();
        for (User user : allUser) {
            System.out.println(user);
        }
    }
}

```

## allEq(多条件匹配查询)

```java
    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
        HashMap<String, Object> condition = new HashMap<>();
//        相当字段和需要查询的值
        condition.put("id","2");
        condition.put("name","21");
//        将条件放入条件器
        query.allEq(condition);
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
//        result:User(id=2, name=21, age=213, email=213)

    }

```

## eq(单条件匹配查询)

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
        query.eq("name","21");
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
//        result:User(id=2, name=21, age=213, email=213)
    }
}

```

## ne(不等于操作)

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
        query.ne("name", "0");
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
        /**
         * User(id=2, name=21, age=213, email=213)
         * User(id=585c3fc52aa97911f1d9f45f51d260ee, name=随即名, age=30, email=123@qq.com)
         */
    }
}

```

## between(仅查找区间值)

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
//        age字段 1~999区间的数据
//        SELECT * FROM mp_user WHERE age BETWEEN 1 and 999
        query.between("age",1,999);
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
        /**
         * User(id=2, name=21, age=213, email=213)
         * User(id=585c3fc52aa97911f1d9f45f51d260ee, name=随即名, age=30, email=123@qq.com)
         */
    }
}
```

## like

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
//      SELECT * FROM mp_user WHERE email like '%@%';
        query.like("email","@");
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
        /**
         * User(id=2, name=21, age=213, email=213)
         * User(id=585c3fc52aa97911f1d9f45f51d260ee, name=随即名, age=30, email=123@qq.com)
         */
    }
}

```

## isnull(获取所有字段中值为null的数据)

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
//      选择所有email字段是空值的数据
        query.isNull("email");
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
        /**
         * 
         * */
    }
}
```

in(获取某个字段中多个匹配条件的多个值)

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
//      获取该字段所有相符值的数据
        query.in("name","21","随即名","姓名");
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
        /**
         * User(id=2, name=21, age=213, email=213@qq.com)
         * User(id=3, name=姓名, age=231, email=231312@qq.com)
         * User(id=585c3fc52aa97911f1d9f45f51d260ee, name=随即名, age=30, email=123@qq.com)
         * */
    }
}
```

inSql(在sql语句中嵌套子sql)

## or and使用方法

```java
@SpringBootTest
class MpApplicationTests {
    @Autowired
    private UserMapper userMapper;

    @Test
    public void allTest(){
//        创建一个条件器
        QueryWrapper<User> query = new QueryWrapper<>();
        query.eq("name","21")
                .or()
                .eq("age",30);
        List<User> users = userMapper.selectList(query);
        for (User user : users) {
            System.out.println(user);
        }
        
        /**
         * User(id=2, name=21, age=213, email=213@qq.com)
         * User(id=585c3fc52aa97911f1d9f45f51d260ee, name=随即名, age=30, email=123@qq.com)
         * */
    }
}

```

