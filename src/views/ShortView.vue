<script setup>
import Short from "@/components/short/Short.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const route = useRoute();
const shortId = route.params.shortId;
console.log("shortId" + shortId);
let shorts = [];
const isUser = route.query.isUser;
if (isUser != null) {
  shorts = [
    {
      shortId: 1,
      title: "제목입니다!11",
      content: "유저인데 ㄴㅇㄹㅁㄴㅇ11",
      filePath: "/short1.mp4",
    },
    {
      shortId: 2,
      title: "제목입니다!22",
      content: "유저인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
      filePath: "/short2.mp4",
    },
    {
      shortId: 3,
      title: "제목입니다!33",
      content: "유저인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
      filePath: "/short3.mp4",
    },
    {
      shortId: 4,
      title: "제목입니다!44",
      content: "유저인데 ㄴㅇㄹㅁㄴㅇ11",
      filePath: "/short1.mp4",
    },
    {
      shortId: 5,
      title: "제목입니다!55",
      content: "유저인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
      filePath: "/short2.mp4",
    },
    {
      shortId: 6,
      title: "제목입니다!66",
      content: "유저인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
      filePath: "/short3.mp4",
    },
    {
      shortId: 7,
      title: "제목입니다!77",
      content: "유저인데 ㄴㅇㄹㅁㄴㅇ11",
      filePath: "/short1.mp4",
    },
    {
      shortId: 8,
      title: "제목입니다!88",
      content: "유저인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
      filePath: "/short2.mp4",
    },
    {
      shortId: 9,
      title: "제목입니다!99",
      content: "유저인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
      filePath: "/short3.mp4",
    },
    {
      shortId: 10,
      title: "제목입니다!10",
      content: "유저인데 ㄴㅇㄹㅁㄴㅇ11",
      filePath: "/short1.mp4",
    },
    {
      shortId: 11,
      title: "제목입니다!11",
      content: "유저인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
      filePath: "/short2.mp4",
    },
    {
      shortId: 12,
      title: "제목입니다!12",
      content: "내용인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
      filePath: "/short3.mp4",
    },
  ];
} else {
  //shortId로 shorts 10개 불러오기?
  shorts = [
    {
      shortId: 1,
      title: "제목입니다!11",
      content: "내용인데 ㄴㅇㄹㅁㄴㅇ11",
      filePath: "/short1.mp4",
    },
    {
      shortId: 2,
      title: "제목입니다!22",
      content: "내용인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
      filePath: "/short2.mp4",
    },
    {
      shortId: 3,
      title: "제목입니다!33",
      content: "내용인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
      filePath: "/short3.mp4",
    },
    {
      shortId: 4,
      title: "제목입니다!44",
      content: "내용인데 ㄴㅇㄹㅁㄴㅇ11",
      filePath: "/short1.mp4",
    },
    {
      shortId: 5,
      title: "제목입니다!55",
      content: "내용인데 어ㅁㄴㅇㄹㅁㄴㅇ22",
      filePath: "/short2.mp4",
    },
    {
      shortId: 6,
      title: "제목입니다!66",
      content: "내용인데 어쩌구저쩌구ㄴㅁㄴㅇ33",
      filePath: "/short3.mp4",
    },
  ];
}
const short = shorts.filter((s) => s.shortId == shortId)[0];
console.log(short);
const shortIdx = shorts.indexOf(short);
console.log(shortIdx);
if (shortIdx == 0) {
  //페이지 앞에꺼 가져오기
}

if (shortIdx == 5) {
  //페이지 뒤에꺼 가져오기
}
const nextId = shorts[shortIdx + 1].shortId;
const prevId = shorts[shortIdx - 1].shortId;
</script>

<template>
  <Short :short="short" :nextId="nextId" :prevId="prevId" />
</template>

<style scoped></style>
