import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router';
import { getMessageList, getMultiUserInfoByUID } from '../func/fetch';

class GetMessageListPage {
  constructor(page) {
    this.page = page;
    this.nameList = [];
    this.textList = [];
    this.rectList = [];
  }

  build() {
    this.createMessageWidgets();
    this.createHeaderWidgets();
    this.getMessageList();
  
  }
  createMessageWidgets() {
    createWidget(widget.IMG, {
      x: 0,
      y: -190,
      src: 'yellow.png'
    });
    const viewContainerButton = createWidget(widget.VIEW_CONTAINER, {
    x: px(0),
    y: px(86),
    w: px(480),
    h: px(400),
   
  })
    for (let i = 0; i < 20; i++) {
      this.rectList[i] = viewContainerButton.createWidget(widget.BUTTON, {
        x: 40,
        y: 85 + i * 155,
        w: 392,
        h: 139,
        radius: 40,
        normal_color: 0x222222,
        press_color: 0x101010
      });
      
      this.nameList[i] =viewContainerButton. createWidget(widget.TEXT, {
        x: 164,
        y: 109 + i * 155,
        w: 229,
        h: 31,
        text: "",
        color: 0xffffff,
        text_size: 22,
      });
      this.textList[i] = viewContainerButton.createWidget(widget.TEXT, {
        x: 164,
        y: 145 + i * 155,
        w: 229,
        h: 67,
        text: "",
        text_style: text_style.WRAP,
        color: 0x9e9e9e,
        text_size: 18,
      });
    }
  }

  createHeaderWidgets() {
    createWidget(widget.IMG, {
      x: 150,
      y: 50,
      src: "back.png",
    });
    createWidget(widget.TEXT, {
      x: 180,
      y: 40,
      w: px(245),
      h: px(88),
      text_size: 32,
      text: "私信列表",
      color: 0xffffff,
      text_style: text_style.WRAP,
    });
  }

  getMessageList() {
    getMessageList(this.page).then((res) => {
      let sessions = res.body.data.session_list;
      let session_uids = [];
      sessions.forEach((session) => {
        if (session.talker_id) {
          session_uids.push(session.talker_id);
        } else {
          sessions = sessions.filter(item => item !== session);
        }
      });
      for (let i = 0; i < sessions.length; i++) {
        this.textList[i].setProperty(prop.TEXT, JSON.parse(sessions[i].last_msg.content).content || "暂无消息");
        this.textList[i].setEnable(false);
        this.rectList[i].setProperty(prop.MORE, {
          x: 40,
          y: 85 + i * 155,
          w: 392,
          h: 139,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
          click_func: () => {
            push({
              url: "page/message",
              params: JSON.stringify({
                id: {
                  sender_uid: sessions[i].last_msg.sender_uid,
                  receiver_id: sessions[i].last_msg.receiver_id
                },
                type: "page"
              })
            });
          },
        });
      }
      this.getMultiUserInfoByUID(session_uids);
    });
  }

  getMultiUserInfoByUID(uids) {
    getMultiUserInfoByUID(this.page, uids).then((res) => {
      for (let i = 0; i < 20; i++) {
        console.log(res.body.data[uids[i]].name);
        this.nameList[i].setProperty(prop.TEXT, res.body.data[uids[i]].name);
        this.nameList[i].setEnable(false);
      }
    });
  }
}

Page(
  BasePage({
    build() {
      const messagePage = new GetMessageListPage(this);
      messagePage.build();
    }
  })
);