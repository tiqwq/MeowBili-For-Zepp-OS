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
    this.follorBydour = follorBydour
    this.UnfollorSearchStars = UnfollorSearchStars
    this.getWbi = getWbi
    this.fetch = fetch
  }
  build() {
    setScrollLock({
      lock: true,
       
    })
    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'pink.png'
    });
    createWidget(widget.IMG, {
      x: px(180),
      y: px(140),
      src: 'start.png',
    });
    createWidget(widget.TEXT, {
      x: 96,
      y: 250,
      w: 288,
      h: 100,
      color: 0xffffff,
      text_size: 19,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: 'MeowBili β\nversion 2.0.1\n检查登录状态中...',
    })
    setTimeout(() => {
      //console.log('Hello Zepp OS')
   
    createWidget(widget.BUTTON, {
      x: (480 - 180) / 2,
      y: 380,
      w: 180,
      h: 80,
      radius: 45,
      normal_color: 0xE47097,
      press_color: 0xfeb4a8,
      text: '检查网络状态',
      click_func: (button_widget) => {
        push({
          url: 'page/network', 
      })
      }
    })
   }, 4000)
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
    }, 4000) 
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