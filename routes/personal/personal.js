/**
 * 后台账户管理
 */
const express = require('express')
const auth = require('../../middle/auth')
const User = require('../../model/user')
const goods = require('../../middle/goods')
const category = require('../../middle/category')

const personalApp = express()

personalApp.use(auth.getUser)

//显示账户管理页面
personalApp.get('/',(req, res) => {
    res.render('personal/personal', { users: req.users})
})
//实现修改操作
personalApp.post('/update',(req,res,next) => {
    let { username, password,id,image } = req.body
    let info = {
        username: username,
        password: password,
        photo: req.uploadUrl ? req.uploadUrl : image,
        id: id
    }
    User.update(info).then(results => {
        if (results) {
            res.render('login',{msg:'修改成功！请重新登录'})
        }else{
            res.render('login',{msg:'修改失败！'})
        }
    }).catch(err => {
        next(err)
    })
})

// 加载列表页
personalApp.get('/goods', goods.getCount, (req, res, next) => {
    let { goodsCount } = req

    let size = 3 // 每页显示3条
    req.page = {}
    req.page.count = goodsCount
    req.page.total = Math.ceil(req.page.count / size)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p

    res.start = (req.page.p - 1) * size
    res.size = size

    next()

}, [goods.getPage, category.getList], (req, res) => {
    let { users, pageList, page, categorys } = req
    let { category_id} = req.query
    page.list = pageList

    res.render('personal/goods', { users: users, page: page, categorys: categorys, category_id: category_id})
})

// 显示添加博文页
personalApp.get('/goods/add', category.getList, (req, res) => {
    let {categorys } = req
    let users = req.users
    res.render('personal/add', {categorys: categorys, code: '' ,users:users})
})


// 添加文章
personalApp.post('/goods/add', [goods.add, category.getList], (req, res) => {
    let {categorys } = req
    let users = req.users
    if (req.insertId) {
        res.render('personal/add', {categorys: categorys, code: 1 ,users:users})
    } else {
        res.render('personal/add', {categorys: categorys, code: 2 ,users:users})
    }
})

// 删除文章
personalApp.get('/goods/del', goods.del, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

// 文章编辑
personalApp.get('/goods/edit/:id', [category.getList, goods.getGoodsById], (req, res) => {
    let {categorys,goods_id} = req
    let users = req.users
    res.render('personal/edit', {categorys: categorys, goods_id: goods_id, code: '', users:users})
})

personalApp.post('/goods/edit', goods.edit, (req, res) => {
    if (req.affectedRows > 0) {
        res.render('personal/alert', { code: true, title: '成功提示', message: '商品编辑成功', url: '/personal/goods' })
    } else {
        res.render('personal/alert', { code: true, title: '失败提示', message: '商品编辑失败', url: '/personal/goods/edit/' + req.body.id })
    }
})

module.exports = personalApp