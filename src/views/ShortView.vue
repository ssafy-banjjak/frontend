<script setup>
import Short from "@/components/short/Short.vue";
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
  <Short />
</template>

<style scoped></style>
