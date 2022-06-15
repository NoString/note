/*
DOM对象代表当前页面,可以通过DOM对象获取某类html标签,或者某个标签,可以实现动态添加标签
DOM可以获取网页的cookie
通俗来讲,DOM就是标签的树形结构,除了动态添加节点,还可以遍历某个标签(例如div)中的子节点
								增加标签,删除标签,修改标签
除了加一些普通标签,像script和link都可以添加
可以通过它来获取用户在form中输入的值,现在前端进行一次输入值合法性的判断
*/

// 通过标签的id获取
let myDiv = document.getElementById("content");
// 通过标签导入的class获取
let myP = document.getElementsByClassName("p1");
// 通过标签获取
let allH1 = document.getElementsByTagName("h1");
// 获取myDiv里的所有标签(有bug,暂未修复)
// let allSon = myDiv.children;

// 修改某个标签信息,如果这个节点本身没有内容,那么此时的操作是添加
var t = document.getElementById("detail1");
t.innerText = "一段话";
console.log(t);

// 删除节点
// myP.remove();

// 追加
t.append(myDiv);
