import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/nav'
import Login from '@/views/login'
import notfount from '@/views/notfount'
import Xuan1 from '@/views/xuan1'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/xuan1',
          name: 'xuan1',
          component: Xuan1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'notfount',
      component: notfount
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  ],
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if (to.name != 'login') {
    if (!localStorage.getItem('token')) {
      router.push('login')
    }
  }
  next();
})



export default router
