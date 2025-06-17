import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { getStarFolderList } from "../../func/fetch";
const localStorage = new LocalStorage()

let textList = []
let newTextList = []
let buttonList = []

let res = null;

Page(
  BasePage({
    build() {
      
      const text = createWidget(widget.TEXT, {
        x: px(196),
        y: px(10),
        w: px(88),
        h: px(46),
        color: 0xffffff,
        text_size: px(24),
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text_style: text_style.NONE,
        text: '',
      });
      function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        text.setProperty(prop.TEXT, timeString);
      }
  
      setInterval(updateTime, 1000);
      updateTime();
     
      this.getStarFolderList();
      let time = setInterval(() => {
        if (!res) return;
        this.createWidget(res);
        clearInterval(time)
      }, 50);
    },
    createWidget(res) { 
      const view = createWidget(widget.VIEW_CONTAINER, {
        x: px(0),
        y: px(55),
        w: px(480),
        h: px(430)
      });

     
   view.createWidget(widget.TEXT, {
        x: px(63),
        y: px(25),
        w: px(400),
        h: px(100),
        text_size: px(60),
        text: "收藏夹",
        align_h: align.LEFT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
      })
      for(let i = 0; i < res.body.data.count; i++) {
        buttonList[i] = view.createWidget(widget.BUTTON, {
          x: px(30),
          y: 150 + i * 204,
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
        textList[i] = view.createWidget(widget.TEXT, {
          x: 50,
          y: 170 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: text_style.WRAP,
        }) // title
        view.createWidget(widget.IMG,{
          x: 50,
          y: 280 + i * 204,
          src: 'watchnum.png'
        })
        newTextList[i] = view.createWidget(widget.TEXT, {
          x: 78,
          y: 277 + i * 204,
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