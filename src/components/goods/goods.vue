<template>
    <div class="goods-main">
        <div class="goods-wapper">
            <ul class="type-box">
                <li class="type-item" v-for="(item, index) in goods" :class="selected==index?'selected':''" @click="selectedMethod(index)" :key="item.name">
                    <a href="javascript:void(0)">{{item.name}}</a>
                </li>
            </ul>
        </div>
        <div class="goods-list" id="goods">
            <div class="goods-item" v-for="(goodItem, idx) in goods" :id="'goodItem'+idx" :key="goodItem.name">
                <h3 class="goods-title">{{goodItem.name}}</h3>
                <ul class="foods-list">
                    <li class="foods-item" v-for="(foodItem, index) in goodItem.foods" :key="foodItem.name">
                        <div class="food-img">
                            <img :src="foodItem.icon" />
                        </div>
                        <div class="food-context">
                            <p class="food-title">{{foodItem.name}}</p>
                            <p class="food-description">{{foodItem.description}}</p>
                            <div class="food-description">
                                <span>月售{{foodItem.sellCount}}</span>
                                <span>好评率{{foodItem.rating}}%</span>
                            </div>
                            <div class="food-price">
                                <span class="price">￥{{foodItem.price}}</span>
                                <span class="old-price" v-show="foodItem.oldPrice">￥{{foodItem.oldPrice}}</span>
                            </div>
                            <div class="change-goods-number">
                                <a href="javascript:void(0)" class="link-change cut" 
                                v-show="getFoodNum(idx+'-'+index)" @click="cutFoods(idx+'-'+index)"></a>

                                <span class="num-span" v-show="getFoodNum(idx+'-'+index)>0">{{getFoodNum(idx+'-'+index)}}</span>

                                <a href="javascript:void(0)" class="link-change add" @click="addFoods(idx+'-'+index, foodItem)"></a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goods: {},
            selected: 0
        }
    },
    methods: {
        // idx == index
        selectedMethod(idx) {
            this.selected = idx;
            var item = document.getElementById('goodItem' + idx);
            var goods = document.getElementById('goods');
            goods.scrollTop = item.offsetTop;
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
        getFoodNum(idx) {
            var product = this.$store.getters.getProductById(idx);
            if (product) {
                return product.count;
            }
            return 0;
        }
    },
    created() {
        this.goods = this.$store.getters.getGoodsData
    }
}
</script>

<style scoped>
.goods-main {
    border: 1px solid red;
    display: flex;
    /*overflow: hidden;*/
    position: absolute;
    top: 170px;
    bottom: 47px;
}

.goods-main .goods-wapper {
    /*border: 1px solid green;*/
    flex: 0 0 100px;
    height: 100%;
    overflow-y: scroll;
    background-color: #f3f5f7;
}

.goods-main .goods-wapper .type-box {
    /*border: 1px solid blue;*/
    list-style: none;
}

.goods-main .goods-wapper .type-box .type-item {
    /*border: 1px solid orange;*/
    /*height: 50px;
        line-height: 50px;
        text-align: center;*/
    padding: 17px 20px;
    /*display: block;
        background-color: #f3f5f7;*/
}

.goods-main .goods-wapper .type-box .type-item a {
    /*border: 1px solid blueviolet;*/
    font-size: 12px;
    color: rgb(121, 124, 128);
}

.goods-main .goods-wapper .type-box .selected {
    background-color: white;
}




.goods-main .goods-list {
    border: 1px solid blue;
    overflow-y: scroll;
    flex: 1;
}

.goods-main .goods-list .goods-item {
    border: 1px solid green;
}

.goods-main .goods-list .goods-item .goods-title {
    /*border: 1px solid brown;*/
    font-size: 18px;
    color: rgb(147, 153, 159);
    padding: 10px 0 10px 18px;
    background-color: #f3f5f7;
    margin-bottom: 18px;
}

.foods-list {
    /*list-style: none;*/
}

.foods-list .foods-item {
    /*border: 1px solid olive;*/
    display: flex;
    margin: 0 18px 18px 18px;
    border-bottom: 1px solid #7e8c8d;
    padding-bottom: 18px;
}

.foods-list li:last-child {
    border: none;
}

.food-img {
    flex: 0 0 80px;
}

.food-img img {
    width: 80px;
    height: 80px;
}

.food-context {
    /*border: 1px solid blueviolet;*/
    flex: 1;
    margin-left: 10px;
    position: relative;
}

.food-title {
    font-size: 18px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
}

.food-description {
    /*border: 1px solid orange;*/
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-bottom: 8px;
}

.food-price .price {
    font-size: 15px;
    color: rgb(240, 20, 20);
}

.food-price .old-price {
    font-size: 12px;
    color: rgb(147, 153, 159);
    margin-left: 6px;
    text-decoration: line-through;
}

.food-context .change-goods-number {
    /*border: 1px solid olivedrab;*/
    position: absolute;
    right: 5px;
    bottom: -10px;
}

.change-goods-number .link-change {
    /*border: 1px solid red;*/
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 2px solid rgb(0, 160, 220);
    border-radius: 100%;
    text-align: center;
    /*position: relative;*/
}

.change-goods-number .add {
    background-color: rgb(0, 160, 220);
}

.change-goods-number .add::after {
    content: "+";
    color: white;
    font-size: 22px;
    /*margin: auto;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
}

.change-goods-number .cut::after {
    content: "-";
    color: rgb(0, 160, 220);
    font-size: 22px;
    /*margin: auto;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
}

.change-goods-number .num-span {
    /*border: 1px solid green;*/
    display: inline-block;
    text-align: center;
    width: 24px;
    height: 24px;
    line-height: 24px;
    vertical-align: text-bottom;
}
</style>


