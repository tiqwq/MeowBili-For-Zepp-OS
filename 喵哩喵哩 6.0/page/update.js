import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { updateCheck } from '../func/fetch';
import { back } from '@zos/router';
const app = getApp();
const nowVersion = app._options.globalData.version;
console.log(nowVersion);

class UpdatePage {
  constructor(page) {
    this.page = page;
    this.state = {
      updateWidget: "",
      versionWidget: "",
      contentTextWidget: "",
      contentWidget: "",
      tipWidget: "",
      currentVersionWidget: "",
      currentVersionNumberWidget: "",
      currentVersionicon: "",
      IncWidget: ""
    };
  }

  build() {
    this.createWidgets();
    this.updateCheck();
  }

  createWidgets() {
    createWidget(widget.IMG, {
      x: 150,
      y: 50,
      src: "back.png",
    }).addEventListener(event.CLICK_UP, () => {
      back()
    });

    createWidget(widget.TEXT, {
      x: 180,
      y: 40,
      w: px(245),
      h: px(88),
      text_size: 32,
      text: "软件更新",
      color: 0xffffff,
      text_style: text_style.WRAP,
    });

    this.state.updateWidget = createWidget(widget.TEXT, {
      x: 130,
      y: 210,
      w: 329,
      h: 100,
      text_size: 36,
      text: "正在检查更新...",
      color: 0x9e9e9e,
      text_style: text_style.WRAP,
    });

    this.state.versionWidget = createWidget(widget.TEXT, {
      x: 220,
      y: 127,
      w: 268,
      h: 63,
      text_size: 42,
      text: "",
      color: 0xe1e1e0,
      text_style: text_style.WRAP,
    });

    this.state.currentVersionicon = createWidget(widget.IMG, {
      x: 80,
      y: 120,
      src: '',
    });

    this.state.IncWidget = createWidget(widget.TEXT, {
      x: 220,
      y: 185,
      w: 268,
      h: 63,
      text_size: 22,
      text: "",
      color: 0xe1e1e0,
      text_style: text_style.WRAP,
    });

    this.state.currentVersionWidget = createWidget(widget.TEXT, {
      x: 75,
      y: 179,
      w: 268,
      h: 63,
      text_size: 36,
      text: "",
      color: 0xffffff,
      text_style: text_style.WRAP,
    });

    this.state.currentVersionNumberWidget = createWidget(widget.TEXT, {
      x: 75,
      y: 226,
      w: 268,
      h: 63,
      text_size: 36,
      text: "",
      color: 0xDDDDDD,
      text_style: text_style.WRAP,
    });

    this.state.contentTextWidget = createWidget(widget.TEXT, {
      x: 160,
      y: 260,
      w: 268,
      h: 63,
      text_size: 36,
      text: "",
      color: 0xffffff,
      text_style: text_style.WRAP,
    });

    this.state.contentWidget = createWidget(widget.TEXT, {
      x: 60,
      y: 330,
      w: 364,
      h: 228,
      text_size: 30,
      text: "",
      color: 0xDDDDDD,
      text_style: text_style.WRAP,
    });

    this.state.tipWidget = createWidget(widget.TEXT, {
      x: 75,
      y: 407,
      w: 364,
      text_size: 26,
      text: "",
      color: 0xffffff,
      text_style: text_style.WRAP,
    });
  }

  updateCheck() {
    updateCheck(this.page).then((result) => {
      if (result.version !== nowVersion) {
        this.state.currentVersionicon.setProperty(prop.MORE, { src: 'start.png' });
        this.state.updateWidget.setProperty(prop.MORE, { color: '0xffffff' });
        this.state.updateWidget.setProperty(prop.TEXT, '');
        this.state.IncWidget.setProperty(prop.TEXT, 'Bydour Inc.');
        this.state.versionWidget.setProperty(prop.TEXT, result.version);
        this.state.contentTextWidget.setProperty(prop.TEXT, "更新内容");
        this.state.contentWidget.setProperty(prop.TEXT, result.announcement);

        const { height } = getTextLayout(result.announcement, {
          text_size: 30,
          text_width: 228
        });

        this.state.tipWidget.setProperty(prop.Y, 300 + height);
        this.state.tipWidget.setProperty(prop.TEXT, '请前往zeppMeowbili官方QQ\n群下载并安装');
      } else {
        this.state.updateWidget.setProperty(prop.MORE, { color: '0xffffff' });
        this.state.updateWidget.setProperty(prop.TEXT, '当前已是最新版本');
        this.state.currentVersionWidget.setProperty(prop.TEXT, '当前设备版本');
        this.state.currentVersionNumberWidget.setProperty(prop.TEXT, nowVersion);
        this.state.currentVersionWidget.setProperty(prop.Y, 130);
        this.state.currentVersionNumberWidget.setProperty(prop.Y, 177);
      }
    });
  }
}

Page(
  BasePage({
    onInit() {
      const updatePage = new UpdatePage(this);
      updatePage.build();
    }
  })
);