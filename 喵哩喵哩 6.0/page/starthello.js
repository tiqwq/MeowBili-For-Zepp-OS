// 系统api导入
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { scrollTo } from '@zos/page'
import { push } from '@zos/router'

Page({
    build() {
        const fill_rect = createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 370,
        h: 370,
        radius: 180,
        color: 0xff93c4
      })
      fill_rect.setAlpha(90)
      createWidget(widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 480,
        h: 480,
        radius: 180,
        color: 0xffffff
      }).setAlpha(40)
      const text = createWidget(widget.TEXT, {
        x: 50,
        y: 60,
        w: 380,
        h: 300,
        color: 0xffffff,
        text_size: 36,
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text_style: text_style.NONE,
        text: 'HELLO ZeppMeowBili\n设计\n“焕然一新”'
      })
  
      createWidget(widget.TEXT, {
        x: 50,
        y: 290,
        w: 380,
        h: 100,
        color: 0xff93c4,
        text_size: 30,
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text_style: text_style.NONE,
        text: '让我们开始熟悉一下\n使用方式吧'
      })

    
           createWidget(widget.BUTTON, {
            x: 180,
            y: 390,
            w: 120,
            h: 70,
            normal_color: 0xff699b,
            press_color: 0xcc547b,
            text: 'NEXT',
            text_size: 40,
            radius: 40,
            align_h: align.CENTER_H,
            click_func: (button_widget) => {
                push({
                    url: 'page/index',
                })
            }
          })
    }
  })        