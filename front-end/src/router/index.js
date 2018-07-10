import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/Login'
import MainPage from '@/page/MainPage'
import Header from '@/components/Header'
import UserData from '@/components/UserData'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      children:[
        {
          path: '/MainPage/UserData',
          component: UserData,
        },
        {
          path: '/MainPage/HelloWorld',
          component: HelloWorld
        },
        {
          path: '/MainPage/Header',
          component: Header
        }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      alias: '/login'
    }
  ]
})
