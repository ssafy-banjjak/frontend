<script setup></script>

<template>
  <!-- <header>
    <v-container style="background-color: lightblue; height: 80px">
      <v-row justify="space-between">
        <v-col cols="1" style="background-color: red; min-width: 100px">
          <v-icon
            color="info"
            icon="$vuetify"
            size="x-large"
            class="ml-1"
          ></v-icon>
          <span class="text-h5 font-weight-bold">반짝</span>
        </v-col>
        <v-col cols="2" style="background-color: blue"> hello </v-col>
      </v-row>
    </v-container>
  </header> -->
  <v-app-bar color="white">
    <!-- <template v-slot:prepend> -->
    <router-link to="/" class="mx-2">
      <v-icon color="warning" icon="$vuetify" size="x-large"></v-icon>
    </router-link>
    <router-link to="/" class="mx-2">
      <v-app-bar-title>반짝</v-app-bar-title>
    </router-link>

    <!-- </template> -->

    <v-spacer></v-spacer>

    <router-link to="short" class="mx-2">반짝</router-link>
    <router-link to="post" class="mx-2">반짝 여행</router-link>
    <router-link to="attraction" class="mx-2">여행지 검색</router-link>
    <router-link to="mypage" class="mx-2">마이페이지</router-link>
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
