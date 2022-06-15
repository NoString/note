# 概念

- DB：DataBase，数据库
- DBMS：DataBase Management System，数据库管理系统（常见的管理系统：MySQL，Oracle，DB2）
- SQL：SQL是结构化查询语言，是一门标准通用的语言，SQL语句在运行时也需要编译，由底层的DBMS完成
- 总结：通过DBMS来使用SQL操作DB里面的数据
- .sql：以.sql结尾的文件成为sql脚本
- 所有的sql语句都以分号结尾。
- 语句使用单引号括起来
- 0和null不一样，0代表有数据，null代表没数据，只要和Null进行运算，最终结果都为null，不管加减乘除
- 多行处理函数是把多行的数据处理之后合并为一行，单行处理函数是把多行数据处理之后还是多行，他是一行一行的处理数据
- 关系型数据库表示数据库中的表存在关系
- 表名一般以t_开头
- 一般习惯是: 语法关键字大写，其他小写
- 在编程中，一张表对应一个实体类

## 主键

- 表一定要有个主键
- 主键相当于这条唯一的key，就像身份证一样
- 一张表的主键约束只能有一个

## 表

表：表是数据库的基本组成单元，所有数据都已表格的形式组织，目的是可读性强

行：叫做数据/记录

列：叫做字段，字段一般有字段名，数据类型，相关的约束（例如不能为null）等属性

## 数据类型

int：数字

varchar：字符串

bigint：Long类型



# 数据库设计三范式

- 表的设计规则，按照这个范式，数据不会出现冗余现象
- 第一范式：任何一张表都应该有主键，并且每一个字段原子性都不可再分（例如一个字段存储用户名和密码，这就不具备原子性，应该开两个字段，单独放用户名和密码）
- 第二范式：建立在第一范式之后，所有非主键字段完全依赖主键，不能产生部分依赖
- 第三范式：建立在第二范式之后，所有非主键字段直接依赖主键，不能产生传递依赖
- 三范式的目的是解决冗余问题，但是在实际开发中，为满足客户需求，可以用冗余来换取执行速度，因为表连接的越多，速度越慢

# MySQL命令

```mysql
-u	用户
-p	密码
exit	退出
登陆：mysql -uroot -p0901593322
显示所有数据库：show databases;
创建数据库：create database sqlstudy;
使用数据库： use sqlstudy;
显示所有表：show tables;
导入数据到数据库：source E:\D\1-MySQL\数据脚本\bjpowernode.sql  //批量执行sql语句
查看表结构（不是内容）：desc salgrade;
查看当前使用的数据库：select database();
查看数据库版本：select version();
显示当前创建表时所用的语句：show create table SALGRADE;

```



# DQL

**Data QueryLanguage，数据查询语言**

![](https://gitee.com/zhssss/image/raw/master/202112071518828.png)

查询语句，凡是select语句都是DQL

执行顺序：from>where>group by>having>select>order by

```sql
/*基础查询*/
select：跟字段名
from：跟表名
select ENAME,EMPNO from EMP;

select distinct job from EMP;#distinct 去除重复记录，distinct只能出现在所有字段的最前方，然后后面所有的字段都进行去重操作
select ENAME,SAL * 12 as `年薪` from EMP;
字段可以进行数学运算， 通过as可以更改结果显示的名称
+--------+----------+
| ENAME  | 年薪     |
+--------+----------+
| SMITH  |  9600.00 |
| ALLEN  | 19200.00 |
| WARD   | 15000.00 |
| JONES  | 35700.00 |
| MARTIN | 15000.00 |
| BLAKE  | 34200.00 |
| CLARK  | 29400.00 |
| SCOTT  | 36000.00 |
| KING   | 60000.00 |
| TURNER | 18000.00 |
| ADAMS  | 13200.00 |
| JAMES  | 11400.00 |
| FORD   | 36000.00 |
| MILLER | 15600.00 |
+--------+----------+
select *,SAL * 12 as `年薪` from EMP; 
查询所有字段也通过*号，但是这种效率太慢，开发中不适用
```

```sql
/*条件查询*/
where #查询条件，后面可以跟运算符 例如大于小于
select SAL from EMP where ENAME = 'ward'; 
where是条件
select ename,sal from EMP where sal between 1100 and 3000; 
select ename,sal from EMP where sal >=1100 and sal <= 3000;
select ename, sal, comm from EMP where comm is not null; #查出所有津贴不是null的数据
select ename, job, deptno from EMP where sal > 1000 and deptno = 20 or sal > 1000 and deptno =30; #and的优先级高于or，会优先计算and的条件
select ename, job, sal, deptno from EMP where sal > 1000 and (deptno =20 or deptno = 30);#不确定优先级就加小括号
select ename, job, sal, deptno from EMP where sal in(800,5000);#找到sal字段中值是800和5000的
select ename, job, sal, deptno from EMP where sal not in(800,5000);#找到sal字段中值不是800和5000的
select * from EMP where mgr like '_8%'; #"_"任意一个字符，"%"任意多个字符，如果需要使用这两个字符需要转义，找出MGR字段第二个字符是8的数据
+-------+-------+---------+------+------------+---------+------+--------+
| EMPNO | ENAME | JOB     | MGR  | HIREDATE   | SAL     | COMM | DEPTNO |
+-------+-------+---------+------+------------+---------+------+--------+
|  7566 | JONES | MANAGER | 7839 | 1981-04-02 | 2975.00 | NULL |     20 |
|  7698 | BLAKE | MANAGER | 7839 | 1981-05-01 | 2850.00 | NULL |     30 |
|  7782 | CLARK | MANAGER | 7839 | 1981-06-09 | 2450.00 | NULL |     10 |
+-------+-------+---------+------+------------+---------+------+--------+

select ifnull(comm,0) from EMP; #如果comm字段出现null，把null改为0
+----------------+
| ifnull(comm,0) |
+----------------+
|           0.00 |
|         300.00 |
|         500.00 |
|           0.00 |
|        1400.00 |
|           0.00 |
|           0.00 |
|           0.00 |
|           0.00 |
|           0.00 |
|           0.00 |
|           0.00 |
|           0.00 |
|           0.00 |
+----------------+


```

```sql
/*条件排序*/
order by# 通过某个字段进行排序，默认升序
select * from EMP order by sal; #通过sal进行升序排列，（默认升序）
select * from EMP order by sal asc; #指定升序排序
select * from EMP order by sal desc;#指定降序排序
select * from EMP order by sal desc, ename asc;# 先按照sal的降序来排，如果两个值相同再按照ename的降序（越靠前的字段，主导作用越大，靠前的字段相等，才使用下一个条件进行排序）

#找出工作岗位是salesman的员工，按照薪资降序排
select * from EMP where job = 'salesman' order by sal desc;
```

```sql
/*分组函数
分组函数一定是在group by之后执行的,所以这些函数不能写在where里面，因为还没分组
分组函数是对某一组数据进行操作的，分组函数自动忽略null,但是如果是0就会被count之类的计数算入在内
分组函数不可直接出现在where语句当中
count：计数（自动忽略null）
sum：求和（自动忽略null）
avg：平均值（自动忽略null）
max：最大值（自动忽略null）
min：最小值（自动忽略null）*/
select sum(sal) from EMP;#算出工资和
select ename, (sal + ifnull(comm,0)) * 12 from EMP; #将工资和津贴相加算出一年的工资，如果津贴是null视为0
select count(job) from EMP;# 打印一共有多少个job的个数，如果有null不会算入
select count(*) from EMP; #打印一共有多少记录的个数，即使有null也会算入
```

```sql
/*分组和过滤
分组函数一般都和group by联合使用，当一张表没有group by，整张表自成一组
group by：按照某个字段或者某些字段进行分组
having：having是对分组之后的数据进行再次过滤
*/

#当一个语句有group by的话，前面的select只能放被group by分组过的字段和被分组函数处理过的字段
select max(sal),job,comm from EMP group by job;#job被group by分组过了， sal被分组函数处理过了，所有这条没事
select ename,max(sal),job,comm from EMP group by job;#ename会报错


select max(sal),job from EMP group by job; #按job分组，所有job字段中字符一样的分为一组。不能通过int分组
#找出工资高于平均工资的员工
select avg(sal) from EMP;#先找出平均工资
select * from EMP where sal > 2073.214286; #最后再进行比较
select * from EMP where sal > (select avg(sal) from EMP); #两句话合并成一句话

#找出每个deptno中的每个job的最高工资
select deptno,job,max(sal) from EMP group by deptno, job;

###############################################having
#效率低方式
select max(sal),deptno from EMP group by deptno having max(sal)> 2900; #因为这种回计算出来所有结果，然后再用having分组，把东西计算出来之后再丢弃，浪费时间
select max(sal),deptno from EMP where sal > 2900 group by deptno; #因为where执行优先级高，在进行最大值运算之前就舍弃掉了小于2900的数据，不参加运算


#找出每个部门的平均工资，显示薪资大于2000的
select avg(sal),deptno from EMP group by deptno having avg(sal) > 2000;
```

```sql
#连接查询
#笛卡尔积现象：当两张表链接查询时，如果没有任何条件的限制，最后的结果数是两张表记录数的乘积，这个是不可避免的，即使通过条件语句筛选出正确数据，但底层还是要把每条记录匹配一边
select e.ename from EMP e; #起别名
```

表与表之间连接

## 内连接

- 假设A和B表进行连接，使用内连接的。凡是A表和B表能够匹配上的记录查询（匹配不到就不显示这条），这就是内连接，AB两表没有主副之分，两张表是平等的

### 等值连接

```sql
select e.ename,d.dname from EMP e join DEPT d on e.deptno = d.deptno; 
#from选择主表，join选择副表，然后用on后面的条件来进行等值对比，如果EMP的deptno和DEPT的deptno相同，就把副表的这一行加入到主行
```



### 非等值连接

```sql
select e.ename,e.sal,s.grade from EMP e join SALGRADE s on e.sal between s.losall and s.hisal;
#最终两个表匹配的条件是在区间里
```



### 自连接

```sql
#找出每个员工的上级领导，要求显示员工名和对应领导名
select a.ename,a.empno,a.mgr,b.ename,b.empno from EMP a join EMP b on a.mgr = b.empno.empno;
#将一张表变成两个对象来查
```



## 外连接

- 假设A和B表进行连接，使用外连接的话，AB两表中有一张是主表，一张是副表，主要查询主表中的数据，捎带查询副表的数据，当副表中的数据没有和主表中的数据匹配上，副表自动模拟null与之匹配。
- 左外连接的写法可以写成右外连接，反之亦然

### 左外连接

- 指左表是主表

```sql
#左边是主表，副表数据和主表匹配不上就捎带查询
select d.deptno from DEPT d left join EMP e on d.deptno = e.deptno where e.empno is null;

```



### 右外连接

- 指右表是主表

### 全连接

A和B都是主表

## 三张表链接查询

```sql
select e.ename,e.sal,d.dname,s.grade from EMP e join DEPT d join SALGRADE s one.deptno = d.deptno and e.sal between s.losal and s.hisal;
#查询员工姓名，部门，薪资

#查询员工姓名，直属领导，部门，薪资阶段
select e.ename,b.ename as '直属领导',e.sal,d.dname,s.grade 
from EMP e 
join DEPT d 
on e.deptno = d.deptno #查部门
join SALGRADE s 
on e.sal between s.losal and s.hisal #查薪资阶段
left join EMP b 
on e.mgr = b.empno; #查直属领导

```

## 子查询

```sql
#就是where，from，select后面跟小括号写一个子select查询语句
#计算出每个部门的平均工资，并且得出每个部门的薪资等级， 注意，括号里的语句不能加";"
select t.*, s.grade from (select job,avg(sal) as avgsal from EMP group by job)t join SALGRADE s on t.avgsal between s.losal and s.hisal;
```

## union

```sql
#将两个查询结果组合到一起
select ename from EMP union select dname from DEPT;

```

## limit

- limit是sql特有的语句，其他DBMS不通用
- limit取结果集的部分内容

```sql
limit startIndex：起始位置
length：长度
#找出工资第4名到第九名的员工
 select ename, sal from EMP order by sal desc limit 3,6;
#可以实现分页查询，mysql 41集
```



# DML

**Data Manipulation Language，数据操作语言**

insert，delete，update，对表中的数据进行增删改

## 创建表

```sql
/*
int 	整数型
bigint	长整型
float	浮点型
char	定长字符  //例如定义长度20字符，不管存进去几个字符，都会开出20的空间
varchar	变长字符	//定义20的字符，如果只存进去5字符，那么他会自动改为5字符，但是转换要耗费时间，效率不如char
data	日期类型
BLOB	二进制大对象（存储图片，视频等流媒体）
CLOB	字符大对象（存储较大文本，例如：4G字符串）
*/
```



# DDL

**Data Definition Language，数据定义语言**

create，drop，alter，对表结构增删改

```sql
/*创建表*/
create table t_student(
	no bigint,
    name varchar(255),
    sex char(1),
    classno varchar(255),
    birth char(10)
); 
/*
插入数据，字段数量和值的数量相同，并且数据类型也要对应
*/
insert into t_student(no,name,sex,classno,birth) values(1,'zhangsan','1','gaosan1ban','1999-02-27');
/*可以不写入全部字段，未写入的字段为null*/
insert into t_student(name) values('李四');

#创建带默认值的表
create table t_student(
	no bigint,
    name varchar(255), 
    sex char(1) default 1, #如果插入数据时，不填这个值，默认为1
    classno varchar(255),
    birth char(10)
); 

#省略前面设置字段的写法
insert into t_student values(2,'zhangsan','1','gaosan2ban','1990-10-17');#用这种方法插入，插入数据的数量和顺序要和字段相同

#一次插入多条记录
insert into t_student (no,name,sex,classno,birth) values (3,'lisi','1','gaosan2ban','1991-10-17'), (4,'wangwu','1','gaosan2ban','1992-10-17');
```



```sql
#删除表
drop tables if exists t_student;
```

```sql
#复制表
create table t_student2 as select * from t_student; #将t_student复制到t_student2
```

```sql
#修改表中数据
update 表名 set 字段1 = 值,字段2 = 值2,字段3 = 值3 where 条件;# 如果没有条件，整张表的字段全部更新
update t_student set no=999,name='haha' where no=3; #设置的字段被修改，没设置的字段保持原样。
```

```sql
#删除数据
delete from t_student where no = 999;  #可回滚

truncate tables 表名; #不可回滚，删了就真没了
```

```sql
#修改表结构
用表工具来改
```

```sql
#约束，用于限制一些字段插入值时的规则
/*
非空约束(not null)：不能为空
唯一约束(unique)：不能重复
主键约束(primary key)：不能为空和重复，这个是主键，只能给一个字段添加
外键约束(foreign key)：
检查约束（MySQL不支持）
*/
create table t_user(
	id int unique,#唯一
    username varchar(255) primary key,#唯一切不能为空
    password varchar(255) not null#不能为空
);

create table t_user(
	id int,
    username varchar(255),
    password varchar(255)
    unique(id,username,password) #列级约束，只有在查询这三个字段的时候，所有的值都相同才会报错，如果只是两个值相同一个值不同，不会报错
);
```

```sql
#外键约束，用另一张表的某个字段，绑定本表，本表叫子表，绑定表叫做父表，子表某个字段绑定父表的某个字段之后，此字段的值只能等同于父表的值
#删表的时候要先删子表
#引用的父键不一定是父表中的主键，单一定要有唯一性
#父表
cno
--------
1 
2
#子表
zname	cno(绑定父表)
--------------------
随意	   1
随意	   2#只能和父表的值相同

#父表创建语句正常写，但是包含primary key
#字表创建
create table t_student(
	sname varchar(255),
    sclassno int,
    foreign key(sclassno) references t_class(classno)
);

```



## MySQL自增

```sql
create table t_user2(
	id int primary key auto_increment, #auto_increment 就是自增
    username varchar(255)
);
```



# TCL

**Transaction Control Language，事务控制语言**

commit提交事务，rollback回滚事务

```sql
/*
一个事务是一个完整的业务逻辑单元
比如，银行转账，需要先减去A账户的资金，然后增加B账户的资金，他需要两条SQL语句，事务的作用就是确保这两条事务必须都成功或者都失败
和事务相关的语句只有DML语句，insert delete update
事务的四大特性
A:原子性，事务是最小的工作单元，不可再分
C:一致性，保证一致成功或一致失败
I:隔离性，事务A与事务B之间具有隔离，不相互影响
D:持久性，最终事务要提交到硬盘中，事务才算成功
*/
```

- 隔离性

第一级别：读未提交，未提交的事务，可以被其他人读到，这种情况出现“脏读”现象，指某个数据未被持久化存储在硬盘中，其数据极其不稳定

第二级别：读已提交，对方已提交的数据可以被读取到，存在的问题：不可重复读，打开dos之后，一直没关，第一次查数据是14条，然后有人改了数据，再查是13条，做不到从头到尾查到的数据是一样的。叫不可重复读

第三级别（MySQL默认级别）：可重复读，打开dos之后，一直没关，第一次查到的数据是14条，有人改了数据，但是再此查取的时候还是14条，不会出现数据的更新。存在问题：读取到的数据不是实时数据，存在误差

第四级别：序列化读/串行化读，意思就是单线程，解决了所有问题，但是效率低

```sql
#事务代码

#自动提交机制
#MySQL的DML是自动提交的，输入之后立即执行

start transaction; #在表中使用这个语句，表示开始事务，然后开始写DML语句，之后可以通过select查出来，但是没有写在本地硬盘里，需要手动rollback或commit，执行之后，这个事务就已经结束了，在想使用需要重新开启事务
```

```sql
#索引
/*
索引就是用来提升查去数据效率的，原理是缩小扫描范围
索引的要素：数据量庞大，字段很少DML语句，字段经常出现where语句
主键和具有unique属性的字段回自动添加索引
底层实现原理是通过硬盘地址来找寻

*/
创建索引
create index student_no_index on student(no);
删除索引
drop index student_no_index on student;
#索引的分类
#单一索引：给一个字段设置索引
#复合索引：给多个字段设置同一个索引
#主键索引：主键会自动添加索引
#唯一索引：unique会自动添加索引

#索引的失效
#模糊查询时，第一个字符是%，这个时候索引是失效的
```

```sql
#创建视图
create view myview as select ename,empno from emp;#只能写DQL语句
drop view myview;
```



# DCL

**Data Control Language，数据控制语言**

grant授权，revoke撤销权限等

