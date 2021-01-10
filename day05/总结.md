## CORS 跨域

原理：后端通过设置 `Access-Control-Allow-Origin` 这个响应头做到的

`Access-Control-Allow-Headers`，可以设置允许的请求头有哪些

`Access-Control-Allow-Methods`，可以设置允许的请求方法有哪些

## JSONP 原理

前端：通过 script 标签不存在跨域限制这一特点去请求接口，前端只需要准备一个同名函数，就可以通过形参拿到数据啦

```js
function fn(data) {
    // 后端返回的 data
    console.log(data);
}
```

```js
<script src="http://localhost/api/jsonp?callback=fn"></script>
```

后端：后端匹配到请求地址之后，实际返回的是一个函数调用，它把真正的数据作为函数的实参传递到了前端

```js
app.get('/api/jsonp', (req, res) => {
    /* let fn = req.query.callback;
    let data = JSON.stringify({name: 'ifer'});
    res.send(`${fn}(${data})`); */

    // 这 1 行代码就相当于上面 3 行
    res.jsonp({name: 'ifer'});
});
```

## 软件

MySQL: 存储数据，WorkBench: 操作数据的软件，数据库管理软件

PHPStudy: 内部集成了 MySQL 软件，Premium: 操作数据的软件，数据库管理软件

## 重点了解

增

```bash
# 增加一条数据
insert into users (username, password) values ('ifer', '123');
```

删

```bash
# 删除 id 为 1 那一条
delete from users where id=1;
```

改

```bash
# 修改 id 为 1 的那一条数据的用户名和密码
update users set username='elser', password='xxxxxx' where id=1;
```

查

```bash
select * from users;
```

## 连接并操作数据库

```js
// 导入 mysql 模块
const mysql = require('mysql');
// 创建一个数据链接对象
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库的 IP 地址
    user: 'root', // 登录数据库的账号
    password: 'admin123', // 登录数据库的密码
    database: 'my_db_01', // 指定要操作哪个数据库
});

// 测试一下
const sqlStr = 'select * from users';
db.query(sqlStr, (err, results) => {
    if (err) return console.log(err.message);
    console.log(results);
});
```