import { MessageBuilder } from "../shared/message";
import { encWbi, InitBiliWbi } from '../utils/wbi.js';

const messageBuilder = new MessageBuilder();

const BILI_BASE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0',
  'Referer': 'https://www.bilibili.com',
  'Origin': 'https://www.bilibili.com',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/jxl,image/webp,image/png,image/svg+xml,*/*;q=0.8',
  'Accept-Encoding': '',
  'Accept-Language': 'zh-CN,zh;q=0.8',
};
async function getQRcode(res) {
    const response = await fetch('https://passport.bilibili.com/x/passport-login/web/qrcode/generate', { method: 'GET' });
    const resBody = await response.json();
    console.log(resBody);
    
    res.response({ data: [resBody.data.url, resBody.data.qrcode_key] });
}
async function checkQRStatus(res, qr_key) {
  const response = await fetch(`https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qr_key}`);
  res.response({ data: response});
}
async function sendBiliRequest(res, method, url, data, type, contentType, parameters) {
  const headers = { ...BILI_BASE_HEADERS, Cookie: `DedeUserID=${data.DedeUserID}; DedeUserID__ckMd5=${data.DedeUserID__ckMd5}; SESSDATA=${data.SESSDATA}; bili_jct=${data.bili_jct}; buvid3=${data.buvid3}` };

  console.log(`DedeUserID=${data.DedeUserID}; DedeUserID__ckMd5=${data.DedeUserID__ckMd5}; SESSDATA=${data.SESSDATA}; bili_jct=${data.bili_jct}; buvid3=${data.buvid3}`);
  
  if (contentType) headers['Content-Type'] = contentType;

  const response = await fetch(url, {
    responseType: 'json',
    method,
    headers
  });

  res.response({ data: response });
  console.log(response);
  console.log(url)
}
async function sendWbiRequest(res, method, url, data, type, paramsobj, info) {
  const init = InitBiliWbi(info);
  const headers = { ...BILI_BASE_HEADERS, Cookie: `DedeUserID=${data.DedeUserID}; DedeUserID__ckMd5=${data.DedeUserID__ckMd5}; SESSDATA=${data.SESSDATA}; bili_jct=${data.bili_jct}; buvid3=${data.buvid3}` };
  url += `?${encWbi(paramsobj, init[0], init[1])}`;

  const response = await fetch(url, {
    method,
    headers,
    credentials: 'include',
  });

  res.response({ data: response });
  console.log(response);
  console.log(url)
}
AppSideService({
  onInit() {
    messageBuilder.listen(() => { });

    messageBuilder.on("request", (res) => {
      const req = messageBuilder.buf2Json(res.request.payload);
      const { method, data, type, url, paramsobj, info, content_type, parameters, id, filename, targetName } = req;
      switch (method) {
        case "GET_QR": getQRcode(res); break;
        case "CHECK_QR_STATUS": checkQRStatus(res, data.qr_key); break;
        case "SENDBILIGET": sendBiliRequest(res, 'GET', url, data, type); break;
        case "SENDWBIGET": sendWbiRequest(res, 'GET', url, data, type, paramsobj, info); break;
        case "DOWNLOADIMAGE": downloadImage(url, filename, targetName); break;
        case "SENDBILIPOST": sendBiliRequest(res, 'POST', url, data, type, content_type, parameters); break;
        case "SENDWBIPOST": sendWbiRequest(res, 'POST', url, data, type, paramsobj, info); break;
        case "GETCOLUMNS": fetch(`https://www.bilibili.com/read/cv${id}/`).then(response => response.text()).then(html => res(parseHTMLToJSON(html))); break;
      }
    });
  },

  onRun() { },

  onDestroy() { },
});