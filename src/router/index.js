// Composables
import { createRouter, createWebHistory } from "vue-router";
import HomeViewVue from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeViewVue,
  },
  {
    path: "/short",
    name: "short",
    component: () => import("@/views/ShortView.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/MyPageView.vue"),
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
    redirect: { name: "article-list" },
    children: [
      {
        path: "list",
        name: "article-list",
        component: () => import("@/components/post/PostList.vue"),
      },
      {
        path: "detail",
        name: "article-detail",
        component: () => import("@/components/post/PostDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
