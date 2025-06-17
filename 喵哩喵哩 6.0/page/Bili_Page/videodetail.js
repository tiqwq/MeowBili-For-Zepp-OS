import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router';
import { starVideo, likeVideo, coinVideo, getAllFolder, getVideoDetail, getUpAccount, getCid, getPlayerNum } from "../../func/fetch";
import { timestampToDateTime, extractTextFromHTML, formatNumber } from "../../utils/utils";
import { showToast } from '@zos/interaction';
import { getText } from '@zos/i18n'
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
      y: 383,
      w: 420,
      h: 127,
      radius: 40,
      color: 0x222222
    });

    createWidget(widget.TEXT, {
      x: px(50),
      y: px(80),
      w: px(400),
      h: px(100),
      text_size: 50,
      text: getText('video_detail'),
      color: 0xff93c4,
      align_h: align.LEFT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
    });

    createWidget(widget.TEXT, {
      x: px(50),
      y: px(160),
      w: px(370),
      h: px(230),
      text_size: 25,
      text: extractTextFromHTML(this.params.vid_title),
      color: 0xffffff,
      align_h: align.LEFT,
      text_style: text_style.WRAP,
    });

    this.widgets.uname = createWidget(widget.TEXT, {
      x: 145,
      y: 407, 
      w: 294,
      h: px(40),
      text_size: 20,
      text: getText('loading'),
      color: 0xffffff,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.fensi = createWidget(widget.TEXT, {
      x: 145,
      y: 453, 
      w: 294,
      h: px(40),
      text_size: 22,
      text: getText('loading'),
      color: 0xffffff,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.zan = createWidget(widget.TEXT, {
      x: 32,
      y: 635, 
      w: 294,
      h: px(40),
      text_size: 22,
      text: 'Loading...',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.now = createWidget(widget.TEXT, {
      x: 32,
      y: 663, 
      w: 294,
      h: px(40),
      text_size: 22,
      text: 'Loading...',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.view = createWidget(widget.TEXT, {
      x: 32,
      y: 692, 
      w: 294,
      h: px(40),
      text_size: 22,
      text: 'Loading...',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.time = createWidget(widget.TEXT, {
      x: 32,
      y: 718, 
      w: 294,
      h: px(40),
      text_size: 22,
      text: '发布于 ',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });

    this.widgets.bv = createWidget(widget.TEXT, {
      x: 32,
      y: 744, 
      w: 294,
      h: px(40),
      text_size: 22,
      text: 'BV',
      color: 0x9E9E9E,
      text_style: text_style.ELLIPSIS,
    });
  }

  createButtons() {
    createWidget(widget.IMG, {
      x: 46,
      y: 528,
      src: "zan.png",
    }).addEventListener(event.CLICK_UP, () => {
      likeVideo(this.page, this.params.bv).then((res) => {
        if (res.body.code == 0) {
          showToast({
            content: getText('like_success')
          });
        } else {
          showToast({
            content: getText('like_fail') + res.body.message
          });
        }
      });
    });

    createWidget(widget.IMG, {
      x: 191,
      y: 528,
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
      y: 528,
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
      y: 910,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: getText('ai_summary'),
      click_func: () => {
        push({
          url: "page/Bili_Page/videoaisummary",
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
      y: 800,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: getText('comments'),
      click_func: () => {
        push({
          url: "page/Bili_Page/videoreplies",
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
      y: 1020,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: getText('write_comment'),
      click_func: () => {
        push({
          url: "page/Other_Page/board",
          params: JSON.stringify({
            type: "sendreply",
            id: this.params.id
          })
        });
      },
    });

    createWidget(widget.BUTTON, {
      x: 60,
      y: 1130,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: getText('send_danmaku'),
      click_func: () => {
        push({
          url: "page/Other_Page/board",
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
      this.widgets.zan.setProperty(prop.TEXT, formatNumber(res.body.data.stat.like, 'text').toString() + ' ' + getText('likes'));
      this.widgets.view.setProperty(prop.TEXT, formatNumber(res.body.data.stat.view, 'text').toString() + ' ' + getText('views'));
      this.widgets.time.setProperty(prop.TEXT, getText('published_at') + ' ' + timestampToDateTime(res.body.data.pubdate));
      this.widgets.uname.setProperty(prop.TEXT, res.body.data.owner.name);
      this.aid = res.body.data.aid;
      if (this.params.id == "undefined") {
        this.params.id = res.body.data.aid;
      }
    }).catch((err) => {
      console.log(err);
    });

    getUpAccount(this.page, this.params.up_mid).then((res) => {
      this.widgets.fensi.setProperty(prop.TEXT, formatNumber(res.body.data.card.fans, 'text').toString() + ' ' + getText('fans'));
      this.widgets.bv.setProperty(prop.TEXT, this.params.bv);
    });

    this.getCid(this.params.bv);
  }

  getCid(bvid) {
    getCid(this.page, bvid).then((res) => {
      this.cid = res.body.data[0].cid;
      getPlayerNum(this.page, bvid, this.cid).then((res) => {
        this.widgets.now.setProperty(prop.TEXT, formatNumber(res.body.data.count, 'text').toString() + ' ' + getText('watching_now'));
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