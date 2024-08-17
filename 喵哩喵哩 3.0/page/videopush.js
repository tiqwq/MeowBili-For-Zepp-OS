import * as hmUI from "@zos/ui";
import { createWidget, widget } from '@zos/ui'
import { scrollTo } from '@zos/page'
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
const logger = Logger.getLogger("fetch_api");
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
let list = localStorage.getItem("list", undefined)
let textList = []
let newTextList = []
let newNewTextList = []
let button = []
console.log(localStorage.getItem("login_info"));
const app = getApp()
app._options.globalData.back = 1
let num = 1
for (let i = 0; i < num; i++) {
  button = hmUI.createWidget(hmUI.widget.BUTTON, {
    x: 30,
    y: 350,
    w: 420,
    h: 340,
    radius: 40,
    normal_color: 0x222222,
    press_color: 0x101010,
  })
  //hmUI.createWidget(hmUI.widget.IMG,{
  // x: 80,
  // y: 350,
  // src: 'spfm.png'
  // })
  textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 40,
    y: 560,
    w: 400,
    h: px(88),
    text_size: 28,
    text: "",
    color: 0xffffff,
    text_style: hmUI.text_style.WRAP,
  }) // title
  hmUI.createWidget(hmUI.widget.IMG, {
    x: 70,
    y: 650 + i * 204,
    src: 'watchnum.png'
  })
  newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 211,
    y: 647 + i * 204,
    w: px(360),
    h: px(40),
    text_size: 22,
    text: "",
    color: 0x9E9E9E,
    text_style: hmUI.text_style.WRAP,
  }) // uname
  hmUI.createWidget(hmUI.widget.IMG, {
    x: 185,
    y: 653 + i * 204,
    src: 'up.png'
  })
  newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
    x: 102,
    y: 647 + i * 204,
    w: px(360),
    h: px(40),
    text_size: 20,
    text: "",
    color: 0x9E9E9E,
    text_style: hmUI.text_style.ELLIPSIS,
  }) // viewNumber
}
function formatNumber(num) {
  if (num < 1000) {
    return num.toString();
  }
  else if (num < 10000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  else {
    return (num / 10000).toFixed(1) + 'w'
  }
}
hmUI.createWidget(hmUI.widget.IMG, {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: "data://download/spfm.png",
})
Page(
  BasePage({
    build() {
      const scrollBar = createWidget(widget.PAGE_SCROLLBAR)
      createWidget(hmUI.widget.TEXT, {
        x: 200,
        y: 60,
        w: px(245),
        h: px(88),
        text_size: 38,
        text: "推荐",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      }) // title

      createWidget(hmUI.widget.FILL_RECT, {
        x: 110,
        y: 110,
        w: 106,
        h: 106,
        radius: 55,
        color: 0x171717
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/trending',
        })
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 145,
        y: 145,
        src: 'search.png'
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/trending',
        })
      })

      createWidget(hmUI.widget.FILL_RECT, {
        x: 260,
        y: 110,
        w: 106,
        h: 106,
        radius: 55,
        color: 0x171717
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/account',
        })
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 295,
        y: 145,
        src: 'head.png'
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/account',
        })
      })
      createWidget(hmUI.widget.FILL_RECT, {
        x: 30,
        y: 225,
        w: 420,
        h: 100,
        radius: 40,
        color: 0x222222
      })
      createWidget(hmUI.widget.TEXT, {
        x: 60,
        y: 240,
        w: 380,
        h: px(88),
        text_size: 28,
        text: "欢迎使用MeowBili，这里是公告栏哦，请您签收awa!",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      }) // title
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 700,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 30,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "加载更多",
        click_func: (button_widget) => {
          logger.log("click button");
          this.getVideoList();
          scrollTo({
            y: -0,
            anim_rate: linear,
            anim_duration: 3,
            anim_fps: 60,
          })
        },
      });
      if (list != undefined) {
        for (let i = 0; i < num; i++) {
          textList[i].setProperty(hmUI.prop.TEXT, list[i].title);
          newTextList[i].setProperty(hmUI.prop.TEXT, list[i].owner.name);
          newNewTextList[i].setProperty(hmUI.prop.TEXT, formatNumber(list[i].stat.view));
          textList[i].setEnable(false)
          button.setProperty(hmUI.prop.MORE, {
            x: 30,
            y: 350,
            w: 420,
            h: 340,
            radius: 40,
            normal_color: 0x222222,
            press_color: 0x101010,
            click_func: (button_widget) => {
              push({
                url: 'page/videodetail',
                params: JSON.stringify({
                  img_src: list[i].pic,
                  vid_title: list[i].title,
                  bv: list[i].bvid,
                  cid: list[i].cid,
                  uname: list[i].owner.name,
                  up_mid: list[i].owner.mid,
                  id: list[i].id
                }),
              })
            },
          })

        }
      }
      else {
        this.getVideoList();
      }
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
        url: "https://api.bilibili.com/x/web-interface/index/top/rcmd?" + "fresh_type=" + 4 + "&ps=" + num,
        type: "json"
      })
        .then((res) => {
        })
        .catch((res) => {
          for (let i = 0; i < num; i++) {
            textList[i].setProperty(hmUI.prop.TEXT, res.body.data.item[i].title);
            newTextList[i].setProperty(hmUI.prop.TEXT, res.body.data.item[i].owner.name);
            newNewTextList[i].setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.item[i].stat.view));
            textList[i].setEnable(false)
            button.setProperty(hmUI.prop.MORE, {
              x: 30,
            y: 350,
            w: 420,
            h: 340,
              radius: 40,
              normal_color: 0x222222,
              press_color: 0x101010,
              click_func: (button_widget) => {
                push({
                  url: 'page/videodetail',
                  params: JSON.stringify({
                    img_src: res.body.data.item[i].pic,
                    vid_title: res.body.data.item[i].title,
                    bv: res.body.data.item[i].bvid,
                    cid: res.body.data.item[i].cid,
                    up_mid: res.body.data.item[i].owner.mid,
                    id: res.body.data.item[i].id
                  }),
                })
              },
            })
            localStorage.setItem("list", res.body.data.item)
          }
        });
    }
  })
);