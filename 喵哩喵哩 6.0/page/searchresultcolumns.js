import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
const localStorage = new LocalStorage()
let textList = []
let newNewTextList = []
let buttonList = []
console.log(localStorage.getItem("login_info"));
function parseArticles(jsonData) {
  const articles = jsonData.data.result;
  const parsedArticles = articles.map(article => {
      let title = article.title.replace(/<[^>]+>/g, '');
      let desc = article.desc.replace(/<[^>]+>/g, '');
      return {
          title: title,
          description: desc,
          id : article.id,
          view: article.view,
          like: article.like,
          reply: article.reply
      };
  });
  return parsedArticles;
}

let params
Page(
  BasePage({ 
    onInit(param) {
      params = param;
    },
    build() {
      for(let i = 0; i < 8; i++) {
        buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 30,
          y: 180 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        })
        textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 50,
          y: 200 + i * 204,
          w: px(350),
          h: px(88),
          text_size: 28,
          text: "",
          color: 0xffffff,
          text_style: hmUI.text_style.WRAP,
        }) // title
        hmUI.createWidget(hmUI.widget.IMG,{
          x: 50,
          y: 310 + i * 204,
          src: 'watchnum.png'
        })
        newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 82,
          y: 307 + i * 204,
          w: px(360),
          h: px(40),
          text_size: 20,
          text: "",
          color: 0x9E9E9E,
          text_style: hmUI.text_style.ELLIPSIS,
        }) // viewNumber
      } 
         this.getWbi() 
    },
    getWbi() {
        this.request({
            method: "SENDWBIGET",
            data: {
              DedeUserID: localStorage.getItem("DedeUserID"),
              SESSDATA: localStorage.getItem("SESSDATA"),
              bili_jct: localStorage.getItem("bili_jct"),
              DedeUserID__ckMd5: localStorage.getItem("DedeUserID__ckMd5"),
              buvid3: localStorage.getItem("buvid3"),
            },
            url: "https://api.bilibili.com/x/web-interface/wbi/search/type",
            type: "json",
            info: localStorage.getItem('login_info'),
            paramsobj: {
              keyword: params,
              search_type: "article"
            }
          })
            .then((res) => {
              let newres = parseArticles(res.body)
              for(let i = 0; i < 8; i++) {
                textList[i].setProperty(hmUI.prop.TEXT, newres[i]['title'])
                newNewTextList[i].setProperty(hmUI.prop.TEXT, newres[i]['view'].toString())
                textList[i].setEnable(false)
                buttonList[i].setProperty(hmUI.prop.MORE, {
                  x: 30,
                  y: 180 + i * 204,
                  w: 420,
                  h: 180,
                  radius: 40,
                  normal_color: 0x222222,
                  press_color: 0x101010,
                  click_func: () => {
                    push({
                      url: 'page/columns',
                      params: newres[i]["id"]
                    })
                    console.log("id" + newres[i]["id"]);
                    
                  },
                })  
              }  

              console.log(res);
            })
            .catch((res) => {

            });
    }
    
  })
);
