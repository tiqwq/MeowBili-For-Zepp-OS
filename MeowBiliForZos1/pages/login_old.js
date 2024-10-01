// 由于Zepp OS的一些毛病，cookie中的Set-Cookie无法获取到全部cookie，仅能获取到SESSDATA，于是我们就使用解析返回body中的url，有着大部分登录需要的cookie，但buvid3并没有，于是采用spi手动获取一遍buvid3
import { back } from '../zos/router'
import qrcode from '../utils/mmk/qrcode'
import { LocalStorage } from '../zos/storage'
const localStorage = new LocalStorage()
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;

setTimeout = (func, interval = 1) => {
  const tmp = timer.createTimer(interval, Number.MAX_SAFE_INTEGER, () => {
    clearTimeout(tmp);
      func();
  }, {});
  return tmp;
};
setInterval = (func, interval) => {
  return timer.createTimer(1, interval, () => func(), {});
};
setImmediate = (func) => setTimeout(func);
clearTimeout = clearInterval = clearImmediate = (ref) => timer.stopTimer(ref);
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

// 封装生成和绘制 QR 码的函数
function drawQRCode(text, w, h, startX, startY, backgroundColor, qrColor) {
  const qr = qrcode(0, 'L')
  qr.addData(text)
  qr.make()

  const qrCodeData = qr.getModuleCount()

  // 绘制背景颜色
  const backgroundRect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
    x: startX - 5,
    y: startY - 5,
    w: qrCodeData * w + 10,
    h: qrCodeData * h + 10,
    color: backgroundColor
  })

  // 绘制 QR 码
  for (let row = 0; row < qrCodeData; row++) {
    for (let col = 0; col < qrCodeData; col++) {
      const x = startX + col * w
      const y = startY + row * h

      const fillRect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: x,
        y: y,
        w: w,
        h: h,
        color: qr.isDark(row, col) ? qrColor : backgroundColor // 二维码颜色或背景颜色
      })
    }
  }
}
let buvid3
Page({
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
        this.fetchData();
        this.getbuvid3()
    },
    fetchData() {
      messageBuilder.request({
        method: "GET_QR",
      })
        .then((data) => {
          logger.log("receive data");
          const result = data;
          
          // if (!qrcodeWidget) {
            
            // qrcodeWidget = hmUI.createWidget(hmUI.widget.QRCODE, {
            //   content: result[0],
            //   x: 18,
            //   y: 88,
            //   w: 160,
            //   h: 160,
            //   bg_x: 11,
            //   bg_y: 80,
            //   bg_w: 170,
            //   bg_h: 170
            // });


          // } else {
          //   qrcodeWidget.setProperty(hmUI.prop.CONTENT, result[0]);
          // }
           //---------------------
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 48,
            y: 32,
            src: "back.png",
          })
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 81,
            y: 20,
            w: px(164),
            h: px(108),
            text_size: 32,
            text: "登入",
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          }) // title
          const a = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 15,
            y: 288,
            w: px(164),
            h: px(108),
            text_size: 25,
            text: "主人请使用\n手机客户端扫码登入",
            align_h: hmUI.align.CENTER_H,
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          }) // title
          //------------------
          drawQRCode(result[0], 3, 3, 10, 65, 0xFFFFFF, 0x000000)
          
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
      messageBuilder.request({
        method: "CHECK_QR_STATUS",
        data: {
          qr_key: this.state.qr_key,
        },
      })
        .then((res) => {
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
        console.log(localStorage.getItem('SESSDATA'),localStorage.getItem('DedeUserID'),localStorage.getItem('bili_jct'),localStorage.getItem('buvid3'),localStorage.getItem('DedeUserID__ckMd5'));

            clearInterval(this.state.PollInterval);
            clearInterval(this.state.GetQRInterval);
          back()
          } 
        })
        .catch((res) => {

        }); 
    },
    getbuvid3() { 
      messageBuilder.request({
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
        .then((res) => {
          buvid3 = res.body.data.b_3;

        })
        .catch((res) => {
        }); 
      
    }
  })