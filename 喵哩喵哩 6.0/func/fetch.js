import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
import '../utils/promise'
let data = {
  DedeUserID: localStorage.getItem("DedeUserID"),
  SESSDATA: localStorage.getItem("SESSDATA"),
  bili_jct: localStorage.getItem("bili_jct"),
  DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
  buvid3: localStorage.getItem("buvid3")
}
let login_info = localStorage.getItem('login_info')
export function fetchVideoList(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data, 
      url: "https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=4&ps=1",
      type: "json"
    })
    .then((res) => {
      resolve(res.body.data);
    })
    .catch((res) => {
      reject(res);
    });
  });
}
export function getReplyList(fetch,oid,pn) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/v2/reply?type=1&oid=${oid}&sort=1&ps=1&pn=${pn}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    });
}
export function follorBydour(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIPOST",
      data, 
      content_type: "application/x-www-form-urlencoded",
      url: `https://api.bilibili.com/x/relation/modify?fid=1305678175&act=1&re_src=11&csrf=${data.bili_jct}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      }); 
    })
}
export function getWbi(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
        method: "SENDBILIGET",
        data,
        url: "https://api.bilibili.com/x/web-interface/nav", 
        type: "json"
      })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });  
      }); 

}
export function UnfollorSearchStars(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIPOST",
      data,
      content_type: "application/x-www-form-urlencoded",
      url: `https://api.bilibili.com/x/relation/modify?fid=288164627&act=2&re_src=11&csrf=${data.bili_jct}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      }); 
  }); 

}
export function getQrcode(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "GET_QR"
    })
      .then((data) => {
        resolve(data);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export function getBuvid3(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: "https://api.bilibili.com/x/frontend/finger/spi", 
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      }); 
  });
}

export function checkQRStatus(fetch,qr_key) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "CHECK_QR_STATUS",
      data: {
        qr_key: qr_key
      }
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      }); 
  });
}

export function getAccount(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/web-interface/card?mid=${data.DedeUserID}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    })
}

export function getCoin(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: "https://account.bilibili.com/site/getCoin",
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    })
}

export function starVideo(fetch,folderId,rid) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIPOST",
      data, 
      content_type: "application/x-www-form-urlencoded",
      url: `https://api.bilibili.com/x/v3/fav/resource/deal?rid=${rid}&type=2&csrf=${data.bili_jct}&add_media_ids=${folderId}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export function likeVideo(fetch,bv) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIPOST",
      data, 
      content_type: "application/x-www-form-urlencoded",
      url: `https://api.bilibili.com/x/web-interface/archive/like?bvid=${bv}&like=1&csrf=${data.bili_jct}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  })
}

export function coinVideo(fetch,bv) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIPOST",
      data, 
      content_type: "application/x-www-form-urlencoded",
      url: `https://api.bilibili.com/x/web-interface/coin/add?bvid=${bv}&multiply=1&csrf=${data.bili_jct}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  })
}

export function getAllFolder(fetch,bv) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data, 
      url: `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${data.DedeUserID}&type=0`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  })
}

export function getVideoDetail(fetch,bv) {
  return new Promise((resolve, reject) => {
    fetch.request({ 
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/web-interface/view?bvid=${bv}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      })
  })
}

export function getUpAccount(fetch,up_mid) {
  return new Promise((resolve, reject) => {
    fetch.request({ 
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/web-interface/card?mid=${up_mid}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      })
  })
}

export function getCid(fetch,bvid) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: "https://api.bilibili.com/x/player/pagelist?bvid=" + bvid,
      type: "json",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  })
}

export function getPlayerNum(fetch,bvid,cid) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: 'https://api.bilibili.com/x/player/online/total?bvid=' + bvid + "&cid=" + cid,
      type: "json",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  })
}

export function getAiSummary(fetch,bv,cid,up_mid) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDWBIGET",
      data,
      info: login_info,
      paramsobj: {
        bvid: bv,
        cid: cid,
        up_mid: up_mid,
      },
      url: `https://api.bilibili.com/x/web-interface/view/conclusion/get`,
      type: "json"
    }) 
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  })
}

export function getMessages(fetch,talk_id) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.vc.bilibili.com/svr_sync/v1/svr_sync/fetch_session_msgs?talker_id=${talk_id}&session_type=1`,
      type: "json"
    }) 
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  })
}

export function getTrending(fetch) {
    return new Promise((resolve, reject) => {
      fetch.request({
          method: "SENDBILIGET",
          data,
          url: "https://s.search.bilibili.com/main/hotword",
          type: "json",
        })
          .then((res) => {
            resolve(res);
          })
          .catch((res) => {
            reject(res);
          });
    })
}

export function getSearchResult(fetch,keyword,search_type) {
  return new Promise((resolve, reject) => {
    fetch.request({
        method: "SENDWBIGET",
        data,
        url: "https://api.bilibili.com/x/web-interface/wbi/search/type",
        type: "json",
        info: login_info,
        paramsobj: {
          keyword: keyword,
          search_type: search_type
        }
      })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          reject(res);
        });
      })
}

export function updateCheck(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "UPDATECHECK"
    })
      .then((res) => {
        resolve(JSON.parse(res.body));
      })
      .catch((res) => {
        reject(res);
      })
    })
}

export function getMessageList(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.vc.bilibili.com/session_svr/v1/session_svr/get_sessions?talker_id=1&session_type=1`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export function getMultiUserInfoByUID(fetch,uids) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/polymer/pc-electron/v1/user/cards?uids=${uids.join(",")}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export function getStarFolderList(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${data.DedeUserID}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    });
}

export function getStarVideoList(fetch,id,pn) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${id}&ps=5&pn=${pn}`,
      type: "json",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    });
}

export function getHistoryList(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/v2/history?pn=1&ps=8`,
      type: "json",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    });
}

export function getLaterSeeList(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIGET",
      data,
      url: `https://api.bilibili.com/x/v2/history/toview`,
      type: "json",
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    });
}

export function getArticle(fetch,id) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "GETCOLUMNS",
      data,
      id,
      type: "json"
    })
      .then((res) => {
        console.log(res.title);
        
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      })
    });
}

export function getSuggestVideoList(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "GETSUGGESTVIDEO"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      })
    });
}

export function getAllBulletin(fetch) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "GETBULLETIN"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      })
    });
}

export function sendMessage(fetch,id,text,deviceid) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIPOST",
      data, 
      content_type: "application/x-www-form-urlencoded",
      url: `https://api.vc.bilibili.com/web_im/v1/web_im/send_msg?msg[sender_uid]=${data.DedeUserID}&msg  [receiver_id]=${id}&msg[receiver_type]=1&msg[msg_type]=1&msg[dev_id]=${deviceid}&msg[timestamp]=${parseInt  (new Date().getTime()/1000)}&msg[content]={"content":"${text}"}&csrf=${data.bili_jct}`,
      type: "json"
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    });
}

export function sendDm(fetch,aid,cid,text) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDWBIPOST",
      data,
      url: "https://api.bilibili.com/x/v2/dm/post",
      type: "json",
      info: login_info,
      paramsobj: {
         type:1,
         oid:cid,
         msg:text,
         aid:aid,
         progress:0,
         color:16777215, 
         fontsize:25, 
         pool:0,
         mode:1,
         rnd:Date.now() * 1000000,
         csrf:data.bili_jct
      }
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
    });
}

export function sendReply(fetch,text,id) {
  return new Promise((resolve, reject) => {
    fetch.request({
      method: "SENDBILIPOST",
      data,
      url: `https://api.bilibili.com/x/v2/reply/add?type=1&oid=${id}&message=${text}&plat=1&csrf=${data.bili_jct}`,
      type: "json"
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
  });
}