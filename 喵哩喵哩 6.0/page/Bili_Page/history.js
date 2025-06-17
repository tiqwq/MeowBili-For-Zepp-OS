import { createWidget, widget, align, prop, text_style, event} from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { push } from '@zos/router';
import { formatNumber } from '../../utils/utils';
import { getHistoryList } from '../../func/fetch';
import { getText } from '@zos/i18n';

let textList = [];
let newTextList = [];
let newNewTextList = [];
let buttonList = [];

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
              text: getText('history_title'),  // 修改这里
              align_h: align.LEFT,
              align_v: align.CENTER_V,
              text_style: text_style.NONE
        })
      for(let i = 0; i < 8; i++) { 
        
        buttonList[i] = view.createWidget(widget.BUTTON, {
          x: 30,
          y: 150 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        textList[i] = view.createWidget(widget.TEXT, {
          x: 50,
          y: 170 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: getText('loading'),  // 修改这里
          color: 0xffffff,
          text_style: text_style.WRAP,
        }) // title
        view.createWidget(widget.IMG,{
          x: 50,
          y: 280 + i * 204,
          src: 'watchnum.png'
        })
        newTextList[i] = view.createWidget(widget.TEXT, {
          x: 191,
          y: 277 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.WRAP,
        }) // uname
        view.createWidget(widget.IMG,{
          x: 165,
          y: 263 + i * 204,
          src: 'up.png'
        })
        newNewTextList[i] = view.createWidget(widget.TEXT, {
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
         this.getHistoryList() 
    },
    getHistoryList() {
      getHistoryList(this).then((res) => {
        for(let i = 0; i < 8; i++) {
          textList[i].setProperty(prop.TEXT, res.body.data[i].title)
          newTextList[i].setProperty(prop.TEXT, res.body.data[i].owner.name)
          newNewTextList[i].setProperty(prop.TEXT, formatNumber(res.body.data[i].stat.view))
          textList[i].setEnable(false)
          buttonList[i].setProperty(prop.MORE, {
            x: 30,
            y: 150 + i * 204,
            w: 420,
            h: 180,
            radius: 40,
            normal_color: 0x222222,
            press_color: 0x101010,
            click_func: () => {
            push({
              url: 'page/videodetail',
              params: JSON.stringify({
                  img_src: res.body.data[i].pic,
                  vid_title: res.body.data[i].title,
                  bv: res.body.data[i].bvid,
                  up_mid: res.body.data[i].owner.mid,
                  id: res.body.data[i].aid,
              }),
            })
            },
          })  
        }  
      })
    }
  })
);