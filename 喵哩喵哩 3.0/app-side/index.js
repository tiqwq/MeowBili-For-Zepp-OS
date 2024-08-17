import { BaseSideService } from "@zeppos/zml/base-side";
import { encWbi , InitBiliWbi } from '../utils/wbi.js'
const BILI_BASE_HEADERS = {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/127.0.0.0",
  "TE": "trailers",
  "Referer": "https://www.bilibili.com",
  "Origin": "https://www.bilibili.com",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
}
async function fetchData(res) {
  try {
    const response = await fetch('https://passport.bilibili.com/x/passport-login/web/qrcode/generate', {
      method: 'GET'
    });
    const resBody = await response.json();
    console.log(resBody);
    res(null, {
      result: [resBody.data.url, resBody.data.qrcode_key],
    });
  } catch (error) {
    res(null, { 
      result: "ERROR",
    });
  }
};

async function checkQRStatus(res, qr_key) {
  console.log(qr_key);
    const response = await fetch(`https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qr_key}`);
    console.log(response.body.data.url);

    res(response)
}; 
async function SendBiliGET(res,type,data,url){
  var headers = BILI_BASE_HEADERS;
  headers["Cookie"] =  "DedeUserID=" + data.DedeUserID +  
  "; DedeUserID__ckMd5=" + data.DedeUserID__ckMd5 + 
  "; SESSDATA=" + data.SESSDATA + 
  "; bili_jct=" + data.bili_jct + 
  "; buvid3=" + data.buvid3;
  console.log("DedeUserID=" + data.DedeUserID +  
  "; DedeUserID__ckMd5=" + data.DedeUserID__ckMd5 + 
  "; SESSDATA=" + data.SESSDATA + 
  "; bili_jct=" + data.bili_jct + 
  "; buvid3=" + data.buvid3);
  var ret = await fetch(url,
    {
      method: 'GET',
      responseType: type,
      headers: headers  
    }
    );
    console.log(ret);
    res(ret);
} 
async function SendWbiGET(res,url, data,type, paramsobj,info){
  console.log(info);
  console.log(info.body.data.face);
  let init = InitBiliWbi(info.body.data.wbi_img)
  var headers = BILI_BASE_HEADERS;
  headers["Cookie"] =  
  "DedeUserID=" + data.DedeUserID +  
  "; DedeUserID__ckMd5=" + data.DedeUserID__ckMd5 + 
  "; SESSDATA=" + data.SESSDATA + 
  "; bili_jct=" + data.bili_jct + 
  "; buvid3=" + data.buvid3;
  url = url + "?" + encWbi(paramsobj, init[0], init[1])
  console.log("WbiGet URL: " + url)
  var ret = await fetch({
      url: url,
      responseType: type,
      headers: headers
  });
  console.log(ret);
  res(ret)
}
async function DownloadImage(url,filename,targetName) {
  network.downloader.downloadFile({
    url: url,
    timeout: 60000,
    filePath: 'data://download/' + filename
  })
  image
  .convert({
    filePath: 'data://download/test.png',
    targetFilePath: 'data://download/' + targetName
  })
  .then((result) => {
    console.log(result.targetFilePath) // data://download/converted_test.pang
  })
}
AppSideService( 
  BaseSideService({
    onInit() {},

    onRequest(req, res) {
      console.log("=====>,", req.method);
      if (req.method === "GET_DATA") {
        fetchData(res);
      } else if (req.method === "CHECK_QR_STATUS") {
        checkQRStatus(res, req.data.qr_key);
      }else if (req.method == "SENDBILIGET") {
        SendBiliGET(res,req.type,req.data,req.url)
      } else if (req.method == "SENDWBIGET") {
        SendWbiGET(res,req.url,req.data,req.type,req.paramsobj,req.info)
      } else if (req.method == "DOWNLOADIMAGE") {
        DownloadImage(req.url,req.filename,req.targetName)
      }
    },

    onRun() {},

    onDestroy() {},
  })
);