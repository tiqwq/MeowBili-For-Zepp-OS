console.log('current filepath: /app.js');
try {
  (() => {
  
const { beforeAppCreate = () => {}, afterAppCreate = () => {} } = DeviceRuntimeCore.LifeCycle;
beforeAppCreate();
const __$$G$$__ = __$$hmAppManager$$__.currentApp.__globals__.__$$G$$__;

!function (context) {
  with (context) {
    const __$$RQR$$__ = __$$R$$__;
    
let e = null;
e = 'undefined' != typeof __$$R$$__ ? __$$R$$__ : () => {
};
let t = null;
n() ? t = hmApp.getPackageInfo : i() && (t = e('@zos/app').getPackageInfo), n() ? hmUI : i() && e('@zos/ui'), n() ? hmSetting.getDeviceInfo : i() && e('@zos/device').getDeviceInfo, n() ? 'undefined' != typeof __$$app$$__ && __$$app$$__ : i() && e('@zos/i18n').getText, n() ? hmApp.gotoPage : i() && e('@zos/router').push;
let s = null;
function n() {
    return o() && r();
}
function i() {
    return o() && a();
}
function r() {
    return 'undefined' != typeof hmApp;
}
function a() {
    return 'undefined' != typeof __$$R$$__;
}
function o() {
    return r() || a();
}
n() ? s = hmBle : i() && (s = e('@zos/ble'));
let h = null;
n() ? h = DeviceRuntimeCore.HmLogger : i() ? h = e('@zos/utils').log : 'undefined' != typeof messaging && 'undefined' != typeof Logger && (h = Logger);
const d = e('@zos/utils').EventBus, p = e('@zos/timer').setTimeout, u = e('@zos/timer').clearTimeout;
function c() {
    const e = { canceled: !1 };
    return e.promise = new Promise(function (t, s) {
        e.resolve = t, e.reject = s;
    }), e.cancel = () => {
        e.canceled = !0, e.reject(new Error('Task canceled'));
    }, e;
}
function l(e, t) {
    const s = c(), n = p(() => {
            u(n), t ? t && t(s.resolve, s.reject) : s.reject('Timed out in ' + e + 'ms.');
        }, e = e || 1000);
    return s.promise;
}
function f(e) {
    return t = function (e) {
        return JSON.stringify(e);
    }(e), Buffer.from(t, 'utf-8');
    var t;
}
function y(e) {
    return t = g(e), JSON.parse(t);
    var t;
}
function g(e) {
    return e.toString('utf-8');
}
function m(e) {
    return t = function (e) {
        return Buffer.from(e);
    }(e), t.toString('hex');
    var t;
}
const I = o() ? h.getLogger('device-message') : h.getLogger('side-message'), T = void 0;
function b(e) {
    switch (e.toLowerCase()) {
    case 'json':
        return 2;
    case 'text':
    default:
        return 1;
    case 'bin':
        return 3;
    case 'empty':
        return 0;
    }
}
let k = 10000;
function L() {
    return k++;
}
let w = 1000;
function S() {
    return w++;
}
class B extends d {
    constructor(e, t, s) {
        super(), this.id = e, this.type = t, this.ctx = s, this.tempBuf = null, this.chunks = [], this.count = 0, this.finishChunk = null;
    }
    addChunk(e) {
        1 === e.opCode && (this.count = e.seqId, this.finishChunk = e), e.payloadLength === e.payload.byteLength ? (this.chunks.push(e), this.checkIfReceiveAllChunks()) : this.emit('error', Error(`receive chunk data length error, expect ${ e.payloadLength } but ${ e.payload.byteLength }`));
    }
    checkIfReceiveAllChunks() {
        if (this.count === this.chunks.length) {
            for (let e = 1; e <= this.count; e++) {
                const t = this.chunks.find(t => t.seqId === e);
                if (!t)
                    return this.releaseBuf(), void this.emit('error', Error('receive data error'));
                const s = t.payload;
                this.tempBuf = this.tempBuf ? Buffer.concat([
                    this.tempBuf,
                    s
                ]) : s;
            }
            this.finishChunk && (this.finishChunk.payload = this.tempBuf, this.finishChunk.payloadLength = this.finishChunk.payload.byteLength, this.finishChunk.totalLength === this.finishChunk.payloadLength ? this.emit('data', this.finishChunk) : this.emit('error', Error(`receive full data length error, expect ${ this.finishChunk.payloadLength } but ${ this.finishChunk.payload.byteLength }`)));
        }
    }
    getLength() {
        return this.tempBufLength;
    }
    releaseBuf() {
        this.tempBuf = null, this.chunks = [], this.finishChunk = null, this.count = 0;
    }
}
class v {
    constructor() {
        this.sessions = new Map();
    }
    key(e) {
        return `${ e.id }:${ e.type }`;
    }
    newSession(e, t, s) {
        const n = new B(e, t, s);
        return this.sessions.set(this.key(n), n), n;
    }
    destroy(e) {
        e.releaseBuf(), this.sessions.delete(this.key(e));
    }
    has(e, t) {
        return this.sessions.has(this.key({
            id: e,
            type: t
        }));
    }
    getById(e, t) {
        return this.sessions.get(this.key({
            id: e,
            type: t
        }));
    }
    clear() {
        this.sessions.clear();
    }
}
class U extends Error {
    constructor(e, t) {
        super(t), this.code = e;
    }
}
class E extends d {
    constructor({
        appId: e = 0,
        appDevicePort: t = 20,
        appSidePort: n = 0,
        ble: i = o() ? s : void 0
    } = {
        appId: 0,
        appDevicePort: 20,
        appSidePort: 0,
        ble: o() ? s : void 0
    }) {
        super(), this.isDevice = o(), this.isSide = !this.isDevice, this.appId = e, this.appDevicePort = t, this.appSidePort = n, this.ble = i, this.sendMsg = this.getSafeSend(), this.chunkSize = 3584, this.tempBuf = null, this.handlers = new Map(), this.shakeTask = null, this.waitingShakePromise = null, this.shakeStatus = 1, this.shakeTimer = 0, this.sessionMgr = new v(), this.on('response', e => {
            this.onResponse(e);
        });
    }
    fork(e = 5000) {
        return 2 === this.shakeStatus || (this.shakeTask = c(), this.waitingShakePromise = this.shakeTask.promise, this.shakeStatus = 1, this.clearShakeTimer(), this.shakeTimer = p(() => {
            this.shakeStatus = 4, this.shakeTask.reject(new U(1, 'shake timeout'));
        }, e), this.shakeStatus = 2, this.sendShake()), this.waitingShakePromise;
    }
    clearShakeTimer() {
        this.shakeTimer && u(this.shakeTimer), this.shakeTimer = 0;
    }
    getMessageSize() {
        return 3600;
    }
    getMessagePayloadSize() {
        return 3584;
    }
    getMessageHeaderSize() {
        return 16;
    }
    buf2Json(e) {
        return y(e);
    }
    json2Buf(e) {
        return f(e);
    }
    now(e = Date.now()) {
        return function (e = Date.now()) {
            return e % 10000000;
        }(e);
    }
    connect(e) {
        this.on('message', e => {
            this.onMessage(e);
        }), this.ble && this.ble.createConnect((e, t, s) => {
            this.onFragmentData(t);
        }), e && e(this);
    }
    disConnect(e) {
        this.sendClose(), this.off('message'), this.handlers.clear(), this.ble && this.ble.disConnect(), e && e(this);
    }
    listen(e) {
        this.appSidePort = globalThis.getApp().port2, messaging && messaging.peerSocket.addListener('message', e => {
            this.onMessage(e);
        }), this.waitingShakePromise = Promise.resolve(), e && e(this);
    }
    buildBin(e) {
        if (e.payload.byteLength > this.chunkSize)
            throw new Error(`${ e.payload.byteLength } greater than max size of ${ this.chunkSize }`);
        const t = this.getMessageHeaderSize() + e.payload.byteLength;
        let s = Buffer.alloc(t), n = 0;
        return s.writeUInt8(e.flag, n), n += 1, s.writeUInt8(e.version, n), n += 1, s.writeUInt16LE(e.type, n), n += 2, s.writeUInt16LE(e.port1, n), n += 2, s.writeUInt16LE(e.port2, n), n += 2, s.writeUInt32LE(e.appId, n), n += 4, s.writeUInt32LE(e.extra, n), n += 4, s.fill(e.payload, n, e.payload.byteLength + n), s;
    }
    buildShake() {
        return this.buildBin({
            flag: 1,
            version: 1,
            type: 1,
            port1: this.appDevicePort,
            port2: this.appSidePort,
            appId: this.appId,
            extra: 0,
            payload: Buffer.from([this.appId])
        });
    }
    sendShake() {
        const e = this.buildShake();
        this.sendMsg(e);
    }
    buildClose() {
        return this.buildBin({
            flag: 1,
            version: 1,
            type: 2,
            port1: this.appDevicePort,
            port2: this.appSidePort,
            appId: this.appId,
            extra: 0,
            payload: Buffer.from([this.appId])
        });
    }
    sendClose() {
        const e = this.buildClose();
        this.sendMsg(e);
    }
    readBin(e) {
        const t = Buffer.from(e);
        let s = 0;
        const n = t.readUInt8(s);
        s += 1;
        const i = t.readUInt8(s);
        s += 1;
        const r = t.readUInt16LE(s);
        s += 2;
        const a = t.readUInt16LE(s);
        s += 2;
        const o = t.readUInt16LE(s);
        s += 2;
        const h = t.readUInt32LE(s);
        s += 4;
        const d = t.readUInt32LE(s);
        return s += 4, {
            flag: n,
            version: i,
            type: r,
            port1: a,
            port2: o,
            appId: h,
            extra: d,
            payload: t.subarray(s)
        };
    }
    buildData(e, t = {}) {
        return this.buildBin({
            flag: 1,
            version: 1,
            type: 4,
            port1: this.appDevicePort,
            port2: this.appSidePort,
            appId: this.appId,
            extra: 0,
            ...t,
            payload: e
        });
    }
    sendBin(e, t = T) {
        if (t && I.warn('[RAW] [S] send size=%d bin=%s', e.byteLength, m(e.buffer)), !this.ble.send(e.buffer, e.byteLength))
            throw Error('send message error');
    }
    sendBinBySide(e, t = T) {
        t && I.warn('[RAW] [S] send size=%d bin=%s', e.byteLength, m(e.buffer)), messaging.peerSocket.send(e.buffer);
    }
    getSafeSend() {
        return this.isDevice ? this.sendBin.bind(this) : this.sendBinBySide.bind(this);
    }
    sendHmProtocol({
        requestId: e,
        dataBin: t,
        type: s,
        contentType: n,
        dataType: i
    }, {
        messageType: r = 4
    } = {}) {
        const a = 3518, o = t.byteLength;
        let h = 0;
        const d = Buffer.alloc(a), p = e || L(), u = S();
        let c = 1;
        const l = Math.ceil(o / a);
        function f() {
            return c++;
        }
        for (let e = 1; e <= l; e++) {
            if (this.errorIfBleDisconnect(), e === l) {
                const e = o - h, a = Buffer.alloc(0 + e);
                t.copy(a, 0, h, h + e), h += e, this.sendDataWithSession({
                    traceId: p,
                    spanId: u,
                    seqId: f(),
                    payload: a,
                    type: s,
                    opCode: 1,
                    totalLength: o,
                    contentType: n,
                    dataType: i
                }, { messageType: r });
                break;
            }
            t.copy(d, 0, h, h + a), h += a, this.sendDataWithSession({
                traceId: p,
                spanId: u,
                seqId: f(),
                payload: d,
                type: s,
                opCode: 0,
                totalLength: o,
                contentType: n,
                dataType: i
            }, { messageType: r });
        }
    }
    sendJson({
        requestId: e = 0,
        json: t,
        type: s = 1,
        contentType: n,
        dataType: i
    }) {
        const r = f(t), a = e || L();
        this.sendHmProtocol({
            requestId: a,
            dataBin: r,
            type: s,
            contentType: n,
            dataType: i
        });
    }
    sendBuf({
        requestId: e = 0,
        buf: t,
        type: s = 1,
        contentType: n,
        dataType: i
    }) {
        const r = e || L();
        return this.sendHmProtocol({
            requestId: r,
            dataBin: t,
            type: s,
            contentType: n,
            dataType: i
        });
    }
    sendDataWithSession({
        traceId: e,
        spanId: t,
        seqId: s,
        payload: n,
        type: i,
        opCode: r,
        totalLength: a,
        contentType: o,
        dataType: h
    }, {messageType: d}) {
        const p = this.buildPayload({
            traceId: e,
            spanId: t,
            seqId: s,
            totalLength: a,
            type: i,
            opCode: r,
            payload: n,
            contentType: o,
            dataType: h
        });
        let u = this.isDevice ? this.buildData(p, { type: d }) : p;
        this.sendMsg(u);
    }
    buildPayload(e) {
        const t = 66 + e.payload.byteLength;
        let s = Buffer.alloc(t), n = 0;
        return s.writeUInt32LE(e.traceId, n), n += 4, s.writeUInt32LE(0, n), n += 4, s.writeUInt32LE(e.spanId, n), n += 4, s.writeUInt32LE(e.seqId, n), n += 4, s.writeUInt32LE(e.totalLength, n), n += 4, s.writeUInt32LE(e.payload.byteLength, n), n += 4, s.writeUInt8(e.type, n), n += 1, s.writeUInt8(e.opCode, n), n += 1, s.writeUInt32LE(this.now(), n), n += 4, s.writeUInt32LE(0, n), n += 4, s.writeUInt32LE(0, n), n += 4, s.writeUInt32LE(0, n), n += 4, s.writeUInt32LE(0, n), n += 4, s.writeUInt32LE(0, n), n += 4, s.writeUInt32LE(0, n), n += 4, s.writeUInt8(e.contentType, n), n += 1, s.writeUInt8(e.dataType, n), n += 1, s.writeUInt16LE(0, n), n += 2, s.writeUInt32LE(0, n), n += 4, s.writeUInt32LE(0, n), n += 4, s.fill(e.payload, n, e.payload.byteLength + n), s;
    }
    readPayload(e) {
        const t = Buffer.from(e);
        let s = 0;
        const n = t.readUInt32LE(s);
        s += 4;
        const i = t.readUInt32LE(s);
        s += 4;
        const r = t.readUInt32LE(s);
        s += 4;
        const a = t.readUInt32LE(s);
        s += 4;
        const o = t.readUInt32LE(s);
        s += 4;
        const h = t.readUInt32LE(s);
        s += 4;
        const d = t.readUInt8(s);
        s += 1;
        const p = t.readUInt8(s);
        s += 1;
        const u = t.readUInt32LE(s);
        s += 4;
        const c = t.readUInt32LE(s);
        s += 4;
        const l = t.readUInt32LE(s);
        s += 4;
        const f = t.readUInt32LE(s);
        s += 4;
        const y = t.readUInt32LE(s);
        s += 4;
        const g = t.readUInt32LE(s);
        s += 4;
        const m = t.readUInt32LE(s);
        s += 4;
        const I = t.readUInt8(s);
        s += 1;
        const T = t.readUInt8(s);
        s += 1;
        const b = t.readUInt16LE(s);
        s += 2;
        const k = t.readUInt32LE(s);
        s += 4;
        const L = t.readUInt32LE(s);
        return s += 4, {
            traceId: n,
            parentId: i,
            spanId: r,
            seqId: a,
            totalLength: o,
            payloadLength: h,
            payloadType: d,
            opCode: p,
            contentType: I,
            dataType: T,
            timestamp1: u,
            timestamp2: c,
            timestamp3: l,
            timestamp4: f,
            timestamp5: y,
            timestamp6: g,
            timestamp7: m,
            extra1: b,
            extra2: k,
            extra3: L,
            payload: t.subarray(s)
        };
    }
    onFragmentData(e) {
        const t = this.readBin(e);
        this.emit('raw', e), 1 === t.flag && 1 === t.type ? (this.appSidePort = t.port2, this.emit('shake:response', t), this.clearShakeTimer(), this.shakeTask.resolve(), this.shakeStatus = 3) : 1 === t.flag && 4 === t.type || 1 === t.flag && 5 === t.type ? (this.emit('message', t.payload), this.emit('read', t)) : 1 === t.flag && 6 === t.type ? this.emit('log', t.payload) : 0 === t.flag || 1 === t.flag && 2 === t.type && (this.appSidePort = 0);
    }
    errorIfBleDisconnect() {
        if (o() && !this.ble.connectStatus())
            throw new U(2, 'ble disconnect');
    }
    errorIfSideServiceDisconnect() {
        if (o && !this.appSidePort)
            throw new U(3, 'side service is not running');
    }
    getRequestCount() {
        return this.handlers.size;
    }
    onResponse(e) {
        const t = this.handlers.get(e.traceId);
        t && t(e);
    }
    onMessage(e) {
        const t = this.readPayload(e);
        let s = this.sessionMgr.getById(t.traceId, t.payloadType);
        s || (s = this.sessionMgr.newSession(t.traceId, t.payloadType, this), s.on('data', e => {
            1 === e.opCode && (1 === e.payloadType ? this.emit('request', {
                request: e,
                response: ({data: t}) => {
                    this.response({
                        requestId: e.traceId,
                        contentType: e.contentType,
                        dataType: e.dataType,
                        data: t
                    });
                }
            }) : 2 === e.payloadType ? this.emit('response', e) : 3 === e.payloadType && this.emit('call', e), this.emit('data', e), this.sessionMgr.destroy(s));
        }), s.on('error', e => {
            this.sessionMgr.destroy(s), this.emit('error', e);
        })), s.addChunk(t);
    }
    request(e, t) {
        try {
            this.errorIfBleDisconnect();
        } catch (e) {
            return Promise.reject(e);
        }
        return this.waitingShakePromise.then(() => {
            this.errorIfBleDisconnect(), this.errorIfSideServiceDisconnect();
            const s = L(), n = c();
            t = Object.assign({
                timeout: 60000,
                contentType: 'json',
                dataType: 'json'
            }, t), this.handlers.set(s, ({
                traceId: e,
                payload: t,
                dataType: s
            }) => {
                let i;
                switch (this.errorIfBleDisconnect(), this.errorIfSideServiceDisconnect(), s) {
                case 1:
                    i = g(t);
                    break;
                case 3:
                default:
                    i = t;
                    break;
                case 2:
                    i = y(t);
                }
                n.resolve(i);
            }), Buffer.isBuffer(e) ? this.sendBuf({
                requestId: s,
                buf: e,
                type: 1,
                contentType: 3,
                dataType: b(t.dataType)
            }) : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? this.sendBuf({
                requestId: s,
                buf: Buffer.from(e),
                type: 1,
                contentType: 3,
                dataType: b(t.dataType)
            }) : this.sendJson({
                requestId: s,
                json: e,
                type: 1,
                contentType: 2,
                dataType: b(t.dataType)
            });
            let i = !1;
            return Promise.race([
                l(t.timeout, (e, s) => {
                    if (i)
                        return e();
                    s(new U(4, `request timed out in ${ t.timeout }ms.`));
                }),
                n.promise.finally(() => {
                    i = !0;
                })
            ]).catch(e => {
                throw e;
            }).finally(() => {
                this.handlers.delete(s);
            });
        });
    }
    response({
        requestId: e,
        contentType: t,
        dataType: s,
        data: n
    }) {
        3 === s ? this.sendBuf({
            requestId: e,
            buf: n,
            type: 2,
            contentType: t,
            dataType: s
        }) : this.sendJson({
            requestId: e,
            json: n,
            type: 2,
            contentType: t,
            dataType: s
        });
    }
    call(e) {
        return this.waitingShakePromise.then(() => Buffer.isBuffer(e) ? this.sendBuf({
            buf: e,
            type: 3,
            contentType: 3,
            dataType: 0
        }) : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? this.sendBuf({
            buf: Buffer.from(e),
            type: 3,
            contentType: 3,
            dataType: 0
        }) : this.sendJson({
            json: e,
            type: 3,
            contentType: 2,
            dataType: 0
        }));
    }
}
h.getLogger('message-builder');
const C = e('@zos/ble/TransferFile'), q = (P = new C(), {
        onFile(e) {
            return e ? (void 0 === P || P.inbox.on('newfile', function () {
                const t = P.inbox.getNextFile();
                e && e(t);
            }), this) : this;
        },
        onSideServiceFileFinished(e) {
            return e ? (void 0 === P || P.inbox.on('file', function () {
                const t = P.inbox.getNextFile();
                e && e(t);
            }), this) : this;
        },
        emitFile() {
            return P.inbox.emit('file'), this;
        },
        offFile() {
            return void 0 === P || (P.inbox.off('newfile'), P.inbox.off('file')), this;
        },
        getFile: () => void 0 === P ? null : P.inbox.getNextFile(),
        sendFile(e, t) {
            if (void 0 === P)
                throw new Error('fileTransfer is not available');
            return P.outbox.enqueueFile(e, t);
        }
    });
var P;
function D({
    globalData: e = {},
    onCreate: s,
    onDestroy: n,
    ...i
} = {}) {
    return {
        globalData: e,
        ...i,
        onCreate(...e) {
            const n = (i = new E({
                appId: t().appId,
                appDevicePort: 20,
                appSidePort: 0
            }), {
                shakeTimeout: 5000,
                requestTimeout: 60000,
                onCall(e) {
                    return e ? (i.on('call', ({payload: t}) => {
                        const s = i.buf2Json(t);
                        e && e(s);
                    }), this) : this;
                },
                offOnCall(e) {
                    return i.off('call', e), this;
                },
                call(e) {
                    return o() && i.fork(this.shakeTimeout), i.call({
                        jsonrpc: 'hmrpcv1',
                        ...e
                    });
                },
                onRequest(e) {
                    return e ? (i.on('request', t => {
                        const s = i.buf2Json(t.request.payload);
                        e && e(s, (e, s) => e ? t.response({ data: { error: e } }) : t.response({ data: { result: s } }));
                    }), this) : this;
                },
                cancelAllRequest() {
                    return i.off('response'), this;
                },
                offOnRequest(e) {
                    return i.off('request', e), this;
                },
                request(e) {
                    return o() && i.fork(this.shakeTimeout), i.request({
                        jsonrpc: 'hmrpcv1',
                        ...e
                    }, { timeout: this.requestTimeout }).then(({
                        error: e,
                        result: t
                    }) => {
                        if (e)
                            throw e;
                        return t;
                    });
                },
                connect() {
                    return i.connect(() => {
                    }), this;
                },
                disConnect() {
                    return this.cancelAllRequest(), this.offOnRequest(), this.offOnCall(), i.disConnect(() => {
                    }), this;
                },
                start() {
                    return i.listen(() => {
                    }), this;
                },
                stop() {
                    return this.cancelAllRequest(), this.offOnRequest(), this.offOnCall(), i.disConnect(() => {
                    }), this;
                }
            });
            var i;
            this.globalData.messaging = n, n.onCall(this.onCall?.bind(this)).onRequest(this.onRequest?.bind(this)).connect(), q.onFile(this.onReceivedFile?.bind(this)), s?.apply(this, e);
        },
        onDestroy(...e) {
            this.globalData.messaging.offOnCall().offOnRequest().disConnect(), q.offFile(), n?.apply(this, e);
        },
        httpRequest: e => messaging.request({
            method: 'http.request',
            params: e
        })
    };
}
__$$app$$__.app = App(D({
    globalData: { back: 0 },
    onCreate(options) {
        console.log('app on create invoke');
    },
    onDestroy(options) {
        console.log('app on destroy invoke');
    }
}));
;
  }
}.bind(__$$G$$__)(__$$G$$__);
afterAppCreate();;
  })();
} catch(e) {
  
console.log('Mini Program Error', e);
e && e.stack && e.stack.split(/\n/).forEach(i => console.log("error stack", i));
;
/* todo */
}