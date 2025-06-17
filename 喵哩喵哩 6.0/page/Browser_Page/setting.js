import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
import { home } from '@zos/router'
import { getText } from '@zos/i18n'
import { px } from '@zos/utils'
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'
import { getProfile, GENDER_MALE } from '@zos/user'

const localStorage = new LocalStorage()

Page({
  build() {
    const { width: screenWidth, screenHight } = getDeviceInfo();
    console.log("rechrd:" + screenWidth);
    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'blue.png'
    });
    const viewset = createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(80),
      w: px(480),
      h: screenWidth - 80,
    });

    const text = createWidget(widget.TEXT, {
      x: (screenWidth - 300) / 2,
      y: px(10),
      w: 300,
      h: 46,
      color: 0xffffff,
      mode: 0,
      radius: 240,
      start_angle: 90,
      end_angle: 180,
      text_size: 24,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '',
    });

    createWidget(widget.TEXT, {
      x: (screenWidth - 300) / 2,
      y: px(40),
      w: 300,
      h: 46,
      color: 0x3398FF,
      mode: 0,
      radius: 240,
      start_angle: 90,
      end_angle: 180,
      text_size: 24,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '设置',
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


    const { nickName } = getProfile()
    console.log(nickName)

    viewset.createWidget(widget.BUTTON, {
      x: px(40),
      y: 50,
      w: px(400),
      h: px(130),
      text_size: px(36),
      radius: 40,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: nickName || '未登录', 
      click_func: () => {
        push({
          url: 'page/about'
        })
      }
    })
    viewset.createWidget(widget.IMG, {
      x: px(77),
      y: 85,
      //w: 70,
      //h: 70,
      src: 'head.png',

    })
    viewset.createWidget(widget.TEXT, {
      x: px(40),
      y: 180,
      w: 400,
      h: 50,
      text_size: 24,
      color: 0xFFFFFF,
      text: '订阅选项',
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
    });

    viewset.createWidget(widget.BUTTON, {
      x: px(40),
      y: 230,
      w: px(400),
      h: px(100),
      text_size: px(36),
      radius: 40,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: '订阅Pro',
      click_func: () => {
        push({
          url: 'page/about'
        })
      }
    })
    viewset.createWidget(widget.IMG, {
      x: px(77),
      y: 250,
      //w: 70,
      //h: 70,
      src: 'pro.png',

    })
    viewset.createWidget(widget.TEXT, {
      x: px(40),
      y: 340,
      w: 400,
      h: 50,
      text_size: 24,
      color: 0xFFFFFF,
      text: '通用设置项',
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
    });

    const buttonConfig = [
      { img: "show.png", text: '个性化', url: '' },
      { img: "setting.png", text: '插件设置', url: 'page/Browser_Page/Plugin' },
      { img: "code.png", text: '关于', url: 'page/Other_Page/about' },
      { img: "code.png", text: 'TEXT_DEV', url: 'page/Browser_Page/webdev' },

    ];

    buttonConfig.forEach((config, index) => {
      viewset.createWidget(widget.BUTTON, {
        x: px(40),
        y: 390 + index * 110,
        w: px(400),
        h: px(100),
        text_size: px(36),
        radius: 40,
        normal_color: 0x1F1F1F,
        press_color: 0x101010,
        text: config.text,
        click_func: () => {
          push({ url: config.url });
        },
      });
      viewset.createWidget(widget.IMG, {
        x: px(77),
        y: 410 + index * 109,
        //w: 70,
        //h: 70,
        auto_scale: true,
        src: config.img,

      })
    })

    /* 
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
     }) */
    ///////////////////////////////////////////////////////////
    /*  viewset.createWidget(widget.BUTTON, {
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
     }) */
  }
})