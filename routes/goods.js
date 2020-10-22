/**
 * 商品子应用
 */
const express = require('express')
const goods = require('../middle/goods')
const category = require('../middle/category')
const auth = require('../middle/auth')
const shop_car = require('../middle/shop_car')

//商品子应用
const goodsApp = express()

goodsApp.use(auth.getUser)

//商品列表页
goodsApp.get('/list/:id',[goods.getListByCategoryId, category.getList, category.getCategoryById,shop_car.getCarRows], (req,res) =>{
    let {goods_by,categorys,category,users,car_rows} = req
    res.render('list',{goods_by: goods_by, categorys: categorys, category: category,users:users,car_rows:car_rows})
})

//商品详情页
goodsApp.get('/:id',[category.getList,goods.getGoodsById,shop_car.getCarRows],(req,res)=>{
    let {categorys,goods_id,users,car_rows} = req
    res.render('single',{categorys:categorys,goods_id:goods_id,users:users,car_rows:car_rows})
})

module.exports = goodsApp