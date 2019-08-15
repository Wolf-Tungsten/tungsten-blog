<template>
  <div class="music-box">
      <i class="play-button el-icon-video-pause" v-if="playing" @click="togglePlay"></i>
      <i class="play-button el-icon-video-play" v-else @click="togglePlay"></i>
      <el-slider class="music-slider" v-model="process" :show-tooltip="false" @change="changeProcess"></el-slider>
      <audio src="http://static.wolf-tungsten.com/bgm.mp3" ref="audio" loop="true">
      </audio>
  </div> 
</template>

<script>
import { setInterval, clearInterval } from 'timers';
export default {
    data(){
        return{
            playing:false,
            process:50,
            audio:null
        }
    },
    methods:{
        togglePlay(){
            if(this.playing){
                this.playing = false
                this.audio.pause()
            } else {
                this.playing = true
                this.audio.play()
            }
        },
        changeProcess(){
            this.audio.currentTime = this.process/100 * this.audio.duration
        }
    },
    created(){
        
    },
    mounted(){
        this.audio = this.$refs['audio']
        this.playProcessCheck = setInterval(()=>{
            this.process = this.audio.currentTime/this.audio.duration * 100
        }, 1000)
    },
    destroyed(){
        clearInterval(this.playProcessCheck)
    }
}
</script>

<style>
.music-box{
    width:100%;
    display: flex;
    align-items: center;
}
.play-button::before{
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: teal;
    margin-left: 10px;
}
.music-slider{
    margin-left: 15px;
    flex-grow: 1;
    margin-right: 15px;
}
</style>