<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <div>
      <div style="display:flex; align-items:center; margin-top: 10px;">
        <i class="el-icon-back" @click="goBack"></i>
        <div
          style="font-weight:bold;padding-right:10px;border-right:solid 1px #EBEEF5;"
          @click="goBack"
        >🐺 狼剩子的主页</div>
        <div style="padding-left:10px;">内容浏览</div>
      </div>
    </div>
    <div class="article-title">{{title}}</div>
    <div v-for="item in contentComponents" :key="item.content">
      <div v-html="item.content" v-if="item.type == 'text'"></div>
      <figure v-else style="text-align:center;">
      <el-image style="width:90%; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); border-radius:8px; overflow-hidden;" :src="item.content" :preview-src-list="[item.content]">(点击查看大图)</el-image>
      <figcaption style="font-size:14px; color:#909399;margin-top:10px;">（点击查看大图）</figcaption>
      </figure>
    </div>
    <div style="flex-grow:1"></div>
    <div class="copyright">© Copyright 2016-2019, Wolf-Tungsten. All Rights Reserved 蒙ICP备18001061号</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      content: "",
      loading: false,
      contentComponents: [],
      imageList:[]
    };
  },
  methods: {
    goBack() {
      try {
        this.$router.go(-1);
      } catch (e) {
        this.$router.replace({ name: "home" });
      }
    }
  },
  async created() {
    this.loading = true;
    console.log(this.$route);
    let res = await axios.get(
      `//wolf-tungsten.com/tungsten-blog-srv/public-api/v1/article?articleCode=${this.$route.params.code}`
    );
    if (!res.data.success) {
      this.$router.replace({ name: "home" });
      return;
    }
    let article = res.data.result;
    this.title = article.title;
    let content = article.content;

    let imgUrls = content.match(/<figure class="image"><img src="(https:\/\/cdn\.wolf-tungsten\.com\/tungsten-blog-public\/[0-9a-z-]+\.[pngje]*)">.*?<\/figure>/g)
    if(imgUrls){
      imgUrls = imgUrls.map(i => {
        return /<figure class="image"><img src="(https:\/\/cdn\.wolf-tungsten\.com\/tungsten-blog-public\/[0-9a-z-]+\.[pngje]*)">.*?<\/figure>/g.exec(i)
      })
    }
    //imgUrls = Array.from(imgUrls, m => m);
    let contentComponents = []
    if(imgUrls && imgUrls.length > 0){
      let startPosition = 0
      for(let img of imgUrls){
        let endPosition = content.indexOf(img[0])
        contentComponents.push({
          type:'text',
          content:content.slice(startPosition, endPosition)
        })
        contentComponents.push({
          type:'image',
          content:img[1]
        })
        this.imageList.push(img[1])
        startPosition = endPosition + img[0].length
      }
      contentComponents.push({
          type:'text',
          content:content.slice(startPosition, content.length)
        })
    } else {
      contentComponents = [
        {
          type:'text',
          content
        }
      ]
    }
    this.contentComponents = contentComponents
    this.content = content
    this.loading = false;
  },
  mounted() {
    
  }
};
</script>

<style>
.image {
  text-align: center;
}

.image img {
  width: 90%;
  margin: 20px 0 20px 0;
}
.article-title {
  text-align: center;
  padding-top: 30px;
  margin-bottom: 10px;
  font-size: 24px;
  color: teal;
  font-weight: bold;
}

.article-content {
  margin: 0 20px 20px 20px;
}

@media screen and (max-width: 600px) {
  .article-content {
    margin: 0 5px 5px 5px;
  }
}
</style>