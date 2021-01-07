## DNS 服务器和端口号

作用：负责域名到 IP 的解析

www.baidu.com -> DNS 解析 -> 用解析成的 IP 找对应的服务器

同一个端口号不能被不同的应用重复占用，HTTP 默认 80，可以被省略，HTTPS 默认是 443，也可以被省略

## 创建服务器

```js
// Step1: 引入 HTTP 模块
const http = require('http');
// Step2: 创建服务器实例对象
const server = http.createServer();
// Step3: 监听客户端的请求
server.on('request', (req, res) => {
    // req => request, 请求对象
    // res => response, 响应对象
    res.end('ok');
});
// Step4: 设置一个端口
server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'));
```

另一种写法而已

```js
// Step1: 引入 HTTP 模块
const http = require('http');
// Step2: 创建服务器实例对象、监听请求、设置端口
http.createServer((req, res) => {
    // 也是所有的请求都会走这里，相当于使用了 request 事件
    res.end('ok');
}).listen(3000, () => console.log('Server running on http://127.0.0.1:3000'));
```

## 注意点

==服务器的代码修改了，一定要重启后才能生效！按 `Ctrl + c` 可以关闭==

## req 和 res 对象下面的方法和属性

req.url: 请求地址，注意是端口后面的那部分

req.method: 请求方法，例如 GET、POST

res.end(): 服务器可以往客户端响应内容

```js
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
    // req.url 是客户端请求的 URL 地址
    // req.method 是客户端请求的 method 类型
    const str = `Your request url is ${req.url}, and request method is ${req.method}`;
    
    // res.end(str)，代表把 str 字符串响应到客户端
    res.end(str);
});
server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'));
```

## 设置响应头

```js
const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
    const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`;
    // 解决了中文乱码、不能完全解析 HTML 标签
    // res.setHeader 必须写到 res.end 之前
    // 服务端设置的响应头中的内容类型和内容编码
    res.setHeader('Content-Type', 'text/html; charset=utf8');

    // 曾经学习 AJAX 时，客户端设置的请求头中的内容类型
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // res.end() 之后不要写其他代码了，res.end() 一般放到最后
    res.end(`<h2>${str}</h2>`);
});
server.listen(3000, () => console.log('Server running on http://127.0.0.1:3000'));
```

## Clock 时钟

获取请求地址（req.url） -> 拼接成资源的实际地址（path.join()） -> 读取实际地址（fs.readFile） -> 把读取到的结果返回给前端（res.end）

```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const server = http.createServer();

server.on('request', (req, res) => {
    const url = req.url;
    let fpath = ''

    // 优化请求路径
    if(url === '/') {
        fpath = path.join(__dirname, 'clock', 'index.html');
    } else {
        fpath = path.join(__dirname, 'clock', url);
    }
    // 根据文件的路径输出内容类型
    // console.log(mime.getType(fpath), 23333333333);

    // mime.getType(fpath)，根据资源路径返回资源的类型
    res.setHeader('Content-Type', `${mime.getType(fpath)}; charset=utf8`);

    fs.readFile(fpath, (err, dataStr) => {
        if (err) return res.end('404 Not found.');
        res.end(dataStr);
    });
});

server.listen(80, () => {
    console.log('server running at http://127.0.0.1');
});
```

## 模块化

1\. 命名冲突

2\. 文件依赖关系不明确

在 NodeJS 中，一个 JS 文件就是一个模块！

分类：内置、第三方、自定义

## 加载模块

加载一个模块的(require)时候，会执行此模块中的代码

```js
// 加载的是自定义模块，需要明确带上路径
const a = require('./a.js');
console.log(a);

// 加载的是内置、第三方模块，不用带上路径
const fs = require('fs'); // 内置
const mime = require('mime'); // 第三方
```

## 模块的导入与导出

```js
// 1.js
const sum = (a, b) => a + b;

const age = 18;
// #1 导出模块
/* module.exports = {
    sum,
    age
}; */

// 下面写法和上面等价
module.exports.age = age;
module.exports.sum = sum;
```

```js
// 其实来说，require 得到的结果是 1.js 中 module.exports 这个对象
// #2 导入模块
const mod = require('./1');
console.log(mod.sum(1, 3));
```

## exports 和 module.exports

**exports 是 module.exports 的一个引用，模块最终导出的结果永远以 module.exports 指向的对象为准**

```js
// 最佳实践1
module.exports = {
    a,
    b,
    c
};
```

```js
// 最佳实践2
exports.a = a;
exports.b = b;
exports.c = c;
```

## 了解一下模块化规范

- AMD，require.js 是 AMD 规范的实现

- CMD，sea.js 是 CMD 规范的实现

- CommonJS 规范，Node 当中导入导出使用的就是 CommonJS 规范，后端用的

- ES6 模块规范

## NPM 使用

npm => **命令行**管理工具，可以通过此工具下载包

npm => **包的托管平台**（网站），一般通过此网站查看包的详细使用


```bash
npm install 包名 / npm i 包名
```

package-lock.json 锁定包的版本，记录包的下载地址（提高包的下载速度）


## 补充 url 模块

```js
const url = require('url');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    // 端口后面那部分
    // http://localhost/index.html?name=ifer

    // req.url => /aaa.html?name=ifer
    // 我只期望获取到 /aaa.html，后面的查询参数使用

    // 第二个参数为 true 会把 query 解析成对象
    const { pathname, query } = url.parse(req.url, true)

    if (pathname === '/index.html') {
        return res.end('Welcome ' + query.name);
    }
    res.end('404');
});

server.listen(80, () => {
    console.log('server running at http://127.0.0.1');
});
```