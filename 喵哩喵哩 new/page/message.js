import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
const logger = Logger.getLogger("fetch_api");
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
import { back } from '@zos/router'

// hmUI.createWidget(hmUI.widget.IMG, {
//   x: 0,
//   y: 0,
//   w: px(480),
//   h: px(480),
//   src: "data://download/1.png",
// })
let params

    const deviceid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (name) {
      let randomInt = 16 * Math.random() | 0;
      return ("x" === name ? randomInt : 3 & randomInt | 8).toString(16).toUpperCase()
    }));
    function parseJsonContent(jsonStr) {
      try {
          const parsed = JSON.parse(jsonStr);
          return parsed.content;
      } catch (error) {
          console.error("Error parsing JSON:", error);
          return null;
      }
  }
  function reverseMessages(data) {
    if (data && data.messages) {
        data.messages.reverse();
    }
    return data;
}
let talk_id; 
Page(
  BasePage({
    onInit(param) {
      params = JSON.parse(param)
      console.log(params.id.sender_uid);
      console.log(params.id.receiver_id);
      
      if (params.id.receiver_id == localStorage.getItem("DedeUserID")) {
        talk_id = params.id.sender_uid
      } else {
        talk_id = params.id.receiver_id
      }
    },
    build() {
        this.get()
        // this.post()
          // this.getVideoList();
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 150,
            y: 50,
            src: "back.png",
          }).addEventListener(hmUI.event.CLICK_UP, () => {

          });
          const back = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 180,
            y: 40,
            w: px(245),
            h: px(88),
            text_size: 32,
            text: "私信发送",
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          }).addEventListener(hmUI.event.CLICK_UP, () => {
            push({
              url: "page/board",
              params: JSON.stringify({
                type: "sendmsg",
                sender_uid: params.id.sender_uid,
                receiver_id: params.id.receiver_id
              })
            })
          })
    },
    post() {
      this.request({
        method: "SENDBILIPOST",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        }, 
        content_type: "application/x-www-form-urlencoded",
        url: `https://api.vc.bilibili.com/web_im/v1/web_im/send_msg?msg[sender_uid]=${localStorage.getItem("DedeUserID")}&msg[receiver_id]=${params}&msg[receiver_type]=1&msg[msg_type]=1&msg[dev_id]=${deviceid}&msg[timestamp]=${parseInt(new Date().getTime()/1000)}&msg[content]={"content":"${params.text}"}&csrf=${localStorage.getItem("bili_jct")}`,
        type: "json"
      })
        .then((res) => {

        })
        .catch((res) => {

        });
    },
    get() {
      this.request({
        method: "SENDBILIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        url: `https://api.vc.bilibili.com/svr_sync/v1/svr_sync/fetch_session_msgs?talker_id=${talk_id}&session_type=1`,
        type: "json"
      })
        .then((res) => {
          console.log("then");
          
        })
        .catch((res) => {
          
          let resu = reverseMessages(res.body.data)
          for (let i = 0; i < resu.messages.length; i++) {
            let xPosition = resu.messages[i].sender_uid == localStorage.getItem("DedeUserID") ? 180 : 20;
            let align = resu.messages[i].sender_uid == localStorage.getItem("DedeUserID") ? hmUI.align.RIGHT : hmUI.align.LEFT;
        
            hmUI.createWidget(hmUI.widget.TEXT, {
                x: xPosition,
                y: 100 + i * 50,
                w: 280,
                h: 50,
                text: parseJsonContent(resu.messages[i].content),
                color: 0xffffff,
                text_size: 20,
                align_h: align
            });
        }
        });
    }
  })
); 