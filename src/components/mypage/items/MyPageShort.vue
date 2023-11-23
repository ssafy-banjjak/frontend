<script setup>
import { getShortBySearchCond } from "@/api/short";
import ShortCard from "@/components/short/ShortCard.vue";
import { useUserStore } from "@/store/user";
import { httpStatusCode } from "@/util/http-status";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const click = (shortId) => {
  router.push({
    name: "short",
    params: { shortId: shortId },
    query: { isUser: "true" },
  });
};

const useStore = useUserStore();
const { userId } = storeToRefs(useStore);
const shorts = ref([]);
onBeforeMount(async () => {
  await getShortBySearchCond(
    { pageNo: 1, amount: 100, userId: userId.value },
    (response) => {
      if (response.status === httpStatusCode.OK) {
        console.log(response.data);
        shorts.value = response.data.data;
      }
    }
  );
});
</script>
<template>
  <div class="d-flex flex-wrap justify-center">
    <v-sheet v-for="(short, index) in shorts" :key="index">
      <ShortCard @click="() => click(short.shortId)" :short="short"></ShortCard>
    </v-sheet>
  </div>
</template>

<style scoped></style>
