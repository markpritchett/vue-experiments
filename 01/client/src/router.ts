import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Callback from "./views/Callback.vue";
import Unauthorized from "./views/Unauthorized.vue";
import Oidc from "oidc-client";
import config from "./config";

const mgr = new Oidc.UserManager(config);
Vue.use(Router);

let router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about/:id",
      name: "about",
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/super-admin",
      name: "superAdmin",
      component: () =>
        import(/* webpackChunkName: "superAdmin" */ "./views/SuperAdmin.vue"),
      beforeEnter: (to, from, next) => {
        if(!router.app.$store.state.roles.includes('SuperAdminUser')) {
          router.push({ path: "/" }); 
        } else {
          next();
        }
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: Unauthorized
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (router.app.$store.state.authenticated) {
    next();
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    localStorage.setItem("requestPath", to.path);
    mgr.signinRedirect();
  } else {
    next();
  }
});

export default router;
