/**
 * 首页子应用（首页路由）
 */

const express = require('express')
const goods = require('../middle/goods')
const category = require('../middle/category')
const auth = require('../middle/auth')
const shop_car = require('../middle/shop_car')

//首页子应用
const indexApp = express()

indexApp.use(auth.getUser)

//加载首页页面
indexApp.get('/',[goods.getNewGoods,goods.getDiscountGoods,goods.getSaleGoods,category.getList,shop_car.getCarRows],(req,res)=>{
  let {new_goods,discount_goods,sale_goods,categorys,users,car_rows} = req
  res.render('index',{new_goods:new_goods,discount_goods:discount_goods,sale_goods:sale_goods,categorys:categorys,users:users,car_rows:car_rows})
})

module.exports = indexApp