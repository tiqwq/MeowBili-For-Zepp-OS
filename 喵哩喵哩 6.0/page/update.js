import * as hmUI from "@zos/ui"
import { BasePage } from "@zeppos/zml/base-page"
import { LocalStorage } from '@zos/storage'
import { getTextLayout } from '@zos/ui'
const app = getApp()
let nowVersion = app._options.globalData.version
console.log(nowVersion);

const localStorage = new LocalStorage()
Page(
  BasePage({
    state: {
      updateWidget: "",
      versionWidget: "",
      contentTextWidget: "",
      contentWidget: "",
      tipWidget: "",
      currentVersionWidget: "",
      currentVersionNumberWidget: "",
      currentVersionicon: ""
    },
    build() {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 150,
        y: 50,
        src: "back.png",
      }).addEventListener(hmUI.event.CLICK_UP, () => {

      });
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 180,
        y: 40,
        w: px(245),
        h: px(88),
        text_size: 32,
        text: "软件更新",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      this.state.updateWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 130,
        y: 210,
        w: 329,
        h: 100,
        text_size: 36,
        text: "正在检查更新...",
        color: 0x9e9e9e,
        text_style: hmUI.text_style.WRAP,
      })
      this.state.versionWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 220,
        y: 127,
        w: 268,
        h: 63,
        text_size: 42,
        text: "",
        color: 0xe1e1e0,
        text_style: hmUI.text_style.WRAP,
      })   
      //-----------------------------------------------------------------------
      this.state.currentVersionicon = hmUI.createWidget(hmUI.widget.IMG, {
        x: 80,
        y: 120,
        src: '',
        
      })
      this.state.IncWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 220,
        y: 185,
        w: 268,
        h: 63,
        text_size: 22,
        text: "",
        color: 0xe1e1e0,
        text_style: hmUI.text_style.WRAP,
      })   
      //---------    --------------------------------------------------------------
     
      this.state.currentVersionWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 75,
        y: 179,
        w: 268,
        h: 63,
        text_size: 36,
        text: "",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      this.state.currentVersionNumberWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 75,
        y: 226,
        w: 268,
        h: 63,
        text_size: 36,
        text: "",
        color: 0xDDDDDD,
        text_style: hmUI.text_style.WRAP,
      })

   
      this.state.contentTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 160,
        y: 260,
        w: 268,
        h: 63,
        text_size: 36,
        text: "",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      this.state.contentWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 60,
        y: 330,
        w: 364,
        h: 228,
        text_size: 30,
        text: "",
        color: 0xDDDDDD,
        text_style: hmUI.text_style.WRAP,
      })
      this.state.tipWidget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 75,
        y: 407,
        w: 364,
        text_size: 26,
        text: "",
        color: 0xffffff,
        text_style: hmUI.text_style.WRAP,
      })
      
      this.updateCheck()
    },
    updateCheck() {
      this.request({
        method: "UPDATECHECK"
      })
        .then((res) => {
          console.log(JSON.parse(res.body));
          let result = JSON.parse(res.body);
          if (result.version != nowVersion) {
            this.state.currentVersionicon.setProperty(hmUI.prop.MORE,  {src: 'start.png'})
            this.state.updateWidget.setProperty(hmUI.prop.MORE, {color: '0xffffff'})
            this.state.updateWidget.setProperty(hmUI.prop.TEXT, '')
            this.state.IncWidget.setProperty(hmUI.prop.TEXT, 'Bydour Inc.')
            this.state.versionWidget.setProperty(hmUI.prop.TEXT, result.version)
            //this.state.currentVersionWidget.setProperty(hmUI.prop.TEXT, '当前设备版本')
            //this.state.currentVersionNumberWidget.setProperty(hmUI.prop.TEXT, nowVersion)
            this.state.contentTextWidget.setProperty(hmUI.prop.TEXT, "更新内容")
            this.state.contentWidget.setProperty(hmUI.prop.TEXT, result.announcement)
            const { height } = getTextLayout(result.announcement, {  
              text_size: 30,
              text_width: 228
            })
            
            this.state.tipWidget.setProperty(hmUI.prop.Y, 300 + height)
            this.state.tipWidget.setProperty(hmUI.prop.TEXT, '请前往zeppMeowbili官方QQ\n群下载并安装')
          } else {
            this.state.updateWidget.setProperty(hmUI.prop.MORE, {color: '0xffffff'})
            this.state.updateWidget.setProperty(hmUI.prop.TEXT, '当前已是最新版本')
            this.state.currentVersionWidget.setProperty(hmUI.prop.TEXT, '当前设备版本')
            this.state.currentVersionNumberWidget.setProperty(hmUI.prop.TEXT, nowVersion)
            this.state.currentVersionWidget.setProperty(hmUI.prop.Y,130)
            this.state.currentVersionNumberWidget.setProperty(hmUI.prop.Y,177)
          }
        })
        .catch((res) => {

          
        })
        
    }

  })
)