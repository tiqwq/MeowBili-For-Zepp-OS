import { push } from '../zos/router'
import { LocalStorage } from '../zos/storage'
const localStorage = new LocalStorage()
let list = localStorage.getItem("list", undefined)
let textList = []
let newTextList = []
let newNewTextList = []
let buttonList = []
console.log(localStorage.getItem("login_info"));
let num = 10
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;
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
// hmUI.createWidget(hmUI.widget.IMG, {
//   x: 0,
//   y: 0,
//   w: px(480),
//   h: px(480),
//   src: "data://download/spfm.png",
// })
Page(
  {
    build() { 
      for (let i = 0; i < num; i++) {
        buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 7,
          y: 162 + i * 156,
          w: 182,
          h: 150,
          radius: 26,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        //hmUI.createWidget(hmUI.widget.IMG,{
        // x: 80, 
        // y: 350,
        // src: 'spfm.png'
        // })
        textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 17,
          y: 178 + i * 156,
          w: 172,
          h: 99,
          text_size: 20,
          text: "",
          color: 0xffffff,
          text_style: hmUI.text_style.WRAP,
        }) // title
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 17,
          y: 279 + i * 156,
          src: 'watchnum.png'
        })
        newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 43,
          y: 274 + i * 156,
          w: px(360),
          h: px(40),
          text_size: 18,
          text: "",
          color: 0x9E9E9E,
          text_style: hmUI.text_style.ELLIPSIS,
        }) // viewNumber
        newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 116,
          y: 277 + i * 156,
          w: px(360),
          h: px(40),
          text_size: 14,
          text: "",
          color: 0x9E9E9E,
          text_style: hmUI.text_style.WRAP,
        }) // uname
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 87,
          y: 279 + i * 156,
          src: 'up.png'
        })

      }
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
        text: "推荐",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      }) // title

      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 17,
        y: 78,
        w: 74,
        h: 74,
        radius: 55,
        color: 0x171717
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/trending',
        })
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 35,
        y: 97,
        src: 'search.png'
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/trending',
        })
      })

      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 102,
        y: 78,
        w: 74,
        h: 74,
        radius: 55,
        color: 0x171717
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        // push({
        //   url: 'page/board',
        //   params: "message"
        // })
        push({
          url: 'page/account'
        })
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 121,
        y: 94,
        src: 'head.png'
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        push({
          url: 'page/account'
        })
      })
      // hmUI.createWidget(hmUI.widget.FILL_RECT, {
      //   x: 30,
      //   y: 225,
      //   w: px(420),
      //   h: px(100),
      //   radius: 40,
      //   color: 0x222222
      // })
      // hmUI.createWidget(hmUI.widget.TEXT, {
      //   x: 60,
      //   y: 240,
      //   w: 380,
      //   h: px(88),
      //   text_size: 28,
      //   text: "欢迎使用MeowBili，这里是公告栏哦，请您签收awa!",
      //   color: 0xffffff,
      //   text_style: hmUI.text_style.WRAP,
      // }) // title
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 3820,
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
          buttonList[i].setProperty(hmUI.prop.MORE, {
            x: 7,
            y: 162 + i * 156,
            w: 182,
            h: 150,
            radius: 26,
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
        url: "https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=4&ps=1", 
        type: "json"
      })
      .then((res) => {
        console.log('data' + res.body.data);
        
        for (let i = 0; i < 10; i++) {
          textList[i].setProperty(hmUI.prop.TEXT, res.body.data.item[i].title);
          newTextList[i].setProperty(hmUI.prop.TEXT, res.body.data.item[i].owner.name);
          newNewTextList[i].setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.item[i].stat.view));
          textList[i].setEnable(false)
          buttonList[i].setProperty(hmUI.prop.MORE, {
            x: 7,
            y: 162 + i * 156,
            w: 182,
            h: 150,
            radius: 26,
            normal_color: 0x222222,
            press_color: 0x101010,
            click_func: (button_widget) => {
              console.log('assa');
              // localStorage.setItem("list", res.body.data.item)
              push({
                url: 'pages/videodetail',
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
        }
        localStorage.setItem("list", res.body.data.item)
      });

          
    }
  })