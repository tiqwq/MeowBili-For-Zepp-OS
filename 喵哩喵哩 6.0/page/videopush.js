// 系统api导入
import { createWidget, widget, align, prop, text_style, event } from '@zos/ui';
import { scrollTo,setScrollMode, SCROLL_MODE_SWIPER, setScrollLock ,SCROLL_MODE_SWIPER_HORIZONTAL} from '@zos/page';
import { Time } from '@zos/sensor'
import { BasePage } from "@zeppos/zml/base-page";
import { px } from "@zos/utils";
import { push } from '@zos/router';
import { LocalStorage } from '@zos/storage';
// 个人模块导入
import { fetchVideoList } from "../func/fetch";
import { formatNumber, randomNum, textContent} from "../utils/utils";

const localStorage = new LocalStorage();

class VideoPage {
  constructor(page) {
    
    this.state = {
      titleList: [],
      unameList: [],
      videoViewList: [],
      buttonList: []
    };
 this.textContent = textContent;
    this.videoNum = 15;
    this.list = localStorage.getItem("list", undefined);
    
  }
  
  build() { 
     setScrollMode({
      mode: SCROLL_MODE_SWIPER_HORIZONTAL,
      options: {
        height: 480,
        width: 480,
        count: 2,
      },
    })
   
    
    createWidget(widget.PAGE_SCROLLBAR);
    this.createVideoWidgets();
    this.createHeaderWidgets();
    this.createRandomTextWidget();
    this.createLoadMoreButton();
    this.createWidgets();
   
    //this.createAccount();
 
    if (this.list != undefined) {
      this.readListStorage();
    } else {
      this.getVideoList();
    }
    
  }
  
  createVideoWidgets() {
   
    const videolist = createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(86),
      w: px(480),
      h: px(400),
      page:0,
     
  })
 /*  createWidget(widget.STROKE_RECT, {
    x: px(0),
      y: px(86),
      w: px(480),
      h: px(400),
    radius: 20,
    line_width: 4,
    color: 0xfc6950
  }) */
   
    createWidget(widget.IMG, {
      x: 0,
      y: 0,
      src: 'Bg.png'
    });

    videolist.createWidget(widget.TEXT, {
      x: 50,
      y: 20,
      w: 400,
      h: 100,
      text_size: 50,
      text: "推荐",
      color: 0xff93c4,
      align_h: align.LEFT,
      align_v: align.CENTER_V,
      text_style: text_style.NONE
  })
    for (let i = 0; i < this.videoNum; i++) {
    
      this.state.buttonList[i] = videolist.createWidget(widget.BUTTON, {
        x: 40,
        y: 135 + i * 204,
        w: 400,
        h: 180,
        radius: 40,
        normal_color: 0x9E9E9E,
        press_color: 0x101010,
      }),//.setAlpha(210);
      this.state.titleList[i] = videolist.createWidget(widget.TEXT, {
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
      videolist.createWidget(widget.IMG, {
        x: 50,
        y: 150 + i * 204,
        src: 'loding.png'
      });
      videolist.createWidget(widget.IMG, {
        x: 75,
        y: 280 + i * 204,
        src: 'watchnum.png'
      });
      this.state.unameList[i] = videolist.createWidget(widget.TEXT, {
        x: 216,
        y: 277 + i * 204,
        w: px(360),
        h: px(40),
        text_size: 22,
        text: "",
        color: 0x9E9E9E,
        text_style: text_style.WRAP
      });


      videolist.createWidget(widget.IMG, {
        x: 190,
        y: 283 + i * 204,
        src: 'up.png'
      });
      this.state.videoViewList[i] = videolist.createWidget(widget.TEXT, {
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
    const text = createWidget(widget.TEXT, {
      x: 94,
      y: 16,
      w: 288,
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
    updateTime(); // 初始化时立即显示时间
    
   
   
  } 


  createRandomTextWidget() {
    let content = this.textContent[randomNum(0, this.textContent.length - 1)];
    let new_content = ""; // 添加这一行来初始化 new_content
    let i = 0;
    const text =createWidget(widget.TEXT, {
      x: 70,
      y: 40,
      w: 350,
      h: px(58),
      text_size: 20,
      color: 0xffffff,
      align_h: align.CENTER_H,
      align_v: align.CENTER_V,
      text_style: text_style.WRAP,
      text: '',
    });
   /*  text.addEventListener(event.CLICK_UP, () => {
      push({ url: 'page/bulletin' });
    }); */
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
  createLoadMoreButton() {
    const viewContainerButton = createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(86),
      w: px(480),
      h: px(400),
      z_index: 1,
      scroll_enable: false
    })

    viewContainerButton.createWidget(widget.BUTTON, {
      x: 60,
      y: 300,
      w: px(360),
      h: px(100),
      text_size: px(36),
      radius: 50,
      normal_src: 'update.png',
      press_src: 'update.png',
      //text: "加载更多",
      click_func: () => {
        this.getVideoList();
        
      }
    })
   
  }

createWidgets() {
   
  const User = createWidget(widget.VIEW_CONTAINER, {
    x: px(0),
    y: px(70),
    w: px(480),
    h: px(450),
    page: 1
  })
  const text = createWidget(widget.TEXT, {
    x: 574,
    y: 16,
    w: 288,
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
  updateTime(); // 初始化时立即显示时间
  User.createWidget(widget.TEXT, {
    x: px(50),
    y: px(20),
    w: px(400),
    h: px(100),
    text_size: 50,
    text: "我的",
    color: 0xff93c4,
    align_h: align.LEFT,
    align_v: align.CENTER_V,
    text_style: text_style.NONE
})
  User.createWidget(widget.BUTTON, {
    x: px(40),
    y: px(125),
    w: px(400),
    h: px(150),
    radius: 20,
    normal_color: 0x9BA0AA,
    press_color: 0x101010,
    click_func: () => {
      push({ url: 'page/account' });
    },
  })
  User.createWidget(widget.TEXT, {
    x: px(140),
    y: px(170),
    w: px(288),
    h: px(46),
    color: 0xffffff,
    text_size: 36,
    align_h: align.CENTER_H,
    align_v: align.CENTER_V,
    text_style: text_style.NONE,
    text: '我的账号',
  })
  const buttonConfig = [
    {img:"27.png", text: "私信消息", url: 'page/messageList' },
    {img:"44.png", text: "历史记录", url: 'page/history' },
    {img:"25.png", text: "稍后再看", url: 'page/laterSee' },
    { img:"43.png",text: "我的收藏", url: 'page/starFolder' },
    { img:"40.png",text: "推荐的视频", url: 'page/developersVideoPush' },
    { img:"4.png",text: "设置", url: 'page/setting' }
  ];

  buttonConfig.forEach((config, index) => {
    User.createWidget(widget.BUTTON, {
      x: px(40),
      y: 310 + index * 107,
      w: px(400),
      h: px(100),
      text_size: px(36),
      radius: 30,
      normal_color: 0x1F1F1F,
      press_color: 0x101010,
      text: config.text,
      click_func: () => {
        push({ url: config.url });
      },
    });

    User.createWidget(widget.IMG, {
      x: px(60),
      y: 325 + index * 107,
      w: 70,
      h: 70,
      //radius: 50,
      auto_scale: true,
      src: config.img,
      
      
    })
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