/*
 * @Author: caomin 
 * @Desc: 接口
 * @Date: 2021-01-19 11:04:12 
 * @Last Modified by: caomin
 * @Last Modified time: 2021-05-26 10:28:51
 */
import _ from 'lodash'
import request from '../lib/request'
import api from './api'
import qs from 'qs'

export default {
    /**
     * 提交评分
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
     async addScoreFun({commit}, params) {
        return await request(`${api.redFlagScoreApi}`, {
            method: 'POST',
            mode:"cors",
            body: JSON.stringify(params)
        }, {
            shouldLogin: json => +_.get(json, 'code') === 100000
        })
    },
    /**
     * 获取开关状态
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getSwitchFun({commit}, params) {
        return await request(`${api.getSwitchApi}`)
    },
    /**
     * 设置开关
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
     async setSwitchFun({commit}, params) {
        return await request(`${api.setSwitchApi}`, {
            method: 'POST',
            body: qs.stringify({...params}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        }, {
            shouldLogin: json => +_.get(json, 'code') === 100000
        })
    },
    /**
     * 获取开关闭合数据列表
     * @param {*} param0 
     * @param {*} params 
     * @returns 
     */
    async getAllSwitchListFun({commit}, params) {
        return await request(`${api.getAllSwitchListApi}?pageNum=${params.pageNum}&pageSize=${params.pageSize}`)
    }
}