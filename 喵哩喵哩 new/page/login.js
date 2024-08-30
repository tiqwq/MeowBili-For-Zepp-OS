import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { createWidget, widget } from '@zos/ui'
import { back } from '@zos/router'

import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
const logger = Logger.getLogger("fetch_api");

let qrcodeWidget;
function parseBilibiliUrl(url) {
  const params = {};
  const queryStart = url.indexOf('?');
  if (queryStart === -1) {
      return params;
  }
  const queryString = url.slice(queryStart + 1);
  const pairs = queryString.split('&');
  pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = value;
  });
  return params;
}
let buvid3
Page(
  BasePage({
    state: {
      qr_value: '',
      qr_show: false,
      qr_loading_show: true,
      qr_key: "N/A",
      get_qr_num: 0,
      set_qr_num: 0,
      PollInterval: null,
      GetQRInterval: null,
    },
    build() {
      setTimeout(() => {
        this.fetchData();
        this.getbuvid3()
      }, 1);
    },
    fetchData() {
      this.request({
        method: "GET_DATA",
      })
        .then((data) => {
          logger.log("receive data");
          const { result = {} } = data;
          if (!qrcodeWidget) {
            qrcodeWidget = createWidget(widget.QRCODE, {
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
          } else {
            qrcodeWidget.setProperty(hmUI.prop.CONTENT, result[0]);
          }
 //---------------------
 hmUI.createWidget(hmUI.widget.IMG, {
  x: 190,
  y: 50,
  src: "back.png",
})
hmUI.createWidget(hmUI.widget.TEXT, {
  x: 220,
  y: 40,
  w: px(245),
  h: px(88),
  text_size: 32,
  text: "登入",
  color: 0xffffff,
  text_style: hmUI.text_style.WRAP,
}) // title
const a = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 120,
  y: 360,
  w: px(245),
  h: px(88),
  text_size: 32,
  text: "主人请使用\n手机客户端扫码登入",
  align_h: hmUI.align.CENTER_H,
  color: 0xffffff,
  text_style: hmUI.text_style.WRAP,
}) // title
//------------------
          this.state.qr_value = result[0];
          this.state.qr_key = result[1];
          this.state.qr_show = true;
          this.state.qr_loading_show = false;

          this.startPolling();
        })
        .catch((res) => {});
    },
    
    startPolling() {
      // this.state.GetQRInterval = setInterval(() => {
      //   this.state.qr_show = false;
      //   this.state.qr_loading_show = true;
      //   this.fetchData();
      // }, 15000);

      this.state.PollInterval = setInterval(() => {
        console.log(this.state.qr_key);
        this.checkQRStatus();
      }, 1000);
    },
    checkQRStatus() {
      this.request({
        method: "CHECK_QR_STATUS",
        data: {
          qr_key: this.state.qr_key,
        },
      })
        .then((res) => {
          console.log("then");
          if (res.body.data.code === 0) {
            hmUI.showToast({
              text: '登录成功！'
            })
            let userData = parseBilibiliUrl(res.body.data.url)
            for (const key in userData) {
              if (userData.hasOwnProperty(key) && key !== 'gourl' && key !== 'first_domain' && key !== 'Expires') {
                console.log(key,userData[key]);
                  localStorage.setItem(key, userData[key]);
              }
          }
          localStorage.setItem('buvid3', buvid3);
            clearInterval(this.state.PollInterval);
            clearInterval(this.state.GetQRInterval);
          back()
          } 
        })
        .catch((res) => {
          // console.log("catch");
          console.log(res.body.data.code);
          if (res.body.data.code === 0) {
            hmUI.showToast({
              text: '登录成功！'
            })
            let userData = parseBilibiliUrl(res.body.data.url)
            for (const key in userData) {
              if (userData.hasOwnProperty(key) && key !== 'gourl' && key !== 'first_domain' && key !== 'Expires') {
                console.log(key,userData[key]);
                  localStorage.setItem(key, userData[key]);
              }
          }
          localStorage.setItem('buvid3', buvid3);
            clearInterval(this.state.PollInterval);
            clearInterval(this.state.GetQRInterval);
          back()
          } 
        }); 
    },
    async getbuvid3() { 
      try {
        const result = await this.httpRequest({
          method: 'get',
          url: 'https://api.bilibili.com/x/frontend/finger/spi',
        });
        buvid3 = result.body.data.b_3;
        console.log(result.body.data.b_3);
      } catch (error) { }
    }
  })
);