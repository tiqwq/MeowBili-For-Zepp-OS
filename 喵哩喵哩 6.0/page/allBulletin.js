// 系统api导入
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { getAllBulletin } from "../func/fetch";
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
        text: "全部公告",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      this.getAllBulletin()
      let time = setInterval(() => {
        if (!res) return;
        this.createWidget(res);
        clearInterval(time)
      }, 50);
    },
    createWidget(res) {
          let suggestCount = res.body.length;
          let list = res.body;
    
          let totalHeight = 100;
          const spacing = 15;
    
          for (let i = 0; i < suggestCount; i++) {
            const titleLayout = getTextLayout(list[i].title, {
              text_size: 28,
              text_width: px(364),
              wrapped: 1
            });
    
            const authorLayout = getTextLayout(list[i].author, {
              text_size: 32,
              text_width: px(360),
              wrapped: 1
            });
    
            const timeLayout = getTextLayout(list[i].time, {
              text_size: 26,
              text_width: px(360),
              wrapped: 1
            });
    
            const buttonHeight = 102 + titleLayout.height + authorLayout.height;
            console.log(titleLayout.height, authorLayout.height, timeLayout.height);
    
            this.state.buttonList[i] = createWidget(widget.BUTTON, {
              x: 30,
              y: totalHeight,
              w: 420,
              h: buttonHeight,
              radius: 40,
              normal_color: 0x222222,
              press_color: 0x101010,
            });
    
            this.state.newTextList[i] = createWidget(widget.TEXT, {
              x: 52,
              y: totalHeight + 27,
              w: px(360),
              h: authorLayout.height,
              text_size: 32,
              text: "",
              color: 0xFFFFFF,
              text_style: text_style.WRAP,
            });
    
            this.state.newNewTextList[i] = createWidget(widget.TEXT, {
              x: 140,
              y: totalHeight + 35,
              w: px(290),
              h: timeLayout.height,
              text_size: 26,
              text: "",
              color: 0xdddddd,
              align_h: align.RIGHT	,
              text_style: text_style.WRAP,
            });
    
            this.state.textList[i] = createWidget(widget.TEXT, {
              x: 52,
              y: totalHeight + 27 + authorLayout.height,
              w: px(364),
              h: titleLayout.height,
              text_size: 28,
              text: "",
              color: 0xffffff,
              text_style: text_style.WRAP,
            });
    
            totalHeight += buttonHeight + spacing;
          }
    
          for (let i = 0; i < suggestCount; i++) {
            this.state.textList[i].setProperty(prop.TEXT, list[i].title);
            this.state.newTextList[i].setProperty(prop.TEXT, list[i].author);
            this.state.newNewTextList[i].setProperty(prop.TEXT, list[i].time);
            this.state.textList[i].setEnable(false);
          }
    },
    getAllBulletin() {
      getAllBulletin(this).then((result) => {
        res = result
      })
    }
  })
);