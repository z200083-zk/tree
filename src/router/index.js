import Vue from 'vue'
import VueRouter from 'vue-router'
import adminHome from '@/admin/nav'
import adminLogin from '@/admin/login'
import notfount from '@/admin/notfount'
import adminVideo from '@/admin/video'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/admin/',
      name: 'adminHome',
      component: adminHome,
      children: [
        {
          path: '/admin/video',
          name: 'adminVideo',
          component: adminVideo
        }
      ]
    },
    {
      path: '/admin/login',
      name: '/adminLogin',
      component: adminLogin
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
