/**
 * 商品的分类（导航）
 */
module.exports = class Category extends require('./model') {
    /**
     * 获取商品类目列表
     */
    static getList(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`c_name`,`index` FROM category ORDER BY `index` ASC'
            this.query(sql).then(results=>{
                //交给中间器进行处理
                resolve(results) 
            }).catch(err=>{
                console.log(`获取商品类目列表失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
     * 获取指定编号的导航详情
     */
    static getCategoryById(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,c_name,`index` FROM category WHERE id = ?'
            this.query(sql,id).then(results=>{
                //交给中间器进行处理
                resolve(results[0]) 
            }).catch(err=>{
                console.log(`获取指定编号的导航详情失败：${err.message}`)
                reject(err)
            })
        })
    }
}