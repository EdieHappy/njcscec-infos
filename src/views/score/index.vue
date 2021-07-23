<template>
  <div class="score-page">
    <div class="logo">
      <img src="../../assets/img/score-top.png" alt="">
    </div>
    <div class="depart-list">
       <div class="depart-item" v-for="(item, index) in departList" :key="index">
         <div class="depart-info" @click="scoreAction(item)">
           <div :class="`depart-icon ${item.icon}`"></div>
           <div class="depart-name">
             <p class="name">{{item.department}}</p>
             <p class="user">{{item.user}}</p>
           </div>
           <div class="score-detail">
             总分：{{totalScore(item.qualityOfWork, item.grassrootsServices, item.orgAndCoordinate, item.teamBuilding, item.laborDiscipline)}}
           </div>
           <div :class="`depart-arr ${item.show ? 'arr-down' : ''}`"></div>
         </div>
         <div class="depart-score" v-if="item.show">
           <div class="score-item">
              <div class="score-name">工作完成质量</div>
              <van-stepper v-model="item.qualityOfWork" step="1" max="20" min="0" integer />
           </div>
           <div class="score-item">
              <div class="score-name">基层服务水平</div>
              <van-stepper v-model="item.grassrootsServices" step="1" max="20" min="0" integer/>
           </div>
           <div class="score-item">
              <div class="score-name">组织协调能力</div>
              <van-stepper v-model="item.orgAndCoordinate" step="1" max="20" min="0" integer />
           </div>
           <div class="score-item">
              <div class="score-name">团队建设情况</div>
              <van-stepper v-model="item.teamBuilding" step="1" max="20" min="0" integer />
           </div>
           <div class="score-item">
              <div class="score-name">遵守劳动纪律</div>
              <van-stepper v-model="item.laborDiscipline" step="1" max="20" min="0" integer />
           </div>
         </div>
       </div>
    </div>
    <div class="score-submit">
        <div class="button-submit" @click="sumbitScore" v-if="!sumbitSuccess">提交</div>
        <div class="submit-success" v-else><i class="icon-success"></i><span>提交成功，感谢您的评分！</span></div>
      </div>
  </div>
  
</template>

<script>
import Vue from 'vue';
import { Stepper } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
Vue.use(Toast);
import _ from 'lodash'
Vue.use(Stepper);
Vue.use(Dialog);
export default {
  name: 'score',
  components:{},
  data(){
    return {      
      sumbitSuccess: false, // 是否提交成功
      switchFlag: false,  // 开关
      departList: [
        { department: '党建工作部', user: '吴洋', 
          qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
          icon: 'icon-dj',
          show: false,
        },
         { department: '人力资源部', user: '周正安', 
          qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
          icon: 'icon-rl',
          show: false
        },
        { department: '综合办公室', user: '丁燕康',
           qualityOfWork: 20,
            grassrootsServices: 20,
            orgAndCoordinate: 20,
            teamBuilding: 20,
            laborDiscipline: 20,
            totalScore: 100,
           icon:'icon-zh',
           show: false
        },
         { department: '财务资金部', user: '左杰', 
          qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
          icon:'icon-cw',
          show: false
        },
         { department: '安全生产部', user: '侯立昀',
          qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
          icon: 'icon-aq',
         show: false},
         { department: '科技质量部', user: '宫瑾', 
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon:'icon-kj',
         show: false},
         { department: '项目管理部', user: '吕海军',
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon:'icon-xm',
         show: false},
         { department: '采购管理中心', user: '龚艳春',
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon:'icon-cg',
         show: false},
         { department: '市场营销部', user: '林凯', 
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon:'icon-sc',
         show: false},
         { department: '合约法务部', user: '闵岩',
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon:'icon-hy',
         show: false},
         { department: '军民融合部', user: '刘开昂',
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon:'icon-jm',
         show: false},
         { department: '技术中心', user: '高增孝',
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon: 'icon-js',
         show: false},
          { department: '商务管理部', user: '颜婷秀',
         qualityOfWork: 20,
          grassrootsServices: 20,
          orgAndCoordinate: 20,
          teamBuilding: 20,
          laborDiscipline: 20,
          totalScore: 100,
        icon: 'icon-js',
         show: false},
      ]
    }
  },
  created(){
    this.getSwitch()
    this.departList.sort(function(){
          return Math.random()-0.5
        })
  },
  mounted(){},
  watch:{},
  computed:{},
  methods:{
    async getSwitch() {
      const res = await this.$store.dispatch('getSwitchFun')
      this.switchFlag = +res === 1
      if(+res !== 1){
        Toast('请联系党建部打开评分开关')
      }
    },
    totalScore(p1, p2, p3, p4, p5) {
      let arr = [p1, p2, p3, p4, p5]
      return _.sum(arr)
    },
    scoreAction(item) {
      item.show = !item.show
    },
    async sumbitScore() {
      await this.getSwitch()
      if(!this.switchFlag){
        Toast('请联系党建部打开评分开关')
        return
      }
      let scoreFlag = true
      this.departList.forEach(item => {
        item.totalScore = _.sum([item.qualityOfWork, item.orgAndCoordinate, item.teamBuilding, item.laborDiscipline, item.grassrootsServices])
        this.$set(item, 'isLeaderScore', +this.$route.query.flag || 1) // 1 为领导评分，2 为部门经理评分
        if(+item.totalScore === 0)  {
          let cancelButtonText =  '返回继续评分'
          let showConfirmButton = false
          // Toast(`${item.department}尚未评分！`);
          Dialog.confirm({
            // title: '标题',
            cancelButtonText,
            showConfirmButton,
            message: `${item.department}尚未评分！`,
          })
            .then(() => {
            })
            .catch(() => {
              // on cancel
              
            });
          scoreFlag = false
        }
      })
      if (scoreFlag) {
        let cancelButtonText =  '返回修改'
          // Toast(`${item.department}尚未评分！`);
          Dialog.confirm({
            // title: '标题',
            cancelButtonText,
            message: '评分完成是否确认提交？',
          })
            .then(() => {
               this.submitAction(this.departList)
            })
            .catch(() => {
              // on cancel
              
            });
          scoreFlag = false
        // this.submitAction(this.departList)
      }
    },
    confirmSubmit(scoreParam) {
      this.sumbitScore(scoreParam)
    },
    async submitAction(scoreParam) {
      const { code, success, message } = await this.$store.dispatch('addScoreFun', scoreParam)
      if(code === 0 && success) {
        this.sumbitSuccess = true
      } else {
        Toast(message)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.score-page{
  width:100%;
  background-color: #fff;
  .logo{
    padding-top: rem(14);
    img{
      display: block;
      width:rem(355.5);
      height: rem(187);
      margin:0 auto;
    }
  }
  .depart-list{
    padding-top: rem(15);
    .depart-item{
      padding: rem(20) 0;
      .depart-info{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:0 rem(18.5);
        .depart-icon{
          width:rem(56);
          height:rem(53);
        }
        .icon-dj{
          background: url(../../assets/img/icon-dj.png) no-repeat;
          background-size: contain;
        }
        .icon-aq{
          background: url(../../assets/img/icon-aq.png) no-repeat;
          background-size: contain;
        }
        .icon-cg{
          background: url(../../assets/img/icon-cg.png) no-repeat;
          background-size: contain;
        }
        .icon-cw{
          background: url(../../assets/img/icon-cw.png) no-repeat;
          background-size: contain;
        }
        .icon-hy{
          background: url(../../assets/img/icon-hy.png) no-repeat;
          background-size: contain;
        }
        .icon-jm{
          background: url(../../assets/img/icon-jm.png) no-repeat;
          background-size: contain;
        }
        .icon-js{
          background: url(../../assets/img/icon-js.png) no-repeat;
          background-size: contain;
        }
        .icon-kj{
          background: url(../../assets/img/icon-kj.png) no-repeat;
          background-size: contain;
        }
        .icon-rl{
          background: url(../../assets/img/icon-rl.png) no-repeat;
          background-size: contain;
        }
        .icon-sc{
          background: url(../../assets/img/icon-sc.png) no-repeat;
          background-size: contain;
        }
        .icon-xm{
          background: url(../../assets/img/icon-xm.png) no-repeat;
          background-size: contain;
        }
        .icon-zh{
          background: url(../../assets/img/icon-zh.png) no-repeat;
          background-size: contain;
        }
        .depart-name{
          flex-grow: 1;
          margin-left: rem(23);
          .name{
            width:100%;
            font-size: rem(20);
            color:#5B5353;
          }
          .user{
            width:100%;
            font-size: rem(12);
            color:#828282;
            margin-top: rem(2);
          }
        }
        .score-detail{
          font-size: rem(15); 
          color:#D53535;
        }
        .depart-arr{
          width:rem(16);
          height:rem(16);
          background:url(../../assets/img/arr-right.png) no-repeat;
          background-size: contain;
          margin-left: rem(18);
        }
        .arr-down{
          background:url(../../assets/img/arr-down.png) no-repeat;
          background-size: contain;
        }
      }
      .depart-score{
        padding: rem(20) 0;
        box-shadow: 0px 2px 5px rgba(194, 194, 194, 0.16);
        .score-item{
          display: flex;
          justify-content: space-around;
          height:rem(60);
          align-items: center;
           @include border(bottom, #e7e7e7);
          .score-name{
            font-size: rem(15);
            color:#5B5353;
            font-family: Segoe UI;
          }
        }
        .score-item:last-child{
          &::before{
            display: none;
          }
        }
      }
    }
  }
  .score-submit{
     @include border(top, #e7e7e7);
     padding:rem(30) 0 rem(50) 0;
    .button-submit{
      display: flex;
      margin:0 auto;
      align-items: center;
      justify-content: center;
      width:rem(149);
      height:rem(46);
      background:#f4f4f4;
      border-radius:rem(26);
      font-size: rem(21);
      color:#5B5353;
    }
    .submit-success{
      width:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-success{
        width:rem(42);
        height: rem(42);
        background:url(../../assets/img/icon-success.png) no-repeat;
        background-size: rem(42) rem(42); 
      }
      span{
        font-size: rem(15);
        margin-left: rem(8);
        color:#5B5353;
      }
    }
  }
}
.depart-score{
  /deep/ .van-stepper{
    display: flex;
    justify-content: space-between;
    width:rem(98);
    align-items: center;
    height:rem(33);
    background:url(../../assets/img/stepper.png) no-repeat;
    // background-size: rem(98) rem(33);
    background-size: cover;
    padding:0 rem(5);
    .van-stepper__input{
      // margin:0;
      height:rem(29);
      width:rem(29);
      background:none;
    }
    .van-stepper__minus{
      width:rem(27);
      height:rem(29);
      background:none;
      margin-right:rem(2);
    }
    .van-stepper__plus{
      width:rem(27);
      height:rem(29);
      background:none;
      margin-left:rem(2);
    }
  }
}
</style> 
<style lang="scss">
.van-dialog{
  .van-dialog__message{
    font-size: rem(15);
  }
}
</style>