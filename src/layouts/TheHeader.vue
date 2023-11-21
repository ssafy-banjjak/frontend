<script setup>
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { userId } = storeToRefs(useUserStore);
//서버에서 랜덤하게 userId지역에 맞는 쇼츠 아이디 하나 가져오기.
//예시로 1 => /short3.mp4
const randomShortId = ref(2);
</script>

<template>
  <v-app-bar color="white">
    <router-link to="/" class="mx-2">
      <v-icon color="secondary" icon="$vuetify" size="x-large"></v-icon>
    </router-link>
    <router-link to="/" class="mx-2">
      <v-app-bar-title>반짝</v-app-bar-title>
    </router-link>
    <v-spacer></v-spacer>

    <router-link
      :to="{ name: 'short', params: { shortId: randomShortId } }"
      class="mx-2"
      >반짝</router-link
    >
    <router-link :to="{ name: 'post' }" class="mx-2">반짝 여행</router-link>
    <router-link :to="{ name: 'attraction' }" class="mx-2"
      >여행지 검색</router-link
    >
    <router-link :to="{ name: 'mypage' }" class="mx-2">마이페이지</router-link>
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
