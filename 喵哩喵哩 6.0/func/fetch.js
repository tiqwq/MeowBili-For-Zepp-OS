import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
import { px } from "@zos/utils";
import { push } from '@zos/router'
import '../utils/promise'
// 请求视频列表
export function fetchVideoList(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data: {
        DedeUserID: localStorage.getItem("DedeUserID"),
        SESSDATA: localStorage.getItem("SESSDATA"),
        bili_jct: localStorage.getItem("bili_jct"),
        DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
        buvid3: localStorage.getItem("buvid3"),
      }, 
      url: "https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=4&ps=1",
      type: "json"
    })
    .then((res) => {
      resolve(res.body.data);
    })
    .catch((res) => {
      resolve(res.body.data);
      // reject(err);
    });
  });
}