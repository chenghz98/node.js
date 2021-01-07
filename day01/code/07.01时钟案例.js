const fs = require('fs')
const path = require('path')

const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/
const source = path.join(__dirname, './index.html')

fs.readFile(source, 'utf8', (err, data) => {
  if (err) return console.log('读取HTML文件失败' + err.message)
  // console.log('读取数据成功')
  resolveCSS(data)
  resolveJS(data)
  resolveHTML(data)
})
function resolveCSS(htmlStr) {
  // console.log(regStyle.exec(htmlStr))
  const newCSS = regStyle.exec(htmlStr)[1]

  fs.writeFile(path.join(__dirname, './clock/index01.css'), newCSS, (err) => {
    if (err) return console.log('写入css文件失败' + err.message)

    console.log('写入数据成功')
  })
}

function resolveJS(htmlStr) {
  const newJS = regScript.exec(htmlStr)[1]

  fs.writeFile(path.join(__dirname, './clock/index01.js'), newJS, (err) => {
    if (err) return console.log('写入JS文件失败' + err.message)

    console.log('写入数据成功')
  })
}

function resolveHTML(htmlStr) {
  const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index01.css">').replace(regScript, '<script src="./index01.js"></script>')

  fs.writeFile(path.join(__dirname, './clock/index01.html'), newHTML, (err) => {
    if (err) return console.log('写入JS文件失败' + err.message)

    console.log('写入数据成功')
  })
}
