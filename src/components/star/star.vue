<template>
    <div class="star-box">
        <span class="star" v-for="item in starGroup" :class="item" :key=""></span>
    </div>
</template>

<script>

function matchScore(score){
    var len = parseInt(score);
    var floor = parseFloat(score) - len;
    var countStar = 5;
    var group = [];
    for(var i = 0; i < len; i++){
        group.push("on");
    }
    if(floor > 0){
        group.push("half");
    }
    var residue = countStar - group.length;
    if(residue > 0){
        for(var j = 0; j < residue; j++){
            group.push("off");
        }
    }
    return group;
}


export default {
  props: {
      score: 0
  },
  data(){
      return {
          starGroup: []
      }
  },
  watch: {
      score: function(newScore){
          this.starGroup = matchScore(newScore);
      }
  },
  created(){
    this.starGroup = matchScore(this.score);
  }
}
</script>

<style scoped>
    .star-box{
        /*border: 1px solid blue;*/
        display: inline;
        vertical-align: sub;
    }
    .star:nth-child(1){
        margin-left: 0px;
    }
    .star{
        /*border: 1px solid orange;*/
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        background-size: 100% 100%;
    }
    .on{
        background-image: url('./star24_on@2x.png');
    }
    .half{
        background-image: url('./star24_half@2x.png');
    }
    .off{
        background-image: url('./star24_off@2x.png');
    }
</style>


