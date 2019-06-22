<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                    <ul>
                        <li @click="clickCategory(index, item.ID)" 
                            :class="{ categoryActice: categoryIndex === index }"
                            v-for="(item, index) in category" 
                            :key="index">
                                {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
                </van-col>
                <van-col span="18">
                  <div class="tabCategorySub">
                      <van-tabs v-model="active" @click="onClickCategorySub">
                          <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                      </van-tabs>
                  </div>
                  <div id="list-div">
                      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                         <van-list v-model="loading" :finished="finished" @load="onLoad">
                            <div class="list-item" @click="goToGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
                                <div class="list-item-img">
                                    <img :src="item.IMAGE1" :onerror="errorImg" width="100%">
                                </div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div>￥{{item.ORI_PRICE | moneyFmt}}</div>
                                </div>
                            </div>
                         </van-list> 
                      </van-pull-refresh>
                      
                  </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/apiConfig'
import { toMoney } from '@/filter/filter.js'
export default {
    created() {
        this.getCategory() 
    },
    data() {
        return {
            category: [],
            categoryIndex: 0,
            categorySub: [],
            active: 0, // 激活标签的值
            loading: false,
            finished: false, // 上啦加载是否有数量
            isRefresh: false, // 下拉刷新
            page: 1, // 商品列表页数
            goodList: [], // 商品列表信息
            categorySubId: '', // 商品子类id
            errorImg: 'this.src="'+ require('@/assets/images/errorimg.png') +'"'
        }
    },
    mounted() {
        let winHeight = document.documentElement.clientHeight
        document.getElementById("leftNav").style.height=winHeight - 46- 50 + 'px'
        document.getElementById("list-div").style.height=winHeight - 90- 50 + 'px'

    },
    filters: {
        moneyFmt(money) {
          return toMoney(money)
        }
    },
    methods: {
        getCategory() {
            axios({
                url: url.getCategoryList,
                method: 'get'
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.category = res.data.message
                    // 获取第一个小类的ID
                    let id1 = this.category[0].ID
                    this.getCategorySubByID(id1)
                } else {
                    this.$toast('服务器错误， 获取数据失败')
                }
            }).catch(error => {
                console.log(error)
            })
        },
        clickCategory(index, id) {
            this.categoryIndex = index
            this.page = 1
            this.finished = false
            this.goodList = []
            this.getCategorySubByID(id)
        },
        // 根据大类id读取小类列表
        getCategorySubByID(categoryId) {
            axios({
                url: url.getCategorySubList,
                method: 'post',
                data: {categoryId: categoryId}
            }).then(res => {
                if (res.data.code === 200) {
                    this.categorySub = res.data.message
                    this.active = 0
                    this.categorySubId = this.categorySub[0].ID
                    this.onLoad()
                }
            }).catch(error => {
                console.log(error)
            })
        },
        // 上拉加载
        onLoad() {
            setTimeout(() => {
                 this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
                 this.getGoodList()
            }, 500)
        },
        // 下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.isRefresh = false
                this.finished = false
                this.goodList = []
                this.page = 1
                this.onLoad()
            }, 500)
        },
        getGoodList() {
            axios({
                url: url.getGoodsListByCategorySubID,
                method: 'post',
                data: {
                    categorySubID: this.categorySubId,
                    page: this.page
                }
            }).then(res => {
                console.log(res)
                if (res.data.code === 200 && res.data.message.length) {
                    this.page++
                    this.goodList = this.goodList.concat(res.data.message)
                } else {
                    this.finished = true
                }
                this.loading = false
            }).catch(error => {
                console.log(error)
            })
        },
        onClickCategorySub(index, title) {
            this.categorySubId = this.categorySub[index].ID
            console.log('this.categorySubId: ', this.categorySubId)
            this.goodList = []
            this.finished = false
            this.page = 1
            this.onLoad()
        },
        // 跳转到商品详情页面
        goToGoodsInfo(id) {
            this.$router.push({name: 'Goods', params: {goodsId: id}})
        }
    },
}
</script>
<style lang="scss">
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }


    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>
