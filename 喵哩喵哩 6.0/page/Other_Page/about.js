import { getText } from '@zos/i18n'
import { launchApp } from '@zos/router'
import { setScrollMode, SCROLL_MODE_SWIPER } from '@zos/page'
import { back } from '@zos/router'
import { px } from '@zos/utils'
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
Page({
  build() {
      /* createWidget(widget.IMG, {
        x: 0,
        y: 0,
        src: 'Bg.png'
      }) */

        const viewabout = createWidget(widget.VIEW_CONTAINER, {
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
        viewabout.createWidget(widget.TEXT, {
          x: px(63),
          y: px(25),
          w: px(400),
          h: px(100),
          text_size: px(60),
          text: getText('about'),
          color: 0xff93c4,
          align_h: align.LEFT,
          align_v: align.CENTER_V,
          text_style: text_style.NONE
        })
        viewabout.createWidget(widget.IMG, {
        x: 45,
        y: 150,
        //src: 'pay.png'
        src: 'version.png'
      })
     

      
      viewabout.createWidget(widget.TEXT, {
      x: 40,
      y: 290,
      w: 400,
      h: 100,
      color: 0xffffff,
      text_size: 30,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: getText('project_belongs'),
    })
    viewabout.createWidget(widget.FILL_RECT, {
      x: 125,
      y: 380,
      w: 230,
      h: 80,
      radius: 40,
      color:  0x222222
    })
   
   
    const more = viewabout.createWidget(widget.TEXT, {
      x: 50,
      y: 480,
      w: 380,
      h: 600,
      color: 0xffffff,
      text_size: 30,
      align_h: align.LEFT,
      text_style: text_style.WRAP	,
      text: getText('about_description'),
    })
   /*  viewabout.createWidget(widget.STROKE_RECT, {
      x: 50,
      y: 480,
      w: 380,
      h: 600,
      radius: 20,
      line_width: 4,
      color: 0xfc6950
    }) */  
   const pay = viewabout.createWidget(widget.IMG, {
      x:40,
      y: 680,
      src: ''
    })
   viewabout.createWidget(widget.BUTTON, {
      x: 125,
      y: 380,
      w: 230,
      h: 80,
      radius: 40,
      normal_color:  0x222222,
      press_color: 0xfeb4a8,
      text: getText('developer_name'), 
      text_size: 30,
      click_func: (button_widget) => {
        more.setProperty(prop.MORE, {
          text: getText('donate_message'), 
          text_style: text_style.WRAP,
          align_h: align.CENTER_H,
        })
        pay.setProperty(prop.more, {
          src: 'pay.png'
        })
      }
    })
  }
})
