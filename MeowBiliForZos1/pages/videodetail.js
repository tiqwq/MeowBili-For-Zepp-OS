import { push } from '../zos/router'
import { LocalStorage } from '../zos/storage'
const localStorage = new LocalStorage()
const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData;
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

let fensi
let zan
let now
let view;
let time
let bv;
let uname;
// hmUI.createWidget(hmUI.widget.IMG, {
//   x: 0,
//   y: 0,
//   w: px(480),
//   h: px(480),
//   src: "data://download/1.png",
// })
Page(
  {
    onInit(param) {
      params = JSON.parse(param)
      console.log('param' + param);
    },
    starFunc(folderId) {
      messageBuilder.request({
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
        url: `https://api.bilibili.com/x/v3/fav/resource/deal?rid=${params.id}&type=2&csrf=${localStorage.getItem("bili_jct")}&add_media_ids=${folderId}`,
        type: "json"
      })
        .then((res) => {
          
        })
        .catch((res) => {
          
        });
    },
    build() {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 7,
        y: 136,
        w: 179,
        h: 79,
        radius: 19,
        color: 0x222222
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 48,
        y: 32,
        src: "back.png",
      }).addEventListener(hmUI.event.CLICK_UP, () => {
            back()
          });
          const back = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 81,
            y: 20,
            w: px(164),
            h: px(108),
            text_size: 32,
            text: "详情",
            color: 0xffffff,
            text_style: hmUI.text_style.WRAP,
          }) // title
          zan = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 13,
            y: 415,
            w: 294,
            h: px(40),
            text_size: 22,
            text: '未知',
            color: 0x9E9E9E,
            text_style: hmUI.text_style.ELLIPSIS,
          })
          now = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 13,
            y: 443,
            w: 294,
            h: px(40),
            text_size: 22,
            text: '未知',
            color: 0x9E9E9E,
            text_style: hmUI.text_style.ELLIPSIS,
          })
          view = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 13,
            y: 472,
            w: 294,
            h: px(40),
            text_size: 22,
            text: '未知',
            color: 0x9E9E9E,
          
            text_style: hmUI.text_style.ELLIPSIS,
          })
          uname = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 20,
            y: 147,
            w: 155,
            h: 32,
            text_size: 20,
            text: "未知",
            color: 0xffffff,
            text_style: hmUI.text_style.ELLIPSIS,
          })
          bv = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 13,
            y: 518,
            w: 294,
            h: px(40),
            text_size: 22,
            text: 'BV',
            color: 0x9E9E9E,
          
            text_style: hmUI.text_style.ELLIPSIS,
          })
          time = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 13,
            y: 498,
            w: 294,
            h: px(40),
            text_size: 18,
            text: '',
            color: 0x9E9E9E,
            text_style: hmUI.text_style.ELLIPSIS,
          })
          fensi = hmUI.createWidget(hmUI.widget.TEXT, {
            x: 20,
            y: 174,
            w: 155,
            h: 30,
            text_size: 20,
            text: '未知',
            color: 0xffffff,
            text_style: hmUI.text_style.ELLIPSIS,
          })
          back.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            push({
              url: 'pages/videopush',
            })
          })
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 20,
            y: 71,
            w: 166,
            h: 65,
            text_size: 20,
            text: extractTextFromHTML(params.vid_title),
            color: 0xffffff,
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

//--------------------------------
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 7,
            y: 228,
            src: "zan.png",
          }).addEventListener(hmUI.event.CLICK_DOWN, () => {
            messageBuilder.request({
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
                
              })
              .catch((res) => {
                
              });
          })
    
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 104,
            y: 228,
            src: "bi.png",
          }).addEventListener(hmUI.event.CLICK_DOWN, () => {
            messageBuilder.request({
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
              url: `https://api.bilibili.com/x/web-interface/coin/add?bvid=${params.bv}&multiply=1&csrf=${localStorage.getItem("bili_jct")}`,
              type: "json"
            })
              .then((res) => {
                
              })
              .catch((res) => {
                
              });
          })

          hmUI.createWidget(hmUI.widget.IMG, {
            x: 7,
            y: 324,
            src: "star.png",
          }).addEventListener(hmUI.event.CLICK_DOWN, () => {
            this.request({
              method: "SENDBILIGET",
              data: {
                DedeUserID: localStorage.getItem("DedeUserID"),
                SESSDATA: localStorage.getItem("SESSDATA"),
                bili_jct: localStorage.getItem("bili_jct"),
                DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
                buvid3: localStorage.getItem("buvid3"),
              }, 
              content_type: "application/x-www-form-urlencoded",
              parameters: `bvid=${params.bv}&like=1&csrf=${localStorage.getItem("bili_jct")}`,
              url: `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${localStorage.getItem("DedeUserID")}&type=0`,
              type: "json"
            })
              .then((res) => {
                
              })
              .catch((res) => {
                res.body.data.list.forEach(folder => {
                    if (folder.title === "默认收藏夹") {
                        this.starFunc(folder.id)
                    }
                });
              });


          })
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 7,
            y: 639,
            w: 179,
            h: 79,
            text_size: 30,
            radius: 21,
            normal_color: 0x222222,
            press_color: 0x101010,
            text: "视频总结",
            click_func: (button_widget) => {
              push({
                url: "pages/videoaisummary",
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
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 7,
            y: 555,
            w: 179,
            h: 79,
            text_size: 30,
            radius: 21,
            normal_color: 0x222222,
            press_color: 0x101010,
            text: "评论区",
            click_func: (button_widget) => {
              push({
                url: "pages/videoreplies", 
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
            x: 7,
            y: 723,
            w: 179,
            h: 79,
            text_size: 30,
            radius: 21,
            normal_color: 0x222222,
            press_color: 0x101010,
            text: "发送评论",
            click_func: (button_widget) => {
              push({
                url: "pages/board", 
                params: JSON.stringify({
                  type: "sendreply",
                  id: params.id
              })
              })
            },
          });
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 7,
            y: 807,
            w: 179,
            h: 79,
            text_size: 30,
            radius: 21,
            normal_color: 0x222222,
            press_color: 0x101010,
            text: "发送弹幕",
            click_func: (button_widget) => {
              push({
                url: "pages/board", 
                params: JSON.stringify({
                  type: "senddm",
                  cid: cid,
                  id: params.id
              })
              })
            },
          });
          // hmUI.createWidget(hmUI.widget.BUTTON, {
          //   x: 60,
          //   y: 1340,
          //   w: px(360),
          //   h: px(100),
          //   text_size: px(36),
          //   radius: 30,
          //   normal_color: 0x222222,
          //   press_color: 0x101010,
          //   text: "看弹幕",
          //   click_func: (button_widget) => {
          //     push({
          //       url: "page/dm", 
          //       params: JSON.stringify({
          //         img_src: params.img_src,
          //         vid_title: params.vid_title,
          //         bv: params.bv,
          //         cid: params.cid,
          //         up_mid: params.up_mid,
          //         id: params.id
          //       })
          //     })
          //   },
          // });
          this.getCid(params.bv)

          this.getVideoList();
    },
    
    getVideoList() {
      messageBuilder.request({
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
          time.setProperty(hmUI.prop.TEXT, timestampToDateTime(res.body.data.View.pubdate))
          bv.setProperty(hmUI.prop.TEXT, 'BV' + params.bv)
          uname.setProperty(hmUI.prop.TEXT, res.body.data.View.owner.name)
        })
        .catch((res) => {

        });
    },
    getrenshu() {
      return messageBuilder.request({
        method: "SENDBILIGET",
        data: {
          DedeUserID: localStorage.getItem("DedeUserID"),
          SESSDATA: localStorage.getItem("SESSDATA"),
          bili_jct: localStorage.getItem("bili_jct"),
          DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
          buvid3: localStorage.getItem("buvid3"),
        },
        url: 'https://api.bilibili.com/x/player/online/total?bvid=' + params.bv + "&cid=" + cid,
        type: "json",
      })
        .then((result) => {
          now.setProperty(hmUI.prop.TEXT, formatNumber(result.body.data.count).toString() + ' 人在看')
        })
        .catch((error) => {

        })
    },
    getCid(bvid) { 
      messageBuilder.request({
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

          });
  }
  })