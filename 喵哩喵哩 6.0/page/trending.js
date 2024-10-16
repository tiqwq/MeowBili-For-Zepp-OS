import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { push } from '@zos/router'
import { decodeUnicodeEscape } from "../utils/utils";
import { getTrending } from "../func/fetch";
let buttonList = []

Page(
  BasePage({
    build() {
      for(let i = 0; i < 10; i++) {
        buttonList[i] = createWidget(widget.TEXT, {
          x: 50,
          y: 170 + i * 70,
          w: 420,
          h: 180,
          text_size: 22,
          text: "",
          color: 0xffffff,
        })
      }
         this.getTrending() 
        createWidget(widget.BUTTON, {
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
        }) 
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