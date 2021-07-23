// 接口地址
// const domain = process.env.NODE_ENV === 'production' ? 'http://47.102.121.177:8080' : 'http://api.foo.com'
const domain = process.env.NODE_ENV === 'production' ? 'http://106.14.40.49:8083' : 'http://api.foo.com:8080'
export default {
    domain: `${domain}`,
    redFlagScoreApi: `${domain}/nologin/redFlagScore.do`, // 提交评分
    getSwitchApi: `${domain}/nologin/getSwitch`, // 获取开关
    setSwitchApi: `${domain}/nologin/redFlagSwitch.do`,  // 设置开关
    getAllSwitchListApi: `${domain}/nologin/searchRedSwitch`,   // 获取所有开关闭合时间段
}