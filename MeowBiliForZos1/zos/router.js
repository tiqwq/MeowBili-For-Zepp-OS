  export function back() {
    hmApp.goBack()
  }
  export function home() {
    hmApp.gotoHome()
  }
  export function push(page) {
    hmApp.gotoPage({ url: page.url, param: page.params });
  }
  export function replace(page) {
    hmApp.reloadPage({ url: page.url, param: page.params })
  }
  