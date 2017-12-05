<template>
    <div class="ratings">
        <div class="grade-box">
            <div class="grade-left">
                <p class="grade-num">{{seller.score}}</p>
                <p class="grade-item grade-font">综合评分</p>
                <p class="grade-item grade-gray">高于周边商家{{seller.rankRate}}%</p>
            </div>
            <div class="grade-right">
                <div class="grade-star">
                    <span class="grade-font">服务态度</span>
                    <star :score="seller.serviceScore"></star>
                    <span class="star-num">{{seller.serviceScore}}</span>
                </div>
                <div class="grade-item">
                    <span class="grade-font">食物评分</span>
                    <star :score="seller.foodScore"></star>
                    <span class="star-num">{{seller.foodScore}}</span>
                </div>
                <div class="grade-item">
                    <span class="grade-font">送达时间</span>
                    <span class="grade-time">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <div class="choose-box">
            <div class="choose-btns">
                <button class="choose-btn btn-blue">全部<span>57</span></button>
                <button class="choose-btn btn-sky">满意<span>47</span></button>
                <button class="choose-btn btn-glay">不满意<span>10</span></button>
            </div>
            <div class="choose-descript">
                <span class="icon-cancel">&radic;</span> 只看有内容的评价
            </div>
        </div>
        <div class="comment-list">
            <div class="comment-item" v-for="(item, index) in ratings" :key="">
                <div class="head-portrait">
                    <div class="portrait-pic">
                        <div class="pic"></div>
                    </div>
                    <div class="portrait-descript">
                        <p class="nick">{{item.username}}</p>
                        <div class="star-descript" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</div>
                    </div>
                </div>
                <p class="text">{{item.text}}</p>
                <div class="recommend" v-if="item.recommend.length>0">
                    <span class="heart">&#10084;</span>
                    <span class="recommend-tab" v-for="(recommend, idx) in item.recommend" :key="">{{recommend}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Star from '@/components/star/star.vue'

export default {
    data(){
        return {
            ratings: [],
            seller: {}
        }
    },
    components: {
        'star': Star
    },
    created(){
        this.ratings = this.$store.getters.getRatingsData;
        this.seller = this.$store.getters.getSellerData
    }
}
</script>

<style scoped>
    .ratings{
        /*border: 1px solid red;*/
        background-color: #D4D6D9;
        position: absolute;
        top: 170px;
        bottom: 47px;
        width: 100%;
        margin-top: 1px;
        overflow-y: auto;
    }
    .grade-box{
        /*border: 1px solid green;*/
        display: flex;
        background-color: white;
        padding-top: 18px;
        padding-bottom: 18px;
    }
    .grade-left{
        /*border: 1px solid blue;*/
        flex: 0.4;
        text-align: center;
        border-right: 1px solid #D4D6D9;
    }
    .grade-num{
        /*border: 1px solid red;*/
        color: rgb(255,153,0);
        font-size: 24px;
    }
    .grade-font{
        color: rgb(7,17,27);
        font-size: 12px;
        /*vertical-align: initial;*/
    }
    .grade-gray{
        color: #D4D6D9;
        font-size: 10px;
    }
    .grade-item{
        /*border: 1px solid green;*/
        margin-top: 8px;
    }

    .grade-right{
        /*border: 1px solid orange;*/
        flex: 0.6;
        text-align: left;
        padding-left: 24px;
    }
    .grade-star{
        /*border: 1px solid red;*/
    }
    .star-num{
        /*border: 1px solid green;*/
        color: rgb(255,153,0);
        font-size: 12px;
    }
    .grade-time{
        /*border: 1px solid blue;*/
        color: #D4D6D9;
        font-size: 12px;
    }

    .choose-box{
        /*border: 1px solid red;*/
        background-color: white;
        margin-top: 20px;
        padding: 18px;
    }
    .choose-btns{
        /*border: 1px solid blue;*/
    }
    .choose-btn{
        /*border: 1px solid orange;*/
        border: none;
        height: 36px;
        padding: 5px 15px;
        font-size: 15px;
    }
    .choose-btn span{
        /*border: 1px solid red;*/
        margin-left: 5px;
        font-size: 8px;
    }
    .btn-blue{
        /*border: 1px solid red;*/
        background-color: #00A0DC;
        color: white;
    }
    .btn-sky{
        background-color: #CCECF8;
        color: #515A62;
    }
    .btn-glay{
        background-color: #E9EBEC;
        color: #515A62;
    }
    .choose-descript{
        /*border: 1px solid green;*/
        color: #B7BBBF;
        border-top: 1px solid #D4D6D9;
        margin-top: 18px;
        padding-top: 18px; 
    }
    .choose-descript .icon-cancel{
        /*border: 1px solid red;*/
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #B7BBBF;
        color: white;
        border-radius: 100%;
    }

    .comment-list{
        /*border: 1px solid red;*/
        background-color: white;
        padding: 0 18px 20px 18px;
        margin-top: 1px;
    }
    .comment-item{
        /*border: 1px solid blue;*/
        padding-top: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid #B7BBBF;
    }
    .head-portrait{
        /*border: 1px solid green;*/
        display: flex;
    }
    .portrait-pic{
        flex: 0.1;
    }
    .pic{
        width: 28px;
        height: 28px;
        background: url(http://static.galileo.xiaojukeji.com/static/tms/default_header.png);
        background-size: 100% 100%;
        border-radius: 100%;
        margin: 0 auto;
    }
    .portrait-descript{
        /*border: 1px solid red;*/
        flex: 0.9;
        padding-left: 12px;
    }
    .nick{
        color: rgb(7,17,27);
        font-size: 10px;
    }
    .star-descript{
        /*border:  1px solid blue;*/
        color: rgb(147,153,159);
        font-size: 10px;
    }
    .text{
        /*border: 1px solid orange;*/
        margin-left: 40px;
        margin-top: 6px;
        color: rgb(7,17,27);
        font-size: 15px;
    }
    .recommend{
        border: 1px solid red;
        margin-left: 40px;
        margin-top: 8px;
    }
    .recommend .heart{
        border: 1px solid green;
        color: rgb(247, 7, 7);
        font-size: 25px;
        vertical-align: super;
    }
    .recommend .recommend-tab{
        /*border: 1px solid blue;*/
        display: inline-block;
        border: 1px solid rgba(7,17,27,0.1);
        font-size: 9px;
        padding: 6px;
        color: rgb(147,153,159);
        width: 65px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

