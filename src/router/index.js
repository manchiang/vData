import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/index',
  },
  {
    path: "/index",
    component: () => import(`@/views/Index.vue`),
    meta: {
      title: "看板"
    }
  },
  {
    path: "/signin",
    component: () => import(`@/views/SignIn.vue`),
    meta: {
      title: "登录"
    }
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
