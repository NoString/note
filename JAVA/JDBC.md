- Sun公司指定的一套接口

1. 注册驱动（告诉java要用那个SQL）
2. 获取连接（表示JVM的进程和数据库进程之间的通道打开了，进程之间的通讯，用完要释放资源）
3. 获取数据库操作对象
4. 执行SQL语句（DQL DML）
5. 处理查询结果集（只有在第四步是select语句的时候，才会有结果集）
6. 释放资源

```java
//执行插入语句
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Test1 {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://127.0.0.1:3306/sqlstudy";
        String userName = "root";
        String password = "0901593322";
        //注册驱动
        DriverManager.registerDriver(new com.mysql.jdbc.Driver());//相当于选择一个数据库
        //连接数据库
        Connection conn = DriverManager.getConnection(url,userName,password);
        //获取数据库操作对象
        Statement stat = conn.createStatement();
        //执行SQL语句
        String sql = "insert into emp value(8888,'someone','客服','0','1999-02-27',9999,9999,0)";//写好sql语句
        int count = stat.executeUpdate(sql);//这个方法适用于执行DML语句 inser，delete，update，返回操作成功条数
        //处理查询结果集，非查询语句，所以不用
        //释放资源
        stat.close();
        conn.close();
    }
}

```

# 通过mysql提供的静态代码块注册驱动（常用）

```java
//通过mysql提供的静态代码块注册驱动（常用）

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBC2 {
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        String url = "jdbc:mysql://127.0.0.1:3306/sqlstudy";
        String userName = "root";
        String password = "0901593322";
        //注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        /*
        *因为com.mysql.jdbc.Driver有一个静态代码块，通过forname调用这个类就可以执行这段代码块
        * 他的作用是注册驱动
         */
        //连接数据库
        Connection conn = DriverManager.getConnection(url,userName,password);
        System.out.println(conn);
    }
}
```

# 查询命令

```java
//查询命令
package com.JDBC;

import java.sql.*;

public class JDBC4 {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        String sqlLanguage = "select * from dept";
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sqlstudy","root","0901593322");
        Statement sta = con.createStatement();
        ResultSet rs = sta.executeQuery(sqlLanguage);//通过Query语句来查询
        while (rs.next()){//每次返回true，然后指针从第一行到最后一行
            int deptno = rs.getInt("deptno");
            String dname = rs.getString("dname");
            String loc = rs.getString("loc");
            System.out.println("部门编号是："+deptno+" 名字是：" + dname + " 地点是：" + loc);
        }
        if(rs!=null){
            rs.close();
        }
        if (sta!=null){
            sta.close();
        }
        if(con!=null){
            con.close();
        }
    }
}

```

# 预处理式批量执行DML语句

```java
//预处理式批量执行DML语句
package com.JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
/*
* 通过预编译来批量执行多条sql*/
public class JDBC5 {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        String insertSQL = "insert into dept(deptno,dname,loc) value(?,?,?)";//通过占位符来代替值
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/testsql", "root", "0901593322");
        PreparedStatement ps = con.prepareStatement(insertSQL);//将预加载的sql语句放到prepare里面，不能用Create
        for (int i = 0; i<100; i++){
            ps.setInt(1,i);//占位符的第一个？号
            ps.setString(2,"name"+i);
            ps.setString(3,"loc"+i);
            ps.addBatch();//将上述组合好的语句放到预加载的通道
        }
        int[] ints = ps.executeBatch();//执行所有预加载内的语句,返回一个数组，每句batch内的sql语句执行结束之后，每个结果是数组的一条下标
        if(ps!=null){
            ps.close();
        }
        if(con!=null){
            con.close();
        }
        for (int i = 0; i<ints.length;i++){
            System.out.println(ints[i]);
        }
    }
}

```

# 执行事务

```java
//执行事务
package com.JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBC6 {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        String sql1 = "delete from emp where deptno = 20";
        String sql2 = "delete from dept where deptno = 20";
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/sqlstudy", "root", "0901593322");
        con.setAutoCommit(false);//默认开启，让mysql自动管理事务
        Statement sta = con.createStatement();
        try {//如果这两个语句有一个出错，回抛出SQLException异常
            sta.executeUpdate(sql1);
            sta.executeUpdate(sql2);
            //执行到这里表示上面语句都执行成功，提交即可
            con.commit();//提交
        }catch (SQLException ex){//执行这一步表示有SQLException异常了
            con.rollback();//回滚
        }finally {
            if (sta!=null){
                sta.close();
            }
            if (con!=null){
                con.close();
            }
        }
        System.out.println("done");
    }
}

```

# 创建工具类

```java
//创建工具类
package com.JDBC;

import java.sql.*;

public class JDBCUtil {
    private Connection conn;  //定义成connection为全局变量，局部变量不能在其他方法中调用
    private PreparedStatement ps;
    /*
    * 通过静态内部类来建立驱动*/
    static{
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            System.out.println("加载MySQL驱动失败");
        }
    }
    
    public Connection getConnection(){
        /*
        * 获取数据库连接，并返回Connection对象*/
        try {
             conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/sqlstudy","root","0901593322");
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("建立连接失败");
        }
        return conn;
    }
    
    public PreparedStatement createStatement(String sql){
        /*
        * 创建sql语句执行对象*/
        Connection con = getConnection();
        try {
            ps = con.prepareStatement(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ps;
    }
    public void close(){
        /*
        * 创建 关闭所有接口对象*/
        if (ps!=null){
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn!=null){
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    public void close(ResultSet rs){
        close();
        if (rs!=null){
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
    }
}

```

# DAO

Database access object:数据库访问对象

针对数据库的某张表进行增删改查

DAO类封装的是一张表的操作细节
