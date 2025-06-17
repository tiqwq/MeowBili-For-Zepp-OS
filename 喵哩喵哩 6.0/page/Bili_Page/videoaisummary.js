import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { back } from '@zos/router';
import { getAiSummary } from "../../func/fetch";
import { getText } from '@zos/i18n';

class AiSummaryPage {
  constructor(page,param) {
    this.page = page;
    this.params = JSON.parse(param);
    this.ai = null;
  }

  build() {
    this.createWidgets();
    this.getAiSummary();
  }

  createWidgets() {
    this.ai = createWidget(widget.TEXT, {
      x: 40,
      y: 100,
      w: 380,
      h: px(480),
      text_size: 20,
      text: "",
      color: 0xffffff,
      text_style: text_style.WRAP,
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
      text: getText('ai_summary'),
      color: 0xffffff,
      text_style: text_style.WRAP,
    }).addEventListener(event.CLICK_UP, () => {
      back();
    });
  }

  getAiSummary() {
    getAiSummary(this.page, this.params.bv, this.params.cid, this.params.up_mid).then((res) => {
      if (res.body.data.code == -1) {
        this.ai.setProperty(prop.TEXT, getText('no_summary_sensitive'));
      } else if (res.body.data.code == 1) {
        this.ai.setProperty(prop.TEXT, getText('no_summary_no_voice'));
      } else {
        if (res.body.data.model_result.result_type == 0 || res.body.data.model_result.result_type == 1) {
          this.ai.setProperty(prop.TEXT, getText('no_summary'));
        } else {
          let new_content = "";
          let i = 0;
          let animationInterval = setInterval(() => {
            if (i < res.body.data.model_result.summary.length) {
              new_content += res.body.data.model_result.summary[i];
              this.ai.setProperty(prop.TEXT, new_content + " ●");
              i++;
            } else {
              this.ai.setProperty(prop.TEXT, new_content);
              clearInterval(animationInterval);
            }
          }, 55);
        }
      }
    })
  }
}

Page(
  BasePage({
    onInit(param) {
      const aiSummaryPage = new AiSummaryPage(this,param);
      aiSummaryPage.build();
    }
  })
);