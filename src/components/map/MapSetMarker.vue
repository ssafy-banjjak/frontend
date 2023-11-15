<script setup>
import { watch } from "vue";
import { ref, onMounted } from "vue";

var map;
var geocoder;
var content =
  '<div class="wrap">' +
  '    <div class="info">' +
  '        <div class="title">' +
  "            카카오 스페이스닷원" +
  '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
  "        </div>" +
  '        <div class="body">' +
  '            <div class="img">' +
  '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
  "           </div>" +
  '            <div class="desc">' +
  '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
  '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
  '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
  "            </div>" +
  "        </div>" +
  "    </div>" +
  "</div>";
const markers = ref([]);

watch(
  () => markers.value,
  () => {
    drawLine(map);
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
    if (markers.value.length > 4) {
      alert("5개 이상 선택할 수 없습니다!");
    } else {
      addMarker(mouseEvent.latLng);
    }
  });
};

// 마커 배열로 선을 그리는 함수
function drawLine(map) {
  var linePath = [];

  for (let i = 0; i < markers.value.length; i++) {
    const element = markers.value[i];
    linePath.push(
      new kakao.maps.LatLng(
        element.getPosition().getLat(),
        element.getPosition().getLng()
      )
    );
  }
  var polyline = new kakao.maps.Polyline({
    path: linePath, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FFAE00", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });
  polyline.setMap(map);
}

function addMarker(position) {
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: position,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 생성된 마커를 배열에 추가합니다
  markers.value.push(marker);
}

// 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
  for (var i = 0; i < markers.value.length; i++) {
    markers.value[i].setMap(map);
  }
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
  setMarkers(map);
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function deleteMarkers() {
  setMarkers(null);
  drawLine(null);
  markers.value.length = 0;
}
</script>

<template>
  <div id="map">
    <em>클릭한 위치에 마커가 표시됩니다!</em>
  </div>
  <p>
    <button @click="deleteMarkers">마커 감추기</button>
    <button @click="showMarkers">마커 보이기</button>
  </p>
</template>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
