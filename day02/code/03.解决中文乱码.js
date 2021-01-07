const http = require('http')
const server = http.createServer()
server.on('request', function (req, res) {
  const str = `你请求的url地址是${req.url},你请求的method类型 ${req.method}`
  res.setHeader('Content-type', 'text/html;charset="utf-8"')
  res.end(str)
})
server.listen(3210, function () {
  console.log('server running at http://127.0.0.1:3210')
})
