## 注册

1\. 校验数据的合法性

2\. 查询用户名是否存在

3\. 如果用户名不存在，对密码进行加密

4\. 插入用户

## 校验数据包的使用

```js
// #1 引入包
const joi = require('@hapi/joi')
const expressJoi = require('@escook/express-joi')

// #2 定义校验规则
const regular = {
    body: {
        username: joi.string().alphanum().min(1).max(10).required(),
        password: joi.string().pattern(/^[\S]{6,12}$/).required(),
    }
}

// #3 进行校验，根据传递过来 req.body 数据和定义好的规则 regular 进行校验
router.post('/reguser', expressJoi(regular), userHandler.regUser)
```

## 登录

1\. 校验

2\. 查询用户名是否存在

3\. 如果用户存在，判断密码的正确性（用传递过来的密码和数据库查询出来的密码进行比较）

4\. 密码比对成功，根据用户信息生成 TOEKN，并响应给前端