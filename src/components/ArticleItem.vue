<template>
  <div class="tungsten-article-item" @click="gotoArticle">
    <div class="left-part">
      <div class="title"><span class="el-icon-star-on" style="color:orange;" v-if="topFixed"></span>{{title}}</div>
      <div class="abstract">{{abstract}}</div>
      <div class="lastModifiedTime">{{lastModifiedTimeDisp}} · {{viewCount}} 次浏览</div>
    </div>
    <div class="right-part hidden-xs-only" v-if="coverUrl" >
      <img class="cover" :src="coverUrl"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
export default {
    props:['title', 'lastModifiedTime', 'abstract', 'coverUrl', 'viewCount', 'topFixed', 'code'],
    computed:{
      lastModifiedTimeDisp(){
        return moment(+this.lastModifiedTime).fromNow()
      }
    },
    methods:{
      gotoArticle(){
        this.$router.push({path:'/article/'+this.code})
      }
    }
}
</script>

<style lang="less" scoped>
.tungsten-article-item{
  display:flex;
  align-items: stretch;
  border-bottom: solid 1px #EBEEF5;
  .left-part{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
    flex-grow: 1;
    .title{
      font-size:24px;
      font-weight: bold;
    }
    .abstract{
      margin-top: 10px;
      color:#909399;
      flex-grow: 1;
    }
    .lastModifiedTime{
      margin-top: 5px;
    }
  }
  .right-part{
    display: flex;
    align-items: center;
    .cover{
      height: 150px;
    }
  }
}

.tungsten-article-item:active{
    background: #F6F6F6;
  }
  

</style>