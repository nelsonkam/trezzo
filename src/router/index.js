import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Index from '@/components/Index'
import Setup from '@/components/SelectBoard'
import Vuelidate from 'vuelidate'
import VueHighlightJS from 'vue-highlightjs'
import VueClipboards from 'vue-clipboards'
import axios from 'axios'
import {SERVER_URL} from "@/config"
Vue.use(VueClipboards)
Vue.use(Vuelidate)
Vue.use(VueHighlightJS)
const WindowPlugin = {
  install(Vue) {
    Vue.prototype.window = window
  }
}
Vue.use(Router)
Vue.use(WindowPlugin)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup,
      beforeEnter(to, from, next) {
        const token = localStorage.getItem("jwt-token")
        if (token) {
          axios.post(SERVER_URL + '/verify', {token}).then(() => {
            next()
          }).catch((err) => {
            next("/signin")
          })
        } else {
          next("/signin")
        }
      }
    }
  ]
})
