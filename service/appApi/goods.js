const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile(__dirname  + '../../data_json/newGoods.json','utf8', (err,data) => {
        if (err) {
            console.log(err)
            return
        }
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value,index) => {
            let newGoods = new Goods(value)
            newGoods.save().then(() => {
                saveCount++
                console.log('成功' + saveCount + '条')
            }).catch(error => {
                console.log(MediaStreamErrorEvent)
            })
        })
    })
    
    ctx.body="开始导入商品数据"
})

router.get('/insertAllCategory', async (ctx) => {
    fs.readFile(__dirname  + '../../data_json/category.json','utf8', (err,data) => {
        if (err) {
            console.log(err)
            return
        }
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index) => {
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('成功' + saveCount + '条')
            }).catch(error => {
                console.log('插入失败' + error)
            })
        })
    })
    
    ctx.body="开始导入类别数据"
})

router.get('/insertAllCategorySub', async (ctx) => {
    fs.readFile(__dirname + '../../data_json/category_sub.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((val, index) => {
            let newCategorySub = new CategorySub(val)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('成功' + saveCount + '条')
            }).catch(error => {
                console.log('插入失败' + error)
            })
        })
    })
})

// 获取商品详情信息的接口
router.post('/getDetailGoodsInfo', async (ctx) => {
    try {
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({ID: goodsId}).exec()
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
})

// 读取大类数据接口
router.get('/getCategoryList', async (ctx) => {
    try {
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
})

// 读取小类数据
router.post('/getCategorySubList', async (ctx) => {
    try {
        let categoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({
            MALL_CATEGORY_ID: categoryId
        }).exec()
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
})

// 根据类别获取商品列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
    try {
        let categorySubID = ctx.request.body.categorySubID
        let page = ctx.request.body.page // 当前页数
        let num = 10 // 每页显示数量
        let start = (page - 1) * num // 开始位置
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({
            SUB_ID: categorySubID
        }).skip(start).limit(num).exec()
        ctx.body = {code: 200, message: result}
    } catch (error) {
        ctx.body = {code: 500, message: error}
    }
})

module.exports = router