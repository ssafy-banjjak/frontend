<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { writePost } from "@/api/post";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import MapWrite from "../map/MapWrite.vue";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor style
import "codemirror/lib/codemirror.css"; // codemirror style

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);

const router = useRouter();

// Request 할 객체
let param = ref({
  postDto: {
    userId,
    region: "서울특별시",
    title: "",
    content: "",
    recruits: 0,
    dateTime: new Date(),
  },
  postAttractionDtoList: [],
});

let deleteIdx = ref(0);

const editor = ref();

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

// 지역 선택 헤더
const conditions = ref([
  { text: "전체선택", value: "" },
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

async function save() {
  param.value.postDto.content = await editor.value.getHTML();
  param.value.postDto.dateTime = await getToday(param.value.postDto.dateTime);
  writePost(
    param.value,
    ({ data }) => {
      console.log(data);
    },
    (error) => {
      console.error(error);
    }
  );
  console.log(param.value);
  alert("글을 작성하였습니다");
  back();
}

function back() {
  router.push({ name: "post-list" });
}

function getToday(date) {
  let newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = ("0" + (1 + newDate.getMonth())).slice(-2);
  let day = ("0" + newDate.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%" style="padding: 3%">
      <v-row>
        <v-col cols="2">
          <v-select
            v-model="param.postDto.region"
            label="지역"
            :items="conditions"
            item-title="text"
            item-value="value"
          ></v-select>
        </v-col>
        <v-col cols="10">
          <v-text-field
            label="제목"
            variant="underlined"
            v-model="param.postDto.title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" style="height: calc(100vh - 68px); overflow-y: auto">
          <v-card style="margin-bottom: 10px">
            <v-card-title style="text-align: center">
              선택한 여행지 목록
            </v-card-title>
          </v-card>
          <v-card
            class="mx-auto"
            max-width="344"
            v-for="(travel, idx) in param.postAttractionDtoList"
            :key="idx"
            style="margin-bottom: 10px"
          >
            <v-img :src="travel.image" height="200px" cover></v-img>
            <v-card-title style="text-align: left">
              {{ travel.name }}
            </v-card-title>
            <v-card-subtitle> {{ travel.address }} </v-card-subtitle>
            <v-card-actions style="float: right">
              <v-btn @click="changeIdx(idx)"> 삭제 </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="7">
          <MapWrite
            :delete-idx="deleteIdx"
            :region="param.postDto.region"
            @travel-path="travelCallback"
          ></MapWrite>
          <div id="editor" style="border-radius: 2em"></div>
        </v-col>
        <v-col cols="3">
          <v-dialog width="400" height="600">
            <template v-slot:activator="{ props }">
              <v-card
                v-bind="props"
                @click="isActive = false"
                class="justify-center"
                justify="center"
              >
                <div
                  style="text-align: center; font-size: 30px; font-weight: bold"
                >
                  모집 날짜
                </div>
                <br />
                <div style="text-align: center; font-size: 23px">
                  {{ getToday(param.postDto.dateTime) }}
                </div>
              </v-card>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="">
                <v-row justify="center">
                  <v-date-picker
                    v-model="param.postDto.dateTime"
                  ></v-date-picker>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="닫기" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-card style="margin-top: 30px">
            <div style="text-align: center; font-size: 30px; font-weight: bold">
              모집 인원
            </div>
            <v-col justify-center>
              <v-btn
                elevation="0"
                @click="
                  () => {
                    if (param.postDto.recruits > 0) param.postDto.recruits--;
                  }
                "
                style="margin-left: 110px"
              >
                <v-icon size="xx-large"> mdi-minus </v-icon>
              </v-btn>
              <span style="font-size: 23px">{{ param.postDto.recruits }}</span>
              <v-btn
                elevation="0"
                @click="
                  () => {
                    param.postDto.recruits++;
                  }
                "
              >
                <v-icon size="xx-large"> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-card>
          <v-row style="margin-top: 30px; float: right">
            <v-col>
              <v-btn color="success" @click="save" style="margin-right: 10px">
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
