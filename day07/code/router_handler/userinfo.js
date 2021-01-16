const bcrypt = require('bcryptjs')
const db = require('../db')

// 获取用户信息
exports.getUserInfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`

  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)

    if (results.length !== 1) return res.cc('获取用户信息失败！')

    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: results[0]
    })
  })
}

// 更新用户信息
exports.updateUserInfo = (req, res) => {
  // 如果只是更新当前用户信息，id 不需要传递，可以通过 req.user.id 进行获取
  // 但更新其他用户信息 id 就需要传递啦
  const sql = `update ev_users set ? where id=?`

  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('修改用户信息失败！')

    res.cc('修改用户信息成功', 0)
  })
}

// 更改密码
exports.updatePassword = (req, res) => {
  const sql = 'select * from ev_users where id=?'
  // 根据当前用户 id 查询密码
  db.query(sql, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在！')

    // 用旧密码和数据库查询出来的密码进行比较
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    // 如果不匹配，则提示错误
    if (!compareResult) return res.cc('原密码错误')

    // 更新密码的 sql
    const sql = `update ev_users set password=? where id=?`
    // 对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    db.query(sql, [newPwd, req.user.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新密码失败！')

      res.cc('更新密码成功！', 0)
    })
  })
}

// 更新头像
exports.updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic=? where id=?`

  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('更新头像失败！')

    return res.cc('更新头像成功！', 0)
  })
}
