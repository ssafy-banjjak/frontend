import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function listPost(param, success, fail) {
  console.log("param", { params: param });
  await local.get(`/post`, { params: param }).then(success).catch(fail);
  console.log("userConfirm ok");
}
async function writePost(param, success, fail) {
  console.log("param", param);
  await local.post(`/post`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function detailPost(postId, success, fail) {
  console.log("param", postId);
  await local.get(`/post/${postId}`).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function deletePost(postId, success, fail) {
  console.log("param", postId);
  await local.delete(`/post/${postId}`).then(success).catch(fail);
  console.log("userConfirm ok");
}

export { listPost, writePost, detailPost, deletePost };
