import { createWidget, widget, align, text_style, prop, event } from '@zos/ui'
import { px } from '@zos/utils'
import { push } from '@zos/router'

Page({
    build() {
        // 创建第一张图片
        const img1 = createWidget(widget.IMG, {
            x: px(-25),
            y: px(-25),
            src: 'sbg.png',
            alpha: 255 // 完全不透明
        })

        // 创建第二张图片（初始设置为完全透明）
        const img2 = createWidget(widget.IMG, {
            x: px(-17),
            y: px(-17),
            src: 's2bg.png', 
            alpha: 0 
        })

        let isTransitioning = false
        let canNavigate = false  
        
        createWidget(widget.TEXT, {
            x: px(0),
            y: px(0),
            w: px(480),
            h: px(480),
            text_size: 45,
            text: "",
            color: 0xffffff,
            text_style: text_style.WRAP,
            align_h: align.CENTER_H,
        }).addEventListener(event.CLICK_UP, () => {
            if (canNavigate) {
                push({
                    url: 'page/Browser_Page/info_index',
                })
                return
            }
            
            if (!isTransitioning) {
                isTransitioning = true
                let alpha1 = 255
                let alpha2 = 0
                
                const timer = setInterval(() => {
                    alpha1 -= 15 
                    alpha2 += 15 
                    
                    img1.setProperty(prop.ALPHA, alpha1)
                    img2.setProperty(prop.ALPHA, alpha2)
                    
                    if (alpha1 <= 0) {
                        clearInterval(timer)
                        isTransitioning = false
                        canNavigate = true 
                    }
                }, 22)
            }
        })
    }
})