const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init')

const bodyParser = require('koa-bodyparser')
const koa2cors = require('koa2-cors')

const Router = require('koa-router')
const user = require('./appApi/user')
const goods = require('./appApi/goods')

app.use(bodyParser())
app.use(koa2cors())

// 装载所有路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
    await connect()
    initSchemas()
})()

app.use(async (ctx) => {
    ctx.body = '<h1>hello koa2</h1>'
})

app.listen(3000, () => {
    console.log('Server start successfully')
})