import { BaseApp } from "@zeppos/zml/base-app";

App(
  BaseApp({
    globalData: {
      version: "1.0.0"
    },
    onCreate(options) {
      console.log("app on create invoke");
    },

    onDestroy(options) {
      console.log("app on destroy invoke");
    },
  })
);
