/* import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
//import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
/* const mid = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 40,
  w: 192,
  h: 192,
  text: '',
});    
const uname  = hmUI.createWidget(hmUI.widget.TEXT, {
  x:150,

  y: 250,
  w: 300,
  h: 192,
  text_size: 30,
  color: 0x995874,
  text: ""
});
const uid = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 170,

  y: 288,
  w: 192,
  h: 192,
  text: ``
});
const sign = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 110,

  y: 320,
  w: 290,
  h: 290,
  align_h: hmUI.align.CENTER_H,
  color: 0xffffff,
  text_style: hmUI.text_style.WRAP,
  text: ""
});
/* const birthday = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,

  y: 120,
  w: 192,
  h: 192,
  text: ""
}); */
/* const sex = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,

  y: 140,
  w: 192,
  h: 192,
  text: ""
}); 
Page(
  BasePage({
    build() {

         this.getAccount() 
    },
    getAccount() {
      this.request({
          method: "SENDBILIGET",
          data: {
            DedeUserId: localStorage.getItem("DedeUserId"),
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
            //mid.setProperty(hmUI.prop.TEXT, res.body.data.mid.toString());
            uname.setProperty(hmUI.prop.TEXT, res.body.data.uname);
            uid.setProperty(hmUI.prop.TEXT, res.body.data.userid);
            sign.setProperty(hmUI.prop.TEXT, res.body.data.sign);
            //birthday.setProperty(hmUI.prop.TEXT, res.body.data.birthday);
            //sex.setProperty(hmUI.prop.TEXT, res.body.data.sex)
            console.log(res);
          });
  }
    
  })
); */
import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
let midResult
const mid = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,
  y: 40,
  w: 192,
  h: 192,
  text: ""
});
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
const birthday = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,

  y: 120,
  w: 192,
  h: 192,
  text: ""
});
const sex = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 40,

  y: 140,
  w: 192,
  h: 192,
  text: ""
});
const img = hmUI.createWidget(hmUI.widget.IMG, {
  x: 40,
  y: 160,
  src: ""
});
Page(
  BasePage({
    build() {
      this.getMid()
      this.getCoin()
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
            console.log(res.body.data.card.mid);
            console.log(res.body.data.card.name);
            console.log(res.body.data.card.sex);
            console.log(res.body.data.card.face);
            console.log(res.body.data.card.sign);
            this.request({
              method: "DOWNLOADIMAGE",
              url: res.body.data.card.face,
              filename: "face.png",
              targetName: "face2.png",
            })
              .then((res) => {
                img.setProperty(hmUI.prop.SRC, "data://download/face2.png");
              })
              .catch((res) => {
                img.setProperty(hmUI.prop.SRC, "data://download/face2.png");

              });
            console.log(res.body.data.card.fans);
            console.log(res.body.data.card.friend);
            console.log(res.body.data.card.level_info.current_level);
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
        });
},
  })
); 