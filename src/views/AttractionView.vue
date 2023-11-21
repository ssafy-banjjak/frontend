<script setup>
import { ref } from "vue";
import AttractionMap from "@/components/attraction/AttractionMap.vue";

// 선택 지역을 받는 값
const region = ref("");

// 키워드 값
const keyword = ref("");

// 지역 선택 헤더
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
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%" style="padding: 2%">
      <v-row pa-100>
        <v-col cols="5">
          <v-select
            v-model="region"
            label="지역"
            :items="conditions"
            item-title="text"
            item-value="value"
          ></v-select>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-model="keyword"
            label="키워드"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <AttractionMap></AttractionMap>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
