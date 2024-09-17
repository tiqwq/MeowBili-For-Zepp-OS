import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { BasePage } from "@zeppos/zml/base-page";
import { back } from '@zos/router'

const localStorage = new LocalStorage()
const app = getApp()
Page(
    BasePage({
    build() {
      let that = this

        if (localStorage.getItem('SESSDATA') == undefined || localStorage.getItem('DedeUserID') == undefined || localStorage.getItem('bili_jct') == undefined || localStorage.getItem('buvid3') == undefined || localStorage.getItem('DedeUserID__ckMd5') == undefined || localStorage.getItem('bili_jct') == undefined) {
            push({
                url: 'page/login',
            })
            console.log('login');
        } else {
            that.getWbi()
            push({
                url: 'page/videopush',
            })
            console.log('video');
        }
      if (app._options.globalData.back == 1) {
        console.log(app._options.globalData.back);
        back()
      }

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