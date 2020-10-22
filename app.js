/**
 * 入口模块
 */
const express = require('express')
const session = require('cookie-session')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//创建主应用
const app = express()

// 上传配置
const upload = multer({
    dest: './public/upload', // 上传文件的存储目录
    limits: {
        fileSize: 1024 * 1024 * 2 // 单个文件大小限制在2M以内
    }
})

// 模板引擎的设置
// 在使用模板时可以使用后缀为html的文件
app.set('view engine', 'html')
app.set('views',`${__dirname}/views`)
app.engine('html',require('ejs').renderFile)

// 静态资源配置
app.use(express.static('public'))

//post请求处理
app.use(express.urlencoded({extended:true}))

//SESSION配置
app.use(session({
    keys: ['secret'],
    maxAge: 1000*60*30
}))

// SESSION延期
app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})

// 上传操作
app.post('/register', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})
app.post('/personal/update', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})
app.post('/personal/goods/*', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        //  file.originalname ==> 文件的原名称
        let extname = path.extname(file.originalname)
        // file.path ==> 上传后的文件路径
        fs.renameSync(file.path, file.path + extname)
        // file.filename ==> 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})


//调用首页子应用
app.use(/\/(index)?/,require('./routes/index'))
//调用商品子应用
app.use('/goods',require('./routes/goods'))
//调用搜索子应用
app.use('/search',require('./routes/search'))
//调用购物车子应用
app.use('/shop_car',require('./routes/shop_car'))
//调用登录子应用
app.use('/login',require('./routes/login'))
//调用注册子应用
app.use('/register',require('./routes/register'))
//退出
app.get('/user/logout',(req,res)=>{
    req.session.user=null
    res.render('login',{msg:'退出成功'})
})

// 调用后台首页
app.use('/personal', require('./routes/personal/personal'))
// 调用订单管理
app.use('/order', require('./routes/personal/order'))

//监听服务器
app.listen(8080)
console.log('项目启动成功，请访问：http://localhost:8080')