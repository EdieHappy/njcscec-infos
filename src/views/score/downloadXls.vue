<template>
   <div class="date-select">
       <div class="set-switch">
           <van-cell center title="评分开关：">
            <template #right-icon>
                <van-switch v-model="switchFlag" size="26" inactive-color="#f4f4f4" @change="change"/>
            </template>
            </van-cell>
       </div>
       <!-- <div class="date-choose" @click="show = true">
           <div class="title">请选择日期：</div>
            <div class="date">{{formatDate(currentDate)}}</div>
       </div>
       <van-popup v-model="show"  position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                 @confirm="show = false"
            @cancel="show = false"
                />
       </van-popup> -->
       <div class="select-date">请选择要下载的时间段：</div>
       <div class="list-box">
           <van-radio-group v-model="radio">
                <van-radio :name="item.switchId" v-for="(item, index) in switchDateList" :key="index">
                    <span class="label-name">开关开启时间：{{item.startTime}}</span>
                    <span class="label-name">开关关闭时间：{{item.endTime}}</span>
                </van-radio>
            </van-radio-group>
            <div class="no-list" v-if="switchDateList.length === 0">
                暂无可下载的列表
            </div>
       </div>
       <div class="list-page">
           <div class="page-btn page-prev" v-if="pageNum > 1" @click="changePage('prev')">
               <van-button type="info">上一页</van-button>
           </div>
           <div class="page-btn page-next" v-if="pageNum < pages" @click="changePage('next')">
               <van-button type="info">下一页</van-button>
           </div>
       </div>
       <div class="download" v-if="switchDateList.length > 0">
            <a class="btn" :href="`${downloadAction}${radio}`">下载excel</a>
        </div>
   </div>
</template>

<script>
import Vue from 'vue';
import { DatetimePicker, Popup, Switch, Cell, Toast, RadioGroup, Radio, Button } from 'vant';
import { format } from 'date-fns'
Vue.use(DatetimePicker).use(Popup).use(Switch).use(Cell).use(RadioGroup).use(Radio).use(Button)
import api from '../../store/api'
const DATE_FORMAT = 'YYYY-MM'
export default {
    name: 'download',
    data() {
        return {
            switchFlag: false,
            show: false,
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            date: '',
            radio: '',
            downloadAction:`${api.domain}/nologin/excelReport.do?switchId=`,
            switchDateList: [],
            pageNum: 1,
            pageSize:10,
            pages: 0,

        }
    },
    created() {
        this.getSwitch()
        this.getAllSwitchDateList()
    },
    methods: {
        // 获取开关状态
        async getSwitch() {
            const res = await this.$store.dispatch('getSwitchFun')
            this.switchFlag = +res === 1
        },
        formatDate(date) {
            return format(date, DATE_FORMAT)
        },
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        },
        change() {
            this.changeSwitch()
        },
        // 改变开关状态
        async changeSwitch(){
            const { success, message } = await this.$store.dispatch('setSwitchFun', {
                redFlagSwitch: this.switchFlag ? 1 : 0
            })
            if(success && this.switchFlag) {
                this.switchFlag = true
            } else if(success && !this.switchFlag) {
                // 从第一页开始查
                this.pageNum = 1
                this.getAllSwitchDateList()
                this.switchFlag = false
            } else {
                Toast(message)
            }
        },
        // 获取开关闭合日期数据
        async getAllSwitchDateList() {
            const { success, message, list, pages }  = await this.$store.dispatch('getAllSwitchListFun', {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            })
            if(success) {
                this.pages = pages
                this.switchDateList = list
            } else {
                Toast(message)
            }
        },
        changePage(flag) {
            if(flag === 'prev') {
                this.pageNum --
                this.getAllSwitchDateList()
            } else if(flag === 'next') {
                this.pageNum ++
                this.getAllSwitchDateList()
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.date-select{
    background:#fff;
    height:100%;
    padding-top: rem(20);
    .set-switch{
        padding:0 rem(30);
        /deep/ .van-cell{
            padding:0;
            font-size: rem(15);
            color:#333;
            justify-content: flex-start;
            .van-cell__title{
                flex:0 1 auto;
            }
        }
    }
    .select-date{
        font-size: rem(15);
        padding:rem(20) rem(30);
    }
    .list-box{
        padding:0 rem(30);
        /deep/ .van-radio-group{
            .label-name{
                display: inline-block;
                width:100%;
            }
            .van-radio__label{
                font-size: rem(15);
            }
            .van-radio{
                margin-bottom: rem(10);
            }
        }
        .no-list{
            font-size: rem(15);
        }
    }
    .list-page{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: rem(30);
        .page-btn{
            font-size: rem(12);
            //  border:1px solid #eee;
            //  padding:rem(5) rem(10);
            //  border-radius: rem(5);
            /deep/ .van-button--normal{
                padding: 0 rem(15);
                height:rem(30);
            }
        }
        .page-next{
            margin-left: rem(20);
        }
    }
    .date-choose{
        display: flex;
        padding:rem(40) rem(30);
        align-items: center;
        justify-items: center;
        // justify-content: center;
        .title{
            font-size:rem(15);
            margin-right: rem(10);
            height: rem(36);
              line-height: rem(36);
        }
        .date{
            width:rem(150);
            height:rem(36);
            line-height: rem(36);
            border:1px solid #efefef;
            border-radius: rem(5);
            font-size: rem(15);
            padding:0 rem(20);
        }
    }
    .download{
        margin-top: rem(30);
        width: 100%;
        text-align: center;
        .btn{
            display: inline-block;
            width:rem(120);
            height:rem(36);
            text-align: center;
            background:#f4f4f4;
            line-height: rem(36);
            font-size: rem(16);
            border-radius: rem(5);
        }
    }
}
</style>