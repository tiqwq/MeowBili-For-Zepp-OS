// 系统api导入
import { createWidget, widget, prop, text_style, event } from '@zos/ui'
import { scrollTo } from '@zos/page'
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
import { LocalStorage } from '@zos/storage'
// 个人模块导入
import { fetchVideoList } from "../func/fetch"; 
import { formatNumber } from "../utils/utils";
// 变量部分
const localStorage = new LocalStorage()
let list = localStorage.getItem("list", undefined) // 视频列表
let num = 10 // 视频显示数
 
Page(
  BasePage({
    state: {
      textList: [],
      newTextList: [],
      newNewTextList: [], 
      buttonList: []
    },
    build() {
      createWidget(widget.PAGE_SCROLLBAR)
      this.createVideoList()
      createWidget(widget.TEXT, {
        x: 200,
        y: 60,
        w: px(245),
        h: px(88),
        text_size: 38,
        text: "推荐",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })

      createWidget(widget.FILL_RECT, {
        x: 110,
        y: 110,
        w: 106,
        h: 106,
        radius: 55,
        color: 0x171717
      }).addEventListener(event.CLICK_DOWN, function (info) {
        push({
          url: 'page/trending',
        })
      })
      createWidget(widget.IMG, {
        x: 145,
        y: 145,
        src: 'search.png'
      }).addEventListener(event.CLICK_DOWN, function (info) {
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
      }).addEventListener(event.CLICK_DOWN, function (info) {
        push({
          url: 'page/account'
        })
      })
      createWidget(widget.IMG, {
        x: 295,
        y: 145,
        src: 'head.png'
      }).addEventListener(event.CLICK_DOWN, function (info) {
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
      createWidget(widget.TEXT, {
        x: 60,
        y: 240,
        w: 380,
        h: px(88),
        text_size: 28,
        text: "欢迎使用MeowBili，这里是公告栏哦，请您签收awa!",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      createWidget(widget.BUTTON, {
        x: 60,
        y: 3820,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 30,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "加载更多",
        click_func: () => {
          this.getVideoList()
          scrollTo({
            y: -0,
            anim_rate: linear,
            anim_duration: 3,
            anim_fps: 60,
          })
        },
      });
      if (list != undefined) this.readListStorage();
      else this.getVideoList();
    },
    createVideoList() {
      for (let i = 0; i < num; i++) {
        this.state.buttonList[i] = createWidget(widget.BUTTON, {
          x: 30,
          y: 350 + i * 342,
          w: 420,
          h: 340,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        this.state.textList[i] = createWidget(widget.TEXT, {
          x: 40,
          y: 560 + i * 342,
          w: 400,
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: text_style.WRAP,
        }) // 标题
        createWidget(widget.IMG, {
          x: 70,
          y: 650 + i * 342,
          src: 'watchnum.png'
        })
        this.state.newTextList[i] = createWidget(widget.TEXT, {
          x: 211,
          y: 647 + i * 342,
          w: px(360),
          h: px(40),
          text_size: 22,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.WRAP,
        }) // up名字
        createWidget(widget.IMG, {
          x: 185,
          y: 653 + i * 342,
          src: 'up.png'
        })
        this.state.newNewTextList[i] = createWidget(widget.TEXT, {
          x: 102,
          y: 647 + i * 342,
          w: px(360),
          h: px(40),
          text_size: 20,
          text: "",
          color: 0x9E9E9E,
          text_style: text_style.ELLIPSIS,
        }) // 播放量
      }
    },
    readListStorage() {
      for (let i = 0; i < num; i++) {
        this.state.textList[i].setProperty(prop.TEXT, list[i].title);
        this.state.newTextList[i].setProperty(prop.TEXT, list[i].owner.name);
        this.state.newNewTextList[i].setProperty(prop.TEXT, formatNumber(list[i].stat.view));
        this.state.textList[i].setEnable(false)
        this.state.buttonList[i].setProperty(prop.MORE, {
          x: 30,
          y: 350 + i * 342,
          w: 420,
          h: 340,
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
      fetchVideoList(this).then((res) => {
        for (let i = 0; i < 10; i++) {
          this.state.textList[i].setProperty(prop.TEXT, res.item[i].title);
          this.state.newTextList[i].setProperty(prop.TEXT, res.item[i].owner.name);
          this.state.newNewTextList[i].setProperty(prop.TEXT, formatNumber(res.item[i].stat.view, 'num'));
          this.state.textList[i].setEnable(false);
          this.state.buttonList[i].setProperty(prop.MORE, {
            x: 30,
            y: 350 + i * 342,
            w: 420,
            h: 340,
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
      }).catch((err) => {
        console.error("可能是恩情还多了所以报错:", err);
      });
    }
  }))