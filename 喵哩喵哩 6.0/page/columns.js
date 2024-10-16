import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { back } from "@zos/router";
import { createWidget, widget, align, prop, text_style, event, getTextLayout } from '@zos/ui';
import { getArticle } from "../func/fetch";
const localStorage = new LocalStorage()
let params;
Page(
  BasePage({
    onInit(param) {
      params = param
    },
    build() {
      createWidget(widget.IMG, {
        x: 150,
        y: 50,
        src: "back.png",
      }).addEventListener(event.CLICK_UP, () => {
        back()
      })
      const title = createWidget(widget.TEXT, {
        x: 180,
        y: 40,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "专栏",
        color: 0xffffff,
        text_style: text_style.WRAP,
      }).addEventListener(event.CLICK_UP, () => {
        
      })
      const columnsTitle = createWidget(widget.TEXT, {
        x: 40,
        y: 80,
        w: px(420),
        h: px(88),
        text_size: 32,
        text: "未知",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      const upTitle = createWidget(widget.TEXT, {
        x: 40,
        y: 160,
        w: px(245),
        h: px(88),
        text_size: 20,
        text: "未知",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      const columnTitle = createWidget(widget.TEXT, {
        x: 40,
        y: 200,
        w: px(420),
        h: px(1000),
        text_size: 20,
        text: "未知",
        color: 0xffffff,
        text_style: text_style.WRAP,
      })
      getArticle(this,params).then((res) => {
        columnsTitle.setProperty(prop.TEXT, res.title)
        upTitle.setProperty(prop.TEXT, res.author)
        columnTitle.setProperty(prop.TEXT, res.article.content)
      })
    },
  })
)