import { BasePage } from "@zeppos/zml/base-page"
import { back, push } from '@zos/router'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
Page(
  BasePage({
    build() {
      createWidget(widget.IMG, {
        x: 182,
        y: 34,
        src: "back.png",
      }).addEventListener(event.CLICK_UP, () => {
        back()
      })
      const title = createWidget(widget.TEXT, {
        x: 215,
        y: 22,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "公告",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      createWidget(widget.BUTTON, {
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
      createWidget(widget.BUTTON, {
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