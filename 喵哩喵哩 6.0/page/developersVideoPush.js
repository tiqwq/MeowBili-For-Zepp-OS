// 系统api导入
import * as hmUI from "@zos/ui";
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { scrollTo } from '@zos/page'
import { BasePage } from "@zeppos/zml/base-page";
import { log, px } from "@zos/utils";
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
// 个人模块导入
import { fetchVideoList } from "../func/fetch";
import { formatNumber } from "../utils/utils";
const localStorage = new LocalStorage()
let list = localStorage.getItem("list", undefined)
let num = 10 // 视频显示数
function randomNum(minNum,maxNum){ 
  switch(arguments.length){
      case 1:
          return parseInt(Math.random()*minNum+1,10); 
      break;
      case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
          default:
              return 0; 
          break; 
  } 
} 
Page(
  BasePage({
    state: {
      textList: [],
      newTextList: [],
      newNewTextList: [],
      buttonList: [],
      suggest: [],
      suggestCount: 0,
    },
    build() {

      createWidget(widget.PAGE_SCROLLBAR)
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 154,
        y: 37,
        src: "back.png",
      }).addEventListener(hmUI.event.CLICK_UP, () => {
        

      })
      createWidget(hmUI.widget.TEXT, {
        x: 187,
        y: 25,
        w: px(245),
        h: px(88),
        text_size: 38,
        text: "视频推荐",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 129,
        y: 78,
        w: 230,
        h: 50,
        radius: 20,
        color: 0xfc6950
      })
  
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 140,
        y: 83,
        src: 'earth.png',
        
      })
      createWidget(hmUI.widget.TEXT, {
        x: 195,
        y: 77,
        w: px(245),
        h: px(88),
        text_size: 18,
        text: "预留广告位，合作\n请联系开发者",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      this.getSuggestVideoList()

    },
      getSuggestVideoList() {
        this.request({
          method: "GETSUGGESTVIDEO"
        })
          .then((res) => {
            console.log(res.body[0]['title']);
            this.state.suggestCount = res.body.length;
            this.state.suggest = res.body
            let list = this.state.suggest
            for (let i = 0; i < this.state.suggestCount; i++) {
              this.state.buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
                x: 30,
                y: 191 + i * 246,
                w: 420,
                h: 180,
                radius: 40,
                normal_color: 0x222222,
                press_color: 0x101010,
              })
              this.state.textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 50,
                y: 211 + i * 246,
                w: px(350),
                h: px(84),
                text_size: 28,
                text: "",
                color: 0xffffff,
                text_style: hmUI.text_style.WRAP,
              })  // 标题
              this.state.newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 191,
                y: 318 + i * 246,
                w: px(360),
                h: px(40),
                text_size: 22,
                text: "",
                color: 0x9E9E9E,
                text_style: hmUI.text_style.WRAP,
              })// up名字
              hmUI.createWidget(hmUI.widget.IMG, {
                x: 165,
                y: 323 + i * 246,
                src: 'up.png'
              })
            }
            for (let i = 0; i < this.state.suggestCount; i++) {
              if (list[i].reference != undefined) {
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: 54,
                  y: 133 + i * 246,
                  w: 318,
                  h: 50,
                  text_size: 28,
                  text: list[i].reference + "推荐",
                  color: 0xffffff,
                  text_style: hmUI.text_style.WRAP,
                })
              }
              this.state.textList[i].setProperty(hmUI.prop.TEXT, list[i].title);
              this.state.newTextList[i].setProperty(hmUI.prop.TEXT, list[i].author);
              this.state.textList[i].setEnable(false)
              this.state.buttonList[i].setProperty(hmUI.prop.MORE, {
                x: 30,
                y: 191 + i * 246,
                w: 420,
                h: 180,
                radius: 40,
                normal_color: 0x222222,
                press_color: 0x101010,
                click_func: () => {
                  push({
                    url: 'page/videodetail',
                    params: JSON.stringify({
                      img_src: list[i].pic,
                      vid_title: list[i].title,
                      bv: list[i].bvid,
                      cid: list[i].cid,
                      uname: list[i].author,
                      up_mid: list[i].up_mid,
                      id: list[i].aid
                    })
                  })
                },
              })
            }
          })
          .catch((res) => {

        })
      },
  })
);