<script setup>
import { ref, onMounted, defineEmits, watch } from "vue";

let map;
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

  kakao.maps.event.addListener(map);

  window.oncontextmenu = function () {
    return false;
  };

  apiData.forEach((data) => {
    addMarker(data);
  });
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

function addMarker(data) {
  let position = new kakao.maps.LatLng(data.lat, data.lng);

  var marker = new kakao.maps.Marker({
    position: position,
  });

  marker.setMap(map);

  addOverlay(marker, data);

  markers.push(marker);
}
</script>

<template>
  <div></div>
</template>

<style scoped></style>
