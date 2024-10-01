import md5 from './md5.js'

const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40,
  61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11,
  36, 20, 34, 44, 52
]

// 对 imgKey 和 subKey 进行字符顺序打乱编码
const getMixinKey = (orig) => mixinKeyEncTab.map(n => orig[n]).join('').slice(0, 32)

// 为请求参数进行 wbi 签名
export function encWbi(params, img_key, sub_key) {
  const mixin_key = getMixinKey(img_key + sub_key),
    curr_time = Math.round(Date.now() / 1000),
    chr_filter = /[!'()*]/g

  Object.assign(params, { wts: curr_time }) // 添加 wts 字段
  // 按照 key 重排参数
  const query = Object
    .keys(params)
    .sort()
    .map(key => {
      // 确保 params[key] 是一个字符串
      const value = String(params[key]).replace(chr_filter, '')
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  const wbi_sign = md5(query + mixin_key) // 计算 w_rid

  return query + '&w_rid=' + wbi_sign
}

// 获取最新的 img_key 和 sub_key
export function InitBiliWbi(wbi_img) {
  if (!wbi_img || !wbi_img.img_url || !wbi_img.sub_url) {
    throw new Error('Invalid wbi_img parameter')
  }

  var img_key_parts = wbi_img.img_url.split('/')
  var img_key = img_key_parts[img_key_parts.length - 1].split('.')[0]
  var sub_key_parts = wbi_img.sub_url.split('/')
  var sub_key = sub_key_parts[sub_key_parts.length - 1].split('.')[0]

  console.log("img_key=" + img_key + " sub_key=" + sub_key)

  return [img_key, sub_key]
}
