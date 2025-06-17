import { createWidget, widget, align } from '@zos/ui'
import { getDeviceInfo } from '@zos/device'
import { showToast } from '@zos/interaction'
import { px } from '@zos/utils'
import { push } from '@zos/router'

Page({
  state: {
    imgSrc: null
  },

  onInit(param) {
    try {
      const params = typeof param === 'string' ? JSON.parse(param) : param
      
      if (params) {
        if (params.imgSrc) {
          this.state.imgSrc = params.imgSrc
        }
        if (params.jumpurl) {
          this.state.jumpurl = params.jumpurl
        }
        if (params.textbutton) {
          this.state.textbutton = params.textbutton
        }
        
        if (params.imgSrc) {
          /* showToast({
            content: '图片: ' + params.imgSrc
          }) */
        }
      }
    } catch (error) {
      console.log('参数错误:', error)
      this.state.imgSrc = 'bili1.png' 
    }
  },

  build() {
    const { width, height } = getDeviceInfo()
    
    const container = createWidget(widget.VIEW_CONTAINER, {
      x: 0,
      y: 0,
      w: width,
      h: height
    })

    if (this.state.imgSrc) {
      try {
        const img = container.createWidget(widget.IMG, {
          x: 0,
          y: 0,
          w: 480,
          //h: 800,
          src: this.state.imgSrc
        })
        
       
      } catch (error) {
        console.log('图片创建失败:', error)
      }
    } else {
      container.createWidget(widget.TEXT, {
        x: 0,
        y: 220,
        w: 480,
        h: 40,
        text_size: 20,
        color: 0xffffff,
        text: '网页加载失败',
        align_h: align.CENTER_H
      })
    }

  const viewContainerButton = createWidget(widget.VIEW_CONTAINER, {
      x: px(0),
      y: px(86),
      w: px(480),
      h: px(480),
      z_index: 1,
      scroll_enable: false
    })

    viewContainerButton.createWidget(widget.BUTTON, {
      x: (480 - 180) / 2,
      y: 300,
      w: 180,
      h: 80,
      radius: 45,
      normal_color: 0xE47097,
      press_color: 0xfeb4a8,
      text_size: 25,
      text: this.state.textbutton
    }).click_func = () => { 
      if (this.state.jumpurl) {
        console.log('跳转到:', this.state.jumpurl)
        push({
          url: this.state.jumpurl
        })
      } else {
        showToast({
          content: '跳转链接无效'
        })
      }
    }


  }
})
