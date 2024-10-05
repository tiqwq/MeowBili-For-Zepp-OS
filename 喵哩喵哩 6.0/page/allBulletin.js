// 系统api导入
import * as hmUI from "@zos/ui";
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui'
import { BasePage } from "@zeppos/zml/base-page";
import { getTextLayout } from '@zos/ui'
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
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 154,
        y: 37,
        src: "back.png",
      }).addEventListener(hmUI.event.CLICK_UP, () => {
        

      })
      createWidget(hmUI.widget.TEXT, {
        x: 187,
        y: 25,
        w: px(245),
        h: px(88),
        text_size: 38,
        text: "全部公告",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      this.getSuggestVideoList()

    },
    getSuggestVideoList() {
      this.request({
        method: "GETBULLETIN"
      })
        .then((res) => {
          console.log(res.body);
          let suggestCount = res.body.length;
          let list = res.body;
    
          let totalHeight = 100; // 用于累计每个公告的总高度
          const spacing = 15; // 每个公告之间的间距
    
          for (let i = 0; i < suggestCount; i++) {
            // 计算标题文本的高度
            const titleLayout = getTextLayout(list[i].title, {
              text_size: 28,
              text_width: px(364),
              wrapped: 1
            });
    
            // 计算作者文本的高度
            const authorLayout = getTextLayout(list[i].author, {
              text_size: 32,
              text_width: px(360),
              wrapped: 1
            });
    
            // 计算时间文本的高度
            const timeLayout = getTextLayout(list[i].time, {
              text_size: 26,
              text_width: px(360),
              wrapped: 1
            });
    
            // 计算按钮的总高度
            const buttonHeight = 102 + titleLayout.height + authorLayout.height;
            console.log(titleLayout.height, authorLayout.height, timeLayout.height);
    
            // 创建按钮
            this.state.buttonList[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
              x: 30,
              y: totalHeight,
              w: 420,
              h: buttonHeight,
              radius: 40,
              normal_color: 0x222222,
              press_color: 0x101010,
            });
    
            // 创建作者文本
            this.state.newTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 52,
              y: totalHeight + 27,
              w: px(360),
              h: authorLayout.height,
              text_size: 32,
              text: "",
              color: 0xFFFFFF,
              text_style: hmUI.text_style.WRAP,
            });
    
            // 创建时间文本
            this.state.newNewTextList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 140,
              y: totalHeight + 35,
              w: px(290),
              h: timeLayout.height,
              text_size: 26,
              text: "",
              color: 0xdddddd,
              align_h: hmUI.align.RIGHT	,
              text_style: hmUI.text_style.WRAP,
            });
    
            // 创建标题文本
            this.state.textList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 52,
              y: totalHeight + 27 + authorLayout.height,
              w: px(364),
              h: titleLayout.height,
              text_size: 28,
              text: "",
              color: 0xffffff,
              text_style: hmUI.text_style.WRAP,
            });
    
            // 累计总高度，并添加间距
            totalHeight += buttonHeight + spacing;
          }
    
          for (let i = 0; i < suggestCount; i++) {
            this.state.textList[i].setProperty(hmUI.prop.TEXT, list[i].title);
            this.state.newTextList[i].setProperty(hmUI.prop.TEXT, list[i].author);
            this.state.newNewTextList[i].setProperty(hmUI.prop.TEXT, list[i].time);
            this.state.textList[i].setEnable(false);
          }
        })
        .catch((resu) => {
          console.log(resu);
        });
    }
  })
);