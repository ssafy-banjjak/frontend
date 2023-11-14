<script setup></script>

<template>
  <v-container style="height: 94vh; background-color: #fffae0">
    <div
      class="d-flex justify-space-evenly align-center mb-6"
      style="height: 100%"
    >
      <div class="d-flex flex-column justify-space-between">
        <h1 class="title">
          원하는 여행지를 <br />
          반짝과 함께
        </h1>
        <h3>
          여행을 반짝과 함께 떠나고
          <br />
          여행을 반짝으로 공유해보세요.
        </h3>
        <button class="button justify-space-around align-center">
          시작하기
        </button>
      </div>
      <img src="@/assets/banjjak.png" alt="" srcset="" />
    </div>
  </v-container>
</template>

<style scoped>
.title {
  font-size: 54px;
  font-weight: 700;
  line-height: 73px;
  margin-bottom: 1.6rem;
  letter-spacing: -2%;
}

.button {
  width: 180px;
  height: 30px;
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
  margin-top: 2rem;
  justify-content: center;
}
</style>
