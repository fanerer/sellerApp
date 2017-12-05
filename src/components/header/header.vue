<template>
    <div class="header" v-if="seller">
        <div class="wapper">
            <div class="avatar">
                <img :src="seller.avatar" class="ava">
            </div>
            <div class="content">
                <div class="title">
                    <span class="ion-brand"></span>
                    <span style="margin-left: 6px">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="supportIcon" :class="classMap[seller.supports[0].type]"></span>
                    <span style="margin-left: 4px">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="seller-count" v-if="seller.supports">
                <span>{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="backgrounp">
            <img :src="seller.avatar" class="backg">
        </div>
        <div class="bulletin-wrapper" @click="detailShow(true)">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="detail" v-if="showDetail">
            <div class="detail-main">
                <div class="title">{{seller.name}}</div>
                
                <div class="level">
                    <star :score="seller.score"></star>
                </div>


                <div class="detail-mgs-box" v-if="seller.supports">
                    <div class="title-box">
                        <div class="link"></div>
                        <div class="title-word">优惠信息</div> 
                        <div class="link"></div>
                    </div>
                    <div class="support-list">
                        <div class="support-item" v-for="item in seller.supports" :key="">
                            <i :class="classMap[item.type]"></i>
                            <span>{{item.description}}</span>
                        </div>
                    </div>
                </div>
                <div class="detail-bulletin">
                    <div class="title-box">
                        <div class="link"></div>
                        <div class="title-word">商家公告</div> 
                        <div class="link"></div>
                    </div>
                    <div class="bulletin-text">{{seller.bulletin}}</div>
                </div>
            </div>
            <div class="detail-close" @click="detailShow(false)">
                <a href="javascript:void(0)" class="icon-close"></a>
            </div>
        </div>
    </div>
</template>

<script>
import Star from '@/components/star/star.vue'

export default {
    props: {
        seller: {}
    },
    data(){
        return {
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            showDetail: false
        }
    },
    components: {
        'star': Star
    },
    methods: {
        detailShow(boolen){
            this.showDetail = boolen;
        }
    }
}
</script>

<style scoped>
    .header{
        position: relative;
        width: 100%;
        background-color: rgba(7, 17, 27, 0.5);
        overflow: hidden;
        /*border: 1px solid red;*/
    }
    .wapper{
        /*border: 1px solid green;*/
        width: 100%;
        height: 100%;
        position: relative;
        padding: 24px 12px 16px 24px;
    }
    .wapper .avatar, .content{
        display: inline-block;
    }
    .avatar{
        width: 64px;
        height: 64px;
        /*border: 1px solid blue;*/
        border-radius: 4px;
        vertical-align: top;
    }
    .ava{
        width: 100%;
        height: 100%;
    }
    .content{
        /*border: 1px solid orange;*/
        vertical-align: top;
        margin-left: 16px;
    }
    .title{
        color: white;
        font-size: 16px;
    }
    .description{
        color: white;
        font-size: 12px;
        margin-top: 8px;
    }
    .support{
        color: white;
        font-size: 10px;
        margin-top: 8px;
    }
    .ion-brand{
        display: inline-block;
        width: 30px;
        height: 16px;
        /*background: url("./brand@2x.png") no-repeat top center;*/
        background: url("./brand@2x.png");
        background-size: 100% 100%;
        vertical-align: top;
    }
    .supportIcon{
        display: inline-block;
        width: 10px;
        height: 10px;
        background-size: 100% 100%;
        vertical-align: top;
        background-repeat: no-repeat;
        /*margin-top: -2px;*/
    }
    .seller-count{
        /*border: 1px solid olivedrab;*/
        position: absolute;
        right: 50px;
        bottom: 10px;
        height: 15px;
        line-height: 15px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        padding: 7px 8px;
        color: white;
        font-size: 10px;
    }
    .decrease{
        background-image: url("./decrease_1@2x.png");
    }
    .discount{
        background-image: url("./discount_1@2x.png")
    }
    .special{
        background-image: url("./special_1@2x.png")
    }
    .invoice{
        background-image: url("./invoice_1@2x.png")
    }
    .guarantee{
        background-image: url("./guarantee_3@2x.png")
    }
    .bulletin-wrapper{
        /*border: 1px solid blueviolet;*/
        height: 28px;
        line-height: 28px;
        background-color: rgba(7, 17, 27, 0.2);
        color: white;
        font-size: 10px;
        padding: 0 22px 0 12px;
        position: relative;
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .bulletin-title{
        /*border: 1px solid royalblue;*/
        display: inline-block;
        width: 22px;
        height: 12px;
        background: url("./bulletin@2x.png");
        background-size: 100% 100%;
    }
    .bulletin-text{
        margin: 0 4px;
    }
   .bulletin-wrapper .icon-keyboard_arrow_right{
        /*border: 1px solid gold;*/
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        color: white;
        font-size: 16px;
        top: 6px;
        right: 8px;
        text-align: center;
    }
    .backgrounp{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        filter: blur(10px);
        /*-webkit-filter: blur(10px);*/
    }
    .backg{
        width: 100%;
        height: 100%;
    }

    .detail{
        position: fixed;
        background-color: rgb(7, 17, 27);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        /*overflow: auto;
    -webkit-backdrop-filter: blur(10px);*/
    }
    .detail-main{
        margin-top: 35px;
        color: white;
    }
    .detail-main .title{
        text-align: center;
        font-weight: bold;
    }
    .detail-main .level{
        /*border: 1px solid green;*/
        text-align: center;
        margin-top: 16px;
    }
    .detail-main .detail-mgs-box{
        margin-top: 28px;
    }
    .title-box{
        position: relative;
        height: 20px;
        line-height: 20px;
        display: flex;
        /*border: 1px solid red;*/
        margin-left: 60px;
        margin-right: 60px;
    }
    .title-box .link{
        height: 2px;
        background-color: rgba(255, 255, 255, 0.2);
        flex: 1;
    }
    .title-box .title-word{
        /*border: 1px solid green;*/
        flex: 1;
        width: 80px;
        margin-top: -8px;
        text-align: center;
    }
    .support-list{
        line-height: 24px;
        /*border: 1px solid red;*/
    }
    .support-list .support-item{
        /*border: 1px solid green;*/
        font-size: 12px;
        font-weight: normal;
        margin-left: 60px;
    }
    .support-list .support-item i{
        display: inline-block;
        background-size: 100% 100%;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-top: 5px;
    }
    .support-list .support-item span{
        /*border: 1px solid blue;*/
        vertical-align: top;
        display: inline-block;
        margin-left: 6px;
    }
    .detail-bulletin{
        /*border: 1px solid red;*/
        margin-top: 28px;
    }
    .detail-bulletin .bulletin-text{
        font-size: 12px;
        line-height: 24px;
        margin-left: 60px;
        margin-right: 60px;
        /*border: 1px solid green;*/
    }
    .detail .detail-close{
        position: relative;
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        clear: both;
        margin-top: 28px;
    }
</style>


