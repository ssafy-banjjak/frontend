<script setup>
import ShortCard from "@/components/short/ShortCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const click = (shortId) => {
  router.push({
    name: "short",
    params: { shortId: shortId },
    query: { isUser: "true" },
  });
};
const shorts = [
  {
    shortId: 1,
    title: "제목입니다!11",
    content: "내용인데 ㄴㅇㄹㅁㄴㅇ11",
    filePath: "/short1.mp4",
    image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    region: "부산광역시",
    like: 1445234311,
    dislike: 22323422,
  },
  {
    shortId: 2,
    title: "제목입니다!22",
    content: "내용인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
    filePath: "/short2.mp4",
    image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    region: "부산광역시",
    like: 13311,
    dislike: 23222,
  },
  {
    shortId: 3,
    title: "제목입니다!33",
    content: "내용인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
    filePath: "/short3.mp4",
    image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    region: "부산광역시",
    like: 1123231,
    dislike: 222111,
  },
  {
    shortId: 4,
    title: "제목입니다!44",
    content: "내용인데 ㄴㅇㄹㅁㄴㅇ11",
    filePath: "/short1.mp4",
    image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    region: "부산광역시",
    like: 1123231,
    dislike: 221232,
  },
  {
    shortId: 5,
    title: "제목입니다!55",
    content: "내용인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
    filePath: "/short2.mp4",
    image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    region: "부산광역시",
    like: 2323,
    dislike: 222,
  },
  {
    shortId: 6,
    title: "제목입니다!66",
    content: "내용인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
    filePath: "/short3.mp4",
    image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    region: "부산광역시",
    like: 111,
    dislike: 222,
  },
];
</script>
<template>
  <div class="d-flex flex-wrap justify-center">
    <v-sheet v-for="(short, index) in shorts" :key="index">
      <ShortCard @click="() => click(short.shortId)" :short="short"></ShortCard>
    </v-sheet>
  </div>
</template>

<style scoped></style>
