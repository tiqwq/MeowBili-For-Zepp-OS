import { createWidget, widget, align, prop, text_style, event, getTextLayout, showToast } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
import { home } from '@zos/router'
import { getText } from '@zos/i18n'
import { px } from '@zos/utils'
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'


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
      text: '拓展插件',
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
   
 viewset.createWidget(widget.BUTTON, {
      x: px(40),
      y: 50,
       w: px(400),
        h: px(130),
        text_size: px(36),
        radius: 40,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: '网页美化',
      click_func: () => {
       showToast({
          text: '该功能仍在开发中',
          duration: 3000,
          gravity: 'center',
          xOffset: 0,
          yOffset: 0
        })
      }
    })
     viewset.createWidget(widget.IMG, {
      x: px(77),
      y: 83,
      //w: 70,
      //h: 70,
      src: 'plugin.png',
      
    })
    viewset.createWidget(widget.TEXT, {
      x: px(40),
      y: 180,
      w: 400,
      h: 50,
      text_size: 24,
      color: 0xFFFFFF,
      text: '    “默认开启拓展功能,暂不可关闭',
      align_h: align.CENTER_RIGHT,
      align_v: align.CENTER_V,
            text_style: text_style.WRAP,

    });
   
viewset.createWidget(widget.BUTTON, {
     x: px(40),
        y: 250,
        w: px(400),
        h: px(100),
        text_size: px(30),
        radius: 40,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: '开发者选项',
      click_func: () => {
        push({
          url: 'page/Browser_Page/webdev'
        })
      }
    })
     viewset.createWidget(widget.IMG, {
      x: px(77),
      y: 270,
      //w: 70,
      //h: 70,
      src: 'show.png',
      
    })
  
    viewset.createWidget(widget.TEXT, {
      x: px(40),
      y: 380,
      w: 400,
      h: 400,
      text_size: 24,
      color: 0xFFFFFF,
      text: '请注意: \n该功能仍在开发中,请勿随意点击,可能会导致软件崩溃\n目前我们仅适配了极个别网页的美化,我们不能保证每一位用户都能正常使用',
      align_h: align.CENTER_H,
      text_style: text_style.WRAP,
    });
  }
})