<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listPost } from "@/api/post";
import Button from "./item/Button.vue";

const router = useRouter();

const headers = ref([
  { title: "글 번호", align: "center", value: "postId" },
  { title: "제목", align: "start", value: "title" },
  { title: "작성자", align: "center", value: "nickname" },
  { title: "지역", align: "center", value: "region" },
  { title: "모집인원", align: "center", value: "recruits" },
  { title: "작성일시", align: "center", value: "createDate" },
]);
const options = ref({
  multiSort: true,
  sortBy: [],
  sortDesc: [],
  page: 1,
  itemsPerPage: 5,
});

const footerOptions = ref([5, 10, 20]);
const totalCount = ref(0);
const loading = ref(false);

const conditions = ref([
  { text: "서울특별시", value: "서울특별시" },
  { text: "인천광역시", value: "인천광역시" },
  { text: "대전광역시", value: "대전광역시" },
  { text: "대구광역시", value: "대구광역시" },
  { text: "광주광역시", value: "광주광역시" },
  { text: "부산광역시", value: "부산광역시" },
  { text: "울산광역시", value: "울산광역시" },
  { text: "세종특별자치시", value: "세종시" },
  { text: "경기도", value: "경기도" },
  { text: "강원도", value: "강원도" },
  { text: "충청북도", value: "충청북도" },
  { text: "충청남도", value: "충청남도" },
  { text: "경상북도", value: "경상북도" },
  { text: "경상남도", value: "경상남도" },
  { text: "전라북도", value: "전라북도" },
  { text: "전라남도", value: "전라남도" },
  { text: "제주특별자치도", value: "제주시" },
]);

const posts = ref([]);

let param = ref({
  region: "",
  word: "",
});

onMounted(() => {
  getPostList();
  console.log(posts.value);
});

async function getPostList() {
  await listPost(
    param.value,
    ({ data }) => {
      posts.value = data.data;
      console.log(posts.value);
    },
    (error) => {
      console.error(error);
    }
  );
}

function movePost() {
  router.push({ name: "post-write" });
}

function moveDetail(event, item) {
  const postId = item.item.postId;
  router.push({ name: "post-detail", params: { postId: postId } });
}
</script>

<template>
  <v-container>
    <v-card elevation="10" outlined width="100%" class="mx-auto">
      <v-card-title> 반짝 여행 </v-card-title>
      <v-card-text>
        <v-row>
          <v-col align-self="end" cols="12" md="2">
            <v-select
              v-model="param.region"
              label="지역"
              :items="conditions"
              item-title="text"
              item-value="value"
            ></v-select>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="param.word"
              label="검색어"
              single-line
              @keypress.enter.prevent="getPostList"
            ></v-text-field>
          </v-col>
          <v-col align-self="center">
            <Button
              @click="getPostList"
              color="blue-grey darken-1"
              rounded
              small
              block
              iconName="mdi-magnify"
              btnName="검색"
            ></Button>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              class="elevation-1"
              @click:row="moveDetail"
              :headers="headers"
              :items="posts"
              :options="options"
              :server-items-length="totalCount"
              :items-per-page="5"
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
        @click="movePost"
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
