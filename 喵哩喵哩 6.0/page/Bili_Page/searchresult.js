import { BasePage } from "@zeppos/zml/base-page";
import { push } from '@zos/router'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { getSearchResult } from "../../func/fetch";
let textList = []
let newTextList = []
let newNewTextList = []
let buttonList = []
import { extractTextFromHTML, formatNumber } from "../../utils/utils";
let params
Page(
  BasePage({ 
    onInit(param) {
      params = param;
    },
    build() {
      createWidget(widget.TEXT, {
        x: 210,
        y: 100,
        text_size: 28,
        text: "专栏",
        color: 0xffffff,
      }).addEventListener(event.CLICK_UP, (widget) => {
        push({
          url: 'page/searchresultcolumns',
          params: params,
        })
      })
      for(let i = 0; i < 8; i++) {
        buttonList[i] = createWidget(widget.BUTTON, {
          x: 30,
          y: 180 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
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
          x: 191,
          y: 307 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.WRAP,
        }) // uname
        createWidget(widget.IMG,{
          x: 165,
          y: 313 + i * 204,
          src: 'up.png'
        })
        newNewTextList[i] = createWidget(widget.TEXT, {
          x: 82,
          y: 307 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 20,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.ELLIPSIS,
        }) // viewNumber
      } 
         this.getSearchResult() 
    },
    getSearchResult() {
      getSearchResult(this,params,'video').then((res) => {
        for (let i = 0; i < 8; i++) {
          textList[i].setProperty(prop.TEXT, extractTextFromHTML(res.body.data.result[i].title))
          newTextList[i].setProperty(prop.TEXT, res.body.data.result[i].author)
          newNewTextList[i].setProperty(prop.TEXT, formatNumber(res.body.data.result[i].play,'text'))
          textList[i].setEnable(false)
          buttonList[i].setProperty(prop.MORE, {
            x: 30,
            y: 180 + i * 204,
            w: 420,
            h: 180,
            radius: 40,
            normal_color: 0x222222,
            press_color: 0x101010,
            click_func: () => {
            push({
              url: 'page/videodetail',
              params: JSON.stringify({
                  img_src: res.body.data.result[i].pic,
                  vid_title: res.body.data.result[i].title,
                  bv: res.body.data.result[i].bvid,
                  up_mid: res.body.data.result[i].mid,
                  id: res.body.data.result[i].aid,
              })
            })
            }
          })  
        }  
      })
    }
    
  })
);
