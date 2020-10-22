const Shop_car = require('../model/shop_car')

/**
 * 购物车中间件
 */
module.exports = {
    /**
     * 商品添加进购物车
     */
    addGoods: (req,res,next) => {
        let { id,name, price, image, count,user_id,s_id } = req.body
        let info = {
            id:id,
            name: name,
            price: price,
            image: image,
            count: count,
            user_id:user_id,
            s_id:s_id
        }
        Shop_car.addGoods(info).then(results => {
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取购物车
     */
    getCar: (req,res,next) => {
        let user_id = 0
        if(req.session.user){
            user_id = req.session.user.id
        }
        Shop_car.getCar(user_id).then(results => {
            req.car_goods = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取购物车行数
     */
    getCarRows: (req,res,next) => {
        let user_id = 0
        if(req.session.user){
            user_id = req.session.user.id
        }
        Shop_car.getCarRows(user_id).then(results => {
            req.car_rows = results[0]
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取总价格
     */
    getTongji: (req,res,next) => {
        let user_id = 0
        if(req.session.user){
            user_id = req.session.user.id
        }
        Shop_car.getTongji(user_id).then(results => {
            req.tongji = results[0]
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除购物车一行
     */
    del: (req, res, next) => {
        let { index } = req.query
        Shop_car.del(index*1).then(results => {
            req.carRows = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}