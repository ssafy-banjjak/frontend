<script setup>
import { useShortStore } from "@/store/short";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
import { ref, onBeforeMount } from "vue";
import router from "@/router";
import {
  getShortBySearchCond,
  getShortById,
  likeShort,
  dislikeShort,
} from "@/api/short";
import { getUserInfo } from "@/api/user";
import { httpStatusCode } from "@/util/http-status";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();
const userInfo = ref({
  username: "",
  password: "",
  nickname: "",
  name: "",
  region: "",
});
const { userId } = storeToRefs(userStore);
const shortStore = useShortStore();
const { shorts, shortIdx, pageNo } = storeToRefs(shortStore);
const short = ref({});
const nextId = ref(null);
const prevId = ref(null);

onBeforeMount(async () => {
  console.log("onBeforeMount");
  if (route.query.isUser != "true") {
    await getUserInfo(
      userId.value,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          userInfo.value = response.data.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
    if (shorts.value.length == 0) {
      await getShortBySearchCond(
        { pageNo: pageNo.value, amount: 100, region: userInfo.value.region },
        (response) => {
          const nextShorts = response.data.data;
          shorts.value = nextShorts;
          shortIdx.value = 1;
          short.value = shorts.value[shortIdx.value];
          if (shortIdx.value != shorts.value.length - 1)
            nextId.value = shorts.value[shortIdx.value + 1].shortId;
          if (shortIdx.value != 0)
            prevId.value = shorts.value[shortIdx.value - 1].shortId;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      short.value = shorts.value[shortIdx.value];

      console.log(shorts.value);
      if (shortIdx.value != shorts.value.length - 1)
        nextId.value = shorts.value[shortIdx.value + 1].shortId;
      if (shortIdx.value != 0)
        prevId.value = shorts.value[shortIdx.value - 1].shortId;
    }
  } else {
    console.log("shortId", route.params);
    await getShortById(
      { shortId: route.params.shortId },
      (response) => {
        short.value = response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
});

const like = async () => {
  await likeShort(
    short.value.shortId,
    () => {
      alert("좋아요 누름!");
    },
    (error) => {
      console.log(error);
    }
  );
};

const dislike = async () => {
  await dislikeShort(
    short.value.shortId,
    () => {
      alert("싫어요 누름!");
    },
    (error) => {
      console.log(error);
    }
  );
};

const registShort = () => {
  router.push({ name: "short-regist" });
};

const toPrev = () => {
  if (shortIdx.value == 0) {
    alert("처음입니다.");
    // shortIdx.value = shortIdx.value + 1;
    router.push({ name: "short", params: { shortId: shortIdx.value } });

    return;
  }
  shortIdx.value = shortIdx.value - 1;
  router.push({ name: "short", params: { shortId: prevId.value } });
};

const toNext = () => {
  if (shortIdx.value == shorts.value.length - 1) {
    alert("마지막 반짝입니다.");
    router.push({ name: "short", params: { shortId: shortIdx.value } });
    return;
  }
  shortIdx.value = shortIdx.value + 1;
  router.push({ name: "short", params: { shortId: nextId.value } });
};
</script>

<template>
  <div style="position: relative">
    <video
      :src="short.filePath"
      class="rounded-video"
      width="450"
      height="800"
      loop
      autoplay
      style="background-color: gray"
    ></video>
    <div class="box d-flex justify-space-between">
      <div class="align-self-end desc ma-7">
        <h2>{{ short.title }}</h2>
        <h4 class="overflow-ellipsis">{{ short.content }}</h4>
      </div>
      <div
        style="height: 100%"
        class="d-flex flex-column justify-space-between"
      >
        <div>
          <v-btn
            :class="{
              'ma-2': true,
              'display-none': Boolean(route.query.isUser),
            }"
            variant="text"
            icon="mdi-chevron-up"
            color="white"
            size="x-large"
            @click="toPrev"
          ></v-btn>
        </div>

        <div class="d-flex flex-column align-center">
          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-thumb-up"
            color="white"
            size="x-large"
            @click="like"
          ></v-btn>
          <span class="text"> 좋아요</span>

          <v-btn
            class="ma-2"
            variant="text"
            icon="mdi-thumb-down"
            color="white"
            size="x-large"
            @click="dislike"
          ></v-btn>

          <span class="text mb-4">싫어요</span>
          <v-btn
            :class="{
              'ma-2': true,
              'display-none': Boolean(route.query.isUser),
            }"
            variant="text"
            icon="mdi-chevron-down"
            color="white"
            size="x-large"
            @click="toNext"
          ></v-btn>
        </div>
      </div>
    </div>
  </div>
  <v-btn
    class="ma-2 plus"
    variant="text"
    icon="mdi-plus"
    color="black"
    size="x-large"
    @click="registShort"
  ></v-btn>
</template>

<style scoped>
.plus {
  position: fixed;
  bottom: 0;
  right: 0;
}
.rounded-video {
  border-radius: 15px; /* 테두리를 둥글게 만들기 위한 속성 */
}

.box {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.text {
  color: white;
  font-weight: bold;
  margin-top: -25px;
}
.desc {
  color: white;
}

.overflow-ellipsis {
  white-space: nowrap; /* 줄 바꿈 금지 */
  overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
  text-overflow: ellipsis; /* 초과된 텍스트를 ...으로 표시 */
  max-width: 100%; /* 최대 너비를 지정 (원하는 만큼 조절) */
}

.display-none {
  display: none;
}
</style>
