
const utils = {
    getHost: function () {
      const hn = location.hostname
      return `//${hn}`
    },
    login: function() {
      // return window.location.href = `http://test.foo.com:8080/pc/smartsite/login?redirect=${encodeURIComponent(window.location.href)}`
      let currentHref = location.href
      let domain = document.domain
      if(currentHref.indexOf('front') !== -1) {
         return window.location.href = `//${domain}/pc/searchCer/front/login`
      }
      return window.location.href = `//${domain}/pc/searchCer/cms/login?redirect=${encodeURIComponent(window.location.href)}`
    },
    _isMobile() {
      let ua = window.navigator.userAgent.toLowerCase();
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag || ua.indexOf('micromessenger') > -1;
    },
    /**
     * 设置页面标题
     * @param {String} title
     */
    setTitle(title) {
      document.title = title
    }
  }
  
  export default utils