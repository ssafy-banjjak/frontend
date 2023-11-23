import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function joinPost(param, success, fail) {
  console.log("param", param);
  await local.post(`/postuser/join`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function unJoinPost(param, success, fail) {
  console.log("param", param);
  await local.post(`/postuser/unjoin`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function canJoinPost(param, success, fail) {
  console.log("param", param);
  await local.post(`/postuser/canjoin`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function joinList(userId, success, fail) {
  console.log("param", userId);
  await local.get(`/postuser/${userId}`).then(success).catch(fail);
  console.log("userConfirm ok");
}

export { joinPost, unJoinPost, canJoinPost, joinList };
