<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Button from "./item/Button.vue";

const router = useRouter();

const headers = ref([
  { text: "글 번호", align: "center", value: "articleno" },
  { text: "제목", align: "start", value: "title" },
  { text: "작성자", align: "center", value: "userid" },
  { text: "작성일시", align: "center", value: "registDate" },
  { text: "조회수", align: "center", value: "hit" },
]);
const document = ref([]);
const options = ref({
  multiSort: true,
  sortBy: [],
  sortDesc: [],
  page: 1,
  itemsPerPage: 5,
});
const footerOptions = ref([5, 10, 25]);
const totalCount = ref(0);
const loading = ref(false);
const conditions = ref([
  { text: "경기도", value: "1" },
  { text: "서울특별시", value: "2" },
  { text: "강원도", value: "3" },
  { text: "충청도", value: "4" },
  { text: "경상도", value: "5" },
  { text: "전라도", value: "6" },
  { text: "대구광역시", value: "7" },
  { text: "부산광역시", value: "8" },
  { text: "울산광역시", value: "9" },
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
const schType = ref("");
const schVal = ref("");

// const getBoardDataFromAPI = async (page, itemsPerPage, sort) => {
//   try {
//     const response = await getBoardListAPI({
//       params: {
//         schType: schType.value,
//         schVal: schVal.value,
//         page: page,
//         rows: itemsPerPage,
//         sort: encodeURIComponent(sort),
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getBoardList = async () => {
//   loading.value = true;

//   try {
//     const { sortBy, sortDesc, page, itemsPerPage } = options.value;
//     let sort = [];

//     if (sortBy.length > 0) {
//       sort = sortBy.map((value, index) => {
//         return (
//           value.replace(/[A-Z]/g, (str) => "_" + str[0]).toUpperCase() +
//           " " +
//           (sortDesc[index] ? "desc" : "asc")
//         );
//       });
//     } else {
//       sort.push("DOC_NO desc");
//     }

//     const response = await getBoardDataFromAPI(page, itemsPerPage, sort);
//     const items = response.data;
//     const total = response.total;

//     setTimeout(() => {
//       loading.value = false;
//       document.value = items;
//       totalCount.value = total;
//     }, 1000);
//   } catch (error) {
//     console.error(error);
//   }
// };

function moveArticle(event, item) {
  const articleno = item.item.articleNo;

  router.push({ name: "post-detail", params: { articleno: articleno } });
}

// watch(
//   options,
//   () => {
//     getBoardList();
//   },
//   { deep: true }
// );

// onMounted(() => {
//   getBoardList();
// });
</script>

<template>
  <v-container>
    <v-card elevation="10" outlined width="100%" class="mx-auto">
      <v-card-title> 반짝 여행 </v-card-title>
      <v-card-text>
        <v-row>
          <v-col align-self="end" cols="12" md="2">
            <v-select
              v-model="schType"
              label="검색조건"
              :items="conditions"
            ></v-select>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="schVal"
              label="검색어"
              single-line
              @keypress.enter.prevent="getBoardList"
            ></v-text-field>
          </v-col>
          <v-col align-self="center">
            <Button
              @click="getBoardList"
              color="blue-grey darken-1"
              rounded
              small
              block
              iconName="mdi-magnify"
              btnName="Search"
            ></Button>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              class="elevation-1"
              @click:row="onClickRow"
              :headers="headers"
              :items="articles"
              :options="options"
              :server-items-length="totalCount"
              :items-per-page-options="footerOptions"
              :loading="loading"
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-fab-transition>
      <Button
        @click="moveArticle"
        color="blue-grey darken-1"
        fab
        left
        bottom
        fixed
        iconName="mdi-pencil"
      ></Button>
    </v-fab-transition>
  </v-container>
</template>

<style scoped></style>
