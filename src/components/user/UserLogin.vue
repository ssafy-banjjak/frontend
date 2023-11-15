<script setup>
import { ref } from "vue";
import router from "@/router";

const user = ref({
  username: "",
  password: "",
});

const signup = () => {
  router.push({ name: "signup" });
};
</script>

<template>
  <div class="container">
    <v-card width="400" title="로그인">
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
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success">
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
  background: #fffae0;
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
