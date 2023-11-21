import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function listPost(param, success, fail) {
    console.log("param", param);
    await local.get(`/post`, param).then(success).catch(fail);
    console.log("userConfirm ok");
}

async function listPost(param, success, fail) {
    console.log("param", param);
    await local.post(`/post`, param).then(success).catch(fail);
    console.log("userConfirm ok");
}
  
export { listPost };