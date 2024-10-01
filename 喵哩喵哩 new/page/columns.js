import * as hmUI from "@zos/ui"
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
const localStorage = new LocalStorage()
let params;
Page(
  BasePage({
    onInit(param) {
      params = param
    },
    build() {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 150,
        y: 50,
        src: "back.png",
      }).addEventListener(hmUI.event.CLICK_UP, () => {
        
      })
      const title = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 180,
        y: 40,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "专栏",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      }).addEventListener(hmUI.event.CLICK_UP, () => {
        
      })
      const columnsTitle = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 40,
        y: 80,
        w: px(420),
        h: px(88),
        text_size: 32,
        text: "未知",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      const upTitle = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 40,
        y: 160,
        w: px(245),
        h: px(88),
        text_size: 20,
        text: "未知",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      const columnTitle = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 40,
        y: 200,
        w: px(420),
        h: px(1000),
        text_size: 20,
        text: "未知",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
        this.request({
            method: "GETCOLUMNS",
            data: { 
              DedeUserID: localStorage.getItem("DedeUserID"),
              SESSDATA: localStorage.getItem("SESSDATA"),
              bili_jct: localStorage.getItem("bili_jct"),
              DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
              buvid3: localStorage.getItem("buvid3"),
            },
            id: params,
            type: "json"
          })
            .then((res) => {
            })
            .catch((res) => {
              console.log(res.title)
              console.log(res.article.content)
              columnsTitle.setProperty(hmUI.prop.TEXT, res.title)
              upTitle.setProperty(hmUI.prop.TEXT, res.author)
              columnTitle.setProperty(hmUI.prop.TEXT, res.article.content)
            })
    },
  })
)