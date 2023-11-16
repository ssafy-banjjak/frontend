<script setup>
import { watch } from "vue";
import { ref, onMounted, defineEmits } from "vue";

const emit = defineEmits(["latPath"]);

let map;
let geocoder;

// 폴리라인객체 배열
let polylinePath = [];

// 좌표 배열
const latPath = ref([]);

// 마커 객체 배열
let markers = [];

// 커스텀 오버레이 배열
let overlayPath = [];

watch(
  () => latPath.value,
  () => {
    emit("latPath", latPath);
  },
  { deep: true }
);

onMounted(() => {
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
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  geocoder = new kakao.maps.services.Geocoder();
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    // 클릭한 위치에 마커를 표시합니다
    if (markers.length > 4) {
      alert("5개 이상 선택할 수 없습니다!");
    } else {
      latPath.value.push([mouseEvent.latLng.Ma, mouseEvent.latLng.La]);
      addMarker(mouseEvent.latLng);
      if (latPath.value.length >= 2) {
        setPolyline(mouseEvent.latLng.Ma, mouseEvent.latLng.La);
      }
    }
  });
};

function addOverlay(marker) {
  let content = document.createElement("div");
  content.className = "wrap";

  let info = document.createElement("div");
  info.className = "info";

  let title = document.createElement("div");
  title.className = "title";

  let closeDiv = document.createElement("div");
  closeDiv.className = "close";

  title.appendChild(closeDiv);
  info.appendChild(title);
  content.appendChild(info);

  var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition(),
  });

  overlayPath.push(overlay);

  function closeOverlay() {
    this.overlay.setMap(null);
  }

  kakao.maps.event.addListener(marker, "click", function () {
    overlay.setMap(map);
  });
}

/* 폴리라인 함수 시작 */
function setPolyline(lat, lng) {
  var line = new kakao.maps.LatLng(lat, lng);
  var tmpLine = [
    line,
    new kakao.maps.LatLng(
      latPath.value[latPath.value.length - 2][0],
      latPath.value[latPath.value.length - 2][1]
    ),
  ];
  var polyline = new kakao.maps.Polyline({
    path: tmpLine, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FFAE00", // 선의 색깔입니다
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
function addMarker(position) {
  var marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);

  addOverlay(marker);

  markers.push(marker);
}

function setMarkers(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers() {
  setMarkers(null);
  markers = [];
}

/* 마커 함수 끝 */

function deleteMap() {
  deleteMarkers();
  deleteLine();
  latPath.value.length = 0;
}
</script>

<template>
  <div id="map"></div>
  <p>
    <button @click="deleteMap">마커 감추기</button>
    <button @click="showMarkers">마커 보이기</button>
  </p>
</template>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
<style>
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
.wrap * {
  padding: 0;
  margin: 0;
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
</style>
