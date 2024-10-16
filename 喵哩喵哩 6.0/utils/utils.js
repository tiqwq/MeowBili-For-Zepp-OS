export function formatNumber(num,type) {
    let k = type == 'text' ? '千' : 'k'
    let w = type == 'text' ? '万' : 'w'
    if (num < 1000) {
      return num.toString();
    }
    else if (num < 10000) {
      return (num / 1000).toFixed(1) + k;
    }
    else {
      return (num / 10000).toFixed(1) + w
    }
}
export function parseBilibiliLoginUrl(url) {
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

export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

export let textContent = [
  "你所热爱的，就是你热爱的",
  "让我猜猜你现在使用的设备是...？",
  "zepp bili不够zepp怎么办？",
  "富哥V一点好不好，球球了",
  "有没有遇见将军大人Rechrd？",
  "关注永雏塔菲谢谢喵~",
  "关注孙笑川258谢谢喵~",
  "关注七海nanami谢谢喵~",
  "关注芽衣子OvO谢谢喵~",
  "关注嘉然今天吃什么谢谢喵~",
  "我觉得这是一种自信",
  "让我们保持忠！诚！",
  "雷军！金凡！",
  "Powered By Re:Bydour",
  "\"游戏不开挂不好玩。\"",
  "快去盯着搜索星做hyper bili。",
  "早上好中国，现在我有冰淇淋",
  "你这辈子就是被黑神话悟空害了。",
  "你他妈可别上课摸鱼。",
  "我是雷军，你们都给我去玩MIUI全防"
]

export function timestampToDateTime(timestamp) {
  let date = new Date(timestamp * 1000)
  let year = date.getFullYear()
  let month = ('0' + (date.getMonth() + 1)).slice(-2)//月份从0开始需加1补零
  let day = ('0' + date.getDate()).slice(-2)//补零
  let hours = ('0' + date.getHours()).slice(-2)//补零
  let minutes = ('0' + date.getMinutes()).slice(-2)//补零
  let seconds = ('0' + date.getSeconds()).slice(-2)//补零
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function extractTextFromHTML(htmlString) {
  const text = htmlString.replace(/<[^>]*>/g, '');
  return text.trim();
}

export function decodeUnicodeEscape(data) {
  if (typeof data === 'string') {
      return data.replace(/\\u([\dA-Fa-f]{4})/g, function (match, grp) {
          return String.fromCharCode(parseInt(grp, 16));
      })
  } else if (typeof data === 'object') {
      for (let key in data) {
          if (data.hasOwnProperty(key)) {
              data[key] = decodeUnicodeEscape(data[key]);
          }
      }
  }
  return data;
}

export function parseArticles(jsonData) {
  const articles = jsonData.data.result;
  const parsedArticles = articles.map(article => {
      let title = article.title.replace(/<[^>]+>/g, '');
      let desc = article.desc.replace(/<[^>]+>/g, '');
      return {
          title: title,
          description: desc,
          id : article.id,
          view: article.view,
          like: article.like,
          reply: article.reply
      };
  });
  return parsedArticles;
}