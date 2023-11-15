// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/short",
    name: "short",
    component: () => import("@/views/ShortView.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView.vue"),
    children: [
      {
        path: "signup",
        name: "signup",
        component: () => import("@/components/user/UserSignup.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/components/user/UserLogin.vue"),
      },
      {
        path: "mypage",
        name: "mypage",
        component: () => import("@/components/user/UserMyPage.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/components/user/UserLogin.vue"),
      },
    ],
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
