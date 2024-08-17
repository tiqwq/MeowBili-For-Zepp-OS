import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
const logger = Logger.getLogger("fetch_api");
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
import { getTextLayout } from '@zos/ui'
let num = 1
function logStringInChunks(text) {
    for (let i = 0; i < text.length; i += 50) {
        console.log(text.slice(i, i + 50));
    }
}

let textList = []
let newTextList = []
let newNewTextList = []
let buttonList = []

let cishu = 1;

function formatNumber(num) {
  if (num < 1000) {
      return num.toString();
  } else if (num < 10000) {
      return (num / 1000).toFixed(1) + 'k';
  } else {
      return (num / 10000).toFixed(1) + 'w'
  }
}

let params;

Page(
  BasePage({
    onInit(param) {
      params = JSON.parse(param)
      console.log(param);
    },
    build() {
      this.getVideoList();
      console.log(localStorage.getItem("DedeUserID"));
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 35,
        y: 10,
        w: 185,
        h: 58,
        text_size: px(36),
        radius: px(12),
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "上一页",
        click_func: (button_widget) => {
          logger.log("click button");
          cishu--;
          this.getVideoList();
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 253,
        y: 10,
        w: 185,
        h: 58,
        text_size: px(36),
        radius: px(12),
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "下一页",
        click_func: (button_widget) => {
          logger.log("click button");
          cishu++;
          this.getVideoList();
        },
      });
    },
    getVideoList() {
      this.request({
        method: "SENDBILIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        url: `https://api.bilibili.com/x/v2/reply?type=1&oid=${params.id}&sort=1&ps=1&pn=${cishu}`,
        type: "json"
      })
        .then((res) => {
        })
        .catch((res) => {
          let yOffset = 90; // 初始Y偏移量

          for (let i = 0; i < 1; i++) {
            logStringInChunks(res.body)
            const uname = res.body.data.replies[i].member.uname;
            const message = res.body.data.replies[i].content.message;
            const time_desc = res.body.data.replies[i].reply_control.time_desc;

            const unameLayout = getTextLayout(uname, {
              text_size: 16,
              text_width: px(360)
            });
            const messageLayout = getTextLayout(message, {
              text_size: 20,
              text_width: px(400),
              wrapped: 1
            });
            const timeDescLayout = getTextLayout(time_desc, {
              text_size: 16,
              text_width: px(400)
            });

            const totalHeight = unameLayout.height + messageLayout.height + timeDescLayout.height + 40; // 总高度

            if (!buttonList[i]) {
              buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
                x: 30,
                y: yOffset - 20,
                w: 420,
                h: totalHeight,
                radius: 40,
                normal_color: 0x222222,
                press_color: 0x101010,
              });
            } else {
              buttonList[i].setProperty(hmUI.prop.Y, yOffset - 20);
              buttonList[i].setProperty(hmUI.prop.H, totalHeight);
            }

            if (!textList[i]) {
              textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
                x: (480 - px(360)) / 2,
                y: yOffset,
                w: px(360),
                h: unameLayout.height,
                text_size: 16,
                text: uname,
                color: 0xffffff,
                text_style: hmUI.text_style.ELLIPSIS,
              });
            } else {
              textList[i].setProperty(hmUI.prop.Y, yOffset);
              textList[i].setProperty(hmUI.prop.H, unameLayout.height);
              textList[i].setProperty(hmUI.prop.TEXT, uname);
            }

            const newTextYOffset = yOffset + unameLayout.height + 10;

            if (!newTextList[i]) {
              newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
                x: (480 - px(360)) / 2,
                y: newTextYOffset,
                w: px(360),
                h: messageLayout.height,
                text_size: 20,
                text: message,
                color: 0xffffff,
                text_style: hmUI.text_style.WRAP,
              });
            } else {
              newTextList[i].setProperty(hmUI.prop.Y, newTextYOffset);
              newTextList[i].setProperty(hmUI.prop.H, messageLayout.height);
              newTextList[i].setProperty(hmUI.prop.TEXT, message);
            }

            const newNewTextYOffset = newTextYOffset + messageLayout.height + 10;

            if (!newNewTextList[i]) {
              newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
                x: (480 - px(360)) / 2 + 200,
                y: yOffset,
                w: px(400),
                h: timeDescLayout.height,
                text_size: 16,
                text: time_desc,
                color: 0xffffff,
                text_style: hmUI.text_style.ELLIPSIS,
              });
            } else {
              newNewTextList[i].setProperty(hmUI.prop.Y, yOffset);
              newNewTextList[i].setProperty(hmUI.prop.H, timeDescLayout.height);
              newNewTextList[i].setProperty(hmUI.prop.TEXT, time_desc);
            }

            // 更新下一组的Y偏移量
            yOffset = newNewTextYOffset + timeDescLayout.height + 22;
          }
        });
    },
  })
);