const http = require('http')
const server = http.createServer()
server.on('request', function (req, res) {
  const str = `Your request url is ${req.url},Your request method is ${req.method}`
  res.end(str)
})
server.listen(3210, function () {
  console.log('server running at http://127.0.0.1:3210')
})
