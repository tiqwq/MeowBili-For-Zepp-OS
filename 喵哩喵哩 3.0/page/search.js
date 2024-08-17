import * as hmUI from "@zos/ui";
import { BasePage } from "@zeppos/zml/base-page";
import { LocalStorage } from '@zos/storage'
import { push } from '@zos/router'
import { createInputMethod } from "../utils/board";
Page(
  BasePage({ 
    build() {
         createInputMethod("searchresult")
    }
    
  })
);
