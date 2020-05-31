import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import Calendar from './views/Calendar.vue';
import Doodle from './views/Doodle.vue';
// import About from './views/About.vue';
import Login from './views/Login.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',

  base: process.env.BASE_URL,

  scrollBehavior: () => ({ x: 0, y: 0 }),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // {
    //   path: '/calendar',
    //   name: 'calendar',
    //   component: Calendar,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About,
    // },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/doodle',
      name: 'doodle',
      component: Doodle,
    },
  ],
});
