import { LocalStorage } from '../zos/storage'
// import { setTimeout } from '../shared/setTimeout'
import { push, replace } from '../zos/router'
const localStorage = new LocalStorage();
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
Page({
  build() {
    let that = this
    hmUI.createWidget(hmUI.widget.IMG, {
      x: px(40),
      y: px(80),
      src: 'icon.png',
    })
    setTimeout(()=> {
      if (localStorage.getItem('SESSDATA') == undefined || localStorage.getItem('DedeUserID') == undefined || localStorage.getItem('bili_jct') == undefined || localStorage.getItem('buvid3') == undefined || localStorage.getItem('DedeUserID__ckMd5') == undefined || localStorage.getItem('bili_jct') == undefined) {
        console.log(localStorage.getItem('SESSDATA'),localStorage.getItem('DedeUserID'),localStorage.getItem('bili_jct'),localStorage.getItem('buvid3'),localStorage.getItem('DedeUserID__ckMd5'));
        
          push({
              url: 'pages/login',
          })
          console.log('login');
      } else {
          that.getWbi()
          replace({
              url: 'pages/videopush',
          })
          console.log('video');
      }
    }, 1000)
  },
  getWbi() {
    messageBuilder
      .request({
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
      .then((res) => {
        localStorage.setItem('login_info',res.body.data.wbi_img)
        console.log(res);
      });
  }
});
