<script setup>
import { ref } from "vue";
import router from "@/router";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);
const { userLogin } = userStore;

if (isLogin.value) {
  router.push({ name: "home" });
}
const user = ref({
  username: "",
  password: "",
});

const signup = async () => {
  router.push({ name: "signup" });
};

const login = async () => {
  await userLogin(user.value);
  console.log(isLogin.value);
  if (isLogin.value) {
    router.push({ name: "home" });
  } else {
    alert("로그인에 실패하였습니다.");
  }
};
</script>

<template>
  <div class="container">
    <v-card class="shadow" width="400" title="로그인">
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
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="login">
          로그인
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" @click="signup">
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
