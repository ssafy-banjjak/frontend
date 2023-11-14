<script setup>
import TheHeader from "./layouts/TheHeader.vue";
</script>

<template>
  <v-app>
    <TheHeader />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>
