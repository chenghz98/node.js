//导入express
const express = require('express')
//创建路由对象
const router = express.Router()

// 挂载具体路由
router.get('/user/list', (req, res) => {
  res.send('show your list')
})

router.post('/user/add', (req, res) => {
  res.send('add your list')
})

//向外导出路由对象
module.exports = router
