// 系统api导入
import * as hmUI from "@zos/ui";
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { scrollTo } from '@zos/page'
import { BasePage } from "@zeppos/zml/base-page";
import { log, px } from "@zos/utils";
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
// 个人模块导入
import { fetchVideoList } from "../func/fetch";
import { formatNumber } from "../utils/utils";
const localStorage = new LocalStorage()
let list = localStorage.getItem("list", undefined)
let num = 10 // 视频显示数
function randomNum(minNum,maxNum){ 
  switch(arguments.length){
      case 1:
          return parseInt(Math.random()*minNum+1,10); 
      break;
      case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
          default:
              return 0; 
          break; 
  } 
} 
Page(
  BasePage({
    state: {
      textList: [],
      newTextList: [],
      newNewTextList: [],
      buttonList: []
    },
    data: {
      textContent: [
        "你所热爱的，就是你热爱的",
        "让我猜猜你现在使用的设备是...？",
        "zepp bili不够zepp怎么办？",
        "富哥V一点好不好，球球了",
        "有没有遇见将军大人Rechrd？",
        "关注永雏塔菲谢谢喵~",
        "关注孙笑川258谢谢喵~",
        "关注七海nanami谢谢喵~",
        "关注芽衣子OvO谢谢喵~",
        "关注嘉然今天吃什么谢谢喵~",
        "我觉得这是一种自信",
        "让我们保持忠！诚！",
        "雷军！金凡！",
        "Powered By Re:Bydour",
        "\"游戏不开挂不好玩。\"",
        "快去盯着搜索星做hyper bili。",
        "早上好中国，现在我有冰淇淋",
        "你这辈子就是被黑神话悟空害了。",
        "你他妈可别上课摸鱼。",
        "我是雷军，你们都给我去玩MIUI全防"
      ],
      currentIndex: 0
    },
    build() {
      createWidget(widget.PAGE_SCROLLBAR)
      for (let i = 0; i < num; i++) {
        this.state.buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 30,
          y: 350 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        this.state.textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 50,
          y: 370 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: hmUI.text_style.WRAP,
        })  // 标题
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 50,
          y: 480 + i * 204,
          src: 'watchnum.png'
        })
        this.state.newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 191,
          y: 477 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: hmUI.text_style.WRAP,
        })// up名字
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 165,
          y: 483 + i * 204,
          src: 'up.png'
        })
        this.state.newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 82,
          y: 477 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 20,
          text: "",
          color: 0x9E9E9E,
          text_style: hmUI.text_style.ELLIPSIS,
        }) // 播放量
      }
      createWidget(hmUI.widget.TEXT, {
        x: 200,
        y: 60,
        w: px(245),
        h: px(88),
        text_size: 38,
        text: "推荐",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })

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

      createWidget(widget.FILL_RECT, {
        x: 260,
        y: 110,
        w: 106,
        h: 106,
        radius: 55,
        color: 0x171717
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/account'
        })
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 295,
        y: 145,
        src: 'head.png'
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/account'
        })
      })
      createWidget(widget.FILL_RECT, {
        x: 30,
        y: 225,
        w: 420,
        h: 100,
        radius: 40,
        color: 0x222222
      })
      //----------------------------------------------------------------------------------------------
      //    随机一言                         //
      //------------------------/////////
      let content = this.data.textContent[randomNum(0, this.data.textContent.length - 1)];
      let new_content = "";
      let i = 0;
        const text = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 60,
          y: 235,
          w: 380,
          h: px(88),
          text_size: 28,
          color: 0xffffff,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.WRAP,
          text: '',
        })
        text.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          push({
            url: 'page/bulletin'
          })
        })
        let animationInterval = setInterval(() => {
          if (i < content.length) {
            new_content += content[i];
            text.setProperty(hmUI.prop.MORE, {
              text: new_content,
            });
            i++;
          } else {
            clearInterval(animationInterval); // 动画完成后停止
          }
        }, 50);
      //----------------------------------------------------------------------------------------------
      createWidget(widget.BUTTON, {
        x: 60,
        y: 2390,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "加载更多",
        click_func: (button_widget) => {
          this.getVideoList()
          scrollTo({
            y: -0,
            anim_rate: linear,
            anim_duration: 3,
            anim_fps: 60,
          })
        },
      });
      if (list != undefined) {
        this.readListStorage()
      }
      else {
        this.getVideoList()
      }
    },
    readListStorage() {
      for (let i = 0; i < num; i++) {
        this.state.textList[i].setProperty(hmUI.prop.TEXT, list[i].title);
        this.state.newTextList[i].setProperty(hmUI.prop.TEXT, list[i].owner.name);
        this.state.newNewTextList[i].setProperty(hmUI.prop.TEXT, formatNumber(list[i].stat.view));
        this.state.textList[i].setEnable(false)
        this.state.buttonList[i].setProperty(hmUI.prop.MORE, {
          x: 30,
          y: 350 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
          click_func: () => {
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
              })
            })
          },
        })
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
        url: "https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=4&ps=1",
        type: "json"
      })
      .then((resa) => {
        let res = resa.body.data
        for (let i = 0; i < 10; i++) {
          this.state.textList[i].setProperty(hmUI.prop.TEXT, res.item[i].title);
          this.state.newTextList[i].setProperty(hmUI.prop.TEXT, res.item[i].owner.name);
          this.state.newNewTextList[i].setProperty(hmUI.prop.TEXT, formatNumber(res.item[i].stat.view, 'num'));
          this.state.textList[i].setEnable(false);
          this.state.buttonList[i].setProperty(hmUI.prop.MORE, {
            x: 30,
          y: 350 + i * 204,
          w: 420,
          h: 180,
          radius: 40, 
            normal_color: 0x222222,
            press_color: 0x101010,
            click_func: () => {
              push({
                url: 'page/videodetail',
                params: JSON.stringify({ 
                  img_src: res.item[i].pic,
                  vid_title: res.item[i].title,
                  bv: res.item[i].bvid,
                  cid: res.item[i].cid,
                  up_mid: res.item[i].owner.mid,
                  id: res.item[i].id
                }),
              });
            }
          });
        }
        localStorage.setItem("list", res.item);
      })
      .catch((error) => {

      });

    },
  })
);