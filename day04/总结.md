## 后端获取 GET 请求数据的两种方式

1\. 前端通过 ? 号传递，例如 `http://127.0.0.1/user?age=18`，后端通过 req.query 获取

2\. 前端通过 `http://127.0.0.1/user/18`，后端要下面写法

```js
app.get('/user/:age', (req, res) => {
    res.send(req.params)
});
```

==理解下面的写法==：是请求地址还是动态参数，取决于后端的路由怎么写

```js
// http://127.0.0.1/user/8888/age
// 这个地址可以匹配，8888 就是查询参数
app.get('/user/:id/age', (req, res) => {
    res.send(req.params)
});
```

## 对外开放静态资源访问

```js
// 第一个 /clock 代表虚拟路径，要以 / 开头
// 第二个 clock 代表静态资源的目录，不要以 / 开头
app.use('/clock', express.static('clock'));
```

## 想快速把某个目录里面的资源以服务器环境访问

```bash
npm i http-server -g # 全局安装这个包

http-server # 在需要被访问的目录执行这个命令
```

```bash
npm i serve -g # 全局安装这个包

serve # 在需要被访问的目录执行这个命令
```

```bash
npm uninstall aaa -g # 卸载某个全局包
```

## 路由

前端请求和后端响应资源的一种对应关系

```js
// 当前端以 GET 方式请求 /user 这个地址时，就会响应 'ok'，这就是路由
app.get('/user', (req, res) => {
    res.send('ok')
});
```

## 模块化路由

要通过 node 执行的文件

```js
// app.js
const express = require('express');

const app = express();

// 导入并注册路由模块
app.use(require('./user.js'));
// 下面写法和上面等价的
// 匹配以 / 开头的请求地址，匹配成功之后就继续去 user.js 里面继续拼接路由地址
// app.use('/', require('./user.js'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

路由模块

```js
// user.js
// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()

// 3. 挂载具体的路由
router.get('/user/list', (req, res) => {
    res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
    res.send('Add new user.')
})

// 4. 向外导出路由对象
module.exports = router
```

## 中间件

客户端发起请求到服务响应内容之间的处理过程，本质上来说就是一个函数

1\. 可以对请求信息统一处理并挂载，方便后续的中间件或路由处理函数使用

模拟了 Express 的 req.query 属性

```js
const express = require('express')
const app = express()
const url = require('url');

const mw = (req, res, next) => {
    // 在中间的 req 上面挂载的东西，后面的路由处理函数也是可以通过 req 直接使用的！
    const { query } = url.parse(req.url, true);
    req.query2 = query;
    // 放行，继续往下匹配
    next();
};
// 可以使用 app.use 定义一个全局生效中间件，所谓全局生效的中间就是可以匹配任意的【请求地址】和【请求方式】
app.use(mw);

app.get('/', (req, res) => {
    res.send('Home page.')
});
app.get('/user', (req, res) => {
    res.send(req.query2)
});

app.listen(80, () => {
    console.log('http://127.0.0.1')
});
```

利用中间件做了请求日志

```js
const express = require('express')
const app = express()

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
    // 获取到请求到达服务器的时间
    const time = Date.now()
    // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
    req.info = `请求的时间${time}，请求的方式${req.method}，请求的地址${req.url}`;
    console.log(req.info);
    next()
});

app.get('/', (req, res) => {
    res.send('Home page.' + req.startTime)
});
app.get('/user', (req, res) => {
    res.send('User page.' + req.startTime)
});

app.listen(80, () => {
    console.log('http://127.0.0.1')
});
```

2\. 网站维护公告

```js
// 拦截了所有请求地址和请求方式，注意是写在所有路由的【最前面】
app.use((req, res, next) => {
    res.send('<h1 style="text-align:center; margin-top: 100px;">网站正在维护中...</h1>');
});
```

3\. 网站的 404 页面（兜底的一个处理）

```js
// 注意写在所有路由的【最后面】
// 做网站的 404 页面，如果说前面所有路由没有命中，那一定会走这里
app.use((req, res) => {
    res.send('<h1 style="text-align:center; margin-top: 100px;">很抱歉，您要访问的页面不存在！</h1>');
});
```

4\. 错误处理

```js
app.get('/', (req, res) => {
    // 1.1 人为的制造错误
    throw new Error('服务器内部发生了错误！');
    // throw Error('服务器内部发生了错误！');
    // throw '服务器内部发生了错误！'; // 注意这种写法确实也能模拟错误并抛出，但是抛出的错误是一个字符串，不再是一个错误对象了
    res.send('Home page.');
});

// 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
// 防止程序的崩溃、可以做一些错误收集（错误日志）
app.use((err, req, res, next) => {
    console.log('发生了错误！' + err.message);
    res.send('Error：' + err.message);
});
```

## 中间件的分类

1\. 应用级别的中间件

```js
const express = require('express');
const app = express();
// 挂载到 app 上面的中间件
```

2\. 路由级别中间件

```js
const express = require('express');
const router = express.Router();
// 挂载到 router 对象上面的中间件
```

3\. 错误处理中间件

4\. 内置的中间件

```js
const express = require('express');
const app = express();
// 静态资源访问
app.use(express.static('public'));
// 处理前端传递 application/json 这样一种数据格式的，写了这句话，后续的路由处理函数里面自动会多了一个 req.body
app.use(express.json());
// 处理前端传递 application/x-www-form-urlencoded 这样一种数据格式的，后续所有的路由处理函数里面自动会多了一个 req.body

// extended 指定 false 会使用内置的 querystring 模块解析数据
// extended 指定 true 会使用第三方的 qs 模块解析数据
app.use(express.urlencoded({ extended: false }));
```

5\. 第三方中间件

解析 POST 数据

```js
body-parser // 可以解析 POST 请求传递的数据，Express 新版本已经内置了，了解就行了
```

请求日志

```js
// 写到所有路由的前面
const morgan = require('morgan');
app.use(morgan('tiny'));
```

利用第三方中间件`cors`跨域（后端做的事）

```js
// 后端代码
const express = require('express');
const app = express()
const cors = require('cors');
// 允许跨域
app.use(cors());

app.get('/user', (req, res) => {
    res.send({
        name: 'ifer',
        age: 18
    })
});

app.listen(80, () => {
    console.log('http://127.0.0.1')
});
```

```js
// 前端代码
$.ajax({
    url: 'http://127.0.0.1/user',
    success(res) {
        console.log(res);
    }
});
```

## 了解 body-parser 的封装

```js
const express = require('express');
const app = express();

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));

const bodyParser = require('./body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/user', (req, res) => {
    res.send(req.body);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

```js
// body-parser.js
const querystring = require('querystring');

module.exports = {
    urlencoded: obj => (req, res, next) => {
        // 往 req.body 上面挂载一下解析之后的结果
        // req.body = '解析之后的结果';
        // 想接受前端的 POST 请求的数据
        // data 是一个监听传输过程的一个事件
        let str = '';
        req.on('data', chunk => {
            // chunk 是传输的数据片段
            str += chunk;
        });
        // end 代表传递完毕会触发的事件
        req.on('end', () => {
            if (obj.extended) {
                // 用第三方的 qs 模块解析
            } else {
                // console.log(str); // name=ifer&age=18 => { name: 'ifer', age: 18 }
                // console.log(querystring.parse(str));

                // url.parse => /user?name=ifer&age=18
                // querystring.parse => name=ifer&age=18
                
                req.body = querystring.parse(str);
            }
            // 放行
            next();
        });
    }
};
```