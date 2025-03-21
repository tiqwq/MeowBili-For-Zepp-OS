import { push } from '@zos/router'
import { replace } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { BasePage } from "@zeppos/zml/base-page";
import { px } from '@zos/utils'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { follorBydour, UnfollorSearchStars, getWbi } from '../func/fetch';
const localStorage = new LocalStorage()
import { setScrollLock } from '@zos/page'

class Index {
  constructor(fetch) {
    this.getWbi = getWbi
    this.fetch = fetch
  }

  build() {
    createWidget(widget.IMG, {
      x: 150,
      y: 45,
      src: "back.png",
    }).addEventListener(event.CLICK_UP, () => {

    });
    createWidget(widget.TEXT, {
      x: 180,
      y: 35,
      w: px(245),
      h: px(88),
      text_size: 32,
      text: "网络检测",
      color: 0xffffff,
      text_style: text_style.WRAP,
    })
   
    createWidget(widget.FILL_RECT, {
      x: (480-392)/2,
        y: 85,
        w: 392,
        h: 99,
        radius: 40,
        color: 0x222223,
    })
    createWidget(widget.TEXT, {
      x: 20,
      y: 110,
      w: px(245),
      h: px(88),
      text_size: 30,
      text: "登录状态:",
      align_h: align.CENTER_H,
      color: 0xffffff,
      text_style: text_style.WRAP,
    });

    setTimeout(() => {
      const isLoggedIn = localStorage.getItem('SESSDATA') !== undefined &&
                        localStorage.getItem('DedeUserID') !== undefined &&
                        localStorage.getItem('bili_jct') !== undefined &&
                        localStorage.getItem('buvid3') !== undefined &&
                        localStorage.getItem('DedeUserID__ckMd5') !== undefined;

      // 根据登录状态显示文本
      createWidget(widget.TEXT, {
        x: 150,
      y: 110,
        w: px(245),
        h: px(88),
        text_size: 30,
        text: isLoggedIn ? "已登录" : "未登录",
        align_h: align.CENTER_H,
        color: 0xffffff,
        text_style: text_style.WRAP,
      });
    }, 0);
    createWidget(widget.FILL_RECT, {
      x: (480-392)/2,
        y: 201,
        w: 392,
        h: 180,
        radius: 40,
        color: 0x222223,
    })
    createWidget(widget.TEXT, {
      x: (510-392)/2,
        y: 230,
        w: 350,
        h: 180,
        align_h:align.LEFT,
      text_size: 20,
      text: "1. 检查网络连接\n2.检测手表与手机的连接状态\n3.可能是特殊原因导致检测超时，请手动进入页面",
     
      color: 0xffffff,
      text_style: text_style.WRAP,
    });
    // 创建按钮
    this.createButtons();
    
    // 禁止页面滚动
    setScrollLock(true);
  }

  createButtons() {
    const buttonConfig = [
      { text: "扫描二维码以登录", url: 'page/login' },
      { text: "直接进入首页", url: 'page/videopush' },
    ];

    buttonConfig.forEach((config, index) => {
      createWidget(widget.BUTTON, {
        x: 60,
        y: 400 + index * 107,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: config.text,
        click_func: () => {
          push({ url: config.url });
        },
      });
    });
  }
}

Page(
  BasePage({
    build() {
      let page = new Index(this);
      page.build();
    },
  })
);
