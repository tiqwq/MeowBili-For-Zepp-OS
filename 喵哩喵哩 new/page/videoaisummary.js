import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
const logger = Logger.getLogger("fetch_api");
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
import { back } from '@zos/router'

function formatNumber(num){
  if(num < 1000){
      return num.toString();
  }
  else if(num < 10000){
      return (num/1000).toFixed(1) + '千';
  }
  else{
      return (num / 10000).toFixed(1) + '万'
  }
}
let params;
// hmUI.createWidget(hmUI.widget.IMG, {
//   x: 0,
//   y: 0,
//   w: px(480),
//   h: px(480),
//   src: "data://download/1.png",
// })
let ai;
Page(
  BasePage({
    onInit(param) {
      params = JSON.parse(param)
      console.log(param);
    }, 
    build() {
          ai = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 100,
            w: 380,
            h: px(480),
            text_size: 20, 
            text: "",
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          })
          this.getAiSummary();
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 150,
            y: 50,
            src: "back.png",
          }).addEventListener(hmUI.event.CLICK_UP, () => {
            back()
          });
          const back = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 180,
            y: 40,
            w: px(245),
            h: px(88),
            text_size: 32,
            text: "AI视频总结",
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          }) // title

    },
    getAiSummary() {
      this.request({
        method: "SENDWBIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        info: localStorage.getItem('login_info'),
        paramsobj: {
          bvid: params.bv,
          cid: params.cid,
          up_mid: params.up_mid,
        },
        url: `https://api.bilibili.com/x/web-interface/view/conclusion/get`,
        type: "json"
      }) 
        .then((res) => {})
        .catch((res) => {
          if (res.body.data.code == -1) ai.setProperty(hmUI.prop.TEXT, "不支持AI摘要（敏感内容等）或其他因素导致请求异常");
          else if (res.body.data.code == 1) ai.setProperty(hmUI.prop.TEXT, "无摘要（未识别到语音）");
          else {
            if (res.body.data.model_result.result_type == 0) ai.setProperty(hmUI.prop.TEXT, "无摘要")
            else if (res.body.data.model_result.result_type == 1) ai.setProperty(hmUI.prop.TEXT, "无摘要")
            else {
              let new_content = "";
              let i = 0
              let animationInterval = setInterval(() => {
                if (i < res.body.data.model_result.summary.length) {
                  new_content += res.body.data.model_result.summary[i];
                  ai.setProperty(hmUI.prop.TEXT, new_content + " ●");
                  i++;
                } else {
                  ai.setProperty(hmUI.prop.TEXT, new_content);
                  clearInterval(animationInterval);
                }
              }, 55);
            }
          }
        });
    }
  })
);