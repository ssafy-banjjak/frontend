import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function listAttraction(param, success, fail) {
  console.log("param", { params: param });
  await local.get(`/attraction`, { params: param }).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function searchAttraction(param, success, fail) {
  console.log("param", { params: param });
  await local
    .get(`/attraction/search`, { params: param })
    .then(success)
    .catch(fail);
  console.log("userConfirm ok");
}

export { listAttraction, searchAttraction };
