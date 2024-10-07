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
      // resolve(res.body.data);
      reject(err);
    });
  });
}
export function getReplyList(fetch,id,cishu) {
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
    url: `https://api.bilibili.com/x/v2/reply?type=1&oid=${id}&sort=1&ps=1&pn=${cishu}`,
    type: "json"
  })
    .then((res) => {
      
      resolve(res);
    })
    .catch((res) => {
      resolve(res);

    });
  });

}
export function follorBydour(fetch) {
  return new Promise((resolve, reject) => {
  fetch.request({
    method: "SENDBILIPOST",
    data: {
      DedeUserID: localStorage.getItem("DedeUserID"),
      SESSDATA: localStorage.getItem("SESSDATA"),
      bili_jct: localStorage.getItem("bili_jct"),
      DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
      buvid3: localStorage.getItem("buvid3"),
    }, 
    content_type: "application/x-www-form-urlencoded",
    url: `https://api.bilibili.com/x/relation/modify?fid=1305678175&act=1&re_src=11&csrf=${localStorage.getItem("bili_jct")}`,
    type: "json"
  })
    .then((res) => {
      resolve(res);
      
    })
    .catch((res) => {
      
    }); 
  })
}
export function getWbi(fetch) {
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
      url: "https://api.bilibili.com/x/web-interface/nav", 
      type: "json"
    })
      .then((res) => {
      resolve(res);

      })
      .catch((res) => {

      });  
    }); 

}
export function UnfollorSearchStars(fetch) {
  return new Promise((resolve, reject) => {
  
  fetch.request({
    method: "SENDBILIPOST",
    data: {
      DedeUserID: localStorage.getItem("DedeUserID"),
      SESSDATA: localStorage.getItem("SESSDATA"),
      bili_jct: localStorage.getItem("bili_jct"),
      DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
      buvid3: localStorage.getItem("buvid3"),
    }, 
    content_type: "application/x-www-form-urlencoded",
    url: `https://api.bilibili.com/x/relation/modify?fid=288164627&act=2&re_src=11&csrf=${localStorage.getItem("bili_jct")}`,
    type: "json"
  })
    .then((res) => {
      resolve(res);

      
    })
    .catch((res) => {
      
    }); 
  }); 

}