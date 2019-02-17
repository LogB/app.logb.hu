import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "shared" */ './views/Home.vue'),
    },
    {
      path: "/shared",
      name: "shared",
      component: () => import(/* webpackChunkName: "shared" */ './views/Shared.vue'),
    },
    {
      path: "/my-measurements",
      name: "my-measurements",
      component: () => import(/* webpackChunkName: "my-measurements" */ './views/MyMeas.vue'),
    },
    {
      path: "/view/:id",
      name: "view",
      component: () => import(/* webpackChunkName: "view-measurement" */ './views/View.vue'),
    },
    {
      path: "/view",
      name: "open",
      component: () => import(/* webpackChunkName: "open-measurement" */ './views/Open.vue'),
    },
    {
      path: "/petereasteregg",
      name: "petereasteregg",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "peterpart",  webpackMode: "lazy" */ "./views/PeterEasterEgg.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
