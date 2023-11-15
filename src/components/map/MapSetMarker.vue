<script setup>
import { ref, onMounted } from "vue";

var map;
// const positions = ref([]);
const markers = ref([]);

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
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    // 클릭한 위치에 마커를 표시합니다
    addMarker(mouseEvent.latLng);
    console.log(markers.value);
  });
};

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
    markers[i].setMap(map);
  }
}

// "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
  setMarkers(map);
}

// "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
  setMarkers(null);
}
</script>

<template>
  <div id="map">
    <p>
      <button @click="hideMarkers">마커 감추기</button>
      <button @click="showMarkers">마커 보이기</button>
    </p>
    <em>클릭한 위치에 마커가 표시됩니다!</em>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
