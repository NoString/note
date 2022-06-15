'use strict'

// 定义函数
function m1(){
	return "返回值";
}

var m2 = function(){
	return "第二种方式";
}


// 函数调用
m2();


// 规范写法,将个人的所有参数和函数放入一个自定义个空间中
var myVariable = {};
myVariable.name = "名字";
myVariable.add = function(){
	return "自定义的函数";
}



// 变量和常量
let PI = "3.14";//常量
// 不可变常量,const等于final
const PI2 = "3.15";
//变量
function a(){
	let b = 0; 
}



// 定义方法(在对象之外叫函数,之内叫方法)
function f2(){
	
}
let person = {
	name: "名字",
	age: "22",
	birth: function(){
		var now = new Date().getFullYear();
		return now;
	},
	next: f2
	
};



// 自带的一些方法
var now2 = new Date();
// 通过get获取年月日
now2.getYear();
// 获取时间戳
var times = now2.getTime();
// 将时间戳转换为当前时间
var now3 = new Date(times);



// JSON
var people ={
	name: "名字",
	age: 20,
	sex: "男"
}
// 对象转JSON
var jsonPeople = JSON.stringify(people);
// JSON转对象
var obj = JSON.parse('{"name":"名字","age":20,"sex":"男"}');



// 以新方式生成对象
class Student{
	// 构造器
	constructor(name,age) {
	    this.name = name;
		this.age = age;
	}
	reading(){
		console.log("开始读书");
	}
}
// 子类继承父类
class JuniorStudent extends Student{
	constructor(name,age,id){
		// 必须先调用父类构造器
		super();
		this.name = name;
		this.age = age;
		this.id = id;
	}
	// 重写父类方法
	reading(){
		console.log("英雄联盟,启动!");
	}
	// 子类独有方法
	studyJAVA(){
		console.log("电子厂找个班上吧");
	}
}
let s = new Student('nobody',22);
let j = new JuniorStudent("everyone",24,0x1234);