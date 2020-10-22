/**
 * 订单模型
 */

module.exports = class User extends require('./model'){
    /**
     * 修改购物车表
     * @param {list} info 购物车信息
     */
    static UpdateCar(info){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE shop_car SET `count`=? where `index`=?'
            this.query(sql,[info.count,info.index]).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('修改购物车表：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 获取购物车表
     * @param {int} index 购物车下标
     */
    static getCarByIndex(index){
        return new Promise((resolve,reject)=>{
            let sql = 'SELECT * FROM shop_car where `index`=?'
            this.query(sql,index).then(results =>{
                resolve(results[0])
            }).catch(err =>{
                console.log('获取购物车表：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 添加进订单表
     * @param {list} info 商品信息
     */
    static addOrder(info){
        return new Promise((resolve,reject)=>{
            let sql = 'INSERT INTO `order` SET ?'
            this.query(sql,info).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('添加进订单表：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 删除购物车的内容
     * @param {int} index 商品下标
     */
    static delCar(index){
        return new Promise((resolve,reject)=>{
            let sql = 'DELETE FROM shop_car WHERE `index` = ?'
            this.query(sql,index).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('删除购物车的内容：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 获取用户订单信息
     * @param {list} info 商品信息
     */
    static getOrder(status,id){
        return new Promise((resolve,reject)=>{
            if(status==1){
                let sql = 'SELECT id,name,image,address,user_id,status,count,s_id,(price*count) as price FROM `order` where `user_id`=?'
                this.query(sql,id).then(results =>{
                    resolve(results)
                }).catch(err =>{
                    console.log('获取用户订单信息：'+ err.message)
                    reject(err)
                })
            }else{
                let sql = 'SELECT id,name,image,address,user_id,status,count,s_id,(price*count) as price FROM `order` where `s_id`=?'
                this.query(sql,id).then(results =>{
                    resolve(results)
                }).catch(err =>{
                    console.log('获取用户订单信息：'+ err.message)
                    reject(err)
                })
            }          
        })
    }
    /**
     * 删除订单的内容
     * @param {int} id 商品下标
     */
    static delOrder(id){
        return new Promise((resolve,reject)=>{
            let sql = 'DELETE FROM `order` WHERE `id` = ?'
            this.query(sql,id).then(results =>{
                resolve(results.affectedRows)
            }).catch(err =>{
                console.log('删除订单的内容：'+ err.message)
                reject(err)
            })
        })
    }
    /**
     * 修改订单状态
     * @param {list} info 订单信息
     */
    static UpdateOrder(info){
        return new Promise((resolve,reject)=>{
            let sql = 'UPDATE `order` SET `status`=? where `id`=?'
            this.query(sql,[info.status,info.id]).then(results =>{
                resolve(results.affectedRows)
            }).catch(err =>{
                console.log('修改购物车表：'+ err.message)
                reject(err)
            })
        })
    }
}