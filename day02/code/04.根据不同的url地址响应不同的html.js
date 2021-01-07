const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  let content = `<h1>Not Find 404<h1>`

  if (req.url === '/' || req.url === '/index.html') {
    content = `<h1>首页<h1>`
  } else if (req.url === '/about.html') {
    content = `<h1>关于<h1>`
  }

  res.setHeader('Content-type', 'text/html;charset="utf-8"')
  res.end(content)
})
server.listen(3210, function () {
  console.log('server running at http://127.0.0.1:3210')
})
