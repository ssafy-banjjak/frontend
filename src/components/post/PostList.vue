<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { listArticle } from "@/assets/api/board";
// import { mdiPencil } from "@mdi/js";

import PostListItem from "../post/PostListItem.vue";
// import Button from "../common/Button.vue";

const route = useRoute();
const router = useRouter();

const conditions = ref([
  { text: "경기도", value: "article_no" },
  { text: "서울특별시", value: "subject" },
  { text: "강원도", value: "user_id" },
  { text: "충청도", value: "user_id" },
  { text: "경상도", value: "user_id" },
  { text: "전라도", value: "user_id" },
  { text: "대구광역시", value: "user_id" },
  { text: "부산광역시", value: "user_id" },
  { text: "울산광역시", value: "user_id" },
]);
const footerProps = [5, 10, 15, 20];
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const word = ref("");
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

// onMounted(() => {
//   getArticleList();
// });

function moveArticle(articleno) {
  router.push({ name: "article-detail", params: { articleno } });
}

// const getArticleList = () => {
//   console.log("서버에서 글목록 얻어오자!!!", param.value);
//   // API 호출
//   listArticle(param.value, ({ data }) => {
//     console.log(data);
//     articles.value = data.articles;
//     currentPage.value = data.currentPage;
//     totalPage.value = data.totalPageCount;
//   });
// };

const getText = (data) => {
  console.log(data);
};
const headers = ref([
  { text: "글번호", value: "articleNo" },
  { text: "제목", value: "title" },
  { text: "아이디", value: "userid" },
]);

const articles = [
  {
    articleNo: 1,
    title: "제목1",
    userid: "1234",
    region: "부산",
    content: "내용1",
    recruits: "4",
    date_time: "2023-11-14",
    place: "부산",
  },
  {
    articleNo: 2,
    title: "제목2",
    userid: "1234",
    region: "부산",
    content: "내용2",
    recruits: "4",
    date_time: "2023-11-14",
    place: "부산",
  },
  {
    articleNo: 3,
    title: "제목3",
    userid: "1234",
    region: "부산",
    content: "내용3",
    recruits: "4",
    date_time: "2023-11-14",
    place: "부산",
  },
  {
    articleNo: 4,
    title: "제목4",
    userid: "1234",
    region: "부산",
    content: "내용4",
    recruits: "4",
    date_time: "2023-11-14",
    place: "부산",
  },
  {
    articleNo: 5,
    title: "제목5",
    userid: "1234",
    region: "부산",
    content: "내용5",
    recruits: "4",
    date_time: "2023-11-14",
    place: "부산",
  },
];
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%">
      <v-card-text>
        <v-row>
          <v-col align-self="start" cols="12" md="2">
            <v-select
              v-model="param.key"
              label="지역"
              :items="conditions"
              item-title="text"
              item-value="value"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="8">
            <v-card><v-card-text>반짝 모집 게시판 </v-card-text></v-card>
          </v-col>
          <v-col align-self="start">
            <v-fab-transition>
              <v-btn
                @click="movePage('/write')"
                color="blue-grey darken-1"
                style="width: 100%; height: 52px"
              >
                <v-icon size="35">mdi-pencil</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              class="elevation-1"
              @click:row="moveArticle"
              :items="articles"
              :headers="headers"
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
