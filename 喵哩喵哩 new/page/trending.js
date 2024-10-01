import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
const localStorage = new LocalStorage()
function decodeUnicodeEscape(data) {
  if (typeof data === 'string') {
      return data.replace(/\\u([\dA-Fa-f]{4})/g, function (match, grp) {
          return String.fromCharCode(parseInt(grp, 16));
      })
  } else if (typeof data === 'object') {
      for (let key in data) {
          if (data.hasOwnProperty(key)) {
              data[key] = decodeUnicodeEscape(data[key]);
          }
      }
  }
  return data;
}
let buttonList = []

Page(
  BasePage({
    build() {
      for(let i = 0; i < 10; i++) {
        buttonList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 50,
          y: 100 + i * 32,
          w: 420,
          h: 180,
          text_size: 22,
          text: "",
          color: 0xffffff,
        })
      }
         this.getWbi() 
        //  const th = this
        //  hmUI.createWidget(hmUI.widget.BUTTON, {
        //    x: 60,
        //    y: 380,
        //    w: px(360),
        //    h: px(80),
        //    text_size: px(36),
        //    text: "刷新",
        //    press_color: 0x101010,
        //    normal_color: 0x222222,
        //    click_func: () => {
        //      th.getWbi()
        //    }
        //  })
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 60,
          y: 20,
          w: px(360),
          h: px(80),
          text_size: px(36),
          text: "搜索",
          press_color: 0x101010,
          normal_color: 0x222222,
          click_func: () => {
            push({
              url: "page/board",
              params: "searchresult"
            })
          }
        }) 
    },
    getWbi() {
      this.request({
          method: "SENDBILIGET",
          data: {
            DedeUserID: localStorage.getItem("DedeUserID"),
            SESSDATA: localStorage.getItem("SESSDATA"),
            bili_jct: localStorage.getItem("bili_jct"),
            DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
            buvid3: localStorage.getItem("buvid3"),
          },
          url: "https://s.search.bilibili.com/main/hotword",
          type: "json",
        })
          .then((res) => {
          })
          .catch((res) => {
            for(let i = 0; i < 10; i++) {
              buttonList[i].setProperty(hmUI.prop.TEXT,JSON.parse( decodeUnicodeEscape(res.body)).list[i].keyword)
              buttonList[i].addEventListener(hmUI.event.CLICK_UP, () => {
                push({
                  url: "page/searchresult",
                  params: {
                    keyword: JSON.parse( decodeUnicodeEscape(res.body)).list[i].show_name
                  }
                })
              })
            }
          });
  }
    
  })
);       