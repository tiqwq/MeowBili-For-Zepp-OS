import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { getText } from '@zos/i18n'
import { scrollTo, setScrollMode, SCROLL_MODE_SWIPER, setScrollLock, SCROLL_MODE_SWIPER_HORIZONTAL } from '@zos/page';
import { Time } from '@zos/sensor'
import { px } from "@zos/utils";
import { push } from '@zos/router';
import { getDeviceInfo, SCREEN_SHAPE_SQUARE } from '@zos/device'

Page({
  build() {
    const { width: screenWidth, height: screenHeight } = getDeviceInfo(); // 修正拼写错误
    console.log("screen width:" + screenWidth);
    /*  setScrollMode({
      mode: SCROLL_MODE_SWIPER_HORIZONTAL,
      options: {
        height: screenWidth,
        width: screenWidth,
        count: 2,
      }, 
    })*/

    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'blue.png'
    });

    createWidget(widget.IMG, {
      x: 480,
      y: 0,
      src: 'blue.png'
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
      text: '起始页',
    });


    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      text.setProperty(prop.TEXT, timeString);
      // 移除未定义的 ntext
    }

    setInterval(updateTime, 1000);
    updateTime(); // 初始化显示时间

    const Control_Center_group = createWidget(widget.GROUP);

    const Control_Center_view = Control_Center_group.createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(80),
      w: px(480),
      h: screenWidth - 80,
      page: 0,
    });
    const buttonConfig = [
      { img: "bookmark.png", text: '书签', url: 'page/developersVideoPush' },
      { img: "setting.png", text: '设置', url: 'page/Browser_Page/setting' }
    ];

    buttonConfig.forEach((config, index) => {
      Control_Center_view.createWidget(widget.BUTTON, {
        x: px(40),
        y: 330 + index * 120,
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
      Control_Center_view.createWidget(widget.IMG, {
        x: px(77),
        y: 350 + index * 120,
        //w: 70,
        //h: 70,
        auto_scale: true,
        src: config.img,

      })
    })


    Control_Center_view.createWidget(widget.STROKE_RECT, {
      x: px(30),
      y: 15,
      w: 420,
      h: 120,
      radius: 55,
      line_width: 6,
      color: 0x778899,
    })


    Control_Center_view.createWidget(widget.BUTTON, {
      x: px(40),
      y: 30,
      w: 400,
      h: 100,
      radius: 45,
      normal_color: 0x222222,
      press_color: 0x9E9E9E,
      text: '搜索与热榜',
      text_size: 32,
      align_h: align.H,
      click_func: (button_widget) => {

        push({
          url: 'page/Other_Page/trending',
        });

      }
    })

    Control_Center_view.createWidget(widget.IMG, {
      x: px(80),
      y: 60,
      
      src: 'search.png',
     
    });
    Control_Center_view.createWidget(widget.TEXT, {
      x: px(40),
      y: 145,
      w: 400,
      h: 50,
      text_size: 24,
      color: 0xFFFFFF,
      text: '快捷书签',
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
    });

    const buttonConfigs = [
      { icon: '', text: '\nBiliBili', url: 'page/Browser_Page/biliweb', params: { imgSrc: 'bili1.png', textbutton: '美化网页', jumpurl: 'page/Bili_Page/index' } },
      { icon: '', text: '\nBing', url: 'page/Browser_Page/biliweb', params: { imgSrc: 'bingweb.png', textbutton: '暂不可用' } },
      /* { icon: '', text: '\n\nBandBBS', url: '' },
      { icon: '', text: '小麦同学 (/^▽^)/', url: '' },
      { icon: '', text: 'yistart', url: '' },
      { icon: '', text: 'RX79XT', url: '' } */
    ];

    const startX = (480 - (2 * 200 + 1 * 20)) / 2;

    for (let i = 0; i < 10; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      Control_Center_view.createWidget(widget.BUTTON, {
        x: px(startX + col * (200 + 20)),
        y: px(200 + row * (80 + 30)),
        w: px(200),
        h: px(100),
        radius: 45,
        text: buttonConfigs[i].text,
        text_size: 30,
        normal_color: 0x778899,
        press_color: 0x0077cc,
        click_func: () => {
          push({
            url: buttonConfigs[i].url,
            params: {
              imgSrc: buttonConfigs[i].params.imgSrc,
              textbutton: buttonConfigs[i].params.textbutton,
              jumpurl: buttonConfigs[i].params.jumpurl
            }
          })
        }
      });
    }








  }
})
