import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router';
import { starVideo, likeVideo, coinVideo, getAllFolder, getVideoDetail, getUpAccount, getCid, getPlayerNum } from "../func/fetch";
import { timestampToDateTime, extractTextFromHTML, formatNumber } from "../utils/utils";
import { showToast } from '@zos/interaction';

class VideoDetailPage {
  constructor(page) {
    this.page = page;
    this.params = null;
    this.cid = null;
    this.aid = null;
    this.widgets = {};
  }

  onInit(param) {
    this.params = JSON.parse(param);
    console.log(param);
  }

  starFunc(folderId) {
    starVideo(this.page, folderId, this.params.id).then((res) => {
      if (res.body.code == 0) {
        showToast({
          content: "收藏成功"
        });
      } else {
        showToast({
          content: "收藏失败，错误码：" + res.body.code
        });
      }
    });
  }

  build() {
    this.createWidgets();
    this.createButtons();
    this.getVideoDetail();
  }

  createWidgets() {
    createWidget(widget.FILL_RECT, {
      x: 30,
      y: 463,
      w: 420,
      h: 127,
      radius: 40,
      color: 0x222222
    });

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
      text: "视频详情",
      color: 0xffffff,
      text_style: text_style.WRAP,
    });

    createWidget(widget.IMG, {
      x: 80,
      y: 100,
      src: "spfm.png",
    });

    createWidget(widget.TEXT, {
      x: 20,
      y: 370,
      w: 430,
      h: px(88),
      text_size: 30,
      text: extractTextFromHTML(this.params.vid_title),
      color: 0xffffff,
      align_h: align.CENTER_H,
      text_style: text_style.WRAP,
    });

    this.widgets.fensi = createWidget(widget.TEXT, {
      x: 145,
      y: 533,
      w: 294,
      h: px(40),
      text_size: 22,
      text: '未知',
      color: 0xffffff,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.zan = createWidget(widget.TEXT, {
      x: 32,
      y: 735,
      w: 294,
      h: px(40),
      text_size: 22,
      text: '未知',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.now = createWidget(widget.TEXT, {
      x: 32,
      y: 763,
      w: 294,
      h: px(40),
      text_size: 22,
      text: '未知',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.view = createWidget(widget.TEXT, {
      x: 32,
      y: 792,
      w: 294,
      h: px(40),
      text_size: 22,
      text: '未知',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.time = createWidget(widget.TEXT, {
      x: 32,
      y: 818,
      w: 294,
      h: px(40),
      text_size: 22,
      text: '发布于 ',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.bv = createWidget(widget.TEXT, {
      x: 32,
      y: 844,
      w: 294,
      h: px(40),
      text_size: 22,
      text: 'BV',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.uname = createWidget(widget.TEXT, {
      x: 145,
      y: 487,
      w: 294,
      h: px(40),
      text_size: 20,
      text: "未知",
      color: 0xffffff,
      text_style: text_style.ELLIPSIS,
    });
  }

  createButtons() {
    createWidget(widget.IMG, {
      x: 46,
      y: 628,
      src: "zan.png",
    }).addEventListener(event.CLICK_UP, () => {
      likeVideo(this.page, this.params.bv).then((res) => {
        if (res.body.code == 0) {
          showToast({
            content: "点赞成功"
          });
        } else {
          showToast({
            content: "点赞失败，报错信息：" + res.body.message
          });
        }
      });
    });

    createWidget(widget.IMG, {
      x: 191,
      y: 628,
      src: "bi.png",
    }).addEventListener(event.CLICK_UP, () => {
      coinVideo(this.page, this.params.bv).then((res) => {
        if (res.body.code == 0) {
          showToast({
            content: "投币成功"
          });
        } else {
          showToast({
            content: "投币失败，报错信息：" + res.body.message
          });
        }
      });
    });

    createWidget(widget.IMG, {
      x: 341,
      y: 628,
      src: "star.png",
    }).addEventListener(event.CLICK_UP, () => {
      getAllFolder(this.page).then((res) => {
        res.body.data.list.forEach(folder => {
          if (folder.title === "默认收藏夹") {
            this.starFunc(folder.id);
          }
        });
      });
    });
    
    createWidget(widget.BUTTON, {
      x: 60,
      y: 1010,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: "Ai视频总结",
      click_func: () => {
        push({
          url: "page/videoaisummary",
          params: JSON.stringify({
            img_src: this.params.img_src,
            vid_title: this.params.vid_title,
            bv: this.params.bv,
            cid: this.cid,
            up_mid: this.params.up_mid,
            id: this.params.id
          })
        });
      },
    });
    
    createWidget(widget.BUTTON, {
      x: 60,
      y: 900,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: "评论区",
      click_func: () => {
        push({
          url: "page/videoreplies",
          params: JSON.stringify({
            img_src: this.params.img_src,
            vid_title: this.params.vid_title,
            bv: this.params.bv,
            cid: this.params.cid,
            up_mid: this.params.up_mid,
            id: this.aid
          })
        });
      },
    });

    createWidget(widget.BUTTON, {
      x: 60,
      y: 1120,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: "发评论",
      click_func: () => {
        push({
          url: "page/board",
          params: JSON.stringify({
            type: "sendreply",
            id: this.params.id
          })
        });
      },
    });

    createWidget(widget.BUTTON, {
      x: 60,
      y: 1230,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: "发弹幕",
      click_func: () => {
        push({
          url: "page/board",
          params: JSON.stringify({
            type: "senddm",
            cid: this.cid,
            id: this.params.id
          })
        });
      },
    });
  }

  getVideoDetail() {
    getVideoDetail(this.page, this.params.bv).then((res) => {
      this.widgets.zan.setProperty(prop.TEXT, formatNumber(res.body.data.stat.like, 'text').toString() + '点赞');
      this.widgets.view.setProperty(prop.TEXT, formatNumber(res.body.data.stat.view, 'text').toString() + '播放');
      this.widgets.time.setProperty(prop.TEXT, '发布于 ' + timestampToDateTime(res.body.data.pubdate));
      this.widgets.uname.setProperty(prop.TEXT, res.body.data.owner.name);
      this.aid = res.body.data.aid;
      if (this.params.id == "undefined") {
        this.params.id = res.body.data.aid;
      }
    }).catch((err) => {
      console.log(err);
    });

    getUpAccount(this.page, this.params.up_mid).then((res) => {
      this.widgets.fensi.setProperty(prop.TEXT, formatNumber(res.body.data.card.fans, 'text').toString() + '粉丝');
      this.widgets.bv.setProperty(prop.TEXT, this.params.bv);
    });

    this.getCid(this.params.bv);
  }

  getCid(bvid) {
    getCid(this.page, bvid).then((res) => {
      this.cid = res.body.data[0].cid;
      getPlayerNum(this.page, bvid, this.cid).then((res) => {
        this.widgets.now.setProperty(prop.TEXT, formatNumber(res.body.data.count, 'text').toString() + ' 人在看');
      });
    });
  }
}

Page(
  BasePage({
    onInit(param) {
      const videoDetailPage = new VideoDetailPage(this);
      videoDetailPage.onInit(param);
      videoDetailPage.build();
    }
  })
);