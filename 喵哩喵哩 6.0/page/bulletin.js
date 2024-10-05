import * as hmUI from "@zos/ui"
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
import { home } from '@zos/router'
const localStorage = new LocalStorage()
Page(
  BasePage({
    build() {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 182,
        y: 34,
        src: "back.png",
      }).addEventListener(hmUI.event.CLICK_UP, () => {
        
      })
      const title = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 215,
        y: 22,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "公告",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 80,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "全部公告",
        click_func: () => {
          push({
            url: 'page/allBulletin'
          })
        }
      })
     /*  hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 187,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "更新公告",
        click_func: () => {
          
        }
      }) */
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 187,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "视频推荐",
        click_func: () => {
          push({
            url: 'page/developersVideoPush'
          })
        }
      })
    }
  })
)