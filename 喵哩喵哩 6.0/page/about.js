import { getText } from '@zos/i18n'
import { launchApp } from '@zos/router'
import { setScrollMode, SCROLL_MODE_SWIPER } from '@zos/page'
import { back } from '@zos/router'

import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
Page({
  build() {
      /* createWidget(widget.IMG, {
        x: 0,
        y: 0,
        src: 'Bg.png'
      }) */



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
          text: "关于",
          color: 0xffffff
        })
      createWidget(widget.IMG, {
        x: 45,
        y: 110,
        src: 'version.png'
      })
     

      
    createWidget(widget.TEXT, {
      x: 40,
      y: 300,
      w: 400,
      h: 100,
      color: 0xffffff,
      text_size: 30,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '本项目归属于',
    })
    createWidget(widget.FILL_RECT, {
      x: 125,
      y: 380,
      w: 230,
      h: 80,
      radius: 40,
      color:  0x222222
    })
    
    createWidget(widget.TEXT, {
      x: 70,
      y: 370,
      w: 400,
      h: 100,
      color: 0xffffff,
      text_size: 25,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'Zeele·Zerv',
    })
    createWidget(widget.TEXT, {
      x: 50,
      y: 810,
      w: 390,
      h: 160,
      color: 0xB5CBD8,
      text_size: 28,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '反馈QQ群组:976682537',
    })
  }
})
