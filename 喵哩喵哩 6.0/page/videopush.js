// 系统api导入
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { scrollTo } from '@zos/page';
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router';
import { LocalStorage } from '@zos/storage';
// 个人模块导入
import { fetchVideoList } from "../func/fetch";
import { formatNumber, randomNum, textContent } from "../utils/utils";

const localStorage = new LocalStorage();

class VideoPage {
  constructor(page) {
    this.page = page;
    this.videoNum = 10;
    this.list = localStorage.getItem("list", undefined);
    this.state = {
      titleList: [],
      unameList: [],
      videoViewList: [],
      buttonList: []
    };
 
    this.textContent = textContent;
  }
  
  build() {
   
    createWidget(widget.PAGE_SCROLLBAR);
    this.createVideoWidgets();
    this.createHeaderWidgets();
    this.createRandomTextWidget();
    this.createLoadMoreButton();
 
    if (this.list != undefined) {
      this.readListStorage();
    } else {
      this.getVideoList();
    }
    
  }

  createVideoWidgets() {
    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'Bg.png'
    });
    for (let i = 0; i < this.videoNum; i++) {
    
      this.state.buttonList[i] = createWidget(widget.BUTTON, {
        x: 40,
        y: 135 + i * 204,
        w: 400,
        h: 180,
        radius: 40,
        normal_color: 0x9E9E9E,
        press_color: 0x101010,
      }),//.setAlpha(210);
      this.state.titleList[i] = createWidget(widget.TEXT, {
        x: 210,
        y: 148 + i * 204,
        w: px(210),
        h: px(130),
        text_size: 20,
        text: "",
        color: 0xffffff,
        align_v	:align.CENTER_V,
        text_style: text_style.WRAP,
      });
      createWidget(widget.IMG, {
        x: 50,
        y: 150 + i * 204,
        src: 'loding.png'
      });
      createWidget(widget.IMG, {
        x: 75,
        y: 280 + i * 204,
        src: 'watchnum.png'
      });
      this.state.unameList[i] = createWidget(widget.TEXT, {
        x: 216,
        y: 277 + i * 204,
        w: px(360),
        h: px(40),
        text_size: 22,
        text: "",
        color: 0x9E9E9E,
        text_style: text_style.WRAP
      });


      createWidget(widget.IMG, {
        x: 190,
        y: 283 + i * 204,
        src: 'up.png'
      });
      this.state.videoViewList[i] = createWidget(widget.TEXT, {
        x: 107,
        y: 277 + i * 204,
        w: px(360),
        h: px(40),
        text_size: 20,
        text: "",
        color: 0x9E9E9E,
        text_style: text_style.ELLIPSIS,
      });
   
    }
  }
 
  createHeaderWidgets() {
  
    
    createWidget(widget.BUTTON, {
      x: 150,
      y: 20,
      w: px(170),
      h: px(50),
      text_size: 25,
      text: "推荐      ",
      color: 0xffffff,
      radius: 20,
      align_h:align.RIGHT,
      normal_color: 0x000000,
        press_color: 0x101010,
      
      click_func: (button_widget) => {
        push({ url: 'page/info_main' });
      }
    }) 
    createWidget(widget.IMG, {
      x: 185,
      y: 25,
      src: 'icon1.png'
    })
 
  } 

  createRandomTextWidget() {
    let content = this.textContent[randomNum(0, this.textContent.length - 1)];
    let new_content = ""; // 添加这一行来初始化 new_content
    let i = 0;
    const text = createWidget(widget.TEXT, {
      x: 70,
      y: 75,
      w: 350,
      h: px(58),
      text_size: 20,
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.WRAP,
      text: '',
    });
    text.addEventListener(event.CLICK_UP, () => {
      push({ url: 'page/bulletin' });
    });
    let animationInterval = setInterval(() => {
      if (i < content.length) {
        new_content += content[i];
        text.setProperty(prop.TEXT, new_content);
        i++;
      } else {
        clearInterval(animationInterval)
      }
    }, 50);
  }

  createLoadMoreButton() {
    createWidget(widget.BUTTON, {
      x: 60,
      y: 2300,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 50,
      normal_color: 0x222222,
      press_color: 0x101010,
      text: "加载更多",
      click_func: () => {
        this.getVideoList();
        scrollTo({ y: -0, anim_rate: linear, anim_duration: 3, anim_fps: 60 });
      }
    });
  }

  readListStorage() {
    for (let i = 0; i < this.videoNum; i++) {
      this.state.titleList[i].setProperty(prop.TEXT, this.list[i].title);
      this.state.unameList[i].setProperty(prop.TEXT, this.list[i].owner.name);
      this.state.videoViewList[i].setProperty(prop.TEXT, formatNumber(this.list[i].stat.view));
      this.state.titleList[i].setEnable(false);
      this.state.buttonList[i].setProperty(prop.MORE, {
        x: 40,
        y: 135 + i * 204,
        w: 400,
        h: 180,
        radius: 40,
        normal_color: 0x222222,
        press_color: 0x101010,
        click_func: () => {
          push({
            url: 'page/videodetail',
            params: JSON.stringify({
              img_src: this.list[i].pic,
              vid_title: this.list[i].title,
              bv: this.list[i].bvid,
              cid: this.list[i].cid,
              up_mid: this.list[i].owner.mid,
              id: this.list[i].id
            })
          })
        }
      })
    }
  }

  getVideoList() {
    fetchVideoList(this.page).then((res) => {
      for (let i = 0; i < this.videoNum; i++) {
        this.state.titleList[i].setProperty(prop.TEXT, res.item[i].title);
        this.state.unameList[i].setProperty(prop.TEXT, res.item[i].owner.name);
        this.state.videoViewList[i].setProperty(prop.TEXT, formatNumber(res.item[i].stat.view, 'num'));
        this.state.titleList[i].setEnable(false);
        this.state.buttonList[i].setProperty(prop.MORE, {
          x: 40,
          y: 135 + i * 204,
          w: 400,
          h: 180,
          radius: 40,
          normal_color: 0x222222,
          press_color: 0x101010,
          click_func: () => {
            push({
              url: 'page/videodetail',
              params: JSON.stringify({
                img_src: res.item[i].pic,
                vid_title: res.item[i].title,
                bv: res.item[i].bvid,
                cid: res.item[i].cid,
                up_mid: res.item[i].owner.mid,
                id: res.item[i].id
              })
            })
          }
        })
      }
      localStorage.setItem("list", res.item);
    });
  }
}

Page(
  BasePage({
    build() {
      const videoPage = new VideoPage(this);
      videoPage.build();
    }
  })
)