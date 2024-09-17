import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
const localStorage = new LocalStorage()
let textList = []
let newTextList = []
let newNewTextList = []
let buttonList = []
console.log(localStorage.getItem("login_info"));
function extractTextFromHTML(htmlString) {
  const text = htmlString.replace(/<[^>]*>/g, '');
  return text.trim();
}
function formatNumber(num){
  if(num < 1000){
      return num.toString();
  }
  else if(num < 10000){
      return (num/1000).toFixed(1) + 'k';
  }
  else{
      return (num / 10000).toFixed(1) + 'w'
  }
}
for(let i = 0; i < 8; i++) {
  buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
    x: 30,
    y: 180 + i * 204,
    w: 420,
    h: 180,
    radius: 40,
    normal_color: 0x222222,
    press_color: 0x101010,
  })
  textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 210,
    y: 200 + i * 204,
    w: px(245),
    h: px(88),
    text_size: 28,
    text: "",
    color: 0xffffff,
    text_style: hmUI.text_style.WRAP,
  }) // title
  hmUI.createWidget(hmUI.widget.IMG,{
    x: 50,
    y: 310 + i * 204,
    src: 'watchnum.png'
  })
  newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 191,
    y: 307 + i * 204,
    w: px(360),
    h: px(40),
    text_size: 22,
    text: "",
    color: 0x9E9E9E,
    text_style: hmUI.text_style.WRAP,
  }) // uname
  hmUI.createWidget(hmUI.widget.IMG,{
    x: 165,
    y: 313 + i * 204,
    src: 'up.png'
  })
  newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 82,
    y: 307 + i * 204,
    w: px(360),
    h: px(40),
    text_size: 20,
    text: "",
    color: 0x9E9E9E,
    text_style: hmUI.text_style.ELLIPSIS,
  }) // viewNumber
} 
let params
Page(
  BasePage({ 
    onInit(param) {
      params = param;
    },
    build() {
         this.getWbi() 
    },
    getWbi() {
        this.request({
            method: "SENDWBIGET",
            data: {
              DedeUserID: localStorage.getItem("DedeUserID"),
              SESSDATA: localStorage.getItem("SESSDATA"),
              bili_jct: localStorage.getItem("bili_jct"),
              DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
              buvid3: localStorage.getItem("buvid3"),
            },
            url: "https://api.bilibili.com/x/web-interface/wbi/search/type",
            type: "json",
            info: localStorage.getItem('login_info'),
            paramsobj: {
              keyword: params,
              search_type: "video"
            }
          })
            .then((res) => {})
            .catch((res) => {
              for(let i = 0; i < 8; i++) {
                textList[i].setProperty(hmUI.prop.TEXT, extractTextFromHTML(res.body.data.result[i].title))
                newTextList[i].setProperty(hmUI.prop.TEXT, res.body.data.result[i].author)
                newNewTextList[i].setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.result[i].play))
                textList[i].setEnable(false)
                buttonList[i].setProperty(hmUI.prop.MORE, {
                  x: 30,
                  y: 180 + i * 204,
                  w: 420,
                  h: 180,
                  radius: 40,
                  normal_color: 0x222222,
                  press_color: 0x101010,
                  click_func: (button_widget) => {
                  push({
                    url: 'page/videodetail',
                    params: JSON.stringify({
                        img_src: res.body.data.result[i].pic,
                        vid_title: res.body.data.result[i].title,
                        bv: res.body.data.result[i].bvid,
                        up_mid: res.body.data.result[i].mid,
                        id: res.body.data.result[i].aid,
                    }),
                  })
                  },
                })  
              }  

              console.log(res);
            });
    }
    
  })
);
