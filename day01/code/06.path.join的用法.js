const path = require('path')
const fs = require('fs')

fs.readFile(path.join(__dirname, './files/11.txt'), 'utf8', function (err, data) {
  if (err) return console.log('读取失败', err.message)

  console.log(data)
})
