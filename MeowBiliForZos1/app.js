import "./shared/device-polyfill";
import { MessageBuilder } from "./shared/message";
import { FsTools } from "./utils/mmk/Path";
FsTools.appTags = [27280, "app"];

App({
  globalData: {
    messageBuilder: null,
    appTags: FsTools.appTags,
    offline: false
  },
  onCreate(options) {
    console.log("app on create invoke");
    let appId;
    if (!hmApp.packageInfo) {
      throw new Error('Set appId,  appId needs to be the same as the configuration in app.json');
    } else {
      appId = hmApp.packageInfo().appId;
    }
    this.globalData.messageBuilder = new MessageBuilder({
      appId,
    });
    this.globalData.messageBuilder.connect();
  },

  onDestroy(options) {
    console.log("app on destroy invoke");
    this.globalData.messageBuilder.disConnect();
  },
});
