const express = require('express')

const router = express.Router()

router.get('/get', (req, res) => {
  const query = req.query
  res.send({
    status: 0,
    msg: 'GET 请求成功',
    data: query
  })
})

router.post('/post', (req, res) => {
  res.send({
    status: 0,
    msg: 'post 请求成功',
    data: req.body
  })
})

module.exports = router
