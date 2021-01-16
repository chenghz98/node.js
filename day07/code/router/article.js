const express = require('express')
const multer = require('multer')
const path = require('path')
const expressJoi = require('@escook/express-joi')
const router = express.Router()

const { add_article_schema } = require('../schema/article')

const upload = multer({ dest: path.join(__dirname, '../uploads') })

const article_handler = require('../router_handler/article')
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

module.exports = router
