<script setup>
import { watch } from "vue";
import { ref, onMounted, defineEmits } from "vue";

const emit = defineEmits(["travelPath"]);
const props = defineProps(["deleteIdx"]);
let idx;
let apiData = [
  {
    title: "국립 청태산자연휴양림",
    address: "강원도 횡성군 둔내면 청태산로 610",
    img1: "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
    img2: "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image3_1.jpg",
    lat: "37.52251412000000000",
    lng: "128.29191150000000000",
  },
  {
    title: "토함산자연휴양림",
    address: "경상북도 경주시 양북면 불국로 1208-45",
    img1: "",
    img2: "",
    lat: "35.76195770000000000",
    lng: "129.36550370000000000",
  },
  {
    title: "비슬산자연휴양림",
    address: "대구광역시 달성군 유가읍 일연선사길 61",
    img1: "http://tong.visitkorea.or.kr/cms/resource/62/219162_image2_1.jpg",
    img2: "http://tong.visitkorea.or.kr/cms/resource/62/219162_image3_1.jpg",
    lat: "35.69138039000000000",
    lng: "128.51597740000000000",
  },
  {
    title: "불정자연휴양림",
    address: "경상북도 문경시 불정길 180	(불정동)",
    img1: "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image2_1.jpg",
    img2: "http://tong.visitkorea.or.kr/cms/resource/83/1070183_image3_1.jpg",
    lat: "36.61882624000000000",
    lng: "128.13426590000000000",
  },
];

let map;
let geocoder;

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
  () => travelPath,
  () => {
    emit("travelPath", travelPath);
    // console.log(`asd${idx}`);
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
    center: new kakao.maps.LatLng(36.62166041487402, 128.70939218494755),
    level: 12,
  };
  map = new kakao.maps.Map(container, options);
  geocoder = new kakao.maps.services.Geocoder();

  kakao.maps.event.addListener(map);

  window.oncontextmenu = function () {
    return false;
  };

  apiData.forEach((data) => {
    addMarker(data);
    // if (latPath.length >= 2) {
    //   setPolyline(data.lat, data.lng);
    // }
  });

  // kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  //   // 클릭한 위치에 마커를 표시합니다
  //   if (markers.length > 4) {
  //     alert("5개 이상 선택할 수 없습니다!");
  //   } else {
  //     console.log(mouseEvent.latLng);
  //     latPath.push([mouseEvent.latLng.Ma, mouseEvent.latLng.La]);
  //     addMarker(mouseEvent.latLng);
  //     if (latPath.length >= 2) {
  //       setPolyline(mouseEvent.latLng.Ma, mouseEvent.latLng.La);
  //     }
  //   }
  // });
};

function addOverlay(marker, data) {
  let content = document.createElement("div");
  content.className = "wrap";

  let info = document.createElement("div");
  info.className = "info";

  let title = document.createElement("div");
  title.className = "title";
  title.appendChild(document.createTextNode(data.title));

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
  img.src = data.img1;
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

  function closeOverlay() {
    this.overlay.setMap(null);
  }

  // kakao.maps.event.addListener(marker, "click", function () {
  //   overlay.setMap(map);
  // });

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
  let position = new kakao.maps.LatLng(data.lat, data.lng);

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
      if (travels.length > 5) {
        alert("5개까지 등록할 수 있습니다!");
        e.stopPropagation();
      } else {
        if (travels.includes(data)) {
          alert("중복된 여행지 입니다!");
          e.stopPropagation();
        } else {
          latPath.push([data.lat, data.lng]);
          if (latPath.length >= 2) {
            setPolyline(data.lat, data.lng);
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

/* 마커 함수 끝 */

function deleteMap() {
  deleteLine();
  latPath = [];
  travels = [];
  travelPath.value.length = 0;
}

function chooseDel(idx) {
  console.log(polylinePath, " ", idx);
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
  <div id="map"></div>
  <p>
    <button @click="deleteMap">선택한 여행지 초기화</button>
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
