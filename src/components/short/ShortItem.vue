<script setup>
import { defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const isUser = route.query.isUser;

const props = defineProps({
  short: Object,
  nextId: Number,
  prevId: Number,
});
const short = props.short;
const nextId = props.nextId;
const toNext = () => {
  console.log("next");
  if (isUser != null) {
    router.replace({
      name: "short",
      params: { shortId: nextId },
      query: { isUser: "Y" },
    });
  } else {
    router.replace({ name: "short", params: { shortId: nextId } });
  }
};
const prevId = props.prevId;
const toPrev = () => {
  console.log("prev");
  if (isUser != null) {
    router.replace({
      name: "short",
      params: { shortId: prevId },
      query: { isUser: "Y" },
    });
  } else {
    router.replace({ name: "short", params: { shortId: prevId } });
  }
};

const like = () => {
  console.log("like");
};

const dislike = () => {
  console.log("dislike");
};

const registShort = () => {
  router.push({ name: "short-regist" });
};
</script>

<template>
  <div style="position: relative">
    <video
      :src="short.filePath"
      class="rounded-video"
      width="450"
      height="800"
      loop
      muted
      autoplay
    ></video>
    <div class="box d-flex justify-space-between">
      <div class="align-self-end desc ma-7">
        <h2>{{ short.title }}</h2>
        <h4 class="overflow-ellipsis">{{ short.content }}</h4>
      </div>
      <div
        style="height: 100%"
        class="d-flex flex-column justify-space-between"
      >
        <div>
          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-chevron-up"
            color="white"
            size="x-large"
            @click="toPrev"
          ></v-btn>
        </div>

        <div class="d-flex flex-column align-center">
          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-thumb-up"
            color="white"
            size="x-large"
            @click="like"
          ></v-btn>
          <span class="text"> 좋아요</span>

          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-thumb-down"
            color="white"
            size="x-large"
            @click="dislike"
          ></v-btn>

          <span class="text">싫어요</span>
          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-chevron-down"
            color="white"
            size="x-large"
            @click="toNext"
          ></v-btn>
        </div>
      </div>
    </div>
  </div>
  <v-btn
    class="ma-2 plus"
    variant="text"
    icon="mdi-plus"
    color="black"
    size="x-large"
    @click="registShort"
  ></v-btn>
</template>

<style scoped>
.plus {
  position: fixed;
  bottom: 0;
  right: 0;
}
.rounded-video {
  border-radius: 15px; /* 테두리를 둥글게 만들기 위한 속성 */
}

.box {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.text {
  color: white;
  font-weight: bold;
  margin-top: -25px;
}
.desc {
  color: white;
}

.overflow-ellipsis {
  white-space: nowrap; /* 줄 바꿈 금지 */
  overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
  text-overflow: ellipsis; /* 초과된 텍스트를 ...으로 표시 */
  max-width: 100%; /* 최대 너비를 지정 (원하는 만큼 조절) */
}
</style>
