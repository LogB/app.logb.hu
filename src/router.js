import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/shared",
      name: "shared",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Shared.vue")
    },
    {
      path: "/my-measurements",
      name: "my-measurements",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/MyMeas.vue")
    },
    {
      path: "/view/:id",
      name: "view",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/View.vue")
    },
    {
      path: "/petereasteregg",
      name: "petereasteregg",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "peterpart" */ "./views/PeterEasterEgg.vue")
    }
  ]
});
