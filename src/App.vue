<script setup>
import TheHeader from "./layouts/TheHeader.vue";
</script>

<template>
  <v-app class="main-color">
    <TheHeader />
    <v-main class="main">
      <router-view id="router" :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
.main {
  display: flex;
  flex: 1;
  align-items: stretch; /* 수직 방향으로 꽉 채우기 */
}
</style>
