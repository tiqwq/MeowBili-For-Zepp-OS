import * as hmUI from "@zos/ui"
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
const localStorage = new LocalStorage()
let midResult = localStorage.getItem("DedeUserID")
let uname, uid, sign, sex, coin, fans, friend, level
Page(
  BasePage({
    build() {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 230,
        y: 30,
        src: "back.png",
      })
       hmUI.createWidget(hmUI.widget.IMG, {
        x: 190,
        y: 130,
        w:90,
        h:90,
        auto_scale : true,
        src: 'icon.png',
      }) 
     
      uname = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 100,
        y: 60,
        w: 270,
        h: 100,
        text_size: 32,
        align_h: hmUI.align.CENTER_H,
        color: 0xffffff,
        text: ""
      });


     
      uid = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 100,
        y: 100,
        w: 270,
        h: 192,
        align_h: hmUI.align.CENTER_H,
        text: ""
      });

      sign = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 60,
        y: 230,
        w: 360,
        h: 130,
        text_size: 25,
        align_h: hmUI.align.CENTER_H,
        text_style: hmUI.text_style.WRAP,
        color: 0xffffff,
        text: ""
      });
      level = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 80,
        y: 320,
        w: 192,
        h: 192,
        text_size: 28,
        text: ""
      });
      /* sex = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 40,
        y: 120,
        w: 192,
        h: 192,
        text: ""
      }); */
      coin = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 240,
        y: 320,
        w: 192,
        h: 192,
        text_size: 28,
        text: ""
      });

      fans = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 80,
        y: 350,
        w: 192,
        h: 192,
        text_size: 28,
        text: ""
      });
      friend = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 240,
        y: 350,
        w: 192,
        h: 192,
        text_size: 28,
        text: ""
      });

      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 400,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "我的消息",
        click_func: (button_widget) => {
          push({
            url: 'page/messageList'
          })
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 507,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "历史记录",
        click_func: (button_widget) => {
          push({
            url: 'page/history'
          })
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 614,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "稍后再看",
        click_func: (button_widget) => {
          push({
            url: 'page/laterSee'
          })
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 721,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "收藏夹",
        click_func: (button_widget) => {
          push({
            url: 'page/starFolder'
          })
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 828,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "设置",
        click_func: (button_widget) => {
          push({
            url: 'page/setting'
          })
        },
      });
      this.getAccount()

    },
    // 弃用代码
    //   getAccount() {
    //     this.request({
    //         method: "SENDWBIGET",
    //         data: {
    //           DedeUserId: localStorage.getItem("DedeUserId"),
    //           SESSDATA: localStorage.getItem("SESSDATA"),
    //           bili_jct: localStorage.getItem("bili_jct"),
    //           DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
    //           buvid3: localStorage.getItem("buvid3"),
    //         },
    //         url: "https://api.bilibili.com/x/space/acc/info",
    //         type: "json",
    //         info: localStorage.getItem('login_info'),
    //         paramsobj: {
    //           mid: midResult
    //         }
    //       })
    //         .then((res) => {
    //         })
    //         .catch((res) => {
    //           console.log(res.body.data.mid.toString());
    //           console.log(res.body.data.name);
    //           console.log(res.body.data.sex);
    //           console.log(res.body.data.face);
    //           console.log(res.body.data.level);
    //           console.log(res.body.data.sign);
    //           console.log(res.body.data.coins);

    //         });
    // }
    getAccount() {
      this.request({
        method: "SENDBILIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        url: `https://api.bilibili.com/x/web-interface/card?mid=${midResult}`,
        type: "json"
      })
        .then((res) => {
          console.log(`https://api.bilibili.com/x/web-interface/card?mid=${midResult}`)

          console.log(midResult);
          uname.setProperty(hmUI.prop.TEXT, res.body.data.card.name);
          uid.setProperty(hmUI.prop.TEXT, "uid ： " + res.body.data.card.mid);
          sign.setProperty(hmUI.prop.TEXT, "签名 ： " + res.body.data.card.sign);
          //sex.setProperty(hmUI.prop.TEXT, "性别 ： " + res.body.data.card.sex);
          fans.setProperty(hmUI.prop.TEXT, "粉丝 ： " + res.body.data.card.fans.toString());
          friend.setProperty(hmUI.prop.TEXT, "关注 ： " + res.body.data.card.friend.toString());
          level.setProperty(hmUI.prop.TEXT, "等级 ： " + res.body.data.card.level_info.current_level.toString());
          // img.setProperty(hmUI.prop.SRC, res.body.data.card.face);

          console.log(res.body.data.card.mid);
          console.log(res.body.data.card.name);
          console.log(res.body.data.card.sex);
          console.log(res.body.data.card.face);
          console.log(res.body.data.card.sign);

          console.log(res.body.data.card.fans);
          console.log(res.body.data.card.friend);
          console.log(res.body.data.card.level_info.current_level);
          this.getCoin()
        })
        .catch((res) => {

        });
    },
    getCoin() {
      this.request({
        method: "SENDBILIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        url: "https://account.bilibili.com/site/getCoin",
        type: "json"
      })
        .then((res) => {
          console.log(res.body.data.money);
          coin.setProperty(hmUI.prop.TEXT, "硬币 ： " + res.body.data.money.toString());
        })
        .catch((res) => {

        });
    },
  })
); 