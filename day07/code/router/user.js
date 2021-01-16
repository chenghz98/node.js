const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()

const userHandler = require('../router_handler/user')
const { reg_login_schema } = require('../schema/user')

router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router
