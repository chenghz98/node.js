const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()

const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
const userinfo_handler = require('../router_handler/userinfo')
// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router
