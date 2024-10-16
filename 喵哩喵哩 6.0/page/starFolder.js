import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { getStarFolderList } from "../func/fetch";
const localStorage = new LocalStorage()

let textList = []
let newTextList = []
let buttonList = []

let res = null;

Page(
  BasePage({
    build() {
      createWidget(widget.IMG, {
        x: 150,
        y: 50,
        src: "back.png",
      }).addEventListener(event.CLICK_UP, () => {

      });
      createWidget(widget.TEXT, {
        x: 180,
        y: 40,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "收藏夹",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      this.getStarFolderList();
      let time = setInterval(() => {
        if (!res) return;
        this.createWidget(res);
        clearInterval(time)
      }, 50);
    },
    createWidget(res) {
      for(let i = 0; i < res.body.data.count; i++) {
        buttonList[i] = createWidget(widget.BUTTON, {
          x: 30,
          y: 180 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        buttonList[i].addEventListener(event.CLICK_UP, () => {
          push({
            url: "page/starVideoList",
            params: JSON.stringify({
              id: res.body.data.list[i].id,
              name: res.body.data.list[i].title
            })
          })
        });
        textList[i] = createWidget(widget.TEXT, {
          x: 50,
          y: 200 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: text_style.WRAP,
        }) // title
        createWidget(widget.IMG,{
          x: 50,
          y: 310 + i * 204,
          src: 'watchnum.png'
        })
        newTextList[i] = createWidget(widget.TEXT, {
          x: 78,
          y: 307 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.WRAP,
        }) // uname
      } 
      for (let i = 0; i < res.body.data.list.length; i++) {
        textList[i].setProperty(prop.TEXT, res.body.data.list[i].title)
        newTextList[i].setProperty(prop.TEXT, res.body.data.list[i].media_count.toString())
        textList[i].setEnable(false);
      }
    },
    getStarFolderList() {
      getStarFolderList(this).then((result) => {
        res = result
      })
    }
  })
);