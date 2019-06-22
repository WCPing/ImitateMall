<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="购物车"></van-nav-bar>
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>
                清空购物车
            </van-button>
        </div>
        <!--显示购物车中商品-->
        <div class="cart-list">
            <div class="cart-row" v-for="(item, index) in cartInfo" :key="index">
                <div class="image">
                    <img :src="item.image" width="100%">
                </div>
                <div class="text">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="control">
                        <van-stepper v-model="item.count"></van-stepper>
                    </div>
                </div>
                <div class="price">
                   <div>
                       ￥{{item.price | moneyFmt}} 
                   </div>
                   <div>
                       x {{item.count}}
                   </div>
                   <div class="allPrice">
                       ￥{{item.price* item.count | moneyFmt}}
                   </div>
                </div>
            </div>
        </div>
        <div class="totalMoney">
            商品总价： ￥{{totalMoney | moneyFmt}}
        </div>
    </div>
</template>
<script>
import { toMoney } from '@/filter/filter.js'
export default {
    data() {
        return {
            cartInfo: [],
            isEmpty: false, 
        }
    },
    created() {
        this.getCartInfo()
    },
    computed: {
        totalMoney() {
            let allMoney = 0
            this.cartInfo.forEach((item, index) => {
                allMoney += item.price * item.count
            })
            localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return allMoney
        }
    },
    methods: {
        getCartInfo() {
            if (localStorage.cartInfo) {
                this.cartInfo = JSON.parse(localStorage.cartInfo)
            }
            this.isEmpty = this.cartInfo.length > 0
        },
        clearCart() {
            localStorage.removeItem('cartInfo')
            this.cartInfo = []
        }   
    },
    filters: {
        moneyFmt(money) {
          return toMoney(money)
        }
    },
}
</script>
<style lang="scss" scoped>
.cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align:right;
}
.cart-list{
    background-color: #fff;
    .cart-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0.5rem;
        font-size: 0.85rem;
        border-bottom: 1px solid #E4E7ED;
        .image {
            flex: 6; 
        }
        .text {
            flex: 14;
            padding-left: 10px;
            .control {
                padding-top: 10px;
            }
        }
        .price {
            flex: 4;
            .allPrice {
                color: red;
            }
        }
    }
}
.totalMoney {
    text-align: right;
    background-color: #fff;
    border-bottom: 1px solid #E4E7ED;
    padding: 5px;
}
</style>
