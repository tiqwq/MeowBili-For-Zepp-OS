import { push } from '@zos/router'
import { replace } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { BasePage } from "@zeppos/zml/base-page";
import * as hmUI from "@zos/ui";
import { px } from '@zos/utils'
const localStorage = new LocalStorage()
Page(
    BasePage({
    build() {
      let that = this
      hmUI.createWidget(hmUI.widget.IMG, {
        x: px(120),
        y: px(120),
        src: 'icon.png',
      })
      setTimeout(()=> {
        if (localStorage.getItem('SESSDATA') == undefined || localStorage.getItem('DedeUserID') == undefined || localStorage.getItem('bili_jct') == undefined || localStorage.getItem('buvid3') == undefined || localStorage.getItem('DedeUserID__ckMd5') == undefined || localStorage.getItem('bili_jct') == undefined) {
            push({
                url: 'page/login',
            })
            console.log('login');
        } else {
            that.getWbi()
            replace({
                url: 'page/videopush',
            })
            console.log('video');
        }
      }, 1000)
    },
    getWbi() {
        this.request({
            method: "SENDBILIGET",
            data: {
              DedeUserID: localStorage.getItem("DedeUserID"),
              SESSDATA: localStorage.getItem("SESSDATA"),
              bili_jct: localStorage.getItem("bili_jct"),
              DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"), 
              buvid3: localStorage.getItem("buvid3"),
            },
            url: "https://api.bilibili.com/x/web-interface/nav", 
            type: "json"
          })
            .then((res) => {})
            .catch((res) => {
              localStorage.setItem('login_info',res.body.data.wbi_img)
              console.log(res);
            });  
    }
})
)