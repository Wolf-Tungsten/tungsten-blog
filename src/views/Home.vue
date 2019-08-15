<template>
  <div class="tungsten-page">
    <div class="hidden-sm-and-up" style="font-size:24px;margin-bottom:30px; font-weight:bold;">🐺 狼剩子的主页</div>
    <div v-if="topFixedList.length > 0" style="margin-bottom: 40px;">
      <div class="tungsten-big-title">精选内容</div>
      <div style="border-top:solid 1px #EBEEF5; margin-top:20px;"></div>
      <div v-for="item in topFixedList" :key="item.code">
        <article-item
          :title="item.title"
          :abstract="item.abstract"
          :last-modified-time="item.lastModifiedTime"
          :cover-url="item.coverUrl"
          :view-count="item.viewCount"
          :top-fixed="1"
          :code="item.code"
        ></article-item>
      </div>
    </div>
    <div v-loading="loading">
      <div class="tungsten-big-title">全部内容</div>
      <el-row style="margin-top:20px;">
        <el-col :xs="16" :sm="6" :md="6" :lg="6" :xl="6">
          <el-cascader
            :options="columnTree"
            :props="{ checkStrictly: true, value:'code', label:'name' }"
            placeholder="选择栏目"
            style="width:100%"
            v-model="columnCode"
          ></el-cascader>
        </el-col>
        <el-col :xs=2 :sm="6" :md="6" :lg="6" :xl="6" style="margin-left:10px;">
          <el-button @click="search" type="primary">检索文章</el-button>
        </el-col>
      </el-row>
      <div style="border-top:solid 1px #EBEEF5; margin-top:30px;"></div>
      <div v-if="articleList.length > 0">
      <div v-for="item in articleList" :key="item.code">
        <article-item
          :title="item.title"
          :abstract="item.abstract"
          :last-modified-time="item.lastModifiedTime"
          :cover-url="item.coverUrl"
          :view-count="item.viewCount"
          :code="item.code"
        ></article-item>
      </div>
      </div>
      <div v-else style="margin-top:20px;text-align:center;color:#C0C4CC;padding-bottom:20px;border-bottom:solid 1px #EBEEF5;">
        暂无内容，敬请期待
      </div>
      <div style="text-align:center;margin-top:30px;">
        <el-pagination background layout="prev, pager, next" :total="amount"></el-pagination>
      </div>
    </div>
    <div style="flex-grow:1"></div>
    <div class="copyright"> © CopyRight 2016-2019, Wolf-Tungsten. All Rights Reserved 蒙ICP备18001061号</div>
  </div>
</template>
 
<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
import ArticleItem from "../components/ArticleItem";
export default {
  name: "home",
  data() {
    return {
      columnTree: [],
      topFixedList: [],
      articleList: [],
      columnCode: [],
      amount:0,
      page:1,
      loading:true
    };
  },
  components: {
    //HelloWorld
    "article-item": ArticleItem
  },
  methods: {
    async fetchArticle() {
      this.loading = true
      let columnCode = this.columnCode[this.columnCode.length - 1]
      let res = await axios.get(
        `http://wolf-tungsten.com/tungsten-blog-srv/public-api/v1/article-list?columnCode=${columnCode}&deep=1&page=${this.page}&pagesize=10`);
      this.amount = res.data.result.articleAmount
      this.articleList = res.data.result.articleList
      this.loading = false
    },
    async search(){
      this.page = 1
      this.fetchArticle()
    }
  },
  async created() {
    this.loading = true
    // 获取总栏目树
    let res = await axios.get(
      "http://wolf-tungsten.com/tungsten-blog-srv/public-api/v1/column?code=71F296C6"
    );
    this.columnTree = [
      { name: "全部来源", code: res.data.result.code },
      ...res.data.result.children
    ];
    this.columnCode = [res.data.result.code];
    this.fetchArticle();
    // 获取置顶文章
    res = await axios.get(
      "http://wolf-tungsten.com/tungsten-blog-srv/public-api/v1/article-list?columnCode=71F296C6&deep=1"
    );
    this.topFixedList = res.data.result.topFixedList;
    this.loading = false
  }
};
</script>

<style>
.tungsten-page {
  text-align: left;
  margin-left: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tungsten-big-title {
  font-size: 26px;
  color: teal;
}
.copyright{
    justify-self: flex-end;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 14px;
}
</style>
