const express = require('express')
const app = express()
//导入路由模块
const router = require('./T03.router')

//注册路由模块

app.use(router)

app.listen(80, () => {
  console.log('http:127.0.0.1')
})
