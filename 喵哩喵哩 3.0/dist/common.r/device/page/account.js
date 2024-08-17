console.log('current filepath: /page/account.js');
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
let midResult;
hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 40,
    y: 40,
    w: 192,
    h: 192,
    text: ''
});
hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 40,
    y: 60,
    w: 192,
    h: 192,
    text: ''
});
hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 40,
    y: 80,
    w: 192,
    h: 192,
    text: ''
});
hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 40,
    y: 100,
    w: 192,
    h: 192,
    text: ''
});
hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 40,
    y: 120,
    w: 192,
    h: 192,
    text: ''
});
hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 40,
    y: 140,
    w: 192,
    h: 192,
    text: ''
});
const img = hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
    x: 40,
    y: 160,
    src: ''
});
__$$module$$__.module = Page(g({
    build() {
        this.getMid();
        this.getCoin();
    },
    getMid() {
        this.request({
            method: 'SENDBILIGET',
            data: {
                DedeUserID: localStorage.getItem('DedeUserID'),
                SESSDATA: localStorage.getItem('SESSDATA'),
                bili_jct: localStorage.getItem('bili_jct'),
                DedeUserID__ckMd5: localStorage.getItem('DedeUserID__ckMd5'),
                buvid3: localStorage.getItem('buvid3')
            },
            url: 'https://api.bilibili.com/x/member/web/account',
            type: 'json'
        }).then(res => {
        }).catch(res => {
            console.log(res.body.data.mid.toString());
            midResult = res.body.data.mid;
            this.getAccount();
        });
    },
    getAccount() {
        this.request({
            method: 'SENDBILIGET',
            data: {
                DedeUserID: localStorage.getItem('DedeUserID'),
                SESSDATA: localStorage.getItem('SESSDATA'),
                bili_jct: localStorage.getItem('bili_jct'),
                DedeUserID__ckMd5: localStorage.getItem('DedeUserID__ckMd5'),
                buvid3: localStorage.getItem('buvid3')
            },
            url: `https://api.bilibili.com/x/web-interface/card?mid=${ midResult }`,
            type: 'json'
        }).then(res => {
        }).catch(res => {
            console.log(`https://api.bilibili.com/x/web-interface/card?mid=${ midResult }`);
            console.log(midResult);
            console.log(res.body.data.card.mid);
            console.log(res.body.data.card.name);
            console.log(res.body.data.card.sex);
            console.log(res.body.data.card.face);
            console.log(res.body.data.card.sign);
            this.request({
                method: 'DOWNLOADIMAGE',
                url: res.body.data.card.face,
                filename: 'face.png',
                targetName: 'face2.png'
            }).then(res2 => {
                img.setProperty(hmUI__namespace.prop.SRC, 'data://download/face2.png');
            }).catch(res2 => {
                img.setProperty(hmUI__namespace.prop.SRC, 'data://download/face2.png');
            });
            console.log(res.body.data.card.fans);
            console.log(res.body.data.card.friend);
            console.log(res.body.data.card.level_info.current_level);
        });
    },
    getCoin() {
        this.request({
            method: 'SENDBILIGET',
            data: {
                DedeUserID: localStorage.getItem('DedeUserID'),
                SESSDATA: localStorage.getItem('SESSDATA'),
                bili_jct: localStorage.getItem('bili_jct'),
                DedeUserID__ckMd5: localStorage.getItem('DedeUserID__ckMd5'),
                buvid3: localStorage.getItem('buvid3')
            },
            url: 'https://account.bilibili.com/site/getCoin',
            type: 'json'
        }).then(res => {
        }).catch(res => {
            console.log(res.body.data.money);
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