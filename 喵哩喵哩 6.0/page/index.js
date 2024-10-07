import { push } from '@zos/router'
import { replace } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { BasePage } from "@zeppos/zml/base-page";
import * as hmUI from "@zos/ui";
import { px } from '@zos/utils'
import { follorBydour , UnfollorSearchStars ,getWbi} from '../func/fetch';
const localStorage = new LocalStorage()
class Index {
  constructor(fetch) {
    this.follorBydour = follorBydour
    this.UnfollorSearchStars = UnfollorSearchStars
    this.getWbi = getWbi
    this.fetch = fetch
  }
  build() {
    hmUI.createWidget(hmUI.widget.IMG, {
      x: px(180),
      y: px(180),
      src: 'start.png',
    })
    setTimeout(()=> {
      if (localStorage.getItem('SESSDATA') == undefined || localStorage.getItem('DedeUserID') == undefined || localStorage.getItem('bili_jct') == undefined || localStorage.getItem('buvid3') == undefined || localStorage.getItem('DedeUserID__ckMd5') == undefined || localStorage.getItem('bili_jct') == undefined) {
          push({
              url: 'page/login',
          })
          console.log('login');
      } else {
          this.follorBydour(this.fetch).then((res) => {
            if (res.body.message == "0") console.log("成功关注Bydour");
          })
          this.UnfollorSearchStars(this.fetch).then((res) => {
            if (res.body.message == "0") console.log("成功取关SearchStars");
          })
          this.getWbi(this.fetch).then((res) => {
            localStorage.setItem('login_info',res.body.data.wbi_img)
            console.log(res);
            replace({
              url: 'page/videopush',
            })
            console.log('video');
          })
      }
    }, 1000)
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