import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { push } from '@zos/router'
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'
import { getText } from '@zos/i18n'

import { decodeUnicodeEscape } from "../../utils/utils";
import { getTrending } from "../../func/fetch";
let buttonList = []

Page(
  BasePage({
    build() {
      const { width: screenWidth, screenHight } = getDeviceInfo();
      console.log("rechrd:" + screenWidth);
      
      createWidget(widget.IMG, {
          x: 0,
          y: 0,
          src: 'blue.png'
        });
        const viewSearch = createWidget(widget.VIEW_CONTAINER, {
          x: px(0),
          y: px(66),
          w: px(480),
          h: px(400)
        })
    
 const text = createWidget(widget.TEXT, {
      x: px(196) ,
      y: px(16),
      w: 88,
      h: 46,
      color: 0xffffff,
      text_size: 24,
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
    updateTime(); // 初始化时立即显示时间
    
      for(let i = 0; i < 10; i++) {
        
       buttonList[i] = viewSearch.createWidget(widget.FILL_RECT,{ 
          x: (screenWidth - 400) / 2, 
          y: 310 + i * 100, 
          w: 400, 
          h: 80, 
          color:  0x222222, 
          radius: 30
         })
        buttonList[i] = viewSearch.createWidget(widget.TEXT, {
          x: (screenWidth - 360) / 2, 
          y: 330 + i * 100, 
          w: 400, 
          h: 80, 
          text_size: 30,
          text: getText('loading'),
          align_h: align.LEFT,

          color: 0xffffff,
        }) 


      
      }
         this.getTrending()  
         viewSearch.createWidget(widget.TEXT, {
          x: px(50),
          y: px(20),
          w: px(400),
          h: px(100),
          text_size: 60,
          text: getText('search'),
          color: 0xff93c4,
          align_h: align.LEFT,
          align_v: align.CENTER_V,
          text_style: text_style.NONE
      })
       
       
      
        viewSearch.createWidget(widget.BUTTON, {
            x: px(40),
            y: 120, 
            w: 400,
            h: 100,
            radius: 12,
            normal_color: 0x222222,
            press_color: 0x9E9E9E,
            text: getText('click_me'),
           
            text_size: 35,
            align_h: align.LEFT,
            click_func: (button_widget) => {
              push({
              url: "page/board",
              })
              
            }
          })
          viewSearch.createWidget(widget.TEXT, {
            x: px(50),
            y: px(240),
            w: px(400),
            h: px(100),
            text_size: 40,
            
            color: 0xff93c4,
            align_h: align.LEFT,
         
          text: getText('trending'),
         
        })
      
    
    },
    getTrending() {
      getTrending(this).then((res) => {
        for (let i = 0; i < 10; i++) {
          buttonList[i].setProperty(prop.TEXT,JSON.parse( decodeUnicodeEscape(res.body)).list[i].show_name)
          buttonList[i].addEventListener(event.CLICK_UP, () => {
              push({
                url: "page/searchresult",
                params: {
                  keyword: JSON.parse( decodeUnicodeEscape(res.body)).list[i].show_name
                }
              })
            })
          }
        })
      }
    })
)