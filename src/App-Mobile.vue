<template>
  <div id="app-mobile">
    <router-view></router-view>
  </div>
</template>

<script>
//import MusicPlayer from './components/MusicPlayer'
export default {
  name: 'app'
}
</script>

<style>
#app-mobile {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 30px 20px;
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
  width: 220px;
  height: 36px;
  border-radius: 8px;
  padding: 10px;
  overflow: hidden;
  margin-top:20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#tungsten-music-inner{
  margin: -10px;
  height: 76px;
  overflow: hidden;
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
