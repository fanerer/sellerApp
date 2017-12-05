<template>
  <div id="app">
    <v-header :seller="seller"></v-header>

    <div class="tab" id="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <router-view/>

    <v-bottom></v-bottom>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Bottom from './components/bottom/bottom.vue'

export default {
  name: 'app',
  data(){
    return {
      seller: {}
    }
  },
  components: {
    'v-header': Header,
    'v-bottom': Bottom
  },
  created(){
    this.seller = this.$store.getters.getSellerData
  }
}
</script>

<style scoped>
  .tab{
    /*border: 1px solid red;*/
    width: 100%;
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab::after{
    /*border: 1px solid orange;*/
    position: absolute;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    content: ' ';
  }
  .tab::before{
    position: absolute;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    left: 0;
    top: 0;
    height: 1px;
    width: 100%;
    content: ' ';
  }
  .tab .tab-item{
    /*border: 1px solid green;*/
    flex: 1;
    text-align: center;
  }
  /* > a表示a是.tab-item的直接子元素 */
  .tab .tab-item > a{
    /*border: 1px solid blue;*/
    font-size: 14px;
    color: rgb(77, 85, 93);
    display: block;
    /*border-bottom: 1px solid #ccc;*/
    /*border-top: 1px solid #ccc;*/
  }

  .tab .tab-item > .active {
    color: rgb(240, 20, 20);
  }
</style>
