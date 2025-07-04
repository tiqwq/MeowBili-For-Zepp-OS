import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { getLaterSeeList } from "../../func/fetch";
import { formatNumber } from "../../utils/utils";
const localStorage = new LocalStorage()
let textList = []
let newTextList = []
let newNewTextList = []
let buttonList = []

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
        text: "稍后再看",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      for(let i = 0; i < 8; i++) {
        buttonList[i] = createWidget(widget.BUTTON, {
          x: 30,
          y: 130 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        textList[i] = createWidget(widget.TEXT, {
          x: 50,
          y: 150 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: text_style.WRAP,
        }) // title
        createWidget(widget.IMG,{
          x: 50,
          y: 260 + i * 204,
          src: 'watchnum.png'
        })
        newTextList[i] = createWidget(widget.TEXT, {
          x: 191,
          y: 257 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.WRAP,
        }) // uname
        createWidget(widget.IMG,{
          x: 165,
          y: 263 + i * 204,
          src: 'up.png'
        })
        newNewTextList[i] = createWidget(widget.TEXT, {
          x: 82,
          y: 257 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 20,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.ELLIPSIS,
        }) // viewNumber
      } 
         this.laterSee() 
    },
    laterSee() {
      getLaterSeeList(this).then((res) => {
        for(let i = 0; i < res.body.data.count; i++) {
          textList[i].setProperty(prop.TEXT, res.body.data.list[i].title)
          newTextList[i].setProperty(prop.TEXT, res.body.data.list[i].owner.name)
          newNewTextList[i].setProperty(prop.TEXT, formatNumber(res.body.data.list[i].stat.view))
          textList[i].setEnable(false)
          buttonList[i].setProperty(prop.MORE, {
            x: 30,
            y: 130 + i * 204,
            w: 420,
            h: 180,
            radius: 40,
            normal_color: 0x222222,
            press_color: 0x101010,
            click_func: () => {
            push({
              url: 'page/videodetail',
              params: JSON.stringify({
                  img_src: res.body.data.list[i].pic,
                  vid_title: res.body.data.list[i].title,
                  bv: res.body.data.list[i].bvid,
                  up_mid: res.body.data.list[i].owner.mid,
                  id: res.body.data.list[i].aid,
              }),
            })
            },
          })  
        }  
      })
    }
  })
);