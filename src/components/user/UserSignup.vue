<script setup>
import router from "@/router";
import { ref } from "vue";
import { userSignup } from "@/api/user.js";
import { httpStatusCode } from "@/util/http-status";

const user = ref({
  username: "",
  password: "",
  nickname: "",
  name: "",
  region: "",
});

const regions = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종시",
  "경기도",
  "강원도",
  "충청북도",
  "전라남도",
  "전라북도",
  "충청남도",
  "경상북도",
  "경상남도",
  "제주도",
];

const signup = async () => {
  await userSignup(
    user.value,
    (response) => {
      if (response.status === httpStatusCode.OK) {
        router.push({ name: "home" });
      }
    },
    () => {
      alert("중복된 아이디입니다.");
    }
  );
};
</script>

<template>
  <div class="container">
    <v-card width="400" title="회원가입" class="shadow">
      <v-container>
        <v-text-field
          v-model="user.username"
          color="secondary"
          label="Username"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          color="secondary"
          label="Password"
          variant="underlined"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="user.nickname"
          color="secondary"
          label="Nickname"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="user.name"
          color="secondary"
          label="Name"
          placeholder="Name"
          variant="underlined"
        ></v-text-field>
        <v-select
          v-model="user.region"
          :items="regions"
          variant="underlined"
          label="Region"
          placeholder="Region"
        ></v-select>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="signup">
          회원가입

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
