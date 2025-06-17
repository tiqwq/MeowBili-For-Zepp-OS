import { BasePage } from "@zeppos/zml/base-page";
import { push } from '@zos/router';
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { parseArticles } from "../../utils/utils";
import { getSearchResult } from "../../func/fetch";

class ArticlePage {
  constructor(page) {
    this.page = page;
    this.params = null;
    this.articleTitle = [];
    this.articleView = [];
    this.articleBoard = [];
  }

  onInit(param) {
    this.params = param;
  }

  build() {
    this.createWidgets();
    this.getArticle();
  }

  createWidgets() {
    for (let i = 0; i < 8; i++) {
      this.articleBoard[i] = createWidget(widget.BUTTON, {
        x: 30,
        y: 180 + i * 204,
        w: 420,
        h: 180,
        radius: 40,
        normal_color: 0x222222,
        press_color: 0x101010,
      });

      this.articleTitle[i] = createWidget(widget.TEXT, {
        x: 50,
        y: 200 + i * 204,
        w: px(350),
        h: px(88),
        text_size: 28,
        text: "",
        color: 0xffffff,
        text_style: text_style.WRAP,
      });

      createWidget(widget.IMG, {
        x: 50,
        y: 310 + i * 204,
        src: 'watchnum.png'
      });

      this.articleView[i] = createWidget(widget.TEXT, {
        x: 82,
        y: 307 + i * 204,
        w: px(360),
        h: px(40),
        text_size: 20,
        text: "",
        color: 0x9E9E9E,
        text_style: text_style.ELLIPSIS,
      });
    }
  }

  getArticle() {
    getSearchResult(this.page, this.params, 'article').then((res) => {
      const result = parseArticles(res.body);
      for (let i = 0; i < 8; i++) {
        this.articleTitle[i].setProperty(prop.TEXT, result[i]['title']);
        this.articleView[i].setProperty(prop.TEXT, result[i]['view'].toString());
        this.articleTitle[i].setEnable(false);
        this.articleBoard[i].setProperty(prop.MORE, {
          x: 30,
          y: 180 + i * 204,
          w: 420,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
          click_func: () => {
            push({
              url: 'page/columns',
              params: result[i]["id"]
            });
          }
        });
      }
    });
  }
}

Page(
  BasePage({
    onInit(param) {
      const articlePage = new ArticlePage(this);
      articlePage.onInit(param);
      articlePage.build();
    }
  })
);