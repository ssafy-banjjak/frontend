<script setup>
import { useUserStore } from "@/store/user";
import MyPage from "@/components/mypage/MyPage.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
console.log(userStore.isLogin);
console.log(isLogin);
const isLogin = true;
if (!isLogin) {
  router.push({ name: "login" });
}
</script>

<template>
  <MyPage />
</template>

<style scoped></style>
