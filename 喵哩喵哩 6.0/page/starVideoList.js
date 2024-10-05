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
let params
let pn = 1
Page(
  BasePage({ 
    onInit(param) {
      params = JSON.parse(param)
    },
    build() {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 150,
        y: 50,
        src: "back.png",
      }).addEventListener(hmUI.event.CLICK_UP, () => {

      });
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 180,
        y: 40,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: params.name,
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 35,
        y: 80,
        w: 185,
        h: 58,
        text_size: px(36),
        radius: px(12),
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "上一页",
        click_func: (button_widget) => {
          pn--;
          this.getWbi();
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 253,
        y: 80,
        w: 185,
        h: 58,
        text_size: px(36),
        radius: px(12),
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "下一页",
        click_func: (button_widget) => {
          pn++;
          this.getWbi();
        },
      });
      for(let i = 0; i < 5; i++) {
        buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 30,
          y: 170 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 50,
          y: 190 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: hmUI.text_style.WRAP,
        }) // title
        hmUI.createWidget(hmUI.widget.IMG,{
          x: 50,
          y: 300 + i * 204,
          src: 'watchnum.png'
        })
        newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 191,
          y: 297 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: hmUI.text_style.WRAP,
        }) // uname
        hmUI.createWidget(hmUI.widget.IMG,{
          x: 165,
          y: 303 + i * 204,
          src: 'up.png'
        })
        newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 82,
          y: 297 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 20,
          text: "",
          color: 0x9E9E9E,
          text_style: hmUI.text_style.ELLIPSIS,
        }) // viewNumber
      } 
      this.request({
        method: "SENDBILIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        url: `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${params.id}&ps=5&pn=${pn}`,
        type: "json",
      })
        .then((res) => {
          for(let i = 0; i < 5; i++) {
            textList[i].setProperty(hmUI.prop.TEXT, res.body.data.medias[i].title)
            newTextList[i].setProperty(hmUI.prop.TEXT, res.body.data.medias[i].upper.name)
            newNewTextList[i].setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.medias[i].cnt_info.play))
            textList[i].setEnable(false)
            buttonList[i].setProperty(hmUI.prop.MORE, {
              x: 30,
              y: 170 + i * 204,
              w: 420,
              h: 180,
              radius: 40,
              normal_color: 0x222222,
              press_color: 0x101010,
              click_func: (button_widget) => {
              push({
                url: 'page/videodetail',
                params: JSON.stringify({
                    img_src: res.body.data.medias[i].cover,
                    vid_title: res.body.data.medias[i].title,
                    bv: res.body.data.medias[i].bvid,
                    up_mid: res.body.data.medias[i].upper.mid,
                    // id: res.body.data[i].aid,
                }),
              })
              },
            })  
          }  

          console.log(res);
        })
        .catch((res) => {

        });
    },
    getWbi() {

    }
    
  })
);
