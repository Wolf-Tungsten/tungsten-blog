<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <el-page-header @back="goBack" content="查看内容" title="狼剩子的主页" v-loading="loading"></el-page-header>
    <div class="article-title">{{title}}</div>
    <div v-html="content" class="article-content"></div>
    <div style="flex-grow:1"></div>
    <div class="copyright"> © Copyright 2016-2019, Wolf-Tungsten. All Rights Reserved 蒙ICP备18001061号</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      title:"",
      content:"",
      loading:false
    }
  },
  methods:{
   goBack(){
     try{
       this.$router.go(-1)
     } catch(e){
       this.$replace({name:'home'})
     }
   }
  },
  async created(){
    this.loading = true
    let res = await axios.get(`http://wolf-tungsten.com/tungsten-blog-srv/public-api/v1/article?articleCode=${this.$route.params.code}`)
    if(!res.data.success){
      this.$router.replace({name:'home'})
      return
    } 
    let article = res.data.result
    this.title = article.title
    this.content = article.content
    this.loading = false
  }
}
</script>

<style>
.image{
  text-align: center;
}

.image img {
  width: 300px;
  margin: 20px;
}
.article-title{
  text-align: center;
  margin-top:30px;
  margin-bottom:30px;
  font-size:30px;
  color:teal;
  font-weight: bold;
}

.article-content{
  margin: 0 20px 20px 20px;
}

@media screen and (max-width: 600px) {
  .article-content{
  margin: 0 5px 5px 5px;
}
}
</style>