import * as hmUI from "@zos/ui"
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
const localStorage = new LocalStorage()
let midResult
const uname = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 60,
  w: 192,
  h: 192,
  text: ""
});
const uid = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 80,
  w: 192,
  h: 192,
  text: ""
});
const sign = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 100,
  w: 192,
  h: 192,
  text: ""
});
const sex = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 120,
  w: 192,
  h: 192,
  text: ""
});
const coin = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 160,
  w: 192,
  h: 192,
  text: ""
});
const fans = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 180,
  w: 192,
  h: 192,
  text: ""
});
const friend = hmUI.createWidget(hmUI.widget.TEXT, { 
  x: 40,
  y: 200,
  w: 192,
  h: 192,
  text: ""
});
const level = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 220,
  w: 192,
  h: 192,
  text: ""
});
Page(
  BasePage({
    build() {
      this.getMid()
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 60,
        y: 360,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 30,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: "我的消息",
        click_func: (button_widget) => {
          push({
            url: 'page/messageList'
          })
        },
      });
    },
    getMid() {
      this.request({
          method: "SENDBILIGET",
          data: {
            DedeUserID: localStorage.getItem("DedeUserID"),
            SESSDATA: localStorage.getItem("SESSDATA"),
            bili_jct: localStorage.getItem("bili_jct"),
            DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
            buvid3: localStorage.getItem("buvid3"),
          },
          url: "https://api.bilibili.com/x/member/web/account",
          type: "json"
        })
          .then((res) => {
          })
          .catch((res) => {
            console.log(res.body.data.mid.toString());
            midResult = res.body.data.mid
         this.getAccount() 

          });
  },
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
          })
          .catch((res) => {
            console.log(`https://api.bilibili.com/x/web-interface/card?mid=${midResult}`)
            
          console.log(midResult);
          uname.setProperty(hmUI.prop.TEXT, "名字" + res.body.data.card.name);
          uid.setProperty(hmUI.prop.TEXT, "uid" + res.body.data.card.mid);
          sign.setProperty(hmUI.prop.TEXT, "签名" + res.body.data.card.sign);
          sex.setProperty(hmUI.prop.TEXT, "性别" + res.body.data.card.sex);
          fans.setProperty(hmUI.prop.TEXT, "粉丝" + res.body.data.card.fans.toString());
          friend.setProperty(hmUI.prop.TEXT, "关注" + res.body.data.card.friend.toString());
          level.setProperty(hmUI.prop.TEXT, "等级" + res.body.data.card.level_info.current_level.toString());
          // img.setProperty(hmUI.prop.SRC, res.body.data.card.face);

            console.log(res.body.data.card.mid);
            console.log(res.body.data.card.name);
            console.log(res.body.data.card.sex);
            console.log(res.body.data.card.face);
            console.log(res.body.data.card.sign);

            console.log(res.body.data.card.fans);
            console.log(res.body.data.card.friend) ;
            console.log(res.body.data.card.level_info.current_level);
            this.getCoin()
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
        })
        .catch((res) => {
          console.log(res.body.data.money);
          coin.setProperty(hmUI.prop.TEXT, "硬币" + res.body.data.money.toString());
        });
},
  })
); 