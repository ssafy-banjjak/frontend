<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import MapWrite from "../map/MapWrite.vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor style
import "codemirror/lib/codemirror.css"; // codemirror style

const router = useRouter();

// Request 할 객체

let param = ref({
  postDto: {
    userId: 0,
    region: "",
    title: "",
    content: "",
    recruits: 0,
    dateTime: toStringByFormatting(new Date()),
  },
  postAttractionDtoList: [],
});

let date = ref(new Date());

let deleteIdx = ref(0);

const editor = ref();

const content = ref("");

watch(
  () => date.value,
  () => {
    console.log(toStringByFormatting(date.value));
    param.value.postDto.dateTime = toStringByFormatting(date.value);
  },
  { deep: true }
);

watch(
  () => param.value.postDto.dateTime,
  () => {
    console.log(param.value.postDto.dateTime);
  },
  { deep: true }
);

onMounted(() => {
  editor.value = new Editor({
    el: document.querySelector("#editor"),
    previewStyle: "vertical",
    height: "500px",
    initialEditType: "wysiwyg",
  });
});

const travelCallback = function (travelPath) {
  param.value.postAttractionDtoList = travelPath.value;
  console.log(param.value);
};

const changeIdx = function (idx) {
  deleteIdx.value = idx;
};

// 선택 지역을 받는 값
const region = ref("서울특별시");

// 지역 선택 헤더
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

function save() {
  console.log(editor.value.getHTML());
  content.value = editor.value.getHTML();
}

function back() {
  router.push({ name: "post-list" });
}

function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

function toStringByFormatting(source, delimiter = "-") {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%" style="padding: 3%">
      <v-row>
        <v-col cols="3">
          <v-col
            v-for="(travel, idx) in param.postAttractionDtoList"
            :key="idx"
          >
            <v-card class="mx-auto">
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">{{ idx + 1 }}번째 여행지</div>
                  <div class="text-h6 mb-1">
                    {{ travel.name }}
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

            <v-dialog width="400" height="600">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" @click="isActive.value = false">
                  {{ param.postDto.dateTime }}
                </v-btn>
                <!-- <span v-bind="props" @click="isActive.value = false">asd</span> -->
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="">
                  <v-row justify="center">
                    <v-date-picker v-model="date"></v-date-picker>
                  </v-row>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="닫기" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <MapWrite
              :delete-idx="deleteIdx"
              :region="region"
              @travel-path="travelCallback"
            ></MapWrite>
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
