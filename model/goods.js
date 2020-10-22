/**
 * 商品数据模型
 */
module.exports = class Goods extends require('./model') {
    /**
     * 获取最新上传的商品
     */
    static getNewGoods(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name`,s_id,count,price,d_price,title,image,time,category_id FROM goods ORDER BY time DESC LIMIT 8'
            this.query(sql).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取最新上传的商品：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取折扣的商品
     */
    static getDiscountGoods(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name`,s_id,count,price,title,image,time,category_id,d_price,sale FROM goods ORDER BY (d_price-price)/d_price DESC LIMIT 8'
            this.query(sql).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取折扣的商品：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取店长推荐的商品（销量最高）
     */
    static getSaleGoods(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name`,s_id,count,price,title,image,time,category_id,d_price,sale FROM goods ORDER BY sale DESC LIMIT 8'
            this.query(sql).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取店长推荐的商品（销量最高）：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定导航下的商品列表
     * @param {int} id 导航编号
     */
    static getListByCategoryId(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name`,s_id,count,price,title,image,time,category_id,d_price,sale FROM goods WHERE category_id=?'
            this.query(sql,id).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取指定导航下的商品列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定关键词的商品列表（查询）
     * @param {int} id 栏目编号
     * @param {string} keyword 关键词
     */
    static getListByKeyword(category_id,keyword){
        return new Promise((resolve, reject) => {
            let sql = ''
            if (category_id==-1) {
                sql = 'SELECT id,`name`,s_id,count,price,title,image,time,category_id,d_price,sale FROM goods WHERE `name` LIKE ?'
                this.query(sql,`%${keyword}%`).then(results=>{
                    //交给中间器进行处理
                    resolve(results)
                }).catch(err=>{
                    console.log(`获取指定关键词的文章列表失败：${err.message}`)
                    reject(err)
                })
            } else {
                sql = 'SELECT id,`name`,s_id,count,price,title,image,time,category_id,d_price,sale FROM goods WHERE category_id=? AND `name` LIKE ?'
                this.query(sql,[category_id,`%${keyword}%`]).then(results=>{
                    //交给中间器进行处理
                    resolve(results)
                }).catch(err=>{
                    console.log(`获取指定关键词的文章列表失败：${err.message}`)
                    reject(err)
                })
            }
            
        })
    }
    /**
     * 获取指定指定商品的详情
     * @param {int} id 文章编号
     */
    static getGoodsById(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT a.id,a.`name`,a.s_id,a.count,a.price,a.title,a.image,a.time,a.category_id,a.d_price,a.sale,c.`c_name` FROM goods a,category c WHERE a.`category_id` = c.`id` AND a.id = ?'
            this.query(sql,id).then(results=>{
                //交给中间器进行处理
                resolve(results[0])
            }).catch(err=>{
                console.log(`获取指定指定商品的详情失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 总商品数
     */
    static getCount(category_id,user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(1) AS `count` FROM goods WHERE s_id=?'
            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : ''
            this.query(sql,user_id).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获取总商品数失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定页商品列表
     * @param {integer} start 起始索引
     * @param {integer} size 查询条目数
     */
    static getPage(start, size, category_id,user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM goods WHERE s_id=?'
            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : ''
            sql += ' ORDER BY `time` DESC LIMIT ?,?'
            this.query(sql, [user_id,start, size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取指定页商品列表：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 添加商品
     * @param {Object} goods 商品对象
     */
    static add(goods) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO goods SET ?'
            this.query(sql, goods).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加商品失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 删除商品
     * @param {integer}} id 商品编号
     */
    static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM goods WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除商品失败：${err.message}`)
                reject(err)
            })
        })
    }

    /**
     * 编辑商品
     * @param {Object} goods 商品对象
     */
    static edit(goods) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE goods SET name = ?, image = ?, price = ?, count = ?,category_id=?,d_price=?,title=? WHERE id = ?'
            this.query(sql, [goods.name, goods.image, goods.price, goods.count,goods.category_id,goods.d_price,goods.title,goods.id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑商品失败：${err.message}`)
                reject(err)
            })
        })
    }
}