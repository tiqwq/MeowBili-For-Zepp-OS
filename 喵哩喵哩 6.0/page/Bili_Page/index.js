import { push } from '@zos/router'
import { replace } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { BasePage } from "@zeppos/zml/base-page";
import { px } from '@zos/utils'
import { getDeviceInfo } from '@zos/device'
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { follorBydour, UnfollorSearchStars, getWbi } from '../../func/fetch';
import { getText } from '@zos/i18n'
const localStorage = new LocalStorage()
import { setScrollLock } from '@zos/page'

class Index {
  constructor(fetch) {
    this.follorBydour = follorBydour
    this.UnfollorSearchStars = UnfollorSearchStars
    this.getWbi = getWbi
    this.fetch = fetch
  }
  build() {
    setScrollLock({
      lock: true,
    })
    const { width: screenWidth, screenHight } = getDeviceInfo();
    console.log("rechrd:" + screenWidth);
    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'pink.png'
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
      color: 0xE47097,
      mode: 0,
      radius: 240,
      start_angle: 90,
      end_angle: 180,
      text_size: 24,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '主页',
    });
    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      text.setProperty(prop.TEXT, timeString);
    }

    setInterval(updateTime, 1000);
    updateTime(); // 初始化显示时间

    const Control_Center_group = createWidget(widget.GROUP, { VISIBLE: false });

    const Control_Center_view = Control_Center_group.createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(80),
      w: px(480),
      h: screenWidth - 80,
    });
    Control_Center_group.createWidget(widget.TEXT, {
      x: 50,
      y: 80,
      w: 380,
      h: 200,
      color: 0xffffff,
      text_size: 19,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.WRAP,
      text: `由于系统限制，无法获取登录状态,请手动跳转登录页面,如果已经登录,请点击直接进入视频推荐主页`,
    })




    Control_Center_group.createWidget(widget.BUTTON, {
      x: (480 - 180) / 2,
      y: 280,
      w: 180,
      h: 80,
      radius: 45,
      normal_color: 0xE47097,
      press_color: 0xfeb4a8,
      text_size: 25,
      text: "进入推荐主页",
      click_func: (button_widget) => {
        push({
          url: 'page/Bili_Page/videopush',
        })
      }
    })
    Control_Center_group.createWidget(widget.BUTTON, {
      x: (480 - 180) / 2,
      y: 380,
      w: 180,
      h: 80,
      radius: 45,
      normal_color: 0xE47097,
      press_color: 0xfeb4a8,
      text_size: 25,
      text: "登录",
      click_func: (button_widget) => {
        push({
          url: 'page/Browser_Page/biliweb',
         params: {
           imgSrc: 'bili2.png',
           textbutton: '登录',
           jumpurl: 'page/Bili_Page/login'
         } // 传递的图片路径

        })
      }
    })
    /*  setTimeout(() => {
       createWidget(widget.BUTTON, {
         x: (480 - 180) / 2,
         y: 380,
         w: 180,
         h: 80,
         radius: 45,
         normal_color: 0xE47097,
         press_color: 0xfeb4a8,
         text: getText('check_network'),
         click_func: (button_widget) => {
           push({
             url: 'page/network', 
           })
         }
       })
     }, 9000)
     setTimeout(()=> {
       if (localStorage.getItem('SESSDATA') == undefined || localStorage.getItem('DedeUserID') == undefined || localStorage.getItem('bili_jct') == undefined || localStorage.getItem('buvid3') == undefined || localStorage.getItem('DedeUserID__ckMd5') == undefined || localStorage.getItem('bili_jct') == undefined) {
           push({
               url: 'page/login', 
           })
 
           
           console.log('buvid3' + localStorage.getItem('buvid3'));
           
           console.log('login');
       } else {
          
           this.getWbi(this.fetch).then((res) => {
             localStorage.setItem('login_info',res.body.data.wbi_img)
             replace({
               url: 'page/videopush',
             })
             console.log('video');
           })
       }
     }, 4000) */
  }
}
Page(
  BasePage({
    build() {
      let page = new Index(this)
      page.build()

    },

  })
)