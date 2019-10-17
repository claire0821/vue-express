<template>
  <div class="liveView">
    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
    </video-player>
    <!-- <button class="btn btn-primary" type="button" @click="enterStream">Apply</button> -->
  </div>
</template>

<script>

export default {
  name: 'live',
  components: {
    // Switcher
  },
  data () {
    return {
      initialized: false,
      currentTech: 'RTMP',
      streams: {
        // rtmp: 'rtmp://media3.sinovision.net:1935/live/livestream',
        rtmp: 'rtmp://192.168.1.221:1935/live/home',
        hls: ''
      },
      playerOptions: {
        overNative: true,
        autoplay: true,
        controls: true,
        techOrder: ['flash', 'html5'],
        sourceOrder: true,
        flash: {
          hls: { withCredentials: false },
          swf: '/static/media/video-js.swf'
        },
        // html5: { hls: { withCredentials: false } },
        sources: [
          {
            type: 'rtmp/mp4',
            // src: 'rtmp://media3.sinovision.net:1935/live/livestream'
            src: 'rtmp://192.168.1.221:1935/live/home'
          }
          // {
          //   withCredentials: false,
          //   type: 'application/x-mpegURL',
          //   src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
          // }
        ]
        // poster: isProduction ? '/vue/client/static/images/logo.png' : '/client/static/images/logo.png'
        // controlBar: {
        //   timeDivider: false, // 时间分割线
        //   durationDisplay: false, // 总时间
        //   progressControl: true, // 进度条
        //   customControlSpacer: true, // 未知
        //   fullscreenToggle: true // 全屏
        // },
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    onPlayerReadied () {
      if (!this.initialized) {
        this.initialized = true
        this.currentTech = this.player.techName_
      }
    },
    // record current time
    onTimeupdate (e) {
      console.log('currentTime', e.cache_.currentTime)
    }
  }
}
</script>

<style scoped>
.liveView {
  position: relative;
}

.selectWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 30px;
  margin: 20px;
  vertical-align: baseline;
}

.inputWrapper {
  width: 500px;
  margin: 0 auto;
}

.buttonWrapper {
  text-align: center;
}
</style>
