/**
 * 权限子应用
 */

 module.exports = {
     /**
      * 从session中读取用户
      */
     getUser: (req,res,next) => {
        // 从session中读取数据
        req.users = req.session.user
        next()
     }
 }