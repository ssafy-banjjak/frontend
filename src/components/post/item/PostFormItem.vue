<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import MapSetMarker from "./MapSetMarker.vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor style
import "codemirror/lib/codemirror.css"; // codemirror style

const router = useRouter();

// 여행지 목록
let travels = ref([]);

let deleteIdx = ref(0);

const editor = ref();

const content = "";

onMounted(() => {
  editor.value = new Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "500px",
    initialEditType: "wysiwyg",
  });
});

const travelCallback = function (travelPath) {
  travels.value = travelPath.value;
};

const changeIdx = function (idx) {
  deleteIdx.value = idx;
};

// 선택 지역을 받는 값
const region = ref("");

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

function save() {
  console.log(editor.value.getHTML());
}

function back() {
  router.push({ name: "post-list" });
}
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%" style="padding: 3%">
      <v-row>
        <v-col cols="3">
          <v-col v-for="(travel, idx) in travels" :key="idx">
            <v-card class="mx-auto">
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">{{ idx + 1 }}번째 여행지</div>
                  <div class="text-h6 mb-1">
                    {{ travel.title }}
                  </div>
                  <div clss="text-caption">
                    {{ travel.address }}
                  </div>
                </div>
              </v-card-item>
              <v-card-actions>
                <v-btn @click="changeIdx(idx)"> 삭제 </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col cols="3">
              <v-select
                v-model="region"
                label="지역"
                :items="conditions"
                item-title="text"
                item-value="value"
              ></v-select>
            </v-col>
            <v-col cols="9">
              <v-text-field label="제목" variant="underlined"></v-text-field>
            </v-col>

            <MapSetMarker
              :delete-idx="deleteIdx"
              @travel-path="travelCallback"
            ></MapSetMarker>
            <div id="editor"></div>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn color="success" @click="save">
                <v-icon>mdi-content-save-all</v-icon>
              </v-btn>
              <v-btn color="grey darken-1" @click="back">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
