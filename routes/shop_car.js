/**
 * 购物车子应用
 */
const express = require('express')
const category = require('../middle/category')
const shop_car = require('../middle/shop_car')
const auth = require('../middle/auth')

//商品子应用
const shop_carApp = express()

shop_carApp.use(auth.getUser)

//显示购物车
shop_carApp.get('/',[shop_car.getCar, category.getList,shop_car.getCarRows,shop_car.getTongji],(req,res)=>{
    let {car_goods,categorys,users,car_rows,tongji} = req
    res.render('shop_cat',{car_goods:car_goods, categorys:categorys, users:users,car_rows:car_rows,tongji:tongji})
})

//添加到购物车
shop_carApp.post('/',[shop_car.addGoods,shop_car.getCar, category.getList,shop_car.getCarRows,shop_car.getTongji],(req,res)=>{
    let {car_goods,categorys,users,car_rows,tongji} = req
    res.render('shop_cat',{car_goods:car_goods, categorys:categorys, users:users,car_rows:car_rows,tongji:tongji})
})

//删除购物车的一行
shop_carApp.get('/del', shop_car.del, (req, res) => {
    if (req.carRows > 0) {
        res.json({ code: 1, msg: '删除成功' })
    } else {
        res.json({ code: 2, msg: '删除失败' })
    }
})

module.exports = shop_carApp