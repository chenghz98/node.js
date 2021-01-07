const fs = require('fs')
const path = require('path')

const regStyle = /<style>([\s\S]*)<\/style>/
const regScript = /<script>([\s\S]*)<\/script>/
const source = path.join(__dirname, './index.html')
fs.readFile(source, 'utf8', function (err, data) {
  if (err) return console.log('获取css样式失败' + err.message)

  resolveCSS(data)
  resolveJS(data)
  resolveHTMl(data)
})

function resolveCSS(htmlStr) {
  const newCss = regStyle.exec(htmlStr)[1]

  const targetCss = path.join(__dirname, './clock/index.css')

  fs.writeFile(targetCss, newCss, function (err) {
    if (err) return console.log('获取css样式失败' + err.message)
    console.log('写入样式成功')
  })
}
function resolveJS(htmlStr) {
  const newJS = regScript.exec(htmlStr)[1]

  const targetJS = path.join(__dirname, './clock/index.JS')

  fs.writeFile(targetJS, newJS, function (err) {
    if (err) return console.log('获取JS样式失败' + err.message)
    console.log('写入样式成功')
  })
}

function resolveHTMl(htmlStr) {
  const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>')
  const targetHtml = path.join(__dirname, './clock/index.html')
  fs.writeFile(targetHtml, newHTML, (err) => {
    if (err) return console.log('写入 HTML 文件失败！' + err.message)
    console.log('写入 HTML 页面成功！')
  })
}
