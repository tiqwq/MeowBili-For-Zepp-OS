// 由于Zepp OS的一些毛病，cookie中的Set-Cookie无法获取到全部cookie，仅能获取到SESSDATA，于是我们就使用解析返回body中的url，有着大部分登录需要的cookie，但buvid3并没有，于是采用spi手动获取一遍buvid3
import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { createWidget, widget } from '@zos/ui'
import { back } from '@zos/router'
import '../../utils/promise'
import { LocalStorage } from '@zos/storage'
import { RSA } from "../../utils/rsa"
const localStorage = new LocalStorage()
import {  } from '../../node_modules/crypto-js/aes'
const logger = Logger.getLogger("fetch_api");

let qrcodeWidget;
// 导入公钥
const importPublicKey = () => {
  return new Promise.resolve(
    crypto.subtle.importKey(
      "jwk",
      {
        kty: "RSA",
        n: "y4HdjgJHBlbaBN04VERG4qNBIFHP6a3GozCl75AihQloSWCXC5HDNgyinEnhaQ_4-gaMud_GF50elYXLlCToR9se9Z8z433U3KjM-3Yx7ptKkmQNAMggQwAVKgq3zYAoidNEWuxpkY_mAitTSRLnsJW-NCTa0bqBFF6Wm1MxgfE",
        e: "AQAB",
      },
      { name: "RSA-OAEP", hash: "SHA-256" },
      true,
      ["encrypt"]
    )
  );
};



// 加密数据并返回路径
const getCorrespondPath = (timestamp, publicKey) => {
  const data = new TextEncoder().encode(`refresh_${timestamp}`);
  return crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, data)
    .then(encrypted => new Uint8Array(encrypted))
    .then(encryptedArray => {
      return encryptedArray.reduce((str, c) => str + c.toString(16).padStart(2, "0"), "");
    });
};

// 获取当前时间戳
const ts = Date.now();



// 导入公钥并获取对应路径
importPublicKey()
  .then(publicKey => getCorrespondPath(ts, publicKey))
  .then(path => console.log(path))
  .catch(error => console.error('Error:', error));
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
        .then((res) => {})
        .catch((res) => {
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
    getbuvid3() { 
      this.request({
        method: "SENDBILIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"), 
          buvid3: localStorage.getItem("buvid3"),
        },
        url: "https://api.bilibili.com/x/frontend/finger/spi", 
        type: "json"
      })
        .then((res) => {})
        .catch((res) => {
          buvid3 = res.body.data.b_3;
        }); 
      
    }
  })
);