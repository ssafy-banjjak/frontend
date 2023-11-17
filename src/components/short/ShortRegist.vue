<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const title = ref(null);
const content = ref(null);
const region = ref(null);
const thumbnail = ref(null);
const video = ref(null);

const submit = () => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("thumbnail", thumbnail.value);
  formData.append("video", video.value);

  //등록
  const returnId = 3;

  //등록 후 이동
  router.push({ name: "short", params: { shortId: returnId } });
};

const regions = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];
</script>

<template>
  <div class="container">
    <v-card width="400" title="반짝 등록" class="shadow">
      <v-container>
        <v-text-field
          v-model="title"
          color="secondary"
          label="Title"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="content"
          color="secondary"
          label="Content"
          variant="underlined"
        ></v-text-field>

        <v-select
          v-model="region"
          :items="regions"
          variant="underlined"
          label="Region"
          placeholder="Region"
        ></v-select>
        <v-file-input
          v-model="thumbnail"
          label="썸네일 이미지 업로드"
          accept="image/*"
        ></v-file-input>

        <!-- 동영상 업로드 -->
        <v-file-input
          v-model="video"
          label="동영상 업로드"
          accept="video/*"
        ></v-file-input>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="submit" color="success">
          등록하기
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  width: 100%;
  border-radius: 10px;
  background-color: #ff6f0f;
  box-sizing: border-box;
  text-decoration: none;
  padding: 14px 2rem;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin-right: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
