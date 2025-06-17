import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage'
import { back, push } from '@zos/router'
import { getStarVideoList } from '../../func/fetch';
import { formatNumber } from '../../utils/utils';
const localStorage = new LocalStorage()
let textList = []
let newTextList = []
let newNewTextList = []
let buttonList = []
let params
let pn = 1
Page(
  BasePage({ 
    onInit(param) {
      params = JSON.parse(param)
    },
    build() {
      createWidget(widget.IMG, {
        x: 150,
        y: 50,
        src: "back.png",
      }).addEventListener(event.CLICK_UP, () => {
        back();
      });
      createWidget(widget.TEXT, {
        x: 180,
        y: 40,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: params.name,
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      createWidget(widget.BUTTON, {
        x: 35,
        y: 80,
        w: 185,
        h: 58,
        text_size: px(36),
        radius: px(12),
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "上一页",
        click_func: () => {
          pn--;
          this.getStarVideoList();
        },
      });
      createWidget(widget.BUTTON, {
        x: 253,
        y: 80,
        w: 185,
        h: 58,
        text_size: px(36),
        radius: px(12),
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "下一页",
        click_func: () => {
          pn++;
          this.getStarVideoList();
        },
      });
      for(let i = 0; i < 5; i++) {
        buttonList[i] = createWidget(widget.BUTTON, {
          x: 30,
          y: 170 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        textList[i] = createWidget(widget.TEXT, {
          x: 50,
          y: 190 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: text_style.WRAP,
        })
        createWidget(widget.IMG,{
          x: 50,
          y: 300 + i * 204,
          src: 'watchnum.png'
        })
        newTextList[i] = createWidget(widget.TEXT, {
          x: 191,
          y: 297 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.WRAP,
        })
        createWidget(widget.IMG,{
          x: 165,
          y: 303 + i * 204,
          src: 'up.png'
        })
        newNewTextList[i] = createWidget(widget.TEXT, {
          x: 82,
          y: 297 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 20,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.ELLIPSIS,
        })
      } 
      this.getStarVideoList()
    } ,
    getStarVideoList() {
      getStarVideoList(this,params.id,pn).then((res) => {
        for(let i = 0; i < 5; i++) {
          textList[i].setProperty(prop.TEXT, res.body.data.medias[i].title)
          newTextList[i].setProperty(prop.TEXT, res.body.data.medias[i].upper.name)
          newNewTextList[i].setProperty(prop.TEXT, formatNumber(res.body.data.medias[i].cnt_info.play))
          textList[i].setEnable(false)
          buttonList[i].setProperty(prop.MORE, {
            x: 30,
            y: 170 + i * 204,
            w: 420,
            h: 180,
            radius: 40,
            normal_color: 0x222222,
            press_color: 0x101010,
            click_func: () => {
            push({
              url: 'page/videodetail',
              params: JSON.stringify({
                  img_src: res.body.data.medias[i].cover,
                  vid_title: res.body.data.medias[i].title,
                  bv: res.body.data.medias[i].bvid,
                  up_mid: res.body.data.medias[i].upper.mid
              })
            })
            },
          })  
        }  
      })
    }
  })
);