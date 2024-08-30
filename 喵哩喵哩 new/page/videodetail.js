import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router'
const logger = Logger.getLogger("fetch_api");
import { LocalStorage } from '@zos/storage'
const localStorage = new LocalStorage()
function extractTextFromHTML(htmlString) {
  const text = htmlString.replace(/<[^>]*>/g, '');
  return text.trim();
}
function timestampToDateTime(timestamp) {
  let date = new Date(timestamp * 1000)
  let year = date.getFullYear()
  let month = ('0' + (date.getMonth() + 1)).slice(-2)//月份从0开始需加1补零
  let day = ('0' + date.getDate()).slice(-2)//补零
  let hours = ('0' + date.getHours()).slice(-2)//补零
  let minutes = ('0' + date.getMinutes()).slice(-2)//补零
  let seconds = ('0' + date.getSeconds()).slice(-2)//补零
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

let cid
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
hmUI.createWidget(hmUI.widget.FILL_RECT, {
  x: 30,
  y: 463,
  w: 420,
  h: 127,
  radius: 40,
  color: 0x222222
})
const fensi = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 145,
  y: 533,
  w: 294,
  h: px(40),
  text_size: 22,
  text: '未知',
  color: 0xffffff,
  text_style: hmUI.text_style.ELLIPSIS,
})
const zan = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 32,
  y: 735,
  w: 294,
  h: px(40),
  text_size: 22,
  text: '未知',
  color: 0x9E9E9E,
  text_style: hmUI.text_style.ELLIPSIS,
})
const now = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 32,
  y: 763,
  w: 294,
  h: px(40),
  text_size: 22,
  text: '未知',
  color: 0x9E9E9E,

  text_style: hmUI.text_style.ELLIPSIS,
})
const view = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 32,
  y: 792,
  w: 294,
  h: px(40),
  text_size: 22,
  text: '未知',
  color: 0x9E9E9E,

  text_style: hmUI.text_style.ELLIPSIS,
})
const time = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 32,
  y: 818,
  w: 294,
  h: px(40),
  text_size: 22,
  text: '发布于 ',
  color: 0x9E9E9E,

  text_style: hmUI.text_style.ELLIPSIS,
})
const bv = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 32,
  y: 844,
  w: 294,
  h: px(40),
  text_size: 22,
  text: 'BV',
  color: 0x9E9E9E,

  text_style: hmUI.text_style.ELLIPSIS,
})
const uname = hmUI.createWidget(hmUI.widget.TEXT, {
  x: 145,
  y: 487,
  w: 294,
  h: px(40),
  text_size: 20,
  text: "未知",
  color: 0xffffff,
  text_style: hmUI.text_style.ELLIPSIS,
})
// hmUI.createWidget(hmUI.widget.IMG, {
//   x: 0,
//   y: 0,
//   w: px(480),
//   h: px(480),
//   src: "data://download/1.png",
// })
Page(
  BasePage({
    onInit(param) {
      params = JSON.parse(param)
      console.log(param);
    },
    build() {
      this.getCid(params.bv)

          this.getVideoList();
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
            text: "视频详情",
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          }) // title
          back.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            push({
              url: 'page/videopush',
    
            })
          }),
    
            hmUI.createWidget(hmUI.widget.IMG, { 
              x: 80,
              y: 100,
              src: "spfm.png",
            })
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 20,
            y: 370,
            w: 430,
            h: px(88),
            text_size: 30,
            text: extractTextFromHTML(params.vid_title),
            color: 0xffffff,
            align_h: hmUI.align.CENTER_H,
            text_style: hmUI.text_style.WRAP,
          }) // title
          //--------------------------------------
          /* hmUI.createWidget(hmUI.widget.TEXT, {
            x: 400,
            y: 300,
            w: 430,
            h: px(88),
            text_size: 30,
            text: "ai",
            color: 0xffffff,
          }).addEventListener(hmUI.event.CLICK_DOWN, () => {
            push({
              url: "page/videoaisummary",
              params: JSON.stringify({
                img_src: params.img_src,
                vid_title: params.vid_title,
                bv: params.bv,
                cid: cid,
                up_mid: params.up_mid,
               id: params.id
              })
            })
          }) */
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 60,
            y: 1010,
            w: px(360),
            h: px(100),
            text_size: px(36),
            radius: 30,
            normal_color: 0x222222,
            press_color: 0x101010,
            text: "Ai视频总结",
            click_func: (button_widget) => {
              push({
                url: "page/videoaisummary",
                params: JSON.stringify({
                  img_src: params.img_src,
                  vid_title: params.vid_title,
                  bv: params.bv,
                  cid: cid,
                  up_mid: params.up_mid,
                 id: params.id
                })
              })
            },
          });
//--------------------------------
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 46,
            y: 628,
            src: "zan.png",
          }).addEventListener(hmUI.event.CLICK_DOWN, () => {
            this.request({
              method: "SENDBILIPOST",
              data: {
                DedeUserID: localStorage.getItem("DedeUserID"),
                SESSDATA: localStorage.getItem("SESSDATA"),
                bili_jct: localStorage.getItem("bili_jct"),
                DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
                buvid3: localStorage.getItem("buvid3"),
              }, 
              content_type: "application/x-www-form-urlencoded",
              parameters: `bvid=${params.bv}&like=1&csrf=${localStorage.getItem("bili_jct")}`,
              url: `https://api.bilibili.com/x/web-interface/archive/like?bvid=${params.bv}&like=1&csrf=${localStorage.getItem("bili_jct")}`,
              type: "json"
            })
              .then((res) => {
                console.log(res.body.data.Card.card.fans);
                this.getrenshu()
                fensi.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.Card.card.fans).toString() + '粉丝')
                zan.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.like).toString() + '点赞')
                view.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.view).toString() + '播放')
                time.setProperty(hmUI.prop.TEXT, '发布于 ' + timestampToDateTime(res.body.data.View.pubdate))
                bv.setProperty(hmUI.prop.TEXT, 'BV' + params.bv)
                uname.setProperty(hmUI.prop.TEXT, res.body.data.View.owner.name)
              })
              .catch((res) => {
                console.log(res.body.data.Card.card.fans);
                this.getrenshu()
                fensi.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.Card.card.fans).toString() + '粉丝')
                zan.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.like).toString() + '点赞')
                view.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.view).toString() + '播放')
                time.setProperty(hmUI.prop.TEXT, '发布于 ' + timestampToDateTime(res.body.data.View.pubdate))
                bv.setProperty(hmUI.prop.TEXT, 'BV' + params.bv)
                uname.setProperty(hmUI.prop.TEXT, res.body.data.View.owner.name)
              });
          })
    
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 191,
            y: 628,
            src: "bi.png",
          })
    
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 341,
            y: 628,
            src: "star.png",
          }).addEventListener(hmUI.event.CLICK_DOWN, () => {
            push({
              url: "page/videoreplies",
              params: JSON.stringify({
                img_src: params.img_src,
                vid_title: params.vid_title,
                bv: params.bv,
                cid: params.cid,
                up_mid: params.up_mid,
                id: params.id
            })
            })
          })
          /* hmUI.createWidget(hmUI.widget.IMG, {
            x: 351,
            y: 372,
            src: "pinlun.png",
          }).addEventListener(hmUI.event.CLICK_DOWN, () => {
            push({
              url: "page/videoreplies", 
              params: JSON.stringify({
                img_src: params.img_src,
                vid_title: params.vid_title,
                bv: params.bv,
                cid: params.cid,
                up_mid: params.up_mid,
                id: params.id
            })
            })
          }) */
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 60,
            y: 900,
            w: px(360),
            h: px(100),
            text_size: px(36),
            radius: 30,
            normal_color: 0x222222,
            press_color: 0x101010,
            text: "评论区",
            click_func: (button_widget) => {
              push({
                url: "page/videoreplies", 
                params: JSON.stringify({
                  img_src: params.img_src,
                  vid_title: params.vid_title,
                  bv: params.bv,
                  cid: params.cid,
                  up_mid: params.up_mid,
                  id: params.id
              })
              })
            },
          });
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 60,
            y: 1120,
            w: px(360),
            h: px(100),
            text_size: px(36),
            radius: 30,
            normal_color: 0x222222,
            press_color: 0x101010,
            text: "发评论",
            click_func: (button_widget) => {
              push({
                url: "page/board", 
                params: JSON.stringify({
                  type: "sendreply",
                  id: params.id
              })
              })
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
        url: `https://api.bilibili.com/x/web-interface/view/detail?bvid=${params.bv}`,

        type: "json"
      })
        .then((res) => {
          console.log(res.body.data.Card.card.fans);
          this.getrenshu()
          fensi.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.Card.card.fans).toString() + '粉丝')
          zan.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.like).toString() + '点赞')
          view.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.view).toString() + '播放')
          time.setProperty(hmUI.prop.TEXT, '发布于 ' + timestampToDateTime(res.body.data.View.pubdate))
          bv.setProperty(hmUI.prop.TEXT, 'BV' + params.bv)
          uname.setProperty(hmUI.prop.TEXT, res.body.data.View.owner.name)
        })
        .catch((res) => {
          console.log(res.body.data.Card.card.fans);
          this.getrenshu()
          fensi.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.Card.card.fans).toString() + '粉丝')
          zan.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.like).toString() + '点赞')
          view.setProperty(hmUI.prop.TEXT, formatNumber(res.body.data.View.stat.view).toString() + '播放')
          time.setProperty(hmUI.prop.TEXT, '发布于 ' + timestampToDateTime(res.body.data.View.pubdate))
          bv.setProperty(hmUI.prop.TEXT, 'BV' + params.bv)
          uname.setProperty(hmUI.prop.TEXT, res.body.data.View.owner.name)
        });
    },
    getrenshu() {
      return this.httpRequest({
        method: 'get',
        url: 'https://api.bilibili.com/x/player/online/total?bvid=' + params.bv + "&cid=" + cid,
      })
        .then((result) => {
          now.setProperty(hmUI.prop.TEXT, formatNumber(result.body.data.count).toString() + ' 人在看')
        })
        .catch((error) => {

        })
    },
    getCid(bvid) { 
      this.request({
          method: "SENDBILIGET",
          data: {
            DedeUserID: localStorage.getItem("DedeUserID"),
            SESSDATA: localStorage.getItem("SESSDATA"),
            bili_jct: localStorage.getItem("bili_jct"),
            DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
            buvid3: localStorage.getItem("buvid3"),
          },
          url: "https://api.bilibili.com/x/player/pagelist?bvid=" + bvid,
          type: "json",
        })
          .then((res) => {
            console.log(res.body.data[0].cid);
            cid = res.body.data[0].cid
          })
          .catch((res) => {
            console.log(res.body.data[0].cid);
            cid = res.body.data[0].cid
          });
  }
  })
);