<template>
  <div id="app">
    <el-container style="height:100%">
      <el-aside style="height:100%; border-right: solid 1px #F2F6FC;"> 
        <div id="aside">
          <div id="tungsten-title">@狼剩子</div>
          <iframe src="https://ghbtns.com/github-btn.html?user=wolf-tungsten&type=follow&count=true" frameborder="0" scrolling="0" width="190px" height="20px"></iframe>
          <div id="tungsten-avatar-box">
            <img id="tungsten-avatar" src="./assets/avatar.jpg"/>
            <div id="tungsten-avatar-note">
              你的BUG像一条恶犬 🐶，撞乱我心弦
            </div>
          </div>
          <div id="tungsten-brief">
              <div class="tungsten-brief-item">
                🎓 东南大学计算机科学与技术专业本科生
              </div>
              <div class="tungsten-brief-item">
                🐵 东南大学小猴偷米工作室 2018 届站长
              </div>
              <div class="tungsten-brief-item">
                📭 gaoruihao@wolf-tungsten.com
              </div>
              <div class="tungsten-brief-item">
                👬 欢迎技术交流
              </div>
          </div>
          <div id="tungsten-music">
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=260 height=86 src="//music.163.com/outchain/player?type=2&id=25706282&auto=1&height=66"></iframe>
          </div>
        </div>
      </el-aside>
      <el-main style="height:100%">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
html{
  height:100%;
}
body{
  height: 100%;
  margin:0;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#aside{
  display: flex;
  flex-direction: column;
  align-items: center;
}

#tungsten-title{
  font-size: 36px;
  margin-top: 40px;
  margin-bottom : 10px;
}

#tungsten-avatar-box{
  width: 240px;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: #EBEEF5;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#tungsten-avatar{
  width: 240px;
  height: 240px;
  
}
#tungsten-avatar-note{
  font-size: 14px;
  margin: 5px 10px 15px 15px;
  text-align: left;
}
#tungsten-music{
  width: 260px;
  height: 86px;
  border-radius: 8px;
  overflow: hidden;
  margin-top:20px;
}
#tungsten-brief{
  width: 240px;
  margin-top: 30px; 
  border-top: solid 1px #EBEEF5;
}
.tungsten-brief-item{
  font-size: 14px;
  text-align: left;
  color:#909399;
  border-bottom: solid 1px #EBEEF5;
  margin-top: 10px;
  padding-bottom: 10px; 
}

.player{
  box-shadow: none;
}
</style>
