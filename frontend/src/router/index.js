import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import StoryView from '@/components/organisms/StoryView'
import Profile from '@/components/Profile'
import Post from '@/components/organisms/Post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        { path: '/write', component: Post, name: 'write', props: true },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/:user/:story_id',
      name: 'Story',
      component: StoryView,
      props: true
    },
    {
      path: '/:userId',
      name: 'Profile',
      component: Profile,
      props: true
    }
  ]
})
