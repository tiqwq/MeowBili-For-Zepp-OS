import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push, back } from '@zos/router';
import { LocalStorage } from '@zos/storage';
import { getMessages } from "../func/fetch";

const localStorage = new LocalStorage();

function parseJsonContent(jsonStr) {
  try {
    const parsed = JSON.parse(jsonStr);
    return parsed.content;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

function reverseMessages(data) {
  if (data && data.messages) {
    data.messages.reverse();
  }
  return data;
}

class MessagePage {
  constructor(page) {
    this.page = page;
    this.params = null;
    this.talk_id = null;
    this.res = null;
    this.yOffset = 100; // 初始Y偏移量
  }

  onInit(param) {
    this.params = JSON.parse(param);
    console.log(this.params.id.sender_uid);
    console.log(this.params.id.receiver_id);

    // 判定发送者是哪一方
    if (this.params.id.receiver_id == localStorage.getItem("DedeUserID")) {
      this.talk_id = this.params.id.sender_uid;
    } else {
      this.talk_id = this.params.id.receiver_id;
    }
  }

  build() {
    function createMessages(resu) {
      for (let i = 0; i < resu.messages.length; i++) {
        
        const messageText = parseJsonContent(resu.messages[i].content);
        const textLayout = getTextLayout(messageText, {
          text_size: 20,
          text_width: 400,
          wrapped: 1
        });

        const xPosition = resu.messages[i].sender_uid == localStorage.getItem("DedeUserID") ? 480 - textLayout.width - 20 : 50;
        const align1 = resu.messages[i].sender_uid == localStorage.getItem("DedeUserID") ? align.RIGHT : align.LEFT;
        
      createWidget(widget.FILL_RECT, {
          x: xPosition - 10,
          y: this.yOffset,
          w: textLayout.width + 20, 
          h: textLayout.height + 20, 
          color: 0x222222,
          radius: 20
        });

         createWidget(widget.TEXT, {
          x: xPosition,
          y: this.yOffset + 10,
          w: textLayout.width,
          h: textLayout.height,
          text: messageText,
          color: 0xffffff,
          text_size: 20,
          align_h: align1,
          text_style: text_style.WRAP
        });

        this.yOffset += textLayout.height + 30;
      }
    }

    getMessages(this.page, this.talk_id).then((result) => {
      this.res = reverseMessages(result.body.data);
    });

    let time = setInterval(() => {
      if (this.res == null) return;
      console.log(111);
      createMessages.call(this, this.res);
      clearInterval(time);
    }, 50);

    createWidget(widget.IMG, {
      x: 150,
      y: 50,
      src: "back.png",
    }).addEventListener(event.CLICK_UP, () => {
      back();
    });

    createWidget(widget.TEXT, {
      x: 180,
      y: 40,
      w: px(245),
      h: px(88),
      text_size: 32,
      text: "私信发送",
      color: 0xffffff,
      text_style: text_style.WRAP,
    }).addEventListener(event.CLICK_UP, () => {
      push({
        url: "page/board",
        params: JSON.stringify({
          type: "sendmsg",
          sender_uid: this.params.id.sender_uid,
          receiver_id: this.params.id.receiver_id
        })
      });
    });
  }
}

Page(
  BasePage({
    onInit(param) {
      const messagePage = new MessagePage(this);
      messagePage.onInit(param);
      messagePage.build();
    }
  })
);