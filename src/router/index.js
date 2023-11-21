// Composables
import { createRouter, createWebHistory } from "vue-router";
import HomeViewVue from "@/views/HomeView.vue";
import AttractionViewVue from "@/views/AttractionView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeViewVue,
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
    redirect: { name: "post-list" },
    children: [
      {
        path: "list",
        name: "post-list",
        component: () => import("@/components/post/PostList.vue"),
      },
      {
        path: "detail/:articleno",
        name: "post-detail",
        component: () => import("@/components/post/PostDetail.vue"),
      },
      {
        path: "write",
        name: "post-write",
        component: () => import("@/components/post/PostWrite.vue"),
      },
      {
        path: "modify",
        name: "post-modify",
        component: () => import("@/components/post/PostModify.vue"),
      },
    ],
  },
  {
    path: "/attraction",
    name: "attraction",
    component: AttractionViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
