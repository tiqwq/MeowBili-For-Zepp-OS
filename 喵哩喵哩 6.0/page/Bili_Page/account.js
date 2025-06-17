import { createWidget, widget, align, prop, text_style, event, getTextLayout} from '@zos/ui';
import { getText } from '@zos/i18n';
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage';
import { push, back } from '@zos/router';
import { px } from "@zos/utils";

import { getUpAccount, getCoin } from "../../func/fetch";
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
    createWidget(widget.IMG, {
      x: px(0),
      y: px(0),
      src: 'pink.png'
    });
    const viewuser = createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(55),
      w: px(480),
      h: px(430)
    });
    viewuser.createWidget(widget.TEXT, {
      x: px(63),
      y: px(25),
      w: px(400),
      h: px(100),
      text_size: px(60),
      text: getText('my'),
      color: 0xff93c4,
      align_h: align.LEFT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
    });

    const text = createWidget(widget.TEXT, {
      x: px(196),
      y: px(10),
      w: px(88),
      h: px(46),
      color: 0xffffff,
      text_size: px(24),
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.NONE,
      text: '',
    });

    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      text.setProperty(prop.TEXT, timeString);
    }

    setInterval(updateTime, 1000);
    updateTime();

    viewuser.createWidget(widget.IMG, {
      x: px(190),
      y: px(120),
      w: px(100),
      h: 100,
      auto_scale: true,
      src: 'head.png',
    });

    this.widgets.uname = viewuser.createWidget(widget.TEXT, {
      x: px(100),
      y: px(230),
      w: px(270),
      h: px(100),
      text_size: px(35),
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: getText('loading')
    });

    this.widgets.sign = viewuser.createWidget(widget.TEXT, {
      x: px(60),
      y: px(340),
      w: px(360),
      h: px(130),
      text_size: px(25),
      align_h: align.CENTER_H,
      text_style: text_style.WRAP,
      color: 0xffffff,
      text: getText('loading_sign')
    });

    viewuser.createWidget(widget.TEXT, {
      x: px(220),
      y: px(430),
      w: px(192),
      h: px(192),
      text_size: px(33),
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: getText('coins')
    });

    this.widgets.coin = viewuser.createWidget(widget.TEXT, {
      x: px(220),
      y: px(480),
      w: px(192),
      h: px(192),
      text_size: px(33),
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: getText('loading')
    });

    viewuser.createWidget(widget.TEXT, {
      x: px(60),
      y: px(430),
      w: px(192),
      h: px(192),
      text_size: px(33),
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: getText('fans')
    });

    this.widgets.fans = viewuser.createWidget(widget.TEXT, {
      x: px(60),
      y: px(480),
      w: px(192),
      h: px(192),
      text_size: px(33),
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: getText('loading')
    });

    viewuser.createWidget(widget.TEXT, {
      x: px(60),
      y: px(540),
      w: px(192),
      h: px(192),
      text_size: px(33),
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: getText('friends')
    });

    this.widgets.friend = viewuser.createWidget(widget.TEXT, {
      x: px(60),
      y: px(590),
      w: px(192),
      h: px(192),
      text_size: px(33),
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: getText('loading')
    });

    this.widgets.levelpic = viewuser.createWidget(widget.IMG, {
      x: px(195),
      y: px(290),  
     
      src: '',
    });
  }

  getAccountData() {
    getUpAccount(this.page, localStorage.getItem('DedeUserID')).then(res => {
      this.widgets.uname.setProperty(prop.TEXT, res.body.data.card.name);
      //this.widgets.uid.setProperty(prop.TEXT, "uid ： " + res.body.data.card.mid);
      this.widgets.sign.setProperty(prop.TEXT,  res.body.data.card.sign);
      this.widgets.fans.setProperty(prop.TEXT, res.body.data.card.fans.toString());
      this.widgets.friend.setProperty(prop.TEXT,  res.body.data.card.friend.toString());
      //this.widgets.level.setProperty(prop.TEXT, "Lv " + res.body.data.card.level_info.current_level.toString());
      this.widgets.levelpic.setProperty(prop.MORE, { src: `bililevel/${res.body.data.card.level_info.current_level}.png`, })
      //this.widgets.levelpic.setProperty(prop.SRC, `lv/${res.body.data.card.level_info.current_level}.png`); 
    });
  }

  getCoinData() {
    getCoin(this.page).then(res => {
      this.widgets.coin.setProperty(prop.TEXT, res.body.data.money.toString());
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