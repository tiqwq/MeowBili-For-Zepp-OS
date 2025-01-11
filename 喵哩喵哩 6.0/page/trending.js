import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { push } from '@zos/router'
import { decodeUnicodeEscape } from "../utils/utils";
import { getTrending } from "../func/fetch";
let buttonList = []

Page(
  BasePage({
    build() {
      createWidget(widget.IMG, {
          x: 0,
          y: 0,
          src: 'Bg.png'
        });
      for(let i = 0; i < 10; i++) {
        
        buttonList[i] = createWidget(widget.FILL_RECT,{ 
          x: 35, 
          y: 310 + i * 130, 
          w: 420, 
          h: 80, 
          color:  0x222222, 
          radius: 30
         })
        buttonList[i] = createWidget(widget.TEXT, {
          x: 50,
          y: 330 + i * 130,
          w: 420,
          h: 180,
          text_size: 22,
          text: "🔥"+"",
          align_h: align.CENTER_H,

          color: 0xffffff,
        })
      }
         this.getTrending()  
         createWidget(widget.IMG, {
          x: 190,
          y: 50,
          src: "back.png",
        })
        createWidget(widget.TEXT, {
          x: 220,
          y: 40,
          w: px(245),
          h: px(88),
          text_size: 32,
          text: "搜索",
          color: 0xffffff
        })
        createWidget(widget.IMG, {
          x: 80,
          y: 196,
          src: "about_code.png",
        })
        createWidget(widget.TEXT, {
          x: 130,
          y: 190,
          w: 400,
          h: 88,
          text_size: 15,
          text: "我们为您提供了一个全新的中文输入法\n以便您更好地搜索您内心所想",
          color: 0xffffff
        })
         createWidget(widget.IMG, {
          x: 100,
          y: 100,
          src: "searchbg.png",
        }).addEventListener(event.CLICK_UP, () => {
          push({
            url: "page/board",
            params: "searchresult"
          })
        });
        createWidget(widget.IMG, {
          x: 125,
          y: 125,
          src: "search.png",
        }); createWidget(widget.TEXT, {
          x: 210,
          y: 247,
          w: px(245),
          h: px(88),
          text_size: 32,
          text: "🔥热榜🔥",
          color: 0xffffff
        })
        createWidget(widget.TEXT, {
          x: 100,
          y: 120,
          w: 288,
          h: 46,
          color: 0xffffff,
          text_size: 20,
          align_h: align.CENTER_H,
          align_v: align.CENTER_V,
          text_style: text_style.NONE,
          text: '点击以搜索',
        }).addEventListener(event.CLICK_UP, () => {
          push({
            url: "page/board",
            params: "searchresult"
          })
        });
       /*  createWidget(widget.BUTTON, {
          x: 60,
          y: 70,
          w: px(360),
          h: px(80),
          text_size: px(36),
          text: "搜索",
          press_color: 0x101010,
          radius: 50,
          normal_color: 0x222222,
          click_func: () => {
            push({
              url: "page/board",
              params: "searchresult"
            })
          }
        })  */
    },
    getTrending() {
      getTrending(this).then((res) => {
        for (let i = 0; i < 10; i++) {
          buttonList[i].setProperty(prop.TEXT,JSON.parse( decodeUnicodeEscape(res.body)).list[i].show_name)
          buttonList[i].addEventListener(event.CLICK_UP, () => {
              push({
                url: "page/searchresult",
                params: {
                  keyword: JSON.parse( decodeUnicodeEscape(res.body)).list[i].show_name
                }
              })
            })
          }
        })
      }
    })
)