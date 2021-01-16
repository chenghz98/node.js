const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
const app = express()
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(cors())
app.use(
  express.urlencoded({
    extended: false
  })
)

app.use('/uploads', express.static('./uploads'))

// 统一响应
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 解析 token
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 注册/登录
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 用户管理
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
// 文章管理
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

// 发布文章
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // token 解析失败
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})

app.listen(3007, () => console.log('api server running at http://127.0.0.1:3007'))
