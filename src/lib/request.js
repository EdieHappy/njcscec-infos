import 'whatwg-fetch'
import _ from 'lodash'
import utils from './utils'
import { Dialog } from 'vant';

let timeoutRequestTime = 0
var oldFetchfn = fetch; //拦截原始的fetch方法
window.fetch = function(input, opts){ //定义新的fetch方法，封装原有的fetch方法
    // console.log('opts', opts)
    var fetchPromise = oldFetchfn(input, opts);
    var timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
             reject({
                error: new Error("fetch timeout"),
                timeoutFlag: 1,
             })
        }, opts.timeout)
    });
    return Promise.race([fetchPromise, timeoutPromise])
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

/**
 * Requests a URL, returning a promise.
 *
 * @param {string} url       The URL we want to request
 * @param {object} [options] The options we want to pass to "fetch"
 * @param {object} params
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url = '', options = {}, params = {}) {
  const {
    codeField = 'code',
    msgField = 'msg',
    isSuccess = () => true,
    shouldLogin = () => false,
    noStringify = false,
    noCatchAlert = false
  } = params

  const defaultOptions = {
    credentials: 'include',
    timeout: 5000,
    timeoutRequestTime: 0
  }
  const newOptions = {
    ...defaultOptions,
    ...options
  }
  if (!noStringify && ['POST', 'PUT', 'DELETE'].includes(newOptions.method)) {
    newOptions.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      ...newOptions.headers,
    }
    if (_.isObject(newOptions.body)) {
      newOptions.body = JSON.stringify(newOptions.body)
    }
  }
  async function execFetch() {
   return await window.fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      if (json.code === '-1' || shouldLogin(json)) {
        return utils.login()
      } else if (isSuccess(json)) {
        return json
      } else {
        throw json
      }
    })
    .catch((error) => {
      if (_.isEmpty(error)) {
        return
      }
      // 判断超时
      if (error.timeoutFlag && timeoutRequestTime <= 10) {
        timeoutRequestTime ++
        return execFetch()
      } else if (error.timeoutFlag && timeoutRequestTime > 10 ) {
        if (!noCatchAlert) {
            Dialog.alert({
            message:'网络超时，请稍后再试',
            type:'error',
            offset: 100
          })
        }
        return
      }
      if (error.code || error[codeField]) {
          if (error.code === '10000' ) { // token失效
              return utils.login()
          }
      } else if (!noCatchAlert) {
        // if(error.response && error.response.status === 403) {
        //   return utils.login()
        // } else {
        //     Dialog.alert({
        //     message: error.message || '网络错误',
        //     type:'error',
        //     offset: 100
        //   })
        // }
      }
      throw error
    })
  }

  return execFetch()
}
