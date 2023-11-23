import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function joinPost(param, success, fail) {
  console.log("param", param);
  await local.post(`/postuser`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function joinList(userId, success, fail) {
  console.log("param", userId);
  await local.get(`/postuser/${userId}`).then(success).catch(fail);
  console.log("userConfirm ok");
}

export { joinPost, joinList };
