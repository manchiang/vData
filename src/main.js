import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import "./assets/common.less";
import { api_post, api_get } from "./assets/api/_axios";
import { RANDOMCOLOR } from "./utils/randomcolor";
Vue.config.productionTip = false

// 轮播组件
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(vueSwiper);

// 无缝滚动插件
import infiniteScroll from 'vue-seamless-scroll'
Vue.use(infiniteScroll)

// Element
import './utils/elements'


// 全局监听事件
var Event = new Vue()
Vue.prototype.$Event = Event

// 全局变量&定时器
Vue.prototype.$global = {
  img: "http://wondware.oss-cn-hangzhou.aliyuncs.com/powerlongbkImg/",
  RANDOMCOLOR: RANDOMCOLOR,//随机颜色
  timer_secons: '',//Index-右上角计时器
  timer_pie_one: '',
  timer_pie_two: '',
  timer_pie_four: '',
  timer_pie_nine: '',
  timer_pie_ten: '',
  timer_pie_elev: '',
  timer_views: '',//物资监控、业务监控、告警监控loop
  timer_views_secons: 60000,//标签轮播时间间隔
  timer_single: '',
  timer_single_secons: 40000//全局刷新时间
}



// 全局函数
Vue.prototype.setFontSize = function fontSize(res) {
  let docEl = document.documentElement,
    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize = 100 * (clientWidth / 1920);
  return res * fontSize;
}

// api封装
Vue.prototype.api_post = api_post;
Vue.prototype.api_get = api_get;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
