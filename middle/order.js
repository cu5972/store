const order = require('../model/order')

/**
 * 订单中间件
 */
module.exports = {
    /**
      * 将购物车的数据添加进订单
      */
    addOrder: (req,res,next) => {
        let {count,index,address,rows} = req.body
        let i=0
        if ((rows-1)==1) {
            let info = {
                count:count,
                index:index
            }
            order.UpdateCar(info).then(results=>{
                if(results.affectedRows<1){
                    console.log('购物车商品数量修改失败')
                    next()
                }else{
                    console.log('购物车商品数量修改成功')
                    next()
                }
            }).catch(err=>{
                next(err)
            })
            order.getCarByIndex(index).then(results=>{
                let info={
                    name:results.name,
                    image:results.image,
                    price:results.price,
                    address:address,
                    user_id:results.user_id,
                    status:'未发货',
                    count:results.count,
                    s_id:results.s_id
                }
                order.addOrder(info).then(results=>{
                    if(results.affectedRows<1){
                        console.log('订单增加失败')
                        next()
                    }else{
                        console.log('订单增加成功')
                        next()
                    }
                }).catch(err=>{
                    next(err)
                })
                next()
            }).catch(err=>{
                next(err)
            })
            order.delCar(index).then(results=>{
                next()
            }).catch(err=>{
                next(err)
            })
        }else{
            for (i=0;i<(rows-1);i++){
                let info = {
                    count:count[i],
                    index:index[i]
                }
                order.UpdateCar(info).then(results=>{
                    if(results.affectedRows<1){
                        console.log('购物车商品数量修改失败')
                        next()
                    }else{
                        console.log('购物车商品数量修改成功')
                        next()
                    }
                }).catch(err=>{
                    next(err)
                })
                order.getCarByIndex(index[i]).then(results=>{
                    let info={
                        name:results.name,
                        image:results.image,
                        price:results.price,
                        address:address,
                        user_id:results.user_id,
                        status:'未发货',
                        count:results.count,
                        s_id:results.s_id
                    }
                    order.addOrder(info).then(results=>{
                        if(results.affectedRows<1){
                            console.log('订单增加失败')
                            next()
                        }else{
                            console.log('订单增加成功')
                            next()
                        }
                    }).catch(err=>{
                        next(err)
                    })
                    next()
                }).catch(err=>{
                    next(err)
                })
                order.delCar(index[i]).then(results=>{
                    next()
                }).catch(err=>{
                    next(err)
                })
            }
        }   
    },
    /**
      * 将购物车的数据添加进订单
      */
    getOrder: (req,res,next) => {
        let status = req.session.user.status*1
        let id = req.session.user.id*1
        order.getOrder(status,id).then(results=>{
            req.orders = results
            next()
        }).catch(err=>{
            next(err)
        })
    },
    /**
     * 删除商品
     */
    delOrder: (req, res, next) => {
        let { id } = req.query
        order.delOrder(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 修改订单状态
     */
    UpdateOrder: (req, res, next) => {
        let {id,status } = req.body
        let info = {
            id:id*1,
            status:status
        }
        order.UpdateOrder(info).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}