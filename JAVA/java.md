# 基础

JDK（java development kit）：java开发工具箱，JDK是用来开发的，如果准备开发java程序安装JDK

JRE（java runtime environment)：java运行环境，JRE是用来运行java程序的，如果准备运行java程序，而不是开发，只需要装JRE

JVM（java virtual machine)：java虚拟机，【1】JavaSE\1-Java零基础\JDK13版Java零基础\006-JavaSE视频教程\JavaSE零基础\视频/188

JDK包括JRE，JRE包括JVM

Java类体当中应该放方法而不是直接的语句

public修饰的类名必须与源文件名保持一致

URL是绝对路径

URI是相对路径

## 阶段

编译阶段：.java文件是源文件，通过javac.exe来编辑成class文件，叫做“字节码”文件

运行阶段：JVM运行字节码文件

## 文件路径问题

文件路径写绝对路径不容易更换目录，把文件放在类路径下，也就是src目录里

```java
//通过线程来获取文件路径
public class ReflectTest02 {
    public static void main(String[] args) throws ClassNotFoundException {
     String path = Thread.currentThread().getContextClassLoader().getResource("com/zhs/UserObject.class").getPath();
     System.out.println(path);
    }
}

//output:/C:/Users/Administrator/IdeaProjects/Study/out/production/Study/com/zhs/UserObject.class


//通过资源绑定器来获properties的路径
public class ReflectTest02 {
    public static void main(String[] args) throws ClassNotFoundException {
        //java内置的路径绑定器，只能绑定.properties文件，且要在src目录下，并且不能带后缀
        ResourceBundle rb = ResourceBundle.getBundle("classinfo");
        String properValue = rb.getString("className");
        System.out.println(properValue);
    }
}
```



------

# 关系

is a：继承关系

has a：关联关系

```java
A{
    B b;
}
```

like a ：实现关系，A implenments B

------

# 标识符与关键词

## 驼峰

类名，接口名：每个单词首字母大写

变量名，方法名：第一个单词首字母小写，后面单词首字母大写

常量名：所有字母大写，单词和单词之间用下划线分割

## 变量的分类

变量：方法体中声明的变量，方法执行结束后，在内存中释放

成员变量：方法体之外，类之内声明的变量。可以不实例化，创建对象的时候作为对象的属性存在

## 数据类型

- 不同的数据类型开辟的内存空间不相同
- 变量名不能重复定义
- 数据类型会自动转换，如果long的值不超过int的最大值，他会自动转换成int
- 强制转换：long i = 100L;     int y = (int)i;

int：4字节 2147483647 ~ - 2147483648

byte：1字节，放数字 127 ~ -128

short：2字节，放数字32767 ~ -32768

long：8字节， 9,223,372,036,854,775,807 ~ -9,223,372,036,854,775,808，如果long存放的数值大于int的最大值，需要在数字后面加L，及long i = 2147483648L

float：4字节，可以带小数

double：8字节，可以带小数

char：2字节，单字符，只能放进去一个字符

## 运算符

### 计算符

+,-,*,/,%（取余）,++（自加1）, --（自减1）

### 关系运算符

- 所有的关系运算符结果都是布尔类型

![image-20210729155657452](https://gitee.com/zhssss/image/raw/master/20210729155704.png)

### 逻辑运算符

![image-20210729170635646](https://gitee.com/zhssss/image/raw/master/20210729170635.png)

```java
int i = 10;
int b = 11;
i > b & i > b++ &前面的内容已经是false了。但他仍会执行&后面的i > b++内容
i > b && i > b++	如果前面的已经是false，他不会执行后面的i > b++
```

### 赋值运算符

int i = 10; 他会先创建一个10，然后在赋值给i，从右到左

+=, -=, /=, *=

### 条件运算符

布尔表达式 ? 结果true，执行这段 : 结果false，执行这段

```java
int i = 10;
int b = 20;
i>b ? print("我是真") : print("我是假	")
```



------

# 控制语句

## if

```java
public static void main(String[] args) {
        int num1 = 100;
        int num2 = 30;
        int num3 = 120;
        if(num1 + num2 > num3){
            System.out.println("大于");
        }else if(num1 + num2 < num3){
            System.out.println("小于");
        }else{
            System.out.println("等于");
        }
    }
```

## swithc

```java
int i = 200;
        switch (i){
            case 100:
                System.out.println("值是100");
                break;
            case 200:
                System.out.println("200");
                break;
            default:
                System.out.println("触发默认值");
                break;
        }
```

## for

```java
int i = 200;
        for(int c = 1; c < i; c++){
            System.out.println("C是：" + c);
        }

```

## 增强for（foreach）

```java
public class first{
    public static void main(String[] args) {
        LinkedList<String> l = new LinkedList<String>();
        l.add("12321");
        l.add("21312");
        for(String i : l){//I是从L中每次循环的数据
            System.out.println(i);
        }
    }
}

```





## while

```java
boolean i = true;
        int num = 0;
        while (i){
            num++;
            System.out.println(num);
            if (num > 100){

                i = false;
            }
        }
```

## do...while

```java
先做循环体，然后再判断
boolean i = true;
        int num = 0;
        do{
            num++;
            System.out.println(num);
            if (num > 100){

                i = false;
            }
        }while (i);
```

------

# 方法

定义方法时的顺序没有关系，可以写在main之前，也可以之后

```java
[方法修饰符  ][返回值类型][方法名][传参列表]
public static void main(String[] args) {
}
方法修饰符：
返回值类型：基本数据类型（int。。。），引用数据类型，如果没有返回值，就写void，如果定义了一个值，必须确保百分之百有返回，及if不能仅仅在if语句中写一个return，因为if中的语句可能不执行
```

方法调用：类名.方法名();

返回值类型和方法定义时[返回值类型]相同，所以接受的变量也要是这个类型(同一个类下的方法可以省略前面的类名)

int result = JavaTest.sum();

## 方法修饰符

public：所有都可以访问

private：只有本类可以访问

static：不需要实例化就可以调用这个方法，它除了修饰方法以外还可以修饰变量

正常实例对象的过程中，需要在堆中创建不同的对象，有的类模板中的参数时固定的，每次实例对象都需要为相同的参数创建对象，内存占用更大，这时可以用static来修饰，这样这个参数不会在每次实例对象的时候加载到堆内存，在调用这个类的时候就已经保存在方法区了。

说人话：一个参数的值一直不变，用static修饰

不带 static：必须实例化才可以调用这个方法

```java
//static方法会比main方法更早运行，且他只会在类加载到方法区时运行，也就是说，这个方法只会运行一次，在特定条件下会用到，而main方法虽然会自动执行一次，后面还可以被其他代码调用，而构造方法每次创建对象时都是会调用
public class Main {
    static{
        System.out.println("第一个运行");
    }


    public static void main(String[] args) {
        System.out.println("第二个运行");
    }

}
```





方法重载(overload)：

```java
public class Main {

    public static void main(String[] args) {
        System.out.println(sum(10L,20L));
        System.out.println(sum(60,90));
    }
    public static int sum(int first, int second){
        System.out.println("我是int类型");
        return first + second;
    }
    public static long sum(long first, long second){
        System.out.println("我是long类型");
        return first + second;
    }
}

```

方法递归：方法自己调用自己

------

# 类

```java

public static void main(String[] args) {
        Member m1 = new Member();
        m1.age = 1;
        System.out.println(m1.age);
    }
```

**类到对象是实例化，对象到类是抽象**

类：现实世界不存在的东西

对象：现实世界的个体，从类到对象的过程叫做实例化，创建对象时会默认调用类当中的构造方法，一般用于初始化值

## 封装

封装的好处是让类更安全，只能访问类中的部分属性，暴露出来可以被操作的方法和属性都是经过允许的

private: 表示私有，出了这个类就不能被访问了，即使对象实例化也不能访问这个被private修饰的属性或方法，需要写一个get和set方法来访问

```java
public class Member {

    private int age; //参数定义为private

    public Member(int age) {//提供构造方法，在实例化的时候可以传参数进来
        this.age = age;
    }

    public int getAge() {//通过方法来获取参数
        return age;
    }

    public void setAge(int age) {//通过方法来修改参数
        this.age = age;
    }
}

```



## 继承

- 被继承类叫做父类（superclass），继承者叫做子类（subclass）
- java的类只能有一个父类，但是一个父类可以被多个子类使用
- java中也能产生间接继承，及A继承B，B继承C，这样A就有了C的属性
- 继承机制中，除构造方法以外都可以继承，但是父类的私有属性不能直接访问
- 继承会让代码的耦合度变高，父类修改，子类遭罪
- 创建子类对象时，同时也会调用父类的构造方法，目的是先有父亲再有儿子
- 创建子类对象时，如果构造方法的第一行既没有this();，也没有super();，不管构造方法中有多少个参数默认第一个构造方法的第一行是super(); ，他会调用父类的构造方法
- 子类对象创建时，并不会创建父类对象，只是把父类中的属性拿过来

子类可以继承父类，代码可以得到复用

有了继承才有了方法覆盖和多态机制

```java

public class Main {

    public static void main(String[] args) {
        SonClass son = new SonClass();
        son.setMoney("100");
        System.out.println(son.getMoney());

    }
}
class DadClass{

    private String money;



    public String getMoney() {
        return money;
    }
    
    public void setMoney(String money) {
        this.money = money;
    }
}

class SonClass extends DadClass{

}

```



## 多态(看不懂去看299集)

```java
/*
父类的引用指向子类型对象：Animal a1 = new Bird();

编译期间和运行期间不同的状态叫做多态

Animal a1 = new Bird();

a1.move();
编译器发现a1的类型时Animal，所以会去Animal类中找move();方法，找到之后进行绑定
绑定之后运行代码，实际存在于堆内存当中的对象其实还是Bird，而不是Animal，真正运行的时候会调用堆内存中实际对象的相关方法

*/
```



向上转型：子转父

Animal a1 = new Bird();  Bird这个类转换成animal类，这叫做向上转型

向下转型：父转子

```java
//main方法创建的对象是父类型对象，虽然后面是new bird，但是不能使用bird里面的方法和属性。需要向下转型
public class Main {

    public static void main(String[] args) {
        Animal a1 = new bird();
    }
}
class Animal{
    public void sing(){
        System.out.println("1");
    }
}

class bird extends Animal{
    public void catchMouse(){
        System.out.println("2");
    }
}
//------------------------------------------向下转型-----------------------------------------------------------
public static void main(String[] args) {
        Animal a1 = new bird();
        bird b1 = (bird) a1;
        b1.catchMouse();
    }
//------------------------------------------向下转型-----------------------------------------------------------
public class Main {

    public static void main(String[] args) {
        Animal a1 = new bird();
        cat b1 = (cat) a1;//new的是一个bird对象，但是却要强制转换成一个cat对象，编译不报错，运行报错，不能让鸟去抓老鼠
        b1.catchMouse();
    }
}
class Animal{
    public void sing(){
        System.out.println("正在唱歌");
    }
}

class bird extends Animal{
    int name;
    public void fly(){
        System.out.println("正在飞");
    }
}
class cat extends Animal{

    public void catchMouse(){
        System.out.println("正在抓老鼠");
    }
}
//------------------------------------------解决方法，每次向下转型都加个判断------------------------------------------
    public static void main(String[] args) {
        Animal a1 = new bird();//此时，他是一个animal类型的bird，无法运行猫对象中的代码，强制类型转换并运行猫的方法时会报错
        if(a1 instanceof cat){//在这里加一个判断，如果a1对象时一个cat类型，执行向下转型代码
            cat b1 = (cat) a1;
            b1.catchMouse();
            System.out.println("他是一直猫，所以可以做向下转型");
        }else {
            System.out.println("他不是一只猫");
        }
    }
```



## 方法重载

当父类的一些方法无法满足子类的需求时，子类可以重新改写这些方法

- 必须是相同的返回值类型
- 必须是相同的方法名
- 必须是相同的形式参数列表
- 访问权限必须更高而不是更低
- 重写之后的方法不能比之前的方法抛出更多的异常
- 私有方法无法覆盖
- 构造方法不能被覆盖

```java
public class Main {

    public static void main(String[] args) {
        SonClass son = new SonClass();
        son.sing();
    }
}
class DadClass{
    public void sing(){
        System.out.println("1");
    }
}

class SonClass extends DadClass{
    public void sing(){
        System.out.println("2");
    }
}

```



------

# 构造方法

构造方法是用来创建对象，然后实例化对象，及在实例化这个类的时候，会默认调用这个方法，同时在这个时候，给所有的成员变量赋值

当一个类没有提供构造方法，系统会自动创建一个

构造方法格式，[修饰符] 类名(){

} 不需要指定返回值类型

```java
public class Member {

    public int age;
    public String name;
    public String addr;

    public Member(String addr) {
        this.addr = addr;
    }
}

public class Main {

    public static void main(String[] args) {
        Member m1 = new Member("100");
        System.out.println(m1.addr);
    }


}

```

## this

一个对象，一个this，

this，只能使用在实例方法用

this代表调用者，谁创建这个对象，this就代表它

```java
//this的参数是这个对象的内存地址，this，country表示这个对象里的country，而不是形式参数里的country
public class Member {

    private String country;

    public Member(String country) {
        this.country = country;
    }

    public  void setCountry(String country) {
        this.country = country;
    }

    public  String getCountry() {
        return country;
    }
}
```

```java
//通过this在一个构造方法中调用另一个构造方法，只能出现在一个构造方法的第一行，且只能出现一次    
public Member() {
        /*
        this.year = "1970";
        this.month = "1";
        this.day = "1";
        */
        this("1970","1","1");
    }

    public Member(String year, String month, String day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
```

------

# Super	

- super只能出现在实力方法和构造方法中
- super的语法是"super.","super()"
- super不能使用在静态方法中
- super大部分情况下是可以省略的
- super()只能出现在构造方法的第一行，通过当前的构造方法去调用父类的构造方法，目的是：代码复用(创建本类对象之前先初始化父类特征)
- 在子类中访问父类私有的属性，无法通过super访问

```java
public class first{
    public static void main(String[] args) {
        VIP v = new VIP("someone");
    }
}

class Customer{
    String name;
    public Customer() {
    }
    public Customer(String name){

    }
}
class VIP extends Customer{
    public VIP() {
    }
    public VIP(String name){
        super(name);
        System.out.println("用户名字是：" + name);
    }
}
```

------

# Final

- final可以修饰变量和方法，类等，表示不可变
- final修饰的类无法被继承，例如String就不被继承
- final修饰的方法无法被重写

```java
//会报错
class Customer{
    public final void dosome(){}

}
class VIP extends Customer{
    public void dosome(){}
}
```



- final修饰的局部变量，一旦赋值就没办法再更改，也就是说只有一次机会赋值
- 被final修饰的引用信息同样只能被赋值一次

```java
/*c引用里面存储的是一个内存地址，重新new一个新的地址会更改原地址，所以会报错
该引用只能指向一个对象，并且永远只能指向该对象，并且对象创建之后，不会被垃圾回收器回收处理，直到用完
虽然final修饰的引用对象不能再更改为其他对象，但是对象里的属性是可以修改的*/
public class first{
    public static void main(String[] args) {
        final Customer c = new Customer("张三");
        c = new Customer("李四");  //此行会报错
    }
}

class Customer{
    String name;
    public Customer() {
    }

    public Customer(String name) {
        this.name = name;
    }
}
```

- 被final修饰的实例变量必须手动附上值

```java
class Customer{
    final String name;  //错
    final int age = 10; //对
    
}

```

- final修饰实例变量的时候加个static，节省内存，且全部大写

```java
/*final修饰的实例变量不会再更改，所以是恒定的，但是每次创建对象的时候都需要在堆内存中开辟一块空间给final修饰的变量，创建了100个对象，就有100个final修饰的实例变量，太浪费内存，既然不改的话，直接加上static，只生成一份*/
public class first{
    public static void main(String[] args) {
        System.out.println(Customer.AGE);
    }
}

class Customer{
    static final int AGE = 10;
}

```

------

# 抽象类

**抽象类的唯一作用：降低接口实现类的实现难度，一些接口定了许多抽象方法，如果直接继承接口需要实现所有方法，有些方法压根用不大，所以用抽象类实现接口，然后实现类继承抽象类，让实现类只需要重写接口中需要实现的方法即可，**

- 抽象类是将类和类之间相同的特征提取出来，形成抽象类。

银行账户类-储蓄卡类-小明的储蓄卡对象

- 抽象类也属于引用数据类型
- 抽象类无法创建实力对象，天生就是被用来继承的，虽然不能被实例化，但是抽象类提供构造方法，供子类使用

```java
public class first{
    public static void main(String[] args) {
        new Customer(); //这行是错误的，抽象类无法实例化
    }
}

abstract class Customer{  //前面加abstract
    
}

```

- 抽象类也可以包含抽象方法，一种没有方法体的方法（如果这个类要写抽象方法，那么这个类一定是抽象类，但抽象类可以存在抽象和不抽象方法）

```java
abstract class Customer{
    public abstract void move();//注意，不能加大括号
}
```

- 子类继承父类之后，必须把父类中的抽象方法重写，因为继承过来的时候是个抽象方法，不能放在不抽象的类中

```java
abstract class Customer{
    public abstract void move();//没实现
}

class VIP extends Customer{

    @Override
    public void move() {//必须实现
        System.out.println("我已重写，感觉良好");
    }
}
```

------

# 接口

- 接口也是引用数据类型
- 接口是完全抽象的，抽象类是半抽象
- 接口支持继承，也可以多继承
- 接口中只能包含两部分，一部分是常量，一部分是抽象方法（抽象方法可以省略public 和abstract）
- 接口中所有东西都是public

```java
interface Test{
    int NUM = 1; //我是一个常量，定义的时候可以省略 public static final
    void sum(int a, int b);//我是一个方法，定义的时候可以省略public abstract
}
```

- 当一个费抽象类实现接口的话，他必须实现接口里的所有方法

```java
class VIP implements Test{


    @Override
    public void sum(int a, int b) {//必须实现它
        
    }
}
interface Test{
    int NUM = 1; //我是一个常量
    void sum(int a, int b);//我是一个方法
}
```

- 子类实现的方法必须是public修饰的，权限可以更高，但不能更低
- 接口不能创建对象
- 接口可以实现多继承

```java
class VIP implements Test,Test2{//多继承
    @Override
    public void sum2(int a, int b) {//必须实现test2里面的方法
        
    }

    @Override
    public void sum(int a, int b) {//必须实现test里面的方法

    }
}
interface Test{
    int NUM = 1; //我是一个常量
    void sum(int a, int b);//我是一个方法
}
interface Test2{
    int NUM = 2; //我是一个常量
    void sum2(int a, int b);//我是一个方法
}
```

继承和接口同时继承的话，extends在前，implelments在后

------

# 包

## package

- 包机制是用来方便管理，不同目录下的包，功能也不相同
- 类似python导包，他只会出现在第一行
- 命名规范：公司域名+项目名+模块名+功能名

## import

就是导包，指定一个目录，将指定的clss文件导入到这个项目里

A 想导入B 但是B和A不在同一个目录（包），通过import的方式来导入
import com.test;

import可以加*表示导入全部class

------

# 访问控制权限

| 修饰符    | 本类 | 同包 | 子类 | 任意位置 |
| --------- | ---- | ---- | ---- | -------- |
| public    | *    | *    | *    | *        |
| private   | *    |      |      |          |
| protected | *    | *    | *    |          |
| 默认      | *    | *    |      |          |

| 修饰符    | 属性 | 方法 | 类   | 接口 |
| --------- | ---- | ---- | ---- | ---- |
| public    | *    | *    | *    | *    |
| private   | *    | *    |      |      |
| protected | *    | *    |      |      |
| 默认      | *    | *    | *    | *    |

------

# 数组

- 数组是一种引用数据类型
- 数组可以存储基本数据类型，和引用数据类型（对象，接口），它存储引用数据类型不是直接存储对象，而是存储对象的内存地址
- 数组是存放在堆内存当中
- 数组一旦创建，长度不可变
- java中的数组要求元素类型同一
- 数组在内存存储方面，数组中的内存地址是连续的（数组中首元素的内存地址作为整个数组对象的内存地址）
- 数组扩容，先建一个更大的数组，然后把小数组的内容拷贝到大数组中

| 优点                                             | 缺点                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| 数组中的每个元素的内存地址都是连续的，检索效率高 | 添加或删除数组中的元素时，效率较低，因为他会让目标元素之后的全部元素的内存地址向前或者已通知更改地向后移动 |
| 每一个元素类型相同，所以占用空间大小一样         | 数组不能存储较大的数据，因为很难在内存中找到一块连续空闲的内存地址 |

```java
public class first{
    public static void main(String[] args) {
        int[] array1; //声明一个数组
        int[] array2 = {100,200,300};//静态生成一个数组
        int[] array3 = new int[10]; //动态声明一个数组，里面有10个元素，值是类型默认值
        System.out.println(array2[array2.length -1]);//打印最后一个元素
        array2[1] = 1000;
        System.out.println(array2[1]);
        array3[1] = 500;
    }
}


```

```java
//拷贝数组
public class first{
    public static void main(String[] args) {

        int[] array2 = {100,200,300};//静态生成一个数组
        int[] newArray = new int[10];
        System.arraycopy(array2,0,newArray,1,array2.length);
        /*
        * 源数组
        * 从源数组的第几个元素开始拷贝
        * 目标数组
        * 从目标数组的第几个元素开始写入
        * 拷贝数量*/
        for (int i = 0; i < newArray.length; i++) {
            System.out.println(newArray[i]);
        }
    }
}
```

## 二维数组

- 数组套数组

```java
public class first{
    public static void main(String[] args) {

        int[][] array2 = {
                {100, 1000},
                {200,3000},
                {3123,31231}};//二维数组
        System.out.println(array2[0][1]);
        System.out.println(array2[0].length);
        int[] oneArray = array2[0];//把二维数组中的一维数组取出来
    }
}

```

------

# 各种工具类

获取时间

```java
import java.text.SimpleDateFormat;
import java.util.Date;

public class first{
    public static void main(String[] args) {
        Date d = new Date();
        SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
        String nowTime =time.format(d);
        System.out.println(nowTime);
    }
}

```

枚举

```java
public class first{
    public static void main(String[] args) {
        choice c =compare(20,20);
        if(c == choice.biger){
            System.out.println("a更大");
        }else if (c == choice.smaller){
            System.out.println("b更大");
        }else {
            System.out.println("相等");
        }
    }
    public static choice compare(int a, int b){
        if (a > b){
            return choice.biger;
        }else if(b > a){
            return choice.smaller;
        }else{
            return choice.equal;
        }
    }
}

enum choice{
    biger,smaller,equal
}
```

------

# 数据结构

## 数组

- 创建一个数组需要一连串连续的内存地址，0x0001~0x0010，所以在创建数组之处就需要定义好长度，他会去内存空间找这么一连串的内存地址
- 因上述原理，数组是最高效的一种数据结构
- 检索效率较高
- 随机增删效率较低

## 链表结构（不是集合，是数据结构）

### 单向链表

- 链表的基本结构是结点
- 任何一个结点都有两个属性，存储的数据和下一个结点的内存地址，尾结点的内存地址是Null
- 假使一个链表有3个数据，第二个数据被删除了，那么第一个数据会将下一个结点的内存地址改为第三个数据
- 随机增删效率较高
- 检索效率较低

### 双向链表

除了有数据和下个结点的内存地址，还保存了上个节点的内存地址

## 哈希表

哈希表是数组和单向列表的结合体

看255

------



# 泛型

- 指定集合里存储的数据类型

```java
public class first{
    public static void main(String[] args) {
        LinkedList<String> l = new LinkedList<String>();//此时之能存储String，其他的都会报错
        l.add("12321");
        l.add("21312");
        System.out.println(l);
    }

}

```



------

# 集合

- 不能直接存储基本数据类型（通过传递数据到对象内来存储数据），能不能直接存储对象，存储的是引用地址
- 不同的集合对应不同的数据结构，二叉树，链表，哈希表
- list是有序的，且里面元素是可以重复的



## ArrayList

非线程安全的集合

```java
public class first{
    public static void main(String[] args) {
        ArrayList al = new ArrayList();
        al.add("1231");
        al.add("3213");//添加元素
        System.out.println(al);//打印所有元素
        System.out.println(al.get(0));//获取特定元素
        System.out.println(al.size());//获取元素个数
        boolean flag = al.contains("3213");//判断是否包含"3213"，如果包含返回true
        boolean flag2 = al.remove("3213");//删除某个元素
        al.clear();//清空集合
        boolean result = al.isEmpty();//判断集合是否为空
        
    }

}

```

```java
//迭代器迭代元素
public class first{
    public static void main(String[] args) {
        ArrayList al = new ArrayList();
        al.add("1231");
        al.add("3213");
        Iterator it = al.iterator();
        while (it.hasNext()){//如果有下一个元素返回true
            Object obj = it.next();//获取迭代器的下一个元素
            al.remove(obj);//不能这样写，删除之后集合的结构就改变了，此时这个迭代器需要更新，否则报错
            it.remove();//但是可以这样写，通过迭代器的删除方法来删除当前的元素
            System.out.println(obj);
        }
    }

}
```



## LinkedList

双向链表结构

linkedlist也是有下标的

```java
public class first{
    public static void main(String[] args) {
        LinkedList l = new LinkedList();
        l.add("12321");
        l.add("21312");
        System.out.println(l);
    }

}
```



## vector

线程安全的结合

效率较低，少用

## Map（HashSet和TreeSet的接口）

包含一些简单的增删改查方法，看一下JDK API用

```java
//Map接口中常用的方法
public class first{
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();
        m.put("我是键","我是值");//放入键值对
        System.out.println(m.get("我是键"));//通过键来获取值
        System.out.println(m.size());//获取大小
        System.out.println(m.containsKey("我是键"));//通过键获取值
        System.out.println(m.containsValue("我是值"));//通过值获取键
        boolean flat = m.isEmpty();//判断是否为空
        m.clear();//清空键值对
    }
}
//遍历
public class first{
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();
        m.put("1","值1");
        m.put("2","值2");
        m.put("3","值3");
        m.put("4","值4");
        m.put("5","值5");
        Set<String> s = m.keySet();
        for(String data : s){
            System.out.println(data);//遍历获取键
            System.out.println(m.get(data));//遍历获取值
            System.out.println("-----------");
        }
    }
}

```



## HashMap

哈希表数据结构，无序（没有下标），不可重复

```java
public class first{
    public static void main(String[] args) {
        Map<String,String> m = new HashMap<>();
        m.put("1","值1");
        m.put("2","值2");
        m.put("3","值3");
        m.put("4","值4");
        m.put("5","值5");
        Set<String> s = m.keySet();
        for(String data : s){
            System.out.println(data);//遍历获取键
            System.out.println(m.get(data));//遍历获取值
            System.out.println("-----------");
        }
    }
}

```



## HashTable

线程安全，效率低

## properties

继承HashTable，key和value都是String

## TreeSet

自动排序集合中的元素，无序（没有下标），不可重复

------

# IO

Stream结尾的是字节流

reader/writer结尾的是字符流

在写入完之后，需要先flush一下，清空内存到硬盘的管道，然后再关闭。 不flush容易丢数据

和python一样，用完文件要close

## file类

创建和读取文件

```java
/*
exist判断文件是否存在
mkdir 创建目录
mkdirs 创建多层目录
createNewFile 创建文件
getParent	获取路径，不包括文件名
getParentFile	获取路径，包括文件名
*/
```



## 文件流

FileInputStream（支持任意格式）

```java

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

public class first{
    public static void main(String[] args) {
        FileInputStream fi = null; //定义一个输入文件的变量
        try {
            int arrayCount = 0; //定义一个变量，fi.read方法通过数组来获取字符后回返回数组中有多少个新字节
            fi = new FileInputStream("C:\\Users\\Administrator\\Desktop/百世账号.txt");//创建file对象
            byte[] b = new byte[20];//定义一个数组，表示每次从文件中取出20个字节
            while ((arrayCount = fi.read(b)) != -1){//read方法每次读取一个字节，但是传入一个byte数组之后会按照数组的长度来取出字节，取出字节后会返回本次取出的字节数，在文件末尾时，可能只取出不到20个字节，他会返回对应字节的数量，如果本次取出没有新字节，他会返回-1
                System.out.println(new String(b,0,arrayCount));//new String传入一个byte数组，他会将数组的字节转换成字符串，第二个参数是起始位置，第三个参数是停止位置，这个位置通过read方法的返回值来动态写入
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(fi != null){
                try {
                    fi.close();//一定要关闭
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }
}

```



FileOutputStream（支持任意格式）

```java

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

public class first{
    public static void main(String[] args) {
        FileOutputStream fi = null; //定义一个输入文件的变量
        try {
            fi = new FileOutputStream("C:\\Users\\Administrator\\Desktop/退出日志.log", true);//创建一个写入对象，传入路径，第二个参数不填表示重写，写true表示追加
            String content = "我是一个内容";//定义一个内容
            byte[] b = content.getBytes();//String的getBytes可以把字符串转成字节数组
            fi.write(b);//写入字节数组
            fi.flush();//内存到硬盘中有个管道用于传输数据，通过flush方法清空管道内容

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(fi != null){
                try {
                    fi.close();//关闭管道
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }
}

```



FileReader：字符读取

FileWriter：字符写入

## 转换流

- 将字节流转换成字符流

InputStreamReader

OutputStreamWriter

## 缓冲专属流

- 更方便些，不需要指定char或者byte数组

BufferedReader

BufferedWriter

BufferedInputStream

BufferedOutputStream

## 数据专属流

- 已java特有的加密方式来输入和输出，无法用记事本打开

DataInputStream

DataOutputStream

## 标准输出流

PrintWriter

PrintReader（就是打印到控制台）

## 对象专属流

- 将对象存储从内存存储到硬盘，切成一块一块的存储

ObjectInputStream

ObjectOutputStream

# 多线程

- 进程是一个应用程序
- 线程是一个应用程序的执行分支
- 线程中，堆内存和方法区内容共享，栈内存独立，一个线程一个独立栈
- Thread方法还提供设置和获取线程优先级的方法，暂停当前执行的线程的让位方法，
- 在某个线程当中调用join方法，可以让其他线程加入此线程，合并为一个线程

一个独立的线程有：新建状态，就绪状态（抢夺CPU时间片），运行状态（抢到时间片就运行），阻塞状态（例如要求用户输入就会阻塞，阻塞接触后进入就绪状态继续抢夺时间片），死亡状态

```java
//开启线程方式，编写一个类，继承java.lang.Thread,重新run方法
public class first{
    public static void main(String[] args) {
        otherThread ot = new otherThread();
        ot.start();//执行这行语句，它会迅速执行并结束，他的功能是启动一个栈（线程），run方法是系统回调启动
    }
}

class otherThread extends Thread{
    @Override
    public void run() {
        //虚拟机会在新线程调用这个方法，就像jvm调用main方法一样
    }
}
```

```java
//通过实现接口的方式来开启线程
public class first{


    public static void main(String[] args) {
        Thread t = new Thread(new otherThread());//创建Thread对象，通过构造方法穿进去一个实现Runnable接口的类
        t.start();//执行这行语句，它会迅速执行并结束，他的功能是启动一个栈（线程），run方法是系统回调启动

    }
}

class otherThread implements Runnable{
    @Override
    public void run() {
        //虚拟机会在新线程调用这个方法，就像jvm调用main方法一样
    }
}

//通过匿名内部类的方法
public class first{
    public static void main(String[] args) {
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                //通过匿名内部类的方式创建子线程
            }
        });//创建Thread对象，通过构造方法穿进去一个实现Runnable接口的类
        t.start();//执行这行语句，它会迅速执行并结束，他的功能是启动一个栈（线程），run方法是系统回调启动
    }
}

```

**获取线程对象，并获取和修改线程名字,线程休眠**

```java
public class first{
    public static void main(String[] args) {
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000);//让当前线程休眠1000毫秒，当前线程会放弃CPU时间片，然后进入阻塞状态
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                //通过匿名内部类的方式创建子线程
            }
        });//创建Thread对象，通过构造方法穿进去一个实现Runnable接口的类
        t.setName("name");//设置名字
        String tName = t.getName();//获取名字
        Thread currentT = Thread.currentThread();//获取当前线程的对象
        String currentTName = currentT.getName();//获取当前线程对象的名字
        t.start();//执行这行语句，它会迅速执行并结束，他的功能是启动一个栈（线程），run方法是系统回调启动
    }
}
```

**中断线程休眠**

```java
public class first{
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000 * 60 * 60);//让当前线程休眠1000毫秒，当前线程会放弃CPU时间片，然后进入阻塞状态
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
               
            }
        });
        Thread.sleep(1000 * 5);
        t.interrupt();//通过让子线程里的sleep出现异常来中断睡眠
    }
}
```

强行中断一个线程

```java
public class first{
    public static void main(String[] args) throws InterruptedException {
        otherThread ot = new otherThread();
        Thread t = new Thread(ot);
        t.start();
        Thread.sleep(5000);
        ot.run = false;
        System.out.println("结束了");
    }
}

class otherThread implements Runnable{
    boolean run = true; //类似于while循环的判断true和false
    @Override
    public void run() {
        while(true){
            if(run){
                System.out.println("线程开始执行");
            }else {
                return;
            }
        }
    }
}
```

## 多线程数据安全问题

两个用户在同一时间进行取钱，当他们俩都插上卡，显示余额同时发起取款时，本来的钱会被扣两次，即使数据库的余额不足，也没办法阻止，因为余额信息已经读取到两个用户的内存信息之中

- 条件1：多线程并发
- 条件2：有共享数据
- 条件3：共享数据有修改行为

解决这个问题需要”线程同步机制”，其实就是线程排队的意思

### 同步编程模型

线程t1和线程t2并行  

### 异步编程模型

线程t1和线程t2，在线程t1执行的时候，t2需要等待，或者说t2如果需要执行，必须强制中断t1的运行，两个线程不能并行，只能串行

# 反射机制

反射可以实现动态编译和创建对象,通过反射可以得到一个类的属性,构造函数,方法,实现了哪些接口,父类,注解

- 主要的包:

Class包:代表一个类

Method包:代表类的方法

Field包:代表类的成员变量

Constructor包:代表类的构造器(构造方法)

Java的类可以创建多个对象,但是类模板在内存中只有一个.通过getClass可以获得这个唯一的值

![](https://gitee.com/zhssss/image/raw/master/202112071518827.png)

- 获取类

```java
public class Test01 {

    @Test
    public void MyTest() throws ClassNotFoundException {
        Class aClass = Class.forName("entity.Student");
        //class entity.Student
        
        Class superclass = aClass.getSuperclass();
        //class entity.User
        
        
    }
}

```

- 类的主动初始化

当虚拟机启动时,会初始化main方法里面的类

new一个类对象

调用类的静态成员和静态方法

使用反射调用类时

初始化一个类,如果其父类没被初始化,一定会先初始化他的父类

- 类的被动引用(不会产生初始化)

子类访问父类的静态变量

通过数据定义类的引用,不会触发初始化

引用常量不会触发初始化





读和修改字节码(class)文件，不需要写死对象，只需要修改配置文件，不修改代码的方式来达到灵活更变对象

```java
//常用的反射包
java.lang.Class//代表字节码文件
java.lang.reflect.Method//字节码中的方法
java.lang.reflect.Constructor//字节码中的构造方法
java.lang.reflect.Field//字节码中的属性字节码
    
//获取class文件在内存中的对象
public class ReflectTest01 {
    Class c1 = null;
    {
        try {
            //它会在内存中的方法区加载String的class文件，并把内存地址赋给c1
            c1 = Class.forName("java.lang.String");//静态方法，方法的参数必须是一个完整的字符串，包括java.lang
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    String aString = "1";
    Class stringClass = aString.getClass(); //结果同上，通过getClass方法获取class在内存中的内存地址，这个getClass是object的方法，只要是对象就能用

    //第三种方法
    Class i = int.class;
    Class s = String.class;
    Class data = Data.class;
}


//通过修改配置文件的方式在构造不同的对象，配置文件就一行：className=com.zhs.UserObject
public class FlexibleReflect {
    public static void main(String[] args) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        FileReader fr = new FileReader("classinfo.properties");//获取类配置文件的流对象
        Properties p = new Properties();//创建一个Properties对象，准备用它里面的方法处理配置文件
        p.load(fr);//通过load方法将classinfo的流文件加载到p对象里
        fr.close();//关闭流
        String className = p.getProperty("className");//通过键来获取需要实例的对象，这也是它灵活的地方，他可以直接修改配置文件，从而达到更改不同的对象
        Class classObject = Class.forName(className);//把这个类加载到java虚拟机中
        Object o = classObject.newInstance();//创建对象
    }
}


//只让一个类的静态代码块执行
public class ReflectTest02 {
    public static void main(String[] args) throws ClassNotFoundException {
     Class.forName("com.zhs.UserObject");
    }
}
package com.zhs;

public class UserObject {
    static {
        System.out.println("静态代码块执行");
    }
}


```

## 获取方法,变量等参数

```java
public class Reflect1 {
    public static void main(String[] args) throws ClassNotFoundException {
        Class stu = Class.forName("com.reflect.Student");//加载类
        Field[] stuFiled = stu.getFields();//获取类里面所有被public修饰的变量，并返回一个Field数组
        Field ele = stuFiled[0];//取出第一个元素
        String name = ele.getName();//获取第一个元素的名字
        System.out.println(name);

        Field[] allField = stu.getDeclaredFields();//获取类里面所有的变量，不管被什么修饰，并返回一个field数组
        for(Field f : allField){
            System.out.println(f.getName());

            Class fClass = f.getType();//获取类型
            String fType = fClass.getName();//获取类型名称
            System.out.println(fType);

            int fModif = f.getModifiers();//获取当前变量的修饰符标记，例如0代表默认，无任何修饰符
            System.out.println(fModif);
            Modifier.toString(fModif);//将标记转为字符串
        }

        System.out.println(stu.getName());//打印类名，包含包名
        System.out.println(stu.getSimpleName());//打印类名，不包含包名

    }
}

```

## 通过反射创建对象,执行方法,参数赋值

```java
public class Test01 {

    @Test
    public void MyTest() throws ClassNotFoundException, InstantiationException, IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        Class aClass = Class.forName("entity.Student");
        //通过无参构造器来创建对象
        Student o = (Student) aClass.newInstance();

        //通过构造器创建一个有参的对象
        Constructor constructor = aClass.getDeclaredConstructor(String.class, int.class, int.class, int.class);
        Student zhs = (Student) constructor.newInstance("zhs", 264005, 22, 063014);
        System.out.println(zhs.getName());
        //zhs
        
        
        //通过反射执行方法
        //先获取要执行的方法
        Method setCardId = aClass.getDeclaredMethod("setCardId", int.class);
        //通过invoke执行方法,现在已经知道要执行的方法,还需要传入执行该方法的类和参数
        setCardId.invoke(o, 264005);
        System.out.println(o.getCardId());
        //264005

        //通过反射赋值
        Field cardId = aClass.getDeclaredField("cardId");
        //默认无法访问private属性,通过设置accessible属性,屏蔽这项检测
        cardId.setAccessible(true);
        //通过set直接赋值
        cardId.set(o, 23333);
        System.out.println(o.getCardId());
        //23333
        
    }
}
```



# 注解

- 可以被编译器读取

```java
//常用内置注解
@Override:表明一个方法被重写
@Deprecated:已弃用
@SuppressWarnings:用来抑制告警信息,放在类上,y
```

# 多线程-狂神

- 程序运行的时候,没有创建多线程,也会有许多后台线程,如GC垃圾回收

- 对同一份资源会出现抢夺问题,必须加上并发控制
- 多线程会带来额外的开销,如CPU调度时间

```java
public class Thread1 extends Thread{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("run线程"+i);
        }
    }

    public static void main(String[] args) {
        Thread1 thread1 = new Thread1();
        //开启多线程,他会交替执行,不能直接调用run方法
        thread1.start();
        for (int i = 0; i < 1000; i++) {
            System.out.println("main线程"+i);
        }
    }
}
```

```java
public class Thread2  implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println("子线程"+i);
        }
    }

    public static void main(String[] args) {
//        通过创建Thread对象,然后将实现Runnable接口的类放进去,从而达到开启多线程的方法
        new Thread(new Thread2()).start();
        for (int i = 0; i < 1000; i++) {
            System.out.println("主线程"+i);
        }
    }
}
```

```java
package com.zhs;

import java.util.concurrent.*;

public class ThreadCallable implements Callable<Boolean> {
    @Override
//    这种线程要有返回值
    public Boolean call() throws Exception {
        for (int i = 0; i < 100; i++) {
            System.out.println(Thread.currentThread().getName()+"线程开始执行");
        }
        
        return true;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ThreadCallable t1 = new ThreadCallable();

//        相当于开启一个线程池,线程池可以放进去3个线程
        ExecutorService es = Executors.newFixedThreadPool(3);
        Future<Boolean> s1 = es.submit(t1);
        Future<Boolean> s2 = es.submit(t1);
        Future<Boolean> s3 = es.submit(t1);

        Boolean r1 = s1.get();
        Boolean r2 = s2.get();
        Boolean r3 = s3.get();
        es.shutdown();
    }
}

```

```java
//手动实现stop方法
public class ThreadStop implements Runnable{
    Boolean flag = true;
    @Override
    public void run() {
        int i = 0;
        while (flag){
            System.out.println("该线程一直在运行"+ i++);
        }
    }
    public void stop(){
        this.flag = false;
    }
    public static void main(String[] args) {
        ThreadStop threadStop = new ThreadStop();
        new Thread(threadStop).start();
        for (int i = 0; i <= 1000; i++) {
            System.out.println("主线程"+ i);
            if (i==1000){
                threadStop.stop();
            }
        }
    }
}
```

yield()线程礼让,有可能不成功

join()线程强制执行,相当于插队

Thread.getPriority().setPriority():设置线程权重(1~10),越大,被调用的几率越高

线程守护机制,就类似于gc垃圾回收器

## 线程不安全

多个线程操作同一个资源,会导致线程不安全,数据紊乱

![image-20211109102315047](https://gitee.com/zhssss/image/raw/master/202111091023238.png)

ArrayList和HashMap也是这样,多线程往里面存数据,会导致数据角标重叠,从而数据被覆盖

## 线程状态

线程分为五个状态

启动状态, new一个新的线程

就绪状态:调用线程start的方法,此时调用start不代表该线程会立即执行,只是等待cpu的调度

运行状态:cpu决定调用这个线程,会进入运行状态,执行代码块

阻塞状态:调用sleep,wait,线程锁,之后,多线程会处于阻塞的一个状态,不会执行代码,当结束阻塞状态回重新回到就绪状态,然后等待CPU的调用

死亡状态:运行状态结束后,要么到阻塞状态,要么到死亡状态

![image-20211109111500795](https://gitee.com/zhssss/image/raw/master/202111091115946.png)

## 线程同步

多个线程访问同一个对象会出现并发问题,队列和锁,才能保证线程安全

所有线程组成一个线程池,排队执行,叫做队列

每个类都有一把锁(synchronized),当一个线程执行时,类会把这个锁发放给这个线程,这个线程会独占这个类的资源.等这个线程执行结束后,把锁还给类,类再把锁给下一个线程

- 一个线程持有锁,会导致其他线程挂起
- 多线程竞争下,会导致频繁的加锁和释放锁,影响效率

## 解决方法

将类里方法的修饰符加上synchronized,会影响效率,但是线程安全了

```java
//给list加锁
public class ThreadList {
    public static void main(String[] args) throws InterruptedException {
        List<String> l = new ArrayList<>();
        for (int i = 0; i < 10000; i++) {
            new Thread(()->{
                synchronized (l){
                    l.add(Thread.currentThread().getName());
                }
                
            }).start();
        }
        Thread.sleep(3000);
        System.out.println(l.size());
    }
}
```

## 死锁

双方手里都有锁,想去拿到对方的锁,所以造成死锁, 一个线程,已经拿着一把锁,此时,想去拿另一把锁,但另一把锁已经被别人拿着呢. 这个线程只能拿着等待另一个线程去释放掉锁,在另一个线程释放掉锁之前,本线程不会释放自己的锁,从而造成死锁

## lock锁

lock锁是显式的锁,syncchronized是隐式的锁(出了代码块自动结束)

```java
package com.zhs;

import java.util.concurrent.locks.ReentrantLock;

public class ThreadLock implements Runnable{
    int nums = 10;
    ReentrantLock lock = new ReentrantLock();
    @Override
    public void run() {
        while (true){
            if (nums >= 0){
                try {
//                    显式上锁,让其他线程调用这一块的时候,先等待这个锁执行完
                    lock.lock();
                    System.out.println(Thread.currentThread().getName()+"线程执行:"+nums--);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }finally {
//                    显式解锁
                    lock.unlock();
                }
                
                
            }else {
                break;
            }
            
        }
    }

    public static void main(String[] args) {
        ThreadLock l = new ThreadLock();
        new Thread(l).start();
        new Thread(l).start();
        new Thread(l).start();
    }
}

```

