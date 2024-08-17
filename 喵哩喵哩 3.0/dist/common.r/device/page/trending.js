console.log('current filepath: /page/trending.js');
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
function decodeUnicodeEscape(data) {
    if (typeof data === 'string') {
        return data.replace(/\\u([\dA-Fa-f]{4})/g, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });
    } else if (typeof data === 'object') {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = decodeUnicodeEscape(data[key]);
            }
        }
    }
    return data;
}
let buttonList = [];
for (let i = 0; i < 5; i++) {
    buttonList[i] = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
        x: 30,
        y: 200 + i * 32,
        w: 420,
        h: 180,
        line_space: 100,
        text_size: 22,
        text: '',
        align_h: hmUI__namespace.align.CENTER_H,
        color: 16777215
    });
}
__$$module$$__.module = Page(g({
    build() {
        this.getWbi();
        hmUI__namespace.createWidget(hmUI__namespace.widget.BUTTON, {
            x: 60,
            y: 80,
            w: px(360),
            h: px(80),
            text_size: px(36),
            text: '搜索',
            radius: 40,
            press_color: 1052688,
            normal_color: 2236962,
            click_func: () => {
                router.push({ url: 'page/search' });
            }
        });
    },
    getWbi() {
        this.request({
            method: 'SENDBILIGET',
            data: {
                DedeUserID: localStorage.getItem('DedeUserID'),
                SESSDATA: localStorage.getItem('SESSDATA'),
                bili_jct: localStorage.getItem('bili_jct'),
                DedeUserID__ckMd5: localStorage.getItem('DedeUserID__ckMd5'),
                buvid3: localStorage.getItem('buvid3')
            },
            url: 'https://s.search.bilibili.com/main/hotword',
            type: 'json'
        }).then(res => {
        }).catch(res => {
            for (let i = 0; i < 5; i++) {
                buttonList[i].setProperty(hmUI__namespace.prop.TEXT, JSON.parse(decodeUnicodeEscape(res.body)).list[i].keyword);
                buttonList[i].addEventListener(hmUI__namespace.event.CLICK_UP, () => {
                    router.push({
                        url: 'page/searchresult',
                        params: { keyword: JSON.parse(decodeUnicodeEscape(res.body)).list[i].show_name }
                    });
                });
            }
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