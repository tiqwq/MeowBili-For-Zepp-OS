import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
import { getTextLayout } from '@zos/ui'
function logStringInChunks(text) {
    for (let i = 0; i < text.length; i += 50) {
        console.log(text.slice(i, i + 50));
    }
}

let textList = []
let newTextList = []
let buttonList = []


function formatNumber(num) {
  if (num < 1000) {
      return num.toString();
  } else if (num < 10000) {
      return (num / 1000).toFixed(1) + 'k';
  } else {
      return (num / 10000).toFixed(1) + 'w'
  }
}

Page(
  BasePage({
    build() {
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
        text: "收藏夹",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      this.getVideoList();
    },
    getVideoList() {
      this.request({
        method: "SENDBILIGET",
        data: { 
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        url: `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${localStorage.getItem("DedeUserID")}`,
        type: "json"
      })
        .then((res) => {
          for(let i = 0; i < res.body.data.count; i++) {
            buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
              x: 30,
              y: 180 + i * 204,
              w: 420,
              h: 180,
              radius: 40,
              normal_color: 0x222222,
              press_color: 0x101010,
            })
            buttonList[i].addEventListener(hmUI.event.CLICK_UP, () => {
              push({
                url: "page/starVideoList",
                params: JSON.stringify({
                  id: res.body.data.list[i].id,
                  name: res.body.data.list[i].title
                })
              })
            });
            textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 50,
              y: 200 + i * 204,
              w: px(350),
              h: px(88),
              text_size: 28,
              text: "",
              color: 0xffffff,
              text_style: hmUI.text_style.WRAP,
            }) // title
            hmUI.createWidget(hmUI.widget.IMG,{
              x: 50,
              y: 310 + i * 204,
              src: 'watchnum.png'
            })
            newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 78,
              y: 307 + i * 204,
              w: px(360),
              h: px(40),
              text_size: 22,
              text: "",
              color: 0x9E9E9E,
              text_style: hmUI.text_style.WRAP,
            }) // uname
          } 
          for (let i = 0; i < res.body.data.list.length; i++) {
            textList[i].setProperty(hmUI.prop.TEXT, res.body.data.list[i].title)
            newTextList[i].setProperty(hmUI.prop.TEXT, res.body.data.list[i].media_count.toString())
            textList[i].setEnable(false);
          }
        })
        .catch((res) => {


        });
    },
  })
);