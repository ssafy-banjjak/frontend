import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";

import { httpStatusCode } from "@/util/http-status";
import { getShortBySearchCond } from "@/api/short";

export const useShortStore = defineStore("shortStore", () => {
  const shorts = ref([]);
  const shortIdx = ref(1);
  const pageNo = ref(1);

  const getShorts = async (params) => {
    await getShortBySearchCond(
      params,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          shorts.value = response.data.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const getShort = () => shorts.value;
  const isLast = () => shortIdx.value === shorts.value.length - 1;
  const isFirst = () => shortIdx.value === -1;
  return {
    shorts,
    shortIdx,
    pageNo,
    getShorts,
    isLast,
    isFirst,
    getShort,
  };
});
