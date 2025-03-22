// 由于Zepp OS的一些毛病，cookie中的Set-Cookie无法获取到全部cookie，仅能获取到SESSDATA，于是我们就使用解析返回body中的url，有着大部分登录需要的cookie，但buvid3并没有，于是采用spi手动获取一遍buvid3
import { showToast } from '@zos/interaction'
import { BasePage } from "@zeppos/zml/base-page";
import { createWidget, widget, align, text_style } from '@zos/ui';
import { back } from '@zos/router'
import { LocalStorage } from '@zos/storage'
import { parseBilibiliLoginUrl } from "../utils/utils";
import { getQrcode, getBuvid3, checkQRStatus } from "../func/fetch";
const localStorage = new LocalStorage()

class Login {
  constructor(fetch) {
    this.getQrcode = getQrcode
    this.getbuvid3 = getBuvid3
    this.checkQRStatus = checkQRStatus
    this.fetch = fetch
    this.qr_value = ''
    this.qr_key = "N/A"
    this.PollInterval = null
    this.GetQRInterval = null
    this.buvid3 = null
    this.qrcodeWidget = null
  }
  
  startPolling() {
    this.PollInterval = setInterval(() => {
      this.checkQRStatus(this.fetch,this.qr_key).then((res) => {
        console.log(res.body.data.code);
        if (res.body.data.code === 0) {
          showToast({
            content: '登录成功！'
          })
          let userData = parseBilibiliLoginUrl(res.body.data.url)
          for (const key in userData) {
            if (userData.hasOwnProperty(key) && key !== 'gourl' && key !== 'first_domain' && key !== 'Expires') {
                localStorage.setItem(key, userData[key]);
            }
          }
          clearInterval(this.PollInterval);
          clearInterval(this.GetQRInterval);
          back()
        } 
      });
    }, 1000);
  }
  

  
  createQrcode() {
    this.getQrcode(this.fetch).then((data) => {
      const { result = {} } = data;
      createWidget(widget.IMG, {
        x: 0,
        y: -190,
        src: 'yellow.png'
      });
      this.qrcodeWidget = createWidget(widget.QRCODE, {
        content: result[0],
        x: 140,
        y: 130,
        w: 200,
        h: 200,
        bg_x: 125,
        bg_y: 115,
        bg_w: 230,
        bg_h: 230
      });
      createWidget(widget.IMG, {
        x: 190,
        y: 50,
        src: "back.png",
      })
      createWidget(widget.TEXT, {
        x: 220,
        y: 40,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "登入",
        color: 0xffffff
      })
      createWidget(widget.TEXT, {
        x: 120,
        y: 360,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "主人请使用\n手机客户端扫码登入",
        align_h: align.CENTER_H,
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      this.qr_value = result[0];
      this.qr_key = result[1];
      this.startPolling();
    })
  }
  
  build() {
    this.getbuvid3(this.fetch).then((res) => localStorage.setItem('buvid3', res.body.data.b_3))
    this.createQrcode()
  }
}
Page(
  BasePage({
    build() {
      let page = new Login(this)
      page.build()
    }
  })
)