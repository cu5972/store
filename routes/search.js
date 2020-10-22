/**
 * 搜索子应用
 */
const express = require('express')
const goods = require('../middle/goods')
const category = require('../middle/category')
const auth = require('../middle/auth')
const shop_car = require('../middle/shop_car')

//商品子应用
const searchApp = express()

searchApp.use(auth.getUser)

searchApp.get('/',[goods.getListByKeyword, category.getList,shop_car.getCarRows],(req,res)=>{
    let {goods_select,categorys,users,car_rows} = req
    res.render('search',{goods_select:goods_select, categorys:categorys, keyword:req.query.keyword,users:users,car_rows:car_rows})
})

module.exports = searchApp
