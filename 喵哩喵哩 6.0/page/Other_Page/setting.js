import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
import { home } from '@zos/router'
import { getText } from '@zos/i18n'
import { px } from '@zos/utils'

const localStorage = new LocalStorage()

Page({
  build() {
    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'blue.png'
    });
    const viewset = createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(55),
      w: px(480),
      h: px(430)
    });

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
    viewset.createWidget(widget.TEXT, {
      x: px(63),
      y: px(25),
      w: px(400),
      h: px(100),
      text_size: px(60),
      text: getText('settings'),
      color: 0xff93c4,
      align_h: align.LEFT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
    })
    

    viewset.createWidget(widget.BUTTON, {
      x: 60,
      y: 130,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 40,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: getText('about'),
      click_func: () => {
        push({
          url: 'page/about'
        })
      }
    })

    viewset.createWidget(widget.BUTTON, {
      x: 60,
      y: 237,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 40,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: getText('update'),
      click_func: () => {
        push({
          url: 'page/update'
        })
      }
    })

    viewset.createWidget(widget.BUTTON, {
      x: 60,
      y: 344,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 40,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: getText('logout'),
      color: 0xFF4646,
      click_func: () => {
        localStorage.clear()
        home()
      }
    })
  }
})