<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { getUserInfo } from "@/api/user";
import { httpStatusCode } from "@/util/http-status";

const userStore = useUserStore();
const userInfo = ref({
  username: "",
  password: "",
  nickname: "",
  name: "",
  region: "",
});
const { userId } = storeToRefs(userStore);
onBeforeMount(async () => {
  console.log("onBeforeMount");
  await getUserInfo(
    userId.value,
    (response) => {
      console.log(response);
      if (response.status === httpStatusCode.OK) {
        console.log(response.data.data);
        userInfo.value = response.data.data;
        console.log(userInfo.value);
      }
    },
    (error) => {
      console.log(error);
    }
  );
});
</script>

<template>
  <v-container class="container pa-10 shadow my-10">
    <v-row>
      <v-col cols="3" class="d-flex flex-column justify-center align-center">
        <v-avatar
          image="@/assets/ssafy.png"
          size="150"
          class="mb-5 avatar"
        ></v-avatar>
        <v-text-field
          v-model="userInfo.nickname"
          color="secondary"
          label="Nickname"
          variant="plain"
          size="7"
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="9">
        <v-text-field
          hide-details
          class="mb-2"
          v-model="userInfo.name"
          color="secondary"
          label="Name"
          variant="underlined"
          readonly
        ></v-text-field>
        <v-text-field
          hide-details
          class="mb-2"
          v-model="userInfo.nickname"
          color="secondary"
          label="Nickname"
          variant="underlined"
          readonly
        ></v-text-field>
        <v-text-field
          hide-details
          class="mb-2"
          v-model="userInfo.username"
          color="secondary"
          label="Username"
          variant="underlined"
          readonly
        ></v-text-field>
        <v-text-field
          hide-details
          class="mb-2"
          v-model="userInfo.region"
          color="secondary"
          label="Region"
          variant="underlined"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-divider class="border-opacity-50 hr"></v-divider>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <router-link :to="{ name: 'mypage-post' }" replace>반짝1</router-link>
      </v-col>
      <v-divider vertical class="border-opacity-50 hr"></v-divider>
      <v-col class="text-center">
        <router-link :to="{ name: 'mypage-short' }" replace>반짝2</router-link>
      </v-col>
    </v-row>
    <v-row class="mb-2">
      <v-divider class="border-opacity-50 hr"></v-divider>
    </v-row>
    <v-row>
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<style scoped>
.avatar {
  box-shadow: 0px 0px 9px 9px lightgray;
  background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 50%);
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
}
.container {
  background: #fffae0;
  max-width: 1080px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 15px;
}
.button {
  width: 100%;
  border-radius: 10px;
  background-color: #ff6f0f;
  box-sizing: border-box;
  text-decoration: none;
  padding: 14px 2rem;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin-right: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.hr {
  box-shadow: 0 4px 2px -2px gray; /* 그림자 설정 */
}
</style>
