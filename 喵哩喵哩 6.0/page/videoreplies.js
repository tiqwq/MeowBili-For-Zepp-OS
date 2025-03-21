import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { getReplyList } from "../func/fetch";

class ReplyListPage {
  constructor(page) {
    this.page = page;
    this.params = null;
    this.textList = [];
    this.newTextList = [];
    this.newNewTextList = [];
    this.buttonList = [];
    this.pn = 1;
    this.res = null;
  }


  
  onInit(param) {
    this.params = JSON.parse(param);
    console.log(param);
  }

  build() {
    this.createButtons();
    this.getReplyList();
    let time = setInterval(() => {
      if (!this.res) return;
      this.createWidget(this.res);
      clearInterval(time)
    }, 50);
  }

  createButtons() {
    createWidget(widget.BUTTON, {
      x: 35,
      y: 10,
      w: 185,
      h: 58,
      text_size: px(36),
      radius: px(12),
      normal_color: 0x222222,
      press_color: 0x101010,
      text: "上一页",
      click_func: () => {
        this.res = null;
        let time = setInterval(() => {
          if (!this.res) return;
          this.createWidget(this.res);
          clearInterval(time)
        }, 50);
        this.pn--;
        this.getReplyList();
      },
    });

    createWidget(widget.BUTTON, {
      x: 253,
      y: 10,
      w: 185,
      h: 58,
      text_size: px(36),
      radius: px(12),
      normal_color: 0x222222,
      press_color: 0x101010,
      text: "下一页",
      click_func: () => {
        this.res = null;
        let time = setInterval(() => {
          if (!this.res) return;
          this.createWidget(this.res);
          clearInterval(time)
        }, 50);
        this.pn++;
        this.getReplyList();
      },
    });
  }

  createWidget(res) {
    let yOffset = 90;

    for (let i = 0; i < 1; i++) {
      const uname = res.body.data.replies[i].member.uname;
      const message = res.body.data.replies[i].content.message;
      const time_desc = res.body.data.replies[i].reply_control.time_desc;

      const unameLayout = getTextLayout(uname, {
        text_size: 16,
        text_width: px(360)
      });
      const messageLayout = getTextLayout(message, {
        text_size: 20,
        text_width: px(400),
        wrapped: 1
      });
      const timeDescLayout = getTextLayout(time_desc, {
        text_size: 16,
        text_width: px(400)
      });

      const totalHeight = unameLayout.height + messageLayout.height + timeDescLayout.height + 40;

      if (!this.buttonList[i]) {
        this.buttonList[i] = createWidget(widget.BUTTON, {
          x: 30,
          y: yOffset - 20,
          w: 420,
          h: totalHeight,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
        });
      } else {
        this.buttonList[i].setProperty(prop.Y, yOffset - 20);
        this.buttonList[i].setProperty(prop.H, totalHeight);
      }

      if (!this.textList[i]) {
        this.textList[i] = createWidget(widget.TEXT, {
          x: (480 - px(360)) / 2,
          y: yOffset,
          w: px(360),
          h: unameLayout.height,
          text_size: 16,
          text: uname,
          color: 0xffffff,
          text_style: text_style.ELLIPSIS,
        });
      } else {
        this.textList[i].setProperty(prop.Y, yOffset);
        this.textList[i].setProperty(prop.H, unameLayout.height);
        this.textList[i].setProperty(prop.TEXT, uname);
      }

      const newTextYOffset = yOffset + unameLayout.height + 10;

      if (!this.newTextList[i]) {
        this.newTextList[i] = createWidget(widget.TEXT, {
          x: (480 - px(360)) / 2,
          y: newTextYOffset,
          w: px(360),
          h: messageLayout.height,
          text_size: 20,
          text: message,
          color: 0xffffff,
          text_style: text_style.WRAP
        });
      } else {
        this.newTextList[i].setProperty(prop.Y, newTextYOffset);
        this.newTextList[i].setProperty(prop.H, messageLayout.height);
        this.newTextList[i].setProperty(prop.TEXT, message);
      }

      const newNewTextYOffset = newTextYOffset + messageLayout.height + 10;

      if (!this.newNewTextList[i]) {
        this.newNewTextList[i] = createWidget(widget.TEXT, {
          x: (480 - px(360)) / 2 + 200,
          y: yOffset,
          w: px(400),
          h: timeDescLayout.height,
          text_size: 16,
          text: time_desc,
          color: 0xffffff,
          text_style: text_style.ELLIPSIS,
        });
      } else {
        this.newNewTextList[i].setProperty(prop.Y, yOffset);
        this.newNewTextList[i].setProperty(prop.H, timeDescLayout.height);
        this.newNewTextList[i].setProperty(prop.TEXT, time_desc);
      }

      yOffset = newNewTextYOffset + timeDescLayout.height + 22;
    }
  }

  getReplyList() {
    getReplyList(this.page, this.params.bv, this.pn).then((res) => {
      this.res = res;
    })
  }
}

Page(
  BasePage({
    onInit(param) {
      const replyListPage = new ReplyListPage(this);
      replyListPage.onInit(param);
      replyListPage.build();
    }
  })
);