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
    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'yellow.png'
    });
    const viewuser = createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(55), 
      w: px(480),
      h: px(430)
    });
    viewuser.createWidget(widget.TEXT, {
      x: 50,
      y: 20, 
      w: 400,
      h: 100,
      text_size: 60,
      text: "我的",
      color: 0xff93c4,
      align_h: align.LEFT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
    });

    const text = createWidget(widget.TEXT, {
      x: px(196),
      y: px(10), 
      w: 88,
      h: 46,
      color: 0xffffff,
      text_size: 24,
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
      src: 'icon.png',
    });

    this.widgets.uname =  viewuser.createWidget(widget.TEXT, {
      x: 100,
      y: 240, 
      w: 270,
      h: 100,
      text_size: 35,
      align_h: align.CENTER_H,
      color: 0xffffff,
      text: ""
    });

  this.widgets.uid =  viewuser.createWidget(widget.TEXT, {
      /* x: 100,
      y: 210,
      w: 270,
      h: 192, */
      align_h: align.CENTER_H,
      text: ""
    }); 

    this.widgets.sign =  viewuser.createWidget(widget.TEXT, {
      x: 60,
      y: 340, 
      w: 360,
      h: 130,
      text_size: 25,
      align_h: align.CENTER_H,
      text_style: text_style.WRAP,
      color: 0xffffff,
      text: ""
    });

     this.widgets.level =  viewuser.createWidget(widget.TEXT, {
      x: 200,
      y: 280, 
      w: 80,
      h: 192,
      text_size: 30,
      color: 0xffffff,

      text: ""
    });  
    

     this.widgets.coin =  viewuser.createWidget(widget.TEXT, {
      x: 220,
      y: 440, 
      w: 192,
      h: 192,
      text_size: 33,
      align_h: align.CENTER_H,

      color: 0xffffff,

      text: ""
    }); 

    this.widgets.fans =  viewuser.createWidget(widget.TEXT, {
      x: 60,
      y: 440, 
      w: 192,
      h: 192,
      text_size: 33,
      align_h: align.CENTER_H,

      color: 0xffffff,

      text: ""
    });

    this.widgets.friend =  viewuser.createWidget(widget.TEXT, {
      x: 60,
      y: 540, 
      w: 192,
      h: 192,
      text_size: 33,
      align_h: align.CENTER_H,

      color: 0xffffff,

      text: ""
    });

   /*  const buttonConfig = [
      { text: "我的关注", url: 'page/messageList' },
      { text: "历史记录", url: 'page/history' },
      { text: "稍后再看", url: 'page/laterSee' },
      { text: "收藏夹", url: 'page/starFolder' }
    ];

    buttonConfig.forEach((config, index) => {
      viewuser.createWidget(widget.BUTTON, {
        x: 60,
        y: 320 + index * 107, 
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
    }); */
  /*   this.widgets.level =  viewuser.createWidget(widget.IMG, {
      x: 100,
      y: 260, 
      src: 'default_level.png', // Ensure this file exists in your project
    })   */
  }

  
  getAccountData() {
    getUpAccount(this.page,localStorage.getItem('DedeUserID')).then(res => {
      this.widgets.uname.setProperty(prop.TEXT, res.body.data.card.name);
      //this.widgets.uid.setProperty(prop.TEXT, "uid ： " + res.body.data.card.mid);
      this.widgets.sign.setProperty(prop.TEXT, "" + res.body.data.card.sign);
      this.widgets.fans.setProperty(prop.TEXT, "粉丝\n" + res.body.data.card.fans.toString());
      this.widgets.friend.setProperty(prop.TEXT, "关注\n" + res.body.data.card.friend.toString());
      this.widgets.level.setProperty(prop.TEXT,  "L V "+ res.body.data.card.level_info.current_level.toString() );
      //this.widgets.level.setProperty(prop.SRC, `lv/${res.body.data.card.level_info.current_level}.png`); 
    });
  }


  getCoinData() {
    getCoin(this.page).then(res => {
      this.widgets.coin.setProperty(prop.TEXT, "硬币\n" + res.body.data.money.toString());
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