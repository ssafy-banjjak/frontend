// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/short/:shortId",
    name: "short",
    component: () => import("@/views/ShortView.vue"),
  },
  {
    path: "/short-regist",
    name: "short-regist",
    component: () => import("@/components/short/ShortRegist.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/MyPageView.vue"),
    children: [
      {
        path: "",
        name: "mypage-post",
        component: () => import("@/components/mypage/items/MyPagePost.vue"),
      },
      {
        path: "short",
        name: "mypage-short",
        component: () => import("@/components/mypage/items/MyPageShort.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/user/UserLogin.vue"),
  },

  {
    path: "/signup",
    name: "signup",
    component: () => import("@/components/user/UserSignup.vue"),
  },

  {
    path: "/attraction",
    name: "attraction",
    component: () => import("@/views/AttractionView.vue"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("@/views/PostView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
