console.log('current filepath: /page/videodetail.js');
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
utils.log.getLogger('fetch_api');
const localStorage = new storage.LocalStorage();
function extractTextFromHTML(htmlString) {
    const text = htmlString.replace(/<[^>]*>/g, '');
    return text.trim();
}
function timestampToDateTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);
    return `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }`;
}
let cid;
function formatNumber(num) {
    if (num < 1000) {
        return num.toString();
    } else if (num < 10000) {
        return (num / 1000).toFixed(1) + '千';
    } else {
        return (num / 10000).toFixed(1) + '万';
    }
}
let params;
hmUI__namespace.createWidget(hmUI__namespace.widget.FILL_RECT, {
    x: 30,
    y: 463,
    w: 420,
    h: 127,
    radius: 40,
    color: 2236962
});
const fensi = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 145,
    y: 533,
    w: 294,
    h: utils.px(40),
    text_size: 22,
    text: '未知',
    color: 16777215,
    text_style: hmUI__namespace.text_style.ELLIPSIS
});
const zan = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 32,
    y: 735,
    w: 294,
    h: utils.px(40),
    text_size: 22,
    text: '未知',
    color: 10395294,
    text_style: hmUI__namespace.text_style.ELLIPSIS
});
const now = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 32,
    y: 763,
    w: 294,
    h: utils.px(40),
    text_size: 22,
    text: '未知',
    color: 10395294,
    text_style: hmUI__namespace.text_style.ELLIPSIS
});
const view = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 32,
    y: 792,
    w: 294,
    h: utils.px(40),
    text_size: 22,
    text: '未知',
    color: 10395294,
    text_style: hmUI__namespace.text_style.ELLIPSIS
});
const time = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 32,
    y: 818,
    w: 294,
    h: utils.px(40),
    text_size: 22,
    text: '发布于 ',
    color: 10395294,
    text_style: hmUI__namespace.text_style.ELLIPSIS
});
const bv = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 32,
    y: 844,
    w: 294,
    h: utils.px(40),
    text_size: 22,
    text: 'BV',
    color: 10395294,
    text_style: hmUI__namespace.text_style.ELLIPSIS
});
const uname = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
    x: 145,
    y: 487,
    w: 294,
    h: utils.px(40),
    text_size: 20,
    text: '未知',
    color: 16777215,
    text_style: hmUI__namespace.text_style.ELLIPSIS
});
__$$module$$__.module = Page(g({
    onInit(param) {
        params = JSON.parse(param);
        console.log(param);
    },
    build() {
        this.getCid(params.bv);
        this.getVideoList();
        hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
            x: 150,
            y: 50,
            src: 'back.png'
        }).addEventListener(hmUI__namespace.event.CLICK_UP, () => {
            back();
        });
        const back = hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
            x: 180,
            y: 40,
            w: utils.px(245),
            h: utils.px(88),
            text_size: 32,
            text: '视频详情',
            color: 16777215,
            text_style: hmUI__namespace.text_style.WRAP
        });
        back.addEventListener(hmUI__namespace.event.CLICK_DOWN, info => {
            router.push({ url: 'page/videopush' });
        }), hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
            x: 80,
            y: 100,
            src: 'spfm.png'
        });
        hmUI__namespace.createWidget(hmUI__namespace.widget.TEXT, {
            x: 20,
            y: 370,
            w: 430,
            h: utils.px(88),
            text_size: 30,
            text: extractTextFromHTML(params.vid_title),
            color: 16777215,
            align_h: hmUI__namespace.align.CENTER_H,
            text_style: hmUI__namespace.text_style.WRAP
        });
        hmUI__namespace.createWidget(hmUI__namespace.widget.BUTTON, {
            x: 60,
            y: 1010,
            w: utils.px(360),
            h: utils.px(100),
            text_size: utils.px(36),
            radius: 30,
            normal_color: 2236962,
            press_color: 1052688,
            text: 'Ai视频总结',
            click_func: button_widget => {
                router.push({
                    url: 'page/videoaisummary',
                    params: JSON.stringify({
                        img_src: params.img_src,
                        vid_title: params.vid_title,
                        bv: params.bv,
                        cid,
                        up_mid: params.up_mid,
                        id: params.id
                    })
                });
            }
        });
        hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
            x: 46,
            y: 628,
            src: 'zan.png'
        });
        hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
            x: 191,
            y: 628,
            src: 'bi.png'
        });
        hmUI__namespace.createWidget(hmUI__namespace.widget.IMG, {
            x: 341,
            y: 628,
            src: 'star.png'
        }).addEventListener(hmUI__namespace.event.CLICK_DOWN, () => {
            router.push({
                url: 'page/videoreplies',
                params: JSON.stringify({
                    img_src: params.img_src,
                    vid_title: params.vid_title,
                    bv: params.bv,
                    cid: params.cid,
                    up_mid: params.up_mid,
                    id: params.id
                })
            });
        });
        hmUI__namespace.createWidget(hmUI__namespace.widget.BUTTON, {
            x: 60,
            y: 900,
            w: utils.px(360),
            h: utils.px(100),
            text_size: utils.px(36),
            radius: 30,
            normal_color: 2236962,
            press_color: 1052688,
            text: '评论区',
            click_func: button_widget => {
                router.push({
                    url: 'page/videoreplies',
                    params: JSON.stringify({
                        img_src: params.img_src,
                        vid_title: params.vid_title,
                        bv: params.bv,
                        cid: params.cid,
                        up_mid: params.up_mid,
                        id: params.id
                    })
                });
            }
        });
    },
    getVideoList() {
        this.request({
            method: 'SENDBILIGET',
            data: {
                DedeUserID: localStorage.getItem('DedeUserID'),
                SESSDATA: localStorage.getItem('SESSDATA'),
                bili_jct: localStorage.getItem('bili_jct'),
                DedeUserID__ckMd5: localStorage.getItem('DedeUserID__ckMd5'),
                buvid3: localStorage.getItem('buvid3')
            },
            url: `https://api.bilibili.com/x/web-interface/view/detail?bvid=${ params.bv }`,
            type: 'json'
        }).then(res => {
        }).catch(res => {
            console.log(res.body.data.Card.card.fans);
            this.getrenshu();
            fensi.setProperty(hmUI__namespace.prop.TEXT, formatNumber(res.body.data.Card.card.fans).toString() + '粉丝');
            zan.setProperty(hmUI__namespace.prop.TEXT, formatNumber(res.body.data.View.stat.like).toString() + '点赞');
            view.setProperty(hmUI__namespace.prop.TEXT, formatNumber(res.body.data.View.stat.view).toString() + '播放');
            time.setProperty(hmUI__namespace.prop.TEXT, '发布于 ' + timestampToDateTime(res.body.data.View.pubdate));
            bv.setProperty(hmUI__namespace.prop.TEXT, 'BV' + params.bv);
            uname.setProperty(hmUI__namespace.prop.TEXT, res.body.data.View.owner.name);
        });
    },
    getrenshu() {
        return this.httpRequest({
            method: 'get',
            url: 'https://api.bilibili.com/x/player/online/total?bvid=' + params.bv + '&cid=' + cid
        }).then(result => {
            now.setProperty(hmUI__namespace.prop.TEXT, formatNumber(result.body.data.count).toString() + ' 人在看');
        }).catch(error => {
        });
    },
    getCid(bvid) {
        this.request({
            method: 'SENDBILIGET',
            data: {
                DedeUserID: localStorage.getItem('DedeUserID'),
                SESSDATA: localStorage.getItem('SESSDATA'),
                bili_jct: localStorage.getItem('bili_jct'),
                DedeUserID__ckMd5: localStorage.getItem('DedeUserID__ckMd5'),
                buvid3: localStorage.getItem('buvid3')
            },
            url: 'https://api.bilibili.com/x/player/pagelist?bvid=' + bvid,
            type: 'json'
        }).then(res => {
            console.log(res.body.data[0].cid);
            cid = res.body.data[0].cid;
        }).catch(res => {
            console.log(res.body.data[0].cid);
            cid = res.body.data[0].cid;
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