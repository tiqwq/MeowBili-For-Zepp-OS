console.log('current filepath: /page/searchresult.js');
try {
  (() => {
  
const { beforeModuleCreate = () => {}, afterModuleCreate = () => {} } = DeviceRuntimeCore.LifeCycle;
beforeModuleCreate();

const { beforePageCreate = () => {}, afterPageCreate = () => {} } = DeviceRuntimeCore.LifeCycle;
beforePageCreate();
const __$$G$$__ = __$$hmAppManager$$__.currentApp.current.__globals__.__$$G$$__;

!function (context) {
  with (context) {
    const __$$RQR$$__ = __$$R$$__;
    
const hmUI$1 = __$$RQR$$__('@zos/ui');
const storage = __$$RQR$$__('@zos/storage');
const router = __$$RQR$$__('@zos/router');
function _interopNamespaceCompat(e) {
    if (e && typeof e === 'object' && 'default' in e)
        return e;
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
        for (const k in e) {
            if (k !== 'default') {
                const d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: () => e[k]
                });
            }
        }
    }
    n.default = e;
    return Object.freeze(n);
}
const hmUI__namespace = _interopNamespaceCompat(hmUI$1);
let e = null;
function t() {
    return s() && n();
}
function i() {
    return s() && o();
}
function n() {
    return 'undefined' != typeof hmApp;
}
function o() {
    return 'undefined' != typeof __$$R$$__;
}
function s() {
    return n() || o();
}
e = 'undefined' != typeof __$$R$$__ ? __$$R$$__ : () => {
}, t() ? hmApp.getPackageInfo : i() && e('@zos/app').getPackageInfo, t() ? hmUI : i() && e('@zos/ui'), t() ? hmSetting.getDeviceInfo : i() && e('@zos/device').getDeviceInfo, t() ? 'undefined' != typeof __$$app$$__ && __$$app$$__ : i() && e('@zos/i18n').getText, t() ? hmApp.gotoPage : i() && e('@zos/router').push, t() ? hmBle : i() && e('@zos/ble');
let l = null;
t() ? l = DeviceRuntimeCore.HmLogger : i() ? l = e('@zos/utils').log : 'undefined' != typeof messaging && 'undefined' != typeof Logger && (l = Logger), e('@zos/utils').EventBus, e('@zos/timer').setTimeout, e('@zos/timer').clearTimeout, s() ? l.getLogger('device-message') : l.getLogger('side-message'), l.getLogger('message-builder');
const r = e('@zos/ble/TransferFile'), u = (f = new r(), {
        onFile(e) {
            return e ? (void 0 === f || f.inbox.on('newfile', function () {
                const t = f.inbox.getNextFile();
                e && e(t);
            }), this) : this;
        },
        onSideServiceFileFinished(e) {
            return e ? (void 0 === f || f.inbox.on('file', function () {
                const t = f.inbox.getNextFile();
                e && e(t);
            }), this) : this;
        },
        emitFile() {
            return f.inbox.emit('file'), this;
        },
        offFile() {
            return void 0 === f || (f.inbox.off('newfile'), f.inbox.off('file')), this;
        },
        getFile: () => void 0 === f ? null : f.inbox.getNextFile(),
        sendFile(e, t) {
            if (void 0 === f)
                throw new Error('fileTransfer is not available');
            return f.outbox.enqueueFile(e, t);
        }
    });
var f;
function g({
    state: e = {},
    onInit: t,
    onDestroy: i,
    ...n
} = {}) {
    const o = (function () {
        const {messaging: e} = getApp()._options.globalData;
        return e;
    }());
    return {
        state: e,
        ...n,
        onInit(...e) {
            this._onCall = this.onCall?.bind(this), this._onRequest = this.onRequest?.bind(this), o.onCall(this._onCall).onRequest(this._onRequest), this.onReceivedFile && (this._onReceivedFile = this.onReceivedFile?.bind(this), u.onFile(this._onReceivedFile)), t?.apply(this, e);
        },
        onDestroy(...e) {
            this._onCall && o.offOnCall(this._onCall), this._onRequest && o.offOnRequest(this._onRequest), this._onReceivedFile && u.offFile(this._onReceivedFile), i?.apply(this, e);
        },
        request: e => o.request(e),
        httpRequest: e => o.request({
            method: 'http.request',
            params: e
        }),
        call: e => o.call(e),
        sendFile: (e, t) => u.sendFile(e, t)
    };
}
const localStorage = new storage.LocalStorage();
let textList = [];
let newTextList = [];
let newNewTextList = [];
let buttonList = [];
console.log(localStorage.getItem('login_info'));
function extractTextFromHTML(htmlString) {
    const text = htmlString.replace(/<[^>]*>/g, '');
    return text.trim();
}
function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    } else if (num < 10000) {
        return (num / 1000).toFixed(1) + 'k';
    } else {
        return (num / 10000).toFixed(1) + 'w';
    }
}
for (let i = 0; i < 8; i++) {
    buttonList[i] = hmUI__namespace.createWidget(hmUI__namespace.widget.BUTTON, {
        x: 30,
        y: 180 + i * 204,
        w: 420,
        h: 180,
        radius: 40,
        normal_color: 2236962,
        press_color: 1052688
    });
    textList[i] = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
        x: 210,
        y: 200 + i * 204,
        w: px(245),
        h: px(88),
        text_size: 28,
        text: '',
        color: 16777215,
        text_style: hmUI__namespace.text_style.WRAP
    });
    hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
        x: 50,
        y: 310 + i * 204,
        src: 'watchnum.png'
    });
    newTextList[i] = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
        x: 191,
        y: 307 + i * 204,
        w: px(360),
        h: px(40),
        text_size: 22,
        text: '',
        color: 10395294,
        text_style: hmUI__namespace.text_style.WRAP
    });
    hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
        x: 165,
        y: 313 + i * 204,
        src: 'up.png'
    });
    newNewTextList[i] = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
        x: 82,
        y: 307 + i * 204,
        w: px(360),
        h: px(40),
        text_size: 20,
        text: '',
        color: 10395294,
        text_style: hmUI__namespace.text_style.ELLIPSIS
    });
}
let params;
__$$module$$__.module = Page(g({
    onInit(param) {
        params = param;
    },
    build() {
        this.getWbi();
    },
    getWbi() {
        this.request({
            method: 'SENDWBIGET',
            data: {
                DedeUserID: localStorage.getItem('DedeUserID'),
                SESSDATA: localStorage.getItem('SESSDATA'),
                bili_jct: localStorage.getItem('bili_jct'),
                DedeUserID__ckMd5: localStorage.getItem('DedeUserID__ckMd5'),
                buvid3: localStorage.getItem('buvid3')
            },
            url: 'https://api.bilibili.com/x/web-interface/wbi/search/type',
            type: 'json',
            info: localStorage.getItem('login_info'),
            paramsobj: {
                keyword: params,
                search_type: 'video'
            }
        }).then(res => {
        }).catch(res => {
            for (let i = 0; i < 8; i++) {
                textList[i].setProperty(hmUI__namespace.prop.TEXT, extractTextFromHTML(res.body.data.result[i].title));
                newTextList[i].setProperty(hmUI__namespace.prop.TEXT, res.body.data.result[i].author);
                newNewTextList[i].setProperty(hmUI__namespace.prop.TEXT, formatNumber(res.body.data.result[i].play));
                textList[i].setEnable(false);
                buttonList[i].setProperty(hmUI__namespace.prop.MORE, {
                    x: 30,
                    y: 180 + i * 204,
                    w: 420,
                    h: 180,
                    radius: 40,
                    normal_color: 2236962,
                    press_color: 1052688,
                    click_func: button_widget => {
                        router.push({
                            url: 'page/videodetail',
                            params: JSON.stringify({
                                img_src: res.body.data.result[i].pic,
                                vid_title: res.body.data.result[i].title,
                                bv: res.body.data.result[i].bvid,
                                up_mid: res.body.data.result[i].mid,
                                id: res.body.data.result[i].aid
                            })
                        });
                    }
                });
            }
            console.log(res);
        });
    }
}));
;
  }
}.bind(__$$G$$__)(__$$G$$__);
afterPageCreate();
afterModuleCreate();
;
  })();
} catch(e) {
  
console.log('Mini Program Error', e);
e && e.stack && e.stack.split(/\n/).forEach(i => console.log("error stack", i));
;
/* todo */
}