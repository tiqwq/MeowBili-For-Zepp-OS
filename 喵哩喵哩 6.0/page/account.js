import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage';
import { push, back} from '@zos/router';
import { getUpAccount, getCoin } from "../func/fetch";
const localStorage = new LocalStorage();
class AccountPage {
  constructor(page) {
    this.page = page;
    this.widgets = {};
  }

  build() {
    this.createWidgets();
    this.getAccountData();
    this.getCoinData();
  }

  createWidgets() {
    this.widgets.backButton = createWidget(widget.IMG, {
      x: 230,
      y: 30,
      src: "back.png",
    });

    this.widgets.icon = createWidget(widget.IMG, {
      x: 190,
      y: 130,
      w: 90,
      h: 90,
      auto_scale: true,
      src: 'icon.png',
    });

    this.widgets.uname = createWidget(widget.TEXT, {
      x: 100,
      y: 60,
      w: 270,
      h: 100,
      text_size: 32,
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: ""
    });

    this.widgets.uid = createWidget(widget.TEXT, {
      x: 100,
      y: 100,
      w: 270,
      h: 192,
      align_h: align.CENTER_H,
      text: ""
    });

    this.widgets.sign = createWidget(widget.TEXT, {
      x: 60,
      y: 230,
      w: 360,
      h: 130,
      text_size: 25,
      align_h: align.CENTER_H,
      text_style: text_style.WRAP,
      color: 0xffffff,
      text: ""
    });

    this.widgets.level = createWidget(widget.TEXT, {
      x: 80,
      y: 320,
      w: 192,
      h: 192,
      text_size: 28,
      text: ""
    });

    this.widgets.coin = createWidget(widget.TEXT, {
      x: 240,
      y: 320,
      w: 192,
      h: 192,
      text_size: 28,
      text: ""
    });

    this.widgets.fans = createWidget(widget.TEXT, {
      x: 80,
      y: 350,
      w: 192,
      h: 192,
      text_size: 28,
      text: ""
    });

    this.widgets.friend = createWidget(widget.TEXT, {
      x: 240,
      y: 350,
      w: 192,
      h: 192,
      text_size: 28,
      text: ""
    });

    this.createButtons();
    this.widgets.backButton.addEventListener(event.CLICK_DOWN, () => {
      back()
    })
  }

  createButtons() {
    const buttonConfig = [
      { text: "我的消息", url: 'page/messageList' },
      { text: "历史记录", url: 'page/history' },
      { text: "稍后再看", url: 'page/laterSee' },
      { text: "收藏夹", url: 'page/starFolder' },
      { text: "设置", url: 'page/setting' }
    ];

    buttonConfig.forEach((config, index) => {
      createWidget(widget.BUTTON, {
        x: 60,
        y: 400 + index * 107,
        w: px(360),
        h: px(100),
        text_size: px(36),
        radius: 50,
        normal_color: 0x222222,
        press_color: 0x101010,
        text: config.text,
        click_func: () => {
          push({ url: config.url });
        },
      });
    });
  }

  getAccountData() {
    getUpAccount(this.page,localStorage.getItem('DedeUserID')).then(res => {
      this.widgets.uname.setProperty(prop.TEXT, res.body.data.card.name);
      this.widgets.uid.setProperty(prop.TEXT, "uid ： " + res.body.data.card.mid);
      this.widgets.sign.setProperty(prop.TEXT, "签名 ： " + res.body.data.card.sign);
      this.widgets.fans.setProperty(prop.TEXT, "粉丝 ： " + res.body.data.card.fans.toString());
      this.widgets.friend.setProperty(prop.TEXT, "关注 ： " + res.body.data.card.friend.toString());
      this.widgets.level.setProperty(prop.TEXT, "等级 ： " + res.body.data.card.level_info.current_level.toString());
    });
  }

  getCoinData() {
    getCoin(this.page).then(res => {
      this.widgets.coin.setProperty(prop.TEXT, "硬币 ： " + res.body.data.money.toString());
    });
  }
}

Page(
  BasePage({
    build() {
      const accountPage = new AccountPage(this);
      accountPage.build();
    }
  })
);