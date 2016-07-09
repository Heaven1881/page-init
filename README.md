# page-init
前端页面渲染的工具库，ajax页面的渲染框架

## 相关介绍

主要流程：

1. 解析URL参数
2. 载入渲染配置
3. 渲染指定配置

page提供什么功能
用于支持使用ajax渲染的页面，目标就是抽离出这部分不变的工作，让用户通过提供页面数据来完成页面的渲染
* 在这里“页面数据”指的是渲染页面需要的json数据和相关的时间监听器

需要什么数据？
js方面：
* 页面需要的json数据以及对应的渲染模块
* 事件监听器
html方面：
* 渲染的模版

数据氛围监听器数据和渲染数据

具体需求：
* 渲染数据可以指定渲染策略，例如可以在页面加载完毕就渲染或者由用户在运行期间手动渲染
* 渲染数据中获取数据部分可以填函数或者对象，如果是对象，则当作ajax对象处理，如果是函数则无参数的调用这个函数获取结果

## 使用方法
使用`init`函数触发页面的初始化渲染
```javascript
$(document).ready(function() {
    Page.init();
});
```
使用`Page.Queries`对象获取页面的URL参数，例如访问URL是`/index.html?a=1&b=2&a=3`，使用`getFirst`函数获取参数的第一个值，使用`getList`函数获取对应参数的列表值。
```javascript
    Page.Queries.getFirst('a'); // 返回 1
    Page.Queries.getList('a')); // 返回 [1, 3]
    Page.Queries.getFirst('b'); // 返回 2
    Page.Queries.getList('b')); // 返回 [2]
```

Page-init 使用 `Handlebars.js` 处理页面的渲染，我们需要在HTML文件中使用对应的语法在对应的位置写入渲染结构体
```html
<script id="person-list" type="text/x-handlebars-template">
{{#each person}}
    <p>name: {{name}}, age: {{age}}</p>
{{/each}}
</script>
```
关于`Handlebars.js`，相关的语法教程可以参考http://handlebarsjs.com/

使用`setRender`设置渲染体
```javascript
Page.Render.setRender('reander-a', {
    template: 'person-list',
    data: {
        url: '/test/data/test.json',
        dataType: 'json',
    }
  });
```
更多示例可以参考https://github.com/Heaven1881/page-init/tree/master/test
