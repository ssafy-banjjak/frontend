<script setup>
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
console.log(userStore.isLogin);
</script>

<template>
  <!-- 임시용 -->
  <!-- <router-link :to="{ name: 'signup' }">signup</router-link>
  <router-link :to="{ name: 'login' }">login</router-link>
  <router-link :to="{ name: 'mypage' }">mypage</router-link> -->
  <router-view></router-view>
</template>

<style scoped></style>
