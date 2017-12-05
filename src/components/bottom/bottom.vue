<template>
    <div>
        <div class="details-black" v-if="isShowDetails" @click="hoverShopDetails()"></div>
        <div v-if="isShowDetails" :class="isShowDetails?'details-box':''">
            <div class="details-title">
                <div class="shop-title">购物车</div>
                <div class="shop-clear" @click="clearShop()">清空</div>
            </div>
            <div class="details-list">
                <div class="detail-item" v-for="item in productArray" :key="item.id">
                    <div class="product-name">{{item.productName}}</div>
                    <div class="product-price">￥{{item.count*item.price}}</div>
                    <div class="product-action">
                        <a href="javascript:void(0)" class="link-change cut" @click="cutFoods(item.id)"></a>
                        <span class="num-span">{{item.count}}</span>
                        <a href="javascript:void(0)" class="link-change add" @click="addFoods(item.id, item)"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="item-1">
                <div class="shopping-car-box">
                    <span class="car icon-shopping_cart" :class="isShowDetails?'blue-car':'black-car'" @click="hoverShopDetails()"></span>
                </div>
            </div>
            <div class="item-2">
                <span class="total-prices">{{getTotalMoney()}}</span>
                <span class="total-remark">另需配送费￥4元</span>
            </div>
            <div class="item-3">
                <button type="button" class="btn-pay" :class="btnType">{{matchSend()}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShowDetails: false,
            startMoney: 20,
            btnType: 'disabled',
            productArray: []
        }
    },
    methods: {
        hoverShopDetails() {
            this.isShowDetails = !this.isShowDetails;
        },
        getTotalMoney() {
            return '￥' + this.$store.getters.getTotalMoney;
        },
        matchSend() {
            var total = this.$store.getters.getTotalMoney;
            if (total >= this.startMoney) {
                this.btnType = 'ok';
                return '结账';
            } else {
                this.btnType = 'disabled';
                if (total > 0) {
                    var balance = this.startMoney - total;
                    return `还差￥${balance}元起送`;
                }
                return `￥${this.startMoney}元起送`;
            }
        },
        addFoods(idx, item) {
            var product = this.$store.getters.getProductById(idx);
            if (product) {
                product.count++;
                this.$store.commit('setProductArray', product);
            } else {
                this.$store.commit('setProductArray', {
                    id: idx,
                    count: 1,
                    price: item.price,
                    productName: item.name
                })
            }
            this.$store.commit('mathTotalMoney');
        },
        cutFoods(idx){
            var product = this.$store.getters.getProductById(idx);
            if(product){
                product.count--;
                this.$store.commit('setProductArray', product);
            }
            this.$store.commit('mathTotalMoney');
        },
        /*addFoods(idx){
            console.log(idx);
            for(var i=0; i<this.productArray.length; i++){
                var item = this.productArray[i];
                if(item.id==idx){
                    item.count++;
                    this.$store.commit('setProductArray', {
                        id: idx,
                        count: item.count,
                        price: item.price,
                        productName: item.productName
                    });
                    break;
                }
            }
            this.productArray = this.$store.getters.getProductArray;
            this.$store.commit('mathTotalMoney');
        },
        cutFoods(idx){
            for(var i=0; i<this.productArray.length; i++){
                var item = this.productArray[i];
                if(item.id==idx){
                    item.count--;
                    this.$store.commit('setProductArray', {
                        id: idx,
                        count: item.count,
                        price: item.price,
                        productName: item.productName
                    })
                    break;
                }
            }
            this.productArray = this.$store.getters.getProductArray;
            this.$store.commit('mathTotalMoney');
        },*/
        clearShop(){
            this.$store.commit('clearProduct');
            this.$store.commit('setProductTotal', 0);
            this.productArray = this.$store.getters.getProductArray;
        }
    },
    created() {
        this.productArray = this.$store.getters.getProductArray;
    }
}
</script>

<style scoped>
div {
    /*border: 1px solid green;*/
}

.bottom {
    /*border: 1px solid red;*/
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: 0px;
    background-color: #141C27;
    height: 45px;
    display: flex;
    /*z-index: 11;*/
}

.item-1 {
    /*border: 1px solid green;*/
    flex: 0.2;
    position: relative;
    height: 100%;
}

.shopping-car-box {
    /*border: 1px solid red;*/
    display: inline-block;
    width: 44px;
    height: 44px;
    border-radius: 100%;
    position: absolute;
    bottom: 8px;
    left: 18px;
    text-align: center;
    background-color: #141c27;
}

.car {
    /*border: 1px solid orange;*/
    display: inline-block;
    height: 38px;
    line-height: 38px;
    width: 38px;
    border-radius: 100%;
    /*margin: 0 auto;*/
    margin-top: 6px;
}

.black-car {
    color: #80858A;
    background-color: #2B343C;
}

.blue-car {
    color: white;
    background-color: rgb(0, 160, 220);
}

.item-2 {
    /*border: 1px solid blue;*/
    flex: 0.5;
    height: 100%;
    line-height: 45px;
}

.total-prices {
    color: white;
    font-size: 16px;
    font-weight: bold;
}

.total-remark {
    margin-left: 12px;
    font-size: 16px;
    color: #919396;
}

.item-3 {
    /*border: 1px solid orange;*/
    flex: 0.3;
    height: 100%;
}

.btn-pay {
    /*border: 1px solid orchid;*/
    border: none;
    width: 100%;
    height: 100%;
    /*text-align: center;*/
    font-weight: bold;
    /*line-height: 24px;*/
    font-size: 12px;
}

.disabled {
    color: #919396;
    background-color: #2B333B;
}

.ok {
    color: #fff;
    background-color: rgb(0, 160, 220);
}


.details-black {
    /*border: 1px solid red;*/
    position: absolute;
    top: 0;
    bottom: 45px;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.6);
    /*opacity: 1;*/
    /*z-index: 9;*/
}

@keyframes detailsShow {
    from {
        height: 0px;
    }
    to {
        height: 283px;
    }
}

.details-box {
    /*border: 1px solid green;*/
    position: absolute;
    height: 283px;
    width: 100%;
    bottom: 46px;
    background-color: white;
    /*z-index: 10;*/
    animation: detailsShow 0.5s;
}

.details-title {
    /*border: 1px solid blue;*/
    display: flex;
    height: 40px;
    background-color: #f3f5f7;
}

.shop-title,
.shop-clear {
    flex: 1;
    line-height: 40px;
    font-size: 12px;
}

.shop-title {
    /*text-align: left;*/
    padding-left: 18px;
    color: rgb(7, 17, 27);
}

.shop-clear {
    text-align: right;
    padding-right: 18px;
    color: rgb(0, 160, 220);
    cursor: pointer;
}

.details-list {
    /*border: 1px solid orange;*/
    height: 243px;
    overflow-y: auto;
}

.detail-item {
    /*border: 1px solid orange;*/
    display: flex;
    height: 48px;
    margin: 12px 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}

.detail-item .product-name {
    /*border: 1px solid blue;*/
    flex: 0.4;
    /*text-align: left;*/
    line-height: 48px;
}

.detail-item .product-price {
    /*border: 1px solid orangered;*/
    flex: 0.2;
    text-align: center;
    line-height: 48px;
    color: rgb(240, 20, 20);
}

.detail-item .product-action {
    /*border: 1px solid red;*/
    flex: 0.4;
    text-align: right;
    padding-top: 12px;
    /*line-height: 48px;*/
}

.link-change {
    /*border: 1px solid red;*/
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 2px solid rgb(0, 160, 220);
    border-radius: 100%;
    text-align: center;
    /*position: relative;*/
}

.add {
    background-color: rgb(0, 160, 220);
}

.add::after {
    content: "+";
    color: white;
    font-size: 22px;
    /*margin: auto;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
}

.cut::after {
    content: "-";
    color: rgb(0, 160, 220);
    font-size: 22px;
    /*margin: auto;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
}
.product-action .num-span{
    /*border: 1px solid red;*/
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    vertical-align: text-bottom;
}
</style>


