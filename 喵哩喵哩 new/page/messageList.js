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
    function parseJsonContent(jsonStr) {
      try {
          const parsed = JSON.parse(jsonStr);
          return parsed.content;
      } catch (error) {
          console.error("Error parsing JSON:", error);
          return null;
      }
  }
let nameList = []
let textList = []
let rectList = []
for (let i = 0; i < 20; i++) {
  rectList[i] = hmUI.createWidget(hmUI.widget.FILL_RECT, {
    x: 40,
    y: 85 + i * 155,
    w: 392,
    h: 139,
    radius: 40,
    color: 0x222222
  });
  nameList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 164,
    y: 109 + i * 155,
    w: 229,
    h: 31,
    text: "",
    color: 0xffffff,
    text_size: 22,
  });
  textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 164,
    y: 145 + i * 155,
    w: 229,
    h: 67,
    text: "",
    text_style: hmUI.text_style.WRAP,
    color: 0x9e9e9e,
    text_size: 18,
  })
}
Page(
  BasePage({
    build() {

        this.get()
          // this.getVideoList();
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 150,
            y: 50,
            src: "back.png",
          }).addEventListener(hmUI.event.CLICK_UP, () => {

          });
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 180,
            y: 40,
            w: px(245),
            h: px(88),
            text_size: 32,
            text: "私信列表",
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          }).addEventListener(hmUI.event.CLICK_UP, () => {

          })

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
        url: `https://api.vc.bilibili.com/session_svr/v1/session_svr/get_sessions?talker_id=1&session_type=1`,
        type: "json"
      })
        .then((res) => {
          console.log("then");
          
        })
        .catch((res) => {
          let sessions = res.body.data.session_list
          var session_uids = []
          sessions.forEach((session) => {
            if (session.talker_id) {
              session_uids.push(session.talker_id)
            }
            else {
              sessions = sessions.filter(item => item !== session)
            }
          })
          for (let i = 0; i < sessions.length; i++) {
            console.log(parseJsonContent(sessions[i].last_msg.content));
            
            textList[i].setProperty(hmUI.prop.TEXT, parseJsonContent(sessions[i].last_msg.content) || "暂无消息")
            rectList[i].addEventListener(hmUI.event.CLICK_DOWN,() => {
              push({
                url: "page/message",
                params: JSON.stringify({
                  id: {
                    sender_uid: sessions[i].last_msg.sender_uid,
                    receiver_id: sessions[i].last_msg.receiver_id
                  },
                  type: "page"
                })
              })
          })
          }
            this.getMultiUserInfoByUID(session_uids)
        });
    },
    getMultiUserInfoByUID(uids) {
      console.log(uids);
      
      const url = "https://api.bilibili.com/x/polymer/pc-electron/v1/user/cards";
      let param = uids.join(",");
      this.request({
          url: `${url}?uids=${param}`,
          type: "json",
          method: "SENDBILIGET",
          data: {
            DedeUserID: localStorage.getItem("DedeUserID"),
            SESSDATA: localStorage.getItem("SESSDATA"),
            bili_jct: localStorage.getItem("bili_jct"),
            DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
            buvid3: localStorage.getItem("buvid3"),
          },
      })
      .then((res) => {
        for (let i = 0; i < res.body.data.length; i++) {
          console.log(res.body.data[uids[i]].name);
          nameList[i].setProperty(hmUI.prop.TEXT, res.body.data[uids[i]].name)
        }
      })
      .catch((res) => {
        for (let i = 0; i < 20; i++) {
          console.log(res.body.data[uids[i]].name);
          nameList[i].setProperty(hmUI.prop.TEXT, res.body.data[uids[i]].name)
        }
      })
    }

  })
); 