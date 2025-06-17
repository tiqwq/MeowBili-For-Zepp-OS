// 系统api导入
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { getText } from '@zos/i18n';
import { BasePage } from "@zeppos/zml/base-page";
import { getSuggestVideoList } from '../../func/fetch';
import { log, px } from "@zos/utils";
import { push } from '@zos/router'
let res = null;

Page(
  BasePage({
    state: {
      textList: [],
      newTextList: [],
      newNewTextList: [],
      buttonList: [],
      suggest: [],
      suggestCount: 0,
    },
    build() {

      createWidget(widget.PAGE_SCROLLBAR)
      createWidget(widget.IMG, {
        x: 154,
        y: 37,
        src: "back.png",
      }).addEventListener(event.CLICK_UP, () => {
        

      })
      createWidget(widget.TEXT, {
        x: 187,
        y: 25,
        w: px(245),
        h: px(88),
        text_size: 38,
        text: getText('video_recommendations'),
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      createWidget(widget.FILL_RECT, {
        x: 129,
        y: 78,
        w: 230,
        h: 50,
        radius: 20,
        color: 0xfc6950
      })
  
      createWidget(widget.IMG, {
        x: 140,
        y: 83,
        src: 'earth.png',
        
      })
      createWidget(widget.TEXT, {
        x: 195,
        y: 77,
        w: px(245),
        h: px(88),
        text_size: 18,
        text: getText('ad_space'),
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      this.getSuggestVideoList()
      let time = setInterval(() => {
        if (!res) return;
        this.createWidget(res);
        clearInterval(time)
      }, 50);
    },
    createWidget(res) {
      console.log(res.body[0]['title']);
            this.state.suggestCount = res.body.length;
            this.state.suggest = res.body
            let list = this.state.suggest
            for (let i = 0; i < this.state.suggestCount; i++) {
              this.state.buttonList[i] = createWidget(widget.BUTTON, {
                x: 30,
                y: 191 + i * 246,
                w: 420,
                h: 180,
                radius: 40,
                normal_color: 0x222222,
                press_color: 0x101010,
              })
              this.state.textList[i] = createWidget(widget.TEXT, {
                x: 50,
                y: 211 + i * 246,
                w: px(350),
                h: px(84),
                text_size: 28,
                text: getText('loading'),
                color: 0xffffff,
                text_style: text_style.WRAP,
              })  // 标题
              this.state.newTextList[i] = createWidget(widget.TEXT, {
                x: 191,
                y: 318 + i * 246,
                w: px(360),
                h: px(40),
                text_size: 22,
                text: "",
                color: 0x9E9E9E,
                text_style: text_style.WRAP,
              })// up名字
              createWidget(widget.IMG, {
                x: 165,
                y: 323 + i * 246,
                src: 'up.png'
              })
            }
            for (let i = 0; i < this.state.suggestCount; i++) {
              if (list[i].reference != undefined) {
                createWidget(widget.TEXT, {
                  x: 54,
                  y: 133 + i * 246,
                  w: 318,
                  h: 50,
                  text_size: 28,
                  text: `${list[i].reference} ${getText('recommend_by')}`,
                  color: 0xffffff,
                  text_style: text_style.WRAP,
                })
              }
              this.state.textList[i].setProperty(prop.TEXT, list[i].title);
              this.state.newTextList[i].setProperty(prop.TEXT, list[i].author);
              this.state.textList[i].setEnable(false)
              this.state.buttonList[i].setProperty(prop.MORE, {
                x: 30,
                y: 191 + i * 246,
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
                      uname: list[i].author,
                      up_mid: list[i].up_mid,
                      id: list[i].aid
                    })
                  })
                },
              })
            }
    },
      getSuggestVideoList() {
        getSuggestVideoList(this).then((result) => {
          res = result
        })
      }
  })
);