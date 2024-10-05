import { getText } from '@zos/i18n'
import { launchApp } from '@zos/router'
import { setScrollMode, SCROLL_MODE_SWIPER } from '@zos/page'
import { back } from '@zos/router'

import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
Page({
  build() {
      createWidget(widget.IMG, {
        x: 180,
        y: 120,
        src: 'start.png'
      })
      
      createWidget(widget.TEXT, {
        x: 40,
        y: 280,
        w: 400,
        h: 65,
        color: 0xD0E1E9,
        text_size: 46,
        align_h: align.CENTER_H,
        align_v: align.CENTER_V,
        text_style: text_style.NONE,
        text: 'ZeppMeow Bili',
      })
     createWidget(widget.TEXT, {
      x: 40,
      y: 330,
      w: 400,
      h: 100,
      color: 0xD0E1E9,
      text_size: 30,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'V1.0.0(25999)\nTEST:YiQWQ分发通道',
    })
    setScrollMode({
      mode: SCROLL_MODE_SWIPER,
      options: {
        height: 480,
        count: 10,
      },
    })
    createWidget(widget.TEXT, {
      x: 40,
      y: 500,
      w: 400,
      h: 100,
      color: 0xD0E1E9,
      text_size: 40,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '致谢\n开发团队',
    })
    createWidget(widget.FILL_RECT, {
      x: 60,
      y: 660,
      w: 360,
      h: 180,
      radius: 20,
      color: 0x333333
    })
    createWidget(widget.IMG, {
      x: 185,
      y: 700,
      src: 'cd.png'
    })
    
    createWidget(widget.TEXT, {
      x: 110,
      y: 670,
      w: 288,
      h: 160,
      color: 0xB5CBD8,
      text_size: 47,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'Bydour\nDevelopers',
    })
    createWidget(widget.FILL_RECT, {
      x: 60,
      y: 860,
      w: 360,
      h: 60,
      radius: 20,
      color: 0x333333
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
