import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUpPage from "../views/SignUpPage.vue";
import AlbumDetailPage from "../views/AlbumDetailPage.vue";
import AlbumsPage from "../views/AlbumsPage.vue";
import Auth from "@aws-amplify/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUpPage,
  },
  {
    path: "/album/:id",
    name: "AlbumDetailPage",
    component: AlbumDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/albums",
    name: "AlbumsPage",
    component: AlbumsPage,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = await Auth.currentUserInfo();
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
