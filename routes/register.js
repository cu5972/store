/**
 * 注册子应用
 */
const express = require('express')
const User = require('../model/user')


//注册子应用
const registerApp = express()

//加载注册页面
registerApp.get('/',(req,res)=>{
    res.render('register')
})

//注册操作
registerApp.post('/',(req,res,next) => {
    let {username,password,status} = req.body
    let info = {
        username:username,
        password:password,
        photo:req.uploadUrl,
        status:status
    }
    User.register(info).then(results=>{
        if (results) {
            res.render('login',{msg:'注册成功'})
            next()
        }
    }).catch(err=>{
        next(err)
    })
    
})


module.exports = registerApp
