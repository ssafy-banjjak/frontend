import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function joinPost(param, success, fail) {
  console.log("param", param);
  await local.post(`/postuser`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

export { joinPost };
