<script setup>
import { ref, onMounted, defineEmits, watch } from "vue";
import { listAttraction } from "@/api/map";

const emit = defineEmits(["travelPath"]);
const props = defineProps(["deleteIdx", "region"]);

let idx;

let attractions = ref([]);
const param = ref({
  region: "서울특별시",
});

let map;

// 폴리라인객체 배열
let polylinePath = [];

// 좌표 배열
let latPath = [];

// 마커 객체 배열
let markers = [];

// 선택 여행지 배열
let travels = [];

// emit을 위한 선택 여행지 배열
let travelPath = ref([]);

watch(
  () => attractions.value,
  () => {
    var moveLocation = new kakao.maps.LatLng(
      attractions.value[0].latitude,
      attractions.value[0].longitude
    );

    map.panTo(moveLocation);
  },
  { deep: true }
);

watch(
  () => travelPath,
  () => {
    emit("travelPath", travelPath);
  },
  { deep: true }
);

watch(
  () => props.deleteIdx,
  () => {
    idx = props.deleteIdx;
    chooseDel(idx);
  },
  { deep: true }
);

watch(
  () => props.region,
  async () => {
    param.value.region = props.region;
    await getAttraction();
    deleteMarker();
    deleteMap();
    attractions.value.forEach((data) => {
      addMarker(data);
    });
  },
  { deep: true }
);

onMounted(async () => {
  await listAttraction(
    param.value,
    ({ data }) => {
      attractions.value = data.data;
    },
    (error) => {
      console.error(error);
    }
  );

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

  attractions.value.forEach((data) => {
    addMarker(data);
  });
};

// 관광지 목록 가져오기
async function getAttraction() {
  await listAttraction(
    param.value,
    ({ data }) => {
      attractions.value = data.data;
    },
    (error) => {
      console.error(error);
    }
  );
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

/* 폴리라인 함수 시작 */
function setPolyline(lat, lng) {
  var line = new kakao.maps.LatLng(lat, lng);
  var tmpLine = [
    line,
    new kakao.maps.LatLng(
      latPath[latPath.length - 2][0],
      latPath[latPath.length - 2][1]
    ),
  ];
  var polyline = new kakao.maps.Polyline({
    path: tmpLine, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FF0000", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });

  polyline.setMap(map);
  polylinePath.push(polyline);
}

function deleteLine() {
  for (let i = 0; i < polylinePath.length; i++) {
    polylinePath[i].setMap(null);
  }
  polylinePath = [];
}

/* 폴리라인 함수 끝 */

/* 마커 함수 시작 */

function addMarker(data) {
  let position = new kakao.maps.LatLng(data.latitude, data.longitude);

  var marker = new kakao.maps.Marker({
    position: position,
  });

  kakao.maps.event.addListener(marker, "mousedown", function (e) {
    var isRightButton;
    e = e || window.event;

    if ("which" in e) {
      // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
      isRightButton = e.which == 3;
    } else if ("button" in e) {
      // IE, Opera
      isRightButton = e.button == 2;
    }

    if (!isRightButton) {
      if (travels.length > 4) {
        alert("5개까지 등록할 수 있습니다!");
        e.stopPropagation();
      } else {
        if (travels.includes(data)) {
          alert("중복된 여행지 입니다!");
          e.stopPropagation();
        } else {
          latPath.push([data.latitude, data.longitude]);
          if (latPath.length >= 2) {
            setPolyline(data.latitude, data.longitude);
          }
          travels.push(data);
          travelPath.value.push(data);
        }
      }
    }
  });

  marker.setMap(map);

  addOverlay(marker, data);

  markers.push(marker);
}

function deleteMarker() {
  markers.forEach((data) => {
    data.setMap(null);
  });
  markers = [];
}

/* 마커 함수 끝 */

function deleteMap() {
  deleteLine();
  latPath = [];
  travels = [];
  travelPath.value.length = 0;
}

function chooseDel(idx) {
  if (latPath.length > 1) {
    polylinePath[idx - 1].setMap(null);
    polylinePath.splice(idx - 1, 1);
  }
  latPath.splice(idx, 1);
  travels.splice(idx, 1);
  travelPath.value.splice(idx, 1);
}
</script>

<template>
  <div class="map_wrap">
    <div
      id="map"
      style="width: 100%; height: 100%; position: relative; overflow: hidden"
    ></div>
    <div class="custom_typecontrol radius_border">
      <span id="initBtn" class="selected_btn" @click="deleteMap">초기화</span>
    </div>
  </div>
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
