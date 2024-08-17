import { BaseApp } from "@zeppos/zml/base-app";

App(
  BaseApp({
    globalData: {
      back: 0
    },
    onCreate(options) {
      console.log("app on create invoke");
    },

    onDestroy(options) {
      console.log("app on destroy invoke");
    },
  })
);
