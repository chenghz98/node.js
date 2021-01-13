// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: 'localhost', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: 'root', // 登录数据库的密码
  database: 'my_db_01' // 指定要操作哪个数据库
})

/* // 查询语句 模块能否正常工作
db.query('select * from users', (err, results) => {
  // mysql 模块工作期间报错了

  if (err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  console.log(results)
}) */

//插入数据
/* const user = { username: 'wang', password: '12wang' }
const sqlStr = 'insert into users(username,password) values(?,?)'
db.query(sqlStr, [user.username, user.password], (err, results) => {
  // mysql 模块工作期间报错了

  if (err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  if (results.affectedRows === 1) {
    console.log('插入数据成功')
  }
}) */

/* // 插入的便捷写法
const user = { username: '1wa', password: '12wang' }
const sqlStr = 'insert into users set ?'
db.query(sqlStr, user, (err, results) => {
  // mysql 模块工作期间报错了

  if (err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  if (results.affectedRows === 1) {
    console.log('插入数据成功')
  }
}) */

const user = { id: 6, username: '12zq', password: 'zq12' }

const sqlStr = `update users set ? where id=?`

db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  if (results.affectedRows === 1) {
    console.log('修改数据成功')
  }
})
