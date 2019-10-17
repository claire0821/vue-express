<template>
<<<<<<< HEAD
<v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"
            @ready="playerReadied">
          </video-player>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
  data () {
    return {
      playerOptions: {
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: '/static/images/author.jpg'
      }
    }
  },
  components: {
    videoPlayer
  },
  mounted () {
    console.log('this is current player instance object', this.player)
  },
=======
  <div class="liveView">
    <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" @ready="onPlayerReadied" @timeupdate="onTimeupdate">
    </video-player>
    <!-- <button class="btn btn-primary" type="button" @click="enterStream">Apply</button> -->
  </div>
</template>

<script>
// import Switcher from '@/components/Switcher'

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
        rtmp: 'rtmp://media3.sinovision.net:1935/live/livestream',
        // rtmp: 'rtsp://192.168.1.101:554/majorAV',
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
            src: 'rtmp://media3.sinovision.net:1935/live/livestream'
            // src: 'rtsp://192.168.1.101:554/majorAV'
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
>>>>>>> 利用vue-video-player和videojs-flash增加rtmp实时直播
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
<<<<<<< HEAD
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      console.log('player play!', player)
    },
    onPlayerPause (player) {
      console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
=======

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
>>>>>>> 利用vue-video-player和videojs-flash增加rtmp实时直播
    }
  }
}
</script>
<<<<<<< HEAD
=======

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
>>>>>>> 利用vue-video-player和videojs-flash增加rtmp实时直播
