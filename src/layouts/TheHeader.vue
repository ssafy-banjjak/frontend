<script setup></script>

<template>
  <v-app-bar color="white">
    <router-link to="/" class="mx-2">
      <v-icon color="warning" icon="$vuetify" size="x-large"></v-icon>
    </router-link>
    <router-link to="/" class="mx-2">
      <v-app-bar-title>반짝</v-app-bar-title>
    </router-link>
    <v-spacer></v-spacer>

    <router-link :to="{ name: 'short' }" class="mx-2">반짝</router-link>
    <router-link :to="{ name: 'post' }" class="mx-2">반짝 여행</router-link>
    <router-link :to="{ name: 'attraction' }" class="mx-2"
      >여행지 검색</router-link
    >
    <router-link :to="{ name: 'user' }" class="mx-2">마이페이지</router-link>
  </v-app-bar>
</template>

<style scoped>
.logo {
  font-size: 1.25rem;
  min-width: 0;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.75rem;
  text-transform: none;
}
</style>
