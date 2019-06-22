const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async (ctx) => {
    ctx.body = '首页'
})

router.post('/register', async (ctx) => {
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

router.post('/login', async (ctx) => {
    let loginUser = ctx.request.body
    let userName = loginUser.userName
    let password = loginUser.password

    // 映入User的model
    const User = mongoose.model('User')

    await User.findOne({userName: userName}).exec().then(async (result) => {
        if (result) {
            // 存在该用户
            let newUser = new User()
            await newUser.comparePassword(password, result.password).then(isMatch => {
                ctx.body = {
                    code: 200,
                    message: isMatch
                }
            }).catch(err => {
                ctx.body = {
                   code: 500,
                   message: err 
                }    
            });
        } else {
            ctx.body = {
                code: 500,
                message: '用户名不存在'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

module.exports = router