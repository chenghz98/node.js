## NodeJS 是什么

NodeJS 是一个基于 Chrome V8 引擎的运行环境（软件）

## 如何查看 Node 版本（如何检测是否安装成功）

```bash
# 搜索电脑上的 powershell，输入 node -v，如果说能有版本号出来，证明 node 安装成功了

# 搜索 cmd 也 ok，然后输入 node -v 命令

# Win + r，输入 cmd，也能调出命令行窗口

# Win + r，输入 powershell，也能调出 powershell

# 通过 Git bash，输入 node -v 也可以查看 node 版本

# shift + 鼠标右键，点击【在此次打开 powershell 窗口】，输入 node -v

# Vscode，按 Ctrl + j，也能调出命令行窗口，输入 node -v 查看版本
```

```bash
# 一般查看某个的版本号就下面三个命令
xxx -v
xxx --version
xxx -V
```

```bash
# node --help 查看 Node 帮助手册
```

```bash
# 命令行窗口里面可以通过鼠标右键进行粘贴和复制
```

小技巧：windows 上面有人喜欢用第三方的命令行工具，例如 cmder

## 把【文件夹目录】作为【命令行目录】的几种方法

```bash
#1 cd 目录

#2 选中文件夹的目录，输入 cmd 命令

#3 Git bash Here

#4 先进到文件夹目录，在当前目录下 Shift + 鼠标右键，点击在此处打开 PowerShell
```

## 常见的终端命令

1\. 使用 `↑` 键，可以快速定位到上一次执行的命令

2\. 使用 `tab` 键，能够快速补全路径

3\. 使用 `esc` 键，能够快速清空当前已输入的命令

4\. 输入 `cls`、`clear`、`Ctrl + L` 命令，可以清空终端

5\. `ls`、`dir`，查看当前目录的文件信息

6\. `mkdir test`，创建 test 目录

7\. `touch test.js`，创建 test.js 文件

8\. `cd ..`，可以倒退一层目录

9\. `cat test.js`，可以直接在命令行查看 test.js 中的代码

10\. `ctrl + a` 快速到行首，`ctrl + e` 快速到行尾


## fs.readFile

```js
// 引入 fs 内置模块
const fs = require('fs');

let str = 'h';

// 路径、编码、回调函数（错误对象、数据），这个方法是异步的
fs.readFile('./files/1.txt', 'utf8', (err, data) => {
    // 如果 err 存在，为真，说明读取失败，就打印失败信息，并且后面的代码也没必要再执行了
    if (err) return console.log('读取失败', err);
    // 走到这里代表读取成功，直接打印读取的数据
    console.log(data);
    str = data;
});

console.log(str); // 'h'，因为 fs.readFile 这个方法是异步的
```

## fs.writeFile

```js
const fs = require('fs');

// 路径、内容、回调函数
fs.writeFile('./files/3.txt', 'ok123', (err) => {
    // 如果说有错误，说明写入失败，后面代码也没必要再执行了
    if (err) return console.log('文件写入失败！' + err.message);
    // 写入成功给一个提示
    console.log('文件写入成功！');
});
```

## 加工成绩

```js
const fs = require('fs');

// 1. 读
fs.readFile('./成绩.txt', 'utf8', (err, dataStr) => {
    if (err) return console.log('读取文件失败！' + err.message);
    // 2. 加工
    /* const arrOld = dataStr.split(' ');
    const arrNew = [];
    arrOld.forEach((item) => {
        arrNew.push(item.replace('=', '：'));
    });
    const newStr = arrNew.join('\r\n'); */

    // const newStr = dataStr.replace(/=/g, ':').replace(/\s/g, '\n');
    // 颠倒顺序
    // const newStr = dataStr.replace(/\s/g, '\n').replace(/=/g, ': ');

    // 我确实想把空格替换成 \n，但是冒号后面的空格我不想替换
    // (?<!:)\s 不能是冒号后面的\s
    const newStr = dataStr.replace(/=/g, ': ').replace(/(?<!:)\s/g, '\n');

    // 3. 把加工好的结果写入新文件
    fs.writeFile('./files/成绩-ok.txt', newStr, (err) => {
        if (err) return console.log('写入文件失败！' + err.message);
        console.log('成绩写入成功！');
    });
});
```

## 提取文件

```js
const fs = require('fs');
const path = require('path');

const regStyle = /<style>([\s\S]*)<\/style>/;
const regScript = /<script>([\s\S]*)<\/script>/;

const source = path.join(__dirname, 'index.html');

// #1 读取文件
fs.readFile(source, 'utf8', (err, dataStr) => {
    if (err) return console.log('读取HTML文件失败！' + err.message);
    const targetCss = path.join(__dirname, './clock/index.css');
    const targetJs = path.join(__dirname, './clock/index.js');
    resolve(dataStr, regStyle, targetCss, 'CSS');
    resolve(dataStr, regScript, targetJs, 'JS');
    // 解析 HTML
    resolveHTML(dataStr);
});

function resolve(htmlStr, reg, target, type) {
    // #2 提取文件
    const newCSS = reg.exec(htmlStr)[1]; // 代表第一个分组

    // #3 写入文件
    fs.writeFile(target, newCSS, err => {
        if (err) return console.log('写入'+ type +'文件失败！' + err.message);
        console.log('写入'+ type +'文件成功！');
    });
}

function resolveHTML(htmlStr) {
    const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>');
    const targetHtml = path.join(__dirname, './clock/index.html');
    fs.writeFile(targetHtml, newHTML, err => {
        if (err) return console.log('写入 HTML 文件失败！' + err.message);
        console.log('写入 HTML 页面成功！');
    });
}
```

## 分组

```js
// 正则匹配讲的太浅了，小括号写不写的区别重点讲一下吧，以及那里写0，1的区别。
const str = 'heelllo';
const reg = /h(e*)(l*)o/

const result = reg.exec(str); // 第一个代表大正则匹配到的内容、第二个代表第 1 个分组的内容，第三个代表第 2 个分组的内容...

console.log(result);
```