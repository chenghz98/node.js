const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')
const config = require('../config')

exports.regUser = (req, res) => {
  const userinfo = req.body
  // 1. 检测是否为空
  // if (!userinfo.username || !userinfo.password) {
  //     /* return res.send({
  //         status: 1,
  //         message: '用户名或密码不能为空！'
  //     }); */
  //     return res.cc('用户名或密码不能为空！');
  // }

  // 2. 检测用户名是否被占用
  const sql = `select * from ev_users where username=?`
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) {
      /* return res.send({
                status: 1,
                message: err.message
            }); */
      return res.cc(err.message)
    }
    if (results.length > 0) {
      /* return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名！'
            }); */
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // 3. 加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 4. 插入
    const sql = 'insert into ev_users set ?'
    db.query(
      sql,
      {
        username: userinfo.username,
        password: userinfo.password
      },
      (err, results) => {
        if (err) {
          /* return res.send({
                    status: 1,
                    message: err.message
                }); */
          return res.cc(err.message)
        }
        if (results.affectedRows !== 1) {
          /* return res.send({
                    status: 1,
                    message: '注册用户失败，请稍后重试！'
                }); */
          return res.cc('注册用户失败，请稍后重试！')
        }
        /* res.send({
                status: 0,
                message: '注册成功！'
            }); */
        res.cc('注册成功', 0)
      }
    )
  })
}

exports.login = (req, res) => {
  // 1. 校验用户信息
  const userinfo = req.body
  // 2. 查询此用户名是否存在
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户名不存在，登录失败！')
    // 3. 查询到了此用户，就比对密码
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {
      return res.cc('密码错误，登录失败！')
    }
    // 4. 密码正确，生成 token
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })

    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr
    })
  })
}
