# 基础

一个项目开发管理工具

1. 管理和下载jar包，源码之类的，下载完之后自动添加依赖，管理需要的jar版本（如：要用A.jar但是A.jar关联B.jar，maven会自动添加A和Bjar包）
2. 帮助编译代码，把java便以为class
3. 检测代码是否正确
4. 帮助打包文件，形成jar包或者war文件
5. 帮助部署项目
6. 普通java项目：quickstart。 web项目：webapp
7. 配置阿里镜像源：https://developer.aliyun.com/article/512821

```xml
<!--一些常用的配置-->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
     <!--改成当前JDK版本-->
    <maven.compiler.source>16</maven.compiler.source>
    <maven.compiler.target>16</maven.compiler.target>
  </properties>
<!--tomcat配置-->
<plugins>
<plugin>
          <groupId>org.apache.tomcat.maven</groupId>
          <artifactId>tomcat7-maven-plugin</artifactId>
          <version>2.2</version>
          <configuration>
            <path>/myWeb</path>
            <port>9999</port>
          </configuration>
 </plugin>
</plugins>
```

```xml
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



# 构建

1. 清理：把之前项目编译的东西删除掉
2. 编译：把程序源代码编译为执行代码，java-class文件。（javac只能一次性编译一个文件，maven能编译上百个）
3. 测试：执行测试程序测试代码，验证功能是否成功（可以同时测试多段代码，测试很多功能）
4. 报告：生成测试结果文件
5. 打包：把项目中的所有文件放到压缩包中，java文件是jar，web应用是war
6. 安装：把打包的jar和war文件安装到本机仓库
7. 部署：把程序安装好并执行

# POM

项目对象模型，是一个xml文件，在文件中进行声明，以方便构建描述

```java
//一些标签的说明
/*
modelVersion:一般是4.0.0
gourpId:类似包名，域名倒写（自定义，必须要有）
artifactId：项目名（自定义，必须要有）
version：版本号，1.0.1（自定义，必须要有）
packaging：指定项目文件压缩扩展名：jar,war（可不写）
dependencies：根标签，里面写若干个依赖
dependency：里面写一个依赖，带上groupId,artifactId,version
properties：配置文件
build：指定maven在构建项目时的配置信息，例如，jdk版本
*/
```



# 约定目录结构

maven项目的目录和文件的位置都是有规定的

```java
Hello //根目录
	|---src //源代码
		|---|---main //主程序
			|---|---|---java //java源代码
			|---|---|---resources //主程序的配置文件，例如数据库的连接
		|---|---test //测试程序
			|---|---|---java //测试程序的java源代码
			|---|---|---resources //测试程序的配置文件
	|---pom.xml //Maven工程的配置文件
```

总项目结构

# 坐标

一个唯一的字符串，用来表示资源

用gourpId,artifactId,version三个资源组合成一个唯一标示，称为gav

# 依赖管理

管理项目jar包.



```xml
<!--添加一个依赖-->
  <dependencies>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>4.0.1</version>
      <scope>provided</scope>
    </dependency>     
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-engine</artifactId>
      <version>${junit.version}</version>
      <scope>test</scope>
    </dependency> 
  </dependencies>
```



# 仓库管理

存放资源的位置

# 生命周期

使用maven工具构建项目的过程，就是一整个生命周期，maven可以通过命令来完成一整个生命周期。

maven执行时，真是完成功能的是插件（一些java写的jar包）

```xml
<!--maven常用命令-->
mvn clean：清理编译和测试目录，即target目录，但是已经install仓库里的内容不会删除
mvn complie：编译主程序（也就是编译main目录的类，会在当前目录下生成一个target文件夹，里面存储着主程序编译之后生成的字节码文件）
mvn test-complie: 编译测试程序（也就是编译test目录的类，会在当前目录下生成一个target文件夹，里面存储着测试程序编译之后生成的字节码文件）
mvn test：测试，会生成一个surefire-reports，保存测试结果
mvn package：将项目打包成jar包（打包只会打包src/main，不会打包test里面的内容）
mvn install：安装主程序，把主程序打包，按照本地工程坐标保存到本地仓库中
mvn deploy：部署主程序，把本工程打包，按照本工程的坐标保存到本地库中，还会保存到私服仓库中，还会运行到web容器里
<!--这个顺序都是自上而下的顺序执行，执行mvn test 会把前面的三个都执行（clean，complie，test-complie）-->
```

## 测试单元

junit是一个专门测试的框架，已单元（若干个类合并在一起）为单位来测试

1.添加测试单元：

```xml
 <dependencies>
      <dependency>
          <groupId>junit</groupId>
          <artifactId>junit</artifactId>
          <version>4.12</version>
          <scope>test</scope>
      </dependency>

</dependencies>
```

2.使用说明

按照目录约定，除了main以外还有一个test，所有的测试文件都需要创建在这个文件目录里

```java
/*
类
Test + 类名

方法
Test + 方法名
必须public
没返回值
方法上面加上@Test
*/
```



# 插件和目标

maven的插件

# 继承

# 聚合