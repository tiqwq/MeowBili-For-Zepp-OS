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