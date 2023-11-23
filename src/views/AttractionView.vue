<script setup>
import { ref, onMounted, watch } from "vue";
import { searchAttraction } from "@/api/map";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import Button from "@/components/post/item/Button.vue";

const router = useRouter();
const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);
if (!isLogin.value) {
  router.push({ name: "login" });
}
const param = ref({
  word: "",
  region: "",
});

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

// 지역 객체 배열
let attractions = ref([]);

// 지도
let map;

// 마커 객체 배열
let markers = [];

watch(
  () => attractions.value,
  () => {
    if (attractions.value.length != 0) {
      var moveLocation = new kakao.maps.LatLng(
        attractions.value[0].latitude,
        attractions.value[0].longitude
      );
    }
    map.panTo(moveLocation);
  },
  { deep: true }
);

onMounted(() => {
  // 카카오 맵 불러오기
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(37.496573, 127.035546),
    level: 9,
  };
  map = new kakao.maps.Map(container, options);

  kakao.maps.event.addListener(map);

  window.oncontextmenu = function () {
    return false;
  };
};

function addMarker(data) {
  let position = new kakao.maps.LatLng(data.latitude, data.longitude);

  var marker = new kakao.maps.Marker({
    position: position,
  });

  marker.setMap(map);

  addOverlay(marker, data);

  markers.push(marker);
}

function addOverlay(marker, data) {
  let content = document.createElement("div");
  content.className = "wrap";

  let info = document.createElement("div");
  info.className = "info";

  let title = document.createElement("div");
  title.className = "title";
  title.appendChild(document.createTextNode(data.name));

  let closeDiv = document.createElement("div");
  closeDiv.className = "close";
  closeDiv.onclick = function () {
    overlay.setMap(null);
  };

  let body = document.createElement("div");
  body.className = "body";

  let imgDiv = document.createElement("div");
  imgDiv.className = "img";

  let img = document.createElement("img");
  img.src = data.image;
  img.width = 73;
  img.height = 70;

  let desc = document.createElement("div");
  desc.className = "desc";

  let ellipsis = document.createElement("div");
  ellipsis.className = "ellipsis";
  ellipsis.appendChild(document.createTextNode(data.address));

  desc.appendChild(ellipsis);
  imgDiv.appendChild(img);

  body.appendChild(imgDiv);
  body.appendChild(desc);

  title.appendChild(closeDiv);

  info.appendChild(title);
  info.appendChild(body);

  content.appendChild(info);

  var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition(),
  });

  overlay.setMap(null);

  kakao.maps.event.addListener(marker, "mousedown", function (e) {
    var isRightButton;
    e = e || window.event;

    if ("which" in e)
      // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRightButton = e.which == 3;
    else if ("button" in e)
      // IE, Opera
      isRightButton = e.button == 2;

    if (isRightButton) {
      overlay.setMap(map);
      e.stopPropagation();
    }
  });
}

function deleteMarker() {
  markers.forEach((data) => {
    data.setMap(null);
  });
  markers = [];
}

async function search() {
  await searchAttraction(
    param.value,
    ({ data }) => {
      attractions.value = data.data;
    },
    (error) => {
      console.error(error);
    }
  );
  deleteMarker();
  attractions.value.forEach((data) => {
    addMarker(data);
  });
}

function enter(item) {
  param.value.word = item.target.value;
  search();
}
</script>

<template>
  <v-container>
    <v-card elevation="5" outlined width="100%" style="padding: 2%">
      <v-row pa-100>
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
            @keypress.enter.prevent="search"
          ></v-text-field>
        </v-col>
        <v-col align-self="center">
          <Button
            @click="search"
            color="blue-grey darken-1"
            rounded
            small
            block
            iconName="mdi-magnify"
            btnName="검색"
          ></Button>
        </v-col>
        <div id="map"></div>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped></style>
<style>
#map {
  width: 100%;
  height: 700px;
}
.map_wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 350px;
}
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
  cursor: pointer;
}
.info .body {
  position: relative;
  overflow: hidden;
}
.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
  color: #5085bb;
}

.custom_typecontrol {
  position: absolute;
  top: 10px;
  right: 10px;
  overflow: hidden;
  width: 130px;
  height: 30px;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-size: 12px;
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;
}
.custom_typecontrol span {
  display: block;
  width: 65px;
  height: 30px;
  float: right;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.custom_typecontrol .btn {
  background: #fff;
  background: linear-gradient(#fff, #e6e6e6);
}
.custom_typecontrol .btn:hover {
  background: #f5f5f5;
  background: linear-gradient(#f5f5f5, #e3e3e3);
}
.custom_typecontrol .btn:active {
  background: #e6e6e6;
  background: linear-gradient(#e6e6e6, #fff);
}
.custom_typecontrol .selected_btn {
  color: #fff;
  background: #425470;
  background: linear-gradient(#425470, #5b6d8a);
}
.custom_typecontrol .selected_btn:hover {
  color: #fff;
}
</style>
