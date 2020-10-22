/**
 * 购物车数据模型
 */
module.exports = class Shop_car extends require('./model') {
    /**
     * 商品添加进购物车
     */
    static addGoods(info){
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO shop_car SET ?'
            this.query(sql,info).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`商品添加进购物车：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取购物车
     */
    static getCar(user_id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM shop_car where user_id=?'
            this.query(sql,user_id).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取购物车：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取购物车的行数
     */
    static getCarRows(user_id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT count(1) AS rows FROM shop_car WHERE user_id = ?'
            this.query(sql,user_id).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取最新上传的商品：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 计算总价格
     */
    static getTongji(user_id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT SUM(price*count) AS tongji FROM shop_car WHERE user_id = ?'
            this.query(sql,user_id).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取最新上传的商品：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 删除购物车一行
     * @param {integer} index 购物车中商品的下标
     */
    static del(index) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM shop_car WHERE `index` = ?'
            this.query(sql, index).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除购物车一行：${err.message}`)
                reject(err)
            })
        })
    }
}