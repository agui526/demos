<template>
  <div id="app">
    <view-box>
      <x-header class="header" slot='header' title='网易' :left-options='{showBack: true}'>
        <div slot='right'>更多</div>
      </x-header>

      <sc :lock-y='true'>
        <div class="tab">
          <tab class='tab'>
            <tab-item selected>头条</tab-item>
            <tab-item>视频</tab-item>
            <tab-item>杭州</tab-item>
            <tab-item>热点</tab-item>
            <tab-item>体育</tab-item>
            <tab-item>轻松一刻</tab-item>
            <tab-item>跟帖</tab-item>
            <tab-item>新时代</tab-item>
            <tab-item>房产</tab-item>
            <tab-item>网易号</tab-item>
          </tab>
        </div>
      </sc>

      <scroller class="my-sc" :on-refresh="refresh" refresh-text="上拉刷新" :on-infinite="infinite" ref="myRef">
        <swiper :list='swiperList' v-model='swiperIndex' :loop='true' :auto='true'>
        </swiper>

        <marquee class='my-marquee'>
          <marquee-item v-for="list in marqueeList">{{ list.title }}</marquee-item>
        </marquee>

        <panel :list='dataList'>
        </panel>

        <panel :list="moreDataList">
        </panel>
      </scroller>

      <tabbar slot='bottom'>
        <tabbar-item>
          <span slot='label'>首页</span>
        </tabbar-item>
        <tabbar-item>
          <span slot='label'>推荐</span>
        </tabbar-item>
        <tabbar-item>
          <span slot='label'>我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>

    <router-view></router-view>
  </div>
</template>

<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, Tab, TabItem, Scroller as sc, Swiper, Marquee, MarqueeItem, Panel } from 'vux'

var refreshKey = ['A', 'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B010']
var key = 0, keyValue = 'A'
var start = 0, end = start + 9
var initLoaded = false

function getRefreshKey() {
  key++
  if (key === refreshKey.length) key = 0
  keyValue = refreshKey[key]
}

export default {
  name: 'App',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Tab,
    TabItem,
    sc,
    Swiper,
    Marquee,
    MarqueeItem,
    Panel
  },
  created() {
    this.$jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html')
      .then(data => {
        this.swiperList = data.focus.filter(item => item.addata === null && item.picInfo[0])
          .map(item => {
            return {
              url: item.link,
              img: item.picInfo[0].url,
              title: item.title
            }
          });
        this.dataList = data.list.filter(item => item.addata === null && item.picInfo[0])
          .map(item => {
            return {
              src: item.picInfo[0].url,
              title: item.title,
              desc: item.digest,
              url: item.link
            }
          });
        this.marqueeList = data.live.filter(item => item.addata === null && item.picInfo[0])
          .map(item => {
            return {
              title: item.title
            }
          });
      }
      )
    initLoaded = true
  },
  data() {
    return {
      swiperList: [],
      swiperIndex: 1,
      dataList: [],
      marqueeList: [],
      moreDataList: []
    }
  },
  methods: {
    refresh() {
      // console.log(this.$refs.myRef)
      getRefreshKey()
      this.$jsonp(`http://3g.163.com/touch/jsonp/sy/recommend/0-9.html`,
        { miss: '00', refresh: keyValue })
        .then(data => {
          console.log(data)
          this.dataList = data.list.filter(item => item.addata === null && item.picInfo[0])
            .map(item => {
              return {
                src: item.picInfo[0].url,
                title: item.title,
                desc: item.digest,
                url: item.link
              }
            });
          this.$refs.myRef.finishPullToRefresh()
          this.$vux.toast.text(`刷新了${this.dataList.length}条数据`, 'top')
        })
    },
    infinite() {
      if (!initLoaded) {
        this.$refs.myRef.finishInfinite()
        return
      }
      console.log('infinite')
      this.$jsonp(`http://3g.163.com/touch/jsonp/sy/recommend/${start}-${end}.html`, {
        miss: '00', refresh: keyValue
      })
        .then(data => {
          setTimeout(() => {
            var dataList = data.list.filter(item => item.addata === null && item.picInfo[0])
              .map(item => {
                return {
                  src: item.picInfo[0].url,
                  title: item.title,
                  desc: item.digest,
                  url: item.link
                }
              });
          }, 1000)

          this.moreDataList = this.moreDataList.concat(dataList)

          start += 10
          end = start + 9
          this.$refs.myRef.finishInfinite()
        })
    }
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  height: 100%;

  .tab {
    width: 1200px;
    margin-top: 46px;
  }

  .my-marquee {
    margin: 10px;
  }

  .header {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9;
  }

  .loading-layer {
    padding-bottom: 90px;
  }

  .weui-media-box__hd,
  .weui-media-box__hd img {
    width: 102px;
    height: 78px;
  }

  .weui-media-box__bd {
    height: 78px;
  }

  .my-sc {
    top: 90px;
  }
}
</style>
