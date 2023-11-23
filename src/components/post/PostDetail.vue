<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { deletePost, detailPost } from "@/api/post";
import { joinPost, unJoinPost, canJoinPost } from "@/api/postuser";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import Button from "./item/Button.vue";
import router from "@/router";

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);

const route = useRoute();

const { postId } = route.params;

let param = ref({
  postId: "",
  userId: "",
});

const viewer = ref();
const post = ref({});
let latPath = [];

let map;

let isJoin = ref(false);

onMounted(async () => {
  await detailPost(
    postId,
    ({ data }) => {
      post.value = data.data;
    },
    (error) => {
      console.error(error);
    }
  );

  await canJoinPost(
    {
      postId: postId,
      userId: userId.value,
    },
    ({ data }) => {
      console.log(data.data);
      isJoin.value = data.data;
    },
    (error) => {
      console.error(error);
    }
  );

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

  // Viewer 객체 생성
  viewer.value = new Viewer({
    // ref="toastViewer"
    el: document.querySelector("#viewer"),
    height: "500px",
    initialEditType: "'wysiwyg'",
    initialValue: post.value.content,
  });
});

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(
      post.value.attractionDtoList[0].latitude,
      post.value.attractionDtoList[0].longitude
    ),
    level: 8,
  };
  map = new kakao.maps.Map(container, options);

  kakao.maps.event.addListener(map);

  window.oncontextmenu = function () {
    return false;
  };

  post.value.attractionDtoList.forEach((data) => {
    addMarker(data);
  });
};

function addMarker(data) {
  let position = new kakao.maps.LatLng(data.latitude, data.longitude);

  var marker = new kakao.maps.Marker({
    position: position,
  });

  marker.setMap(map);

  addOverlay(marker, data);
  latPath.push([data.latitude, data.longitude]);
  if (latPath.length >= 2) {
    setPolyline(data);
  }
}

function setPolyline(data) {
  let line = new kakao.maps.LatLng(data.latitude, data.longitude);

  var tmpLine = [
    line,
    new kakao.maps.LatLng(
      latPath[latPath.length - 2][0],
      latPath[latPath.length - 2][1]
    ),
  ];

  let polyline = new kakao.maps.Polyline({
    path: tmpLine, // 선을 구성하는 좌표배열 입니다
    strokeWeight: 5, // 선의 두께 입니다
    strokeColor: "#FF0000", // 선의 색깔입니다
    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  });

  polyline.setMap(map);
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

const movePage = (param) => {
  router.push({ name: "post-" + param });
};

const moveJoin = () => {
  param.value.postId = post.value.postId;
  param.value.userId = userId.value;
  joinPost(
    param.value,
    ({ data }) => {
      console.log(data);
    },
    (error) => {
      console.error(error);
    }
  );
  router.go(0);
};

const moveUnJoin = () => {
  param.value.postId = post.value.postId;
  param.value.userId = userId.value;
  unJoinPost(
    param.value,
    ({ data }) => {
      console.log(data);
    },
    (error) => {
      console.error(error);
    }
  );
  router.go(0);
};

const deletePage = () => {
  console.log(post.value.postId);
  deletePost(
    post.value.postId,
    ({ data }) => {
      console.log(data);
    },
    (error) => {
      console.error(error);
    }
  );
  alert("글을 삭제하였습니다");
  router.push({ name: "post-list" });
};
</script>

<template>
  <v-container>
    <v-card elevation="10" outlined width="100%" class="mx-auto">
      <v-card-title>
        <span class="mr-2">글 내용</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              label="제목"
              readonly
              dense
              :model-value="post.title"
              variant="underlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="작성자"
              readonly
              dense
              :model-value="post.username"
              variant="underlined"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="출발일"
              readonly
              dense
              :model-value="post.dateTime"
              variant="underlined"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="모집인원"
              readonly
              dense
              :model-value="`${post.peopleCnt}/${post.recruits}`"
              variant="underlined"
            />
          </v-col>
        </v-row>
        <div id="map"></div>
        <v-card title="내용">
          <div style="height: 300px">
            <v-divider :thickness="1" class="border-opacity-25"></v-divider>
            <div id="viewer" style="margin: 30px"></div>
          </div>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <Button
          @click="moveJoin"
          color="primary"
          rounded
          small
          iconName="mdi-account-multiple-plus"
          btnName="Join"
          v-if="userId != post.userId && !isJoin"
        ></Button>
        <Button
          @click="moveUnJoin"
          color="primary"
          rounded
          small
          iconName="mdi-account-multiple-minus"
          btnName="UnJoin"
          v-if="userId != post.userId && isJoin"
        ></Button>
        <Button
          @click="movePage('/edit?docNo=' + docNo)"
          color="warning"
          rounded
          small
          iconName="mdi-pencil"
          btnName="Edit"
        ></Button>
        <Button
          @click="deletePage"
          color="error"
          rounded
          small
          iconName="mdi-delete-forever"
          btnName="Delete"
          v-if="userId == post.userId"
        ></Button>
        <Button
          @click="movePage('list')"
          color="grey darken-1"
          rounded
          small
          iconName="mdi-arrow-left"
          btnName="Back"
        ></Button>
      </v-card-actions>
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
