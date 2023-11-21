<script setup>
import { defineProps } from "vue";

const props = defineProps({
  short: Object,
  height: Number,
  width: Number,
});
</script>

<template>
  <v-card
    class="ma-2 pa-2 shadow"
    height="480"
    width="270"
    :image="props.short.image"
  >
    <div class="card-description">
      <v-card-title>{{ props.short.title }} </v-card-title>
      <v-card-subtitle class="overflow-ellipsis">{{
        props.short.content
      }}</v-card-subtitle>
    </div>
    <div class="info d-flex flex-column align-center">
      <v-btn
        class="ma-2"
        variant="text"
        icon="mdi-thumb-up"
        color="white"
        size="small"
        @click="like"
      ></v-btn>
      <span class="text"> {{ props.short.like }}</span>

      <v-btn
        class="ma-2"
        variant="text"
        icon="mdi-thumb-down"
        color="white"
        size="small"
        @click="dislike"
      ></v-btn>

      <span class="text">{{ props.short.dislike }}</span>
    </div>
  </v-card>
</template>

<style scoped>
.card-description {
  color: white;
  margin-top: 400px; /* 아래로 내리고 싶은 만큼의 여백을 지정 */
}

.overflow-ellipsis {
  margin-top: -10px;
  white-space: nowrap; /* 줄 바꿈 금지 */
  overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
  text-overflow: ellipsis; /* 초과된 텍스트를 ...으로 표시 */
  max-width: 100%; /* 최대 너비를 지정 (원하는 만큼 조절) */
}

.text {
  font-size: 14px;
  margin-top: -10px;
}

.info {
  position: absolute;
  color: white;
  top: 0;
  margin-top: 330px;
  right: 0;
}
</style>
