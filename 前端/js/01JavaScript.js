// 开启javascript语法严格检测机制
'use strict'


// 常量(方法体内的叫变量),不用设置类型,可以使用数字,字符串,布尔
var num1 = 100;
var num2 = "100";
// 换行打印,用`
var newLine = `
换
行
打
印`;
// 替代加号来拼接字符串
console.log(`${num1}${num2}${newLine}`);
// 字符串长度
console.log(num2.length);  
//从第二个字符串截取到最后一个字符串
 console.log(num2.substr(1));




// if语句
if(num1>80 && num1 < 120){
	alert(num1);
}
// ==和====
if(num1 == num2){
	// 值一样就行,不用管数据类型
	console.log(true);
}else if (num1 === num2){
	//除了值一样,类型还要一样
	console.log(false);
}



//数组,可以往里面存任意类型
var variables = [1,"2",true,null,undefined];
// 通过内容获取下标
console.log(variables.indexOf(null));
// 长度
console.log(variables.length);
// 截取数组,类似substring
console.log(variables.slice(2));
// 向尾部添加元素
variables.push("213",2133);
// 删除尾部的一个元素
variables.pop();
// 向头部添加元素
variables.unshift("21312",21412);
// 删除头部的一个元素
variables.shift();
// 排序
variables.sort();
// 元素反转
variables.reverse();




// 对象
var person = {
	name: "姓名",
	age: 22,
	tag: [1,2,3,4]
}
console.log(person);
// 删除对象属性
delete person.name;
// 添加对象属性
person.newField = "新参数";
// 判断某个属性是否在对象之中
'newField' in person;



// 循环
var anum = 0;
while(anum<10){
	anum = anum + 1;
	console.log(anum);
}

for(var i = 0; i < 10; i++){
	console.log(i);
}

// 遍历数组
var multinum = [1,213,213,12,3123,4342,5,3]
for(var i in multinum){
	console.log(multinum[i]);
}
// 打印下标
for(var i in multinum){
	console.log(i);
}
// 打印元素(把in换成of)
for(var i of multinum){
	console.log(multinum[i]);
}






// Map集合
var map = new Map();
// 增和改
map.set("name","名字");
map.set("phone",123213)
// 删
map.delete("name");
// 通过key获得value
map.get("phone");


// set集合(无需,不可重复)
var set = new Set();
set.add("123");
set.add("3232");
set.delete("123");
// 是否包含某个元素,返回布尔
set.has("3232");
