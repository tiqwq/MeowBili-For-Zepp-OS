console.log('current filepath: /page/login.js');
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
const utils = __$$RQR$$__('@zos/utils');
const router = __$$RQR$$__('@zos/router');
const storage = __$$RQR$$__('@zos/storage');
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
const app = getApp();
app._options.globalData.back = 1;
const localStorage = new storage.LocalStorage();
const logger = utils.log.getLogger('fetch_api');
let qrcodeWidget;
function parseBilibiliUrl(url) {
    const params = {};
    const queryStart = url.indexOf('?');
    if (queryStart === -1) {
        return params;
    }
    const queryString = url.slice(queryStart + 1);
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = value;
    });
    return params;
}
let buvid3;
__$$module$$__.module = Page(g({
    state: {
        qr_value: '',
        qr_show: false,
        qr_loading_show: true,
        qr_key: 'N/A',
        get_qr_num: 0,
        set_qr_num: 0,
        PollInterval: null,
        GetQRInterval: null
    },
    build() {
        setTimeout(() => {
            this.fetchData();
            this.getbuvid3();
        }, 1);
    },
    fetchData() {
        this.request({ method: 'GET_DATA' }).then(data => {
            logger.log('receive data');
            const {
                result = {}
            } = data;
            if (!qrcodeWidget) {
                qrcodeWidget = hmUI$1.createWidget(hmUI$1.widget.QRCODE, {
                    content: result[0],
                    x: 128,
                    y: 100,
                    w: 250,
                    h: 250,
                    bg_x: 115,
                    bg_y: 85,
                    bg_w: 270,
                    bg_h: 270
                });
            } else {
                qrcodeWidget.setProperty(hmUI__namespace.prop.CONTENT, result[0]);
            }
            hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
                x: 190,
                y: 50,
                src: 'back.png'
            });
            hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
                x: 220,
                y: 40,
                w: px(245),
                h: px(88),
                text_size: 32,
                text: '登入',
                color: 16777215,
                text_style: hmUI__namespace.text_style.WRAP
            });
            hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
                x: 120,
                y: 360,
                w: px(245),
                h: px(88),
                text_size: 32,
                text: '主人请使用\n手机客户端扫码登入',
                align_h: hmUI__namespace.align.CENTER_H,
                color: 16777215,
                text_style: hmUI__namespace.text_style.WRAP
            });
            this.state.qr_value = result[0];
            this.state.qr_key = result[1];
            this.state.qr_show = true;
            this.state.qr_loading_show = false;
            this.startPolling();
        }).catch(res => {
        });
    },
    startPolling() {
        this.state.PollInterval = setInterval(() => {
            console.log(this.state.qr_key);
            this.checkQRStatus();
        }, 1000);
    },
    checkQRStatus() {
        this.request({
            method: 'CHECK_QR_STATUS',
            data: { qr_key: this.state.qr_key }
        }).then(res => {
            console.log('then');
            if (res.body.data.code === 0) {
                hmUI__namespace.showToast({ text: '登录成功\uFF01' });
                let userData = parseBilibiliUrl(res.body.data.url);
                for (const key in userData) {
                    if (userData.hasOwnProperty(key) && key !== 'gourl' && key !== 'first_domain' && key !== 'Expires') {
                        console.log(key, userData[key]);
                        localStorage.setItem(key, userData[key]);
                    }
                }
                localStorage.setItem('buvid3', buvid3);
                clearInterval(this.state.PollInterval);
                clearInterval(this.state.GetQRInterval);
                router.back();
            }
        }).catch(res => {
            console.log(res.body.data.code);
            if (res.body.data.code === 0) {
                hmUI__namespace.showToast({ text: '登录成功\uFF01' });
                let userData = parseBilibiliUrl(res.body.data.url);
                for (const key in userData) {
                    if (userData.hasOwnProperty(key) && key !== 'gourl' && key !== 'first_domain' && key !== 'Expires') {
                        console.log(key, userData[key]);
                        localStorage.setItem(key, userData[key]);
                    }
                }
                localStorage.setItem('buvid3', buvid3);
                clearInterval(this.state.PollInterval);
                clearInterval(this.state.GetQRInterval);
                router.back();
            }
        });
    },
    getbuvid3() {
        return this.httpRequest({
            method: 'get',
            url: 'https://api.bilibili.com/x/frontend/finger/spi'
        }).then(result => {
            buvid3 = result.body.data.b_3;
            console.log(result.body.data.b_3);
        }).catch(error => {
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