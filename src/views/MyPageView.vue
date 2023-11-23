<script setup>
import MyPage from "@/components/mypage/MyPage.vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);
if (!isLogin.value) {
  router.push({ name: "login" });
}
</script>

<template>
  <MyPage />
</template>

<style scoped></style>
