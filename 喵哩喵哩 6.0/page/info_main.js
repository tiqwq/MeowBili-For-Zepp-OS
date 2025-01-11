import { push } from '@zos/router'
import { replace } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { BasePage } from "@zeppos/zml/base-page";
import { px } from '@zos/utils'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { follorBydour, UnfollorSearchStars, getWbi } from '../func/fetch';
const localStorage = new LocalStorage()

Page({
    build() {
        createWidget(widget.IMG, {
            x: 0,
            y: 0,
            src: 'Bg.png'
        });
        createWidget(widget.IMG, {
            x: 150,
            y: 50,
            src: "back.png",
          }).addEventListener(event.CLICK_UP, () => {
            back();
          });
      
          createWidget(widget.TEXT, {
            x: 180,
            y: 40,
            w: px(245),
            h: px(88),
            text_size: 32,
            text: "所有功能",
            color: 0xffffff,
            text_style: text_style.WRAP,
          });
        
          createWidget(widget.IMG, {
            x: 100,
            y: 100,
            src: "searchbg.png",
          }).addEventListener(event.CLICK_UP, () => {
            push({ url: 'page/trending' });
          });
          createWidget(widget.IMG, {
            x: 125,
            y: 125,
            src: "search.png",
          });
          createWidget(widget.TEXT, {
            x: 100,
            y: 120,
            w: 288,
            h: 46,
            color: 0xffffff,
            text_size: 20,
            align_h: align.CENTER_H,
            align_v: align.CENTER_V,
            text_style: text_style.NONE,
            text: '点击以搜索',
          }).addEventListener(event.CLICK_UP, () => {
            push({ url: 'page/trending' });
          });
          createWidget(widget.BUTTON, {
            x: 100,
            y: 190,
            w: 130,
            h: 130,
            radius: 102,
            normal_color: 0x222222,
            press_color: 0xfeb4a8,
            //text: '推荐',
            click_func: (button_widget) => {
                push({ url: 'page/videopush' });
            }
          })
          createWidget(widget.IMG, {
            x: 130,
            y: 220,
            src: "main/meow.png",
          }).addEventListener(event.CLICK_UP, () => {
            push({ url: 'page/videopush' });
          });
  
          createWidget(widget.BUTTON, {
            x: 250,
            y: 190,
            w: 130,
            h: 130,
            radius: 102,
            normal_color: 0x222222,
            press_color: 0xfeb4a8,
            ///text: '用户',
            click_func: (button_widget) => {
                push({ url: 'page/account' });
            }
          })
          createWidget(widget.IMG, {
            x: 283,
            y: 215,
            src: "main/user.png",
          }).addEventListener(event.CLICK_UP, () => {
            push({ url: 'page/account' });
          });
          createWidget(widget.BUTTON, {
            x: 100,
            y: 340,
            w: 130,
            h: 130,
            radius: 102,
            normal_color: 0x222222,
            press_color: 0xfeb4a8,
            //text: '私信',
            click_func: (button_widget) => {
                push({ url: 'page/messageList' });
            }
          })
          createWidget(widget.IMG, {
            x: 130,
            y: 370,
            src: "main/pinlun.png",
          }).addEventListener(event.CLICK_UP, () => {
            push({ url: 'page/messageList' });          });
          //create
          createWidget(widget.BUTTON, {
            x: 250,
            y: 340,
            w: 130,
            h: 130,
            radius: 102,
            normal_color: 0x222222,
            press_color: 0xfeb4a8,
            //text: '公告',
            click_func: (button_widget) => {
                push({ url: 'page/bulletin' });
            }
          })
          createWidget(widget.IMG, {
            x: 285,
            y: 370,
            src: "main/gongao.png",
          }).addEventListener(event.CLICK_UP, () => {
            push({ url: 'page/bulletin' });
          });
          createWidget(widget.BUTTON, {
            x: 100,
            y: 490,
            w: 130,
            h: 130,
            radius: 102,
            normal_color: 0x222222,
            press_color: 0xfeb4a8,
            //text: '设置',
            click_func: (button_widget) => {
                push({ url: 'page/setting' });
            }
          })
          createWidget(widget.IMG, {
            x: 130,
            y: 520,
            src: "main/settings.png",
          }).addEventListener(event.CLICK_UP, () => {
            push({ url: 'page/setting' });
        });
    }
  })