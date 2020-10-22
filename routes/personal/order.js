/**
 * 后台订单管理
 */
const express = require('express')
const order = require('../../middle/order')
const category = require('../../middle/category')
const auth = require('../../middle/auth')

const orderApp = express()

//将购物车的内容添加进订单
orderApp.post('/',order.addOrder,(req,res)=>{
    res.render('personal/alert', { code: true, title: '成功提示', message: '购买成功', url: '/order/list' })
})

//显示订单
orderApp.get('/list',[order.getOrder,category.getList,auth.getUser],(req,res)=>{
    let {users,categorys,orders} = req
    res.render('personal/order', {categorys: categorys, orders: orders, users:users})
})

// 删除订单
orderApp.get('/del', order.delOrder, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

//修改订单状态
orderApp.post('/edit', order.UpdateOrder, (req, res) => {
    if (req.affectedRows > 0) {
        res.render('personal/alert', { code: true, title: '成功提示', message: '订单状态修改成功', url: '/order/list'})
    } else {
        res.render('personal/alert', { code: true, title: '失败提示', message: '订单状态修改失败', url: '/order/list'})
    }
})
module.exports = orderApp