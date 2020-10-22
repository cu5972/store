const Goods = require('../model/goods')

/**
 * 商品中间件
 */
module.exports = {
    /**
     * 获取最新上传的商品
     */
    getNewGoods: (req,res,next) => {
        Goods.getNewGoods().then(results => {
            req.new_goods = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取折扣的商品
     */
    getDiscountGoods: (req,res,next) => {
        Goods.getDiscountGoods().then(results => {
            req.discount_goods = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取店长推荐的商品（销量最高）
     */
    getSaleGoods: (req,res,next) => {
        Goods.getSaleGoods().then(results => {
            req.sale_goods = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定导航下的文章列表
     */
    getListByCategoryId: (req,res,next) => {
        let id = req.params.id
        Goods.getListByCategoryId(id).then(results => {
            req.goods_by = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 查询商品列表
     */
    getListByKeyword: (req,res,next) => {
        let keyword = req.query.keyword
        let category_id = req.query.category_id
        Goods.getListByKeyword(category_id,keyword).then(results => {
            req.goods_select = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定商品的详情
     */
    getGoodsById: (req,res,next) => {
        let id = req.params.id
        Goods.getGoodsById(id).then(results => {
            req.goods_id = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取总商品数
     */
    getCount: (req, res, next) => {
        Goods.getCount(req.query.category_id,req.session.user.id).then(results => {
            req.goodsCount = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定页商品列表
     */
    getPage: (req, res, next) => {
        Goods.getPage(res.start, res.size, req.query.category_id, req.session.user.id).then(results => {
            req.pageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加商品
     */
    add: (req, res, next) => {
        let { s_id,name, d_price, count,category_id,time,title } = req.body
        let goods = {
            s_id:s_id,
            name: name,
            d_price: d_price,
            count: count,
            category_id: category_id,
            image: req.uploadUrl ? req.uploadUrl : null,
            time:time,
            title:title
        }
        Goods.add(goods).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 删除商品
     */
    del: (req, res, next) => {
        let { id } = req.query
        Goods.del(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 编辑商品
     */
    edit: (req, res, next) => {
        let {id,name, category_id,image,price,count,d_price,title } = req.body
        let goods = {
            name: name,
            price: price,
            category_id: category_id,
            image: req.uploadUrl ? req.uploadUrl : image,
            count:count,
            id: id,
            d_price:d_price,
            title:title
        }
        Goods.edit(goods).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}