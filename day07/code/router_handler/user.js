const bcrypt = require('bcryptjs')
const db = require('../db')

exports.regUser = (req, res) => {
  const userinfo = req.body
  // 1. 检测是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: '用户名或密码不能为空！'
    })
  }

  // 2. 检测用户名是否被占用
  const sql = `select * from ev_users where username=?`
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) {
      return res.send({
        status: 1,
        message: err.message
      })
    }
    if (results.length > 0) {
      return res.send({
        status: 1,
        message: '用户名被占用，请更换其他用户名！'
      })
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
          return res.send({
            status: 1,
            message: err.message
          })
        }
        if (results.affectedRows !== 1) {
          return res.send({
            status: 1,
            message: '注册用户失败，请稍后重试！'
          })
        }
        res.send({
          status: 0,
          message: '注册成功！'
        })
      }
    )
  })
}

exports.login = (req, res) => {
  res.send('login ok')
}
