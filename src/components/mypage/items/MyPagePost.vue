<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { joinList } from "@/api/postuser";

const router = useRouter();

let posts = ref([]);

let userId = 2;

const headers = ref([
  { title: "글 번호", align: "center", value: "postId" },
  { title: "제목", align: "start", value: "title" },
  { title: "작성자", align: "center", value: "username" },
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

const footerOptions = ref([5, 10, 25]);

onMounted(() => {
  getPostList();
});

function getPostList() {
  joinList(
    userId,
    ({ data }) => {
      posts.value = data.data;
    },
    (error) => {
      console.error(error);
    }
  );
}

function moveDetail(event, item) {
  const postId = item.item.postId;
  router.push({ name: "post-detail", params: { postId: postId } });
}
</script>

<template>
  <v-container>
    <v-data-table
      @click:row="moveDetail"
      :headers="headers"
      :items="posts"
      :items-per-page-options="footerOptions"
      :options="options"
    >
    </v-data-table>
  </v-container>
</template>

<style scoped></style>
