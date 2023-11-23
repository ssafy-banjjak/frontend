import { localAxios } from "@/util/http-commons";
import axios from "axios";

const local = localAxios();
const { VITE_VUE_API_URL } = import.meta.env;

async function getShortBySearchCond(param, success, fail) {
  console.log("param", param);
  await local.get(`/short`, { params: param }).then(success).catch(fail);
  console.log("short ok");
}

async function getShortById(param, success, fail) {
  console.log("param", param);
  await local.get(`/short/${param.shortId}`).then(success).catch(fail);
  console.log("short ok");
}

async function likeShort(shortId, success, fail) {
  await local.patch(`/short/${shortId}/like`).then(success).catch(fail);
}

async function dislikeShort(shortId, success, fail) {
  await local.patch(`/short/${shortId}/dislike`).then(success).catch(fail);
}

async function createShort(params, success, fail) {
  console.log(`${VITE_VUE_API_URL}/short`);
  await axios
    .post(`${VITE_VUE_API_URL}/short`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

export {
  getShortBySearchCond,
  likeShort,
  dislikeShort,
  getShortById,
  createShort,
};
