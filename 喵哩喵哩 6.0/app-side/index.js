import { BaseSideService } from "@zeppos/zml/base-side";
import { encWbi, InitBiliWbi } from '../utils/wbi.js';

const BILI_BASE_HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/jxl,image/webp,image/png,image/svg+xml,*/*;q=0.8',
    'Accept-Encoding': '',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Referer': 'https://www.bilibili.com',
    'Origin': 'https://www.bilibili.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0'
};

function parseHTMLToJSON(html) {
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim().split(' - 哔哩哔哩')[0].trim() || '';
  const author = (html.match(/<meta[^>]*name="author"[^>]*content="([^"]*)"/i) || [])[1]?.trim() || '';
  const publishTime = (html.match(/<span[^>]*class="publish-text"[^>]*>([^<]*)<\/span>/i) || [])[1]?.trim() || '';
  const articleContent = (html.match(/<div[^>]*id="article-content"[^>]*>([\s\S]*?)<\/div>/i) || [])[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || '';

  return {
    title,
    author,
    article: {
      content: articleContent,
      publishTime,
    },
  };
}

async function getQRcode(res) {
  try {
    const response = await fetch('https://passport.bilibili.com/x/passport-login/web/qrcode/generate', { method: 'GET' });
    const resBody = await response.json();
    res(null, { result: [resBody.data.url, resBody.data.qrcode_key] });
  } catch {
    res(null, { result: "ERROR" });
  }
}

async function checkQRStatus(res, qr_key) {
  const response = await fetch(`https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qr_key}`);
  res(null,response);
}

async function sendBiliRequest(res, method, url, data, type, contentType, parameters) {
  const headers = { ...BILI_BASE_HEADERS, Cookie: `DedeUserID=${data.DedeUserID}; DedeUserID__ckMd5=${data.DedeUserID__ckMd5}; SESSDATA=${data.SESSDATA}; bili_jct=${data.bili_jct}; buvid3=${data.buvid3}` };
  if (contentType) headers['Content-Type'] = contentType;

  const response = await fetch(url, {
    responseType: 'json',
    method,
    headers
  });

  res(null,response);
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

  res(null,response);
  console.log(response);
  console.log(url)
}

async function downloadImage(url, filename, targetName) {
  await network.downloader.downloadFile({ url, timeout: 60000, filePath: `data://download/${filename}` });
  await image.convert({ filePath: `data://download/${filename}`, targetFilePath: `data://download/${targetName}` });
}

async function updateCheck(res) {
  const response = await fetch(`https://gitee.com/Strunge/meow-bili-other/raw/master/version`);
  console.log(response);
  
  res(null,response);
}

async function getSuggestVideo(res) {
  const response = await fetch(`https://gitee.com/Strunge/meow-bili-other/raw/master/suggest.json`);
  console.log(response);
   
  res(null,response);
}

async function getBulletin(res) {
  const response = await fetch(`https://gitee.com/Strunge/meow-bili-other/raw/master/announcement.json`);
  console.log(response);
   
  res(null,response);
}
AppSideService(
  BaseSideService({
    onInit() {},

    onRequest(req, res) {
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
        case "UPDATECHECK": updateCheck(res); break;
        case "GETSUGGESTVIDEO": getSuggestVideo(res); break;
        case "GETBULLETIN": getBulletin(res); break;
      }
    },

    onRun() {},

    onDestroy() {},
  })
);