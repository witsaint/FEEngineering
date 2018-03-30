<template>
  <section class="caseDetail">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/personalQueue'}">个人队列</el-breadcrumb-item>
        <el-breadcrumb-item>案件详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="main">
      <div class="detailContent">
        <div ref="detailContent" id="content_nav" class="content_nav">
          <el-row ref="baseInfo" id="baseInfo" class="baseInfo sub_content_nav">
            <div class="sub_title" name="baseInfo">基本信息</div>
            <base-detail :debtorId="debtorId" :contactId="contactId"></base-detail>
          </el-row>
          <el-row ref="historyLoan" id="historyLoan" class="connectInfo sub_content_nav">
            <div class="sub_title">历史借款</div>
            <history-loan></history-loan>
            <!--  -->
          </el-row>
          <el-row ref="accountInfo" id="accountInfo" class="accountInfo sub_content_nav">
            <div class="sub_title">账户信息</div>
            <count-info></count-info>
          </el-row>
          <el-row ref="debitLog" id="debitLog" class="accountInfo sub_content_nav">
            <div class="sub_title">扣款记录-当前案件</div>
            <debit-log></debit-log>
          </el-row>
          <el-row ref="connectInfo" id="connectInfo" class="connectInfo sub_content_nav">
            <div class="sub_title">联系信息</div>
            <connect-info></connect-info>
          </el-row>
          <el-row ref="historyFlow" id="historyFlow" class="historyFlow sub_content_nav">
            <div class="sub_title">历史行为记录-当前案件</div>
            <history-active></history-active>
          </el-row>
          <!---->
          <!-- 各种详细内容拆分开-->
          <!---->
        </div>
        <div class="quack_action_nav">
          <div class="a_action">
            <div class="step-line-nav">
              <div :class="{'isActiveRound': aActive[0]}" class="round"  @click="goAnchor('baseInfo')">1</div>
              <i>基本信息</i></div>
          </div>
          <div class="a_action">
            <div class="step-line-nav">
              <div :class="{'isActiveRound': aActive[1]}" class="round"  @click="goAnchor('historyLoan')">2</div>
              <i>历史信息</i></div>
          </div>
          <div class="a_action">
            <div class="step-line-nav">
              <div :class="{'isActiveRound': aActive[2]}" class="round"  @click="goAnchor('accountInfo')">3</div>
              <i>账户信息</i></div>
          </div>
          <div class="a_action">
            <div class="step-line-nav">
              <div :class="{'isActiveRound': aActive[3]}" class="round" @click="goAnchor('debitLog')">4</div>
              <i >扣款记录</i></div>
          </div>
          <div class="a_action">
            <div class="step-line-nav">
              <div :class="{'isActiveRound': aActive[4]}" class="round" @click="goAnchor('connectInfo')">5</div>
              <i >联系信息</i></div>
          </div>
          <div class="a_action">
            <div class="">
              <div :class="{'isActiveRound': aActive[5]}" class="round" @click="goAnchor('historyFlow')">6</div>
              <i>历史记录</i>
            </div>
            <div @click="goToTop" class="round go-top" title="回到顶部">
              <i class="iconfont icon-huidaodingbu"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="collection_action_nav">
        <el-row class="historyFlow sub_content_nav">
          <div class="sub_title">催收行动区</div>
          <el-row type="flex" justify="space-between" class="action_main_nav">
            <el-row class="editor_and_info">
              <el-row class="action_info">
                <el-col :span="5">行动代码：
                  <el-select size="mini" v-model="actionCode" placeholder="请选择">
                    <el-option value="aa" label="ss">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">行动日期：<span>{{}}</span></el-col>
                <el-col :span="5">行动金额：<span>{{}}</span></el-col>
                <el-col :span="5">复核日期：<span>{{}}</span></el-col>
                <el-col :span="4">复核时间：<span>{{}}</span></el-col>
              </el-row>
              <el-row>
                <textarea placeholder="请输入"></textarea>
              </el-row>
            </el-row>
            <div class="submit">
              <el-button>提交</el-button>
            </div>
          </el-row>
          <el-row class="quick_btn">
            <div class="sub_title">快捷按钮</div>
            <el-row>
              <el-button size="mini">公安照片查询</el-button>
              <el-button size="mini">付清结算</el-button>
              <el-button size="mini" :disabled="true">申请扣款</el-button>
              <el-button size="mini" v-show="bindCarDisabled" @click="addBindCar">增加绑卡</el-button>
              <el-button size="mini" v-show="!bindCarDisabled" :disabled="true">已经绑卡</el-button>
            </el-row>
          </el-row>
        </el-row>
      </div>
    </el-row>
    <!-- -->
    <el-dialog :close-on-click-modal=false :modal=false size="mini" title="" :visible.sync="tiedCardModelVisible">
      <el-form label-position="left" ref="form" :model="carInfo" label-width="100px">
        <el-form-item prop="ContactsName" :rules="[{
          required: true, message: '发卡行不能为空', trigger: 'blur'
        }]" label="发卡行选择">
          <el-select v-model="carInfo.bank" placeholder="请选择">
            <el-option label="招商" value="0"></el-option>
            <el-option label="中信" value="1"></el-option>
            <el-option label="农业" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="ContactsName" :rules="[{
          required: true, message: '发卡行不能为空', trigger: 'blur'
        }]" label="银行卡账号">
          <el-input size="small" v-model="carInfo.account"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" class="dialog-footer">
        <el-button @click="tiedCardModelVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTiedCard">添加</el-button>
      </el-row>
    </el-dialog>
  </section>
</template>

<script>
  import api from '@/utils/api'
  import baseDetail from '@/components/caseDetail/baseInfo'
  import connectInfo from '@/components/caseDetail/connectInfo'
  import historyLoan from '@/components/caseDetail/historyLoan'
  import countInfo from '@/components/caseDetail/countInfo'
  import debitLog from '@/components/caseDetail/debitLog'
  import historyActive from '@/components/caseDetail/historyActive'
  export default {
    name: 'caseDetail',
    data () {
      return {
        debtorId: '', // 债务人ID
        contactId: '', // 合同ID
        addConnectModelVisible: false,
        circulationHistoryCurrentPage: 1,
        circulationHistoryTotalPage: 10,
        actionHistoryData: [],
        circulationHistoryData: [],
        actionClassify: '',
        actionCode: '',
        bindCarDisabled: true, // 增加绑卡是否可点击
        carInfo: {},
        tiedCardModelVisible: false, // 绑卡,
        independentRepaymentRecord: [],
        aScroll: {
          baseInfo: '',
          historyLoan: '',
          accountInfo: '',
          debitLog: '',
          connectInfo: '',
          historyFlow: ''
        },
        aActive: [true, false, false, false, false, false]
      }
    },
    components: {
      baseDetail,
      connectInfo,
      historyLoan,
      countInfo,
      debitLog,
      historyActive
    },
    mounted () {
      this.$nextTick(() => {
        this.initAScrollTop()
        this.$refs.detailContent.addEventListener('scroll', this.handleScroll)
      })
    },
    methods: {
      handleScroll () {
        var topNum = this.$refs.detailContent.scrollTop
        var indexNum = -1
        Object.keys(this.aScroll).forEach((val, index) => {
          if (topNum >= this.aScroll[val]) {
            indexNum = index
          }
        })
        let oldIndex = this.aActive.findIndex(val => {
          return val
        })
        this.aActive.splice(oldIndex, 1, false)
        this.aActive.splice(indexNum, 1, true)
      },
      initAScrollTop () {
        Object.keys(this.aScroll).forEach(key => {
          this.aScroll[key] = this.$refs[key].$el.offsetTop
        })
      },
      handleCirculationHistoryChange (val) {
        this.circulationHistoryCurrentPage = val
      },
      addBindCar () {
        this.tiedCardModelVisible = true
        this.bindCarDisabled = false
      },
      goAnchor (a) {
        this.$refs.detailContent.scrollTop = this.aScroll[a]
      },
      addTiedCard () {
        api.searchDetailInfo(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      searchDetailInfo () {
        api.searchDetailInfo(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      searchSystemPhoneData () { // 查询系统电话请求
        api.searchSystemPhoneData(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      searchMailListData () { // 查询通讯录请求
        api.searchmailListData(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      searchSMSLogData () { // 查询通讯录请求
        api.searchSMSLogData(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      searchActionHistoryData () { // 查询行动历史请求
        api.searchActionHistoryData(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      }, // ------------- there are some new function -----------------------
      goToTop () {
        this.$refs.detailContent.scrollTop = 0
      }
    }
  }
</script>

<style lang="less">
  .marks_model {
    .el-row {
      margin-top: 10px;
      .mini_label {
        line-height: 22px;
      }
    }
  }

  .sub_title {
    font-size: 16px;
    padding: 4px 12px;
    letter-spacing: 0.2em;
    position: relative;
    margin: 7px 0;
    font-size: 18px;
    &:before {
      content: ' ';
      position: absolute;
      width: 100%;
      height: 1px;
      top: 30px;
      left: 0px;
      /*border-radius: 50%;*/
      /*background-color: #f86c6b;*/
      background-color: #DDD;
    }
  }
  .caseDetail {
    height: 100%;
    .main {
      position: relative;
      height: ~"calc(100% - 43px)";
      display: flex;
      flex-direction: column;
      .detailContent {
        display: inline-flex;
        justify-content: space-between;
        height: 100%;
        flex-grow: 1;
        /*border: 1px solid #ddd;*/
        padding-left: 4px;
        padding-right: 4px;
        box-sizing: border-box;
        .sub_content_nav {
          margin-bottom: 18px;
        }
        #selfRepaymentRecord {
          margin-bottom: 15px;
        }
        .content_nav {
          width: 100%;
          flex-grow: 1;
          overflow: auto;
          .jf-label {
            padding: 11px 12px 11px 0;
            line-height: 1;
            font-size: 14px;
          }
          .info_table {
            margin-bottom: 15px;
            .el-col {
              height: 34px;
              line-height: 26px;
              border: 1px solid #dddddd;
              margin-right: -1px;
              margin-bottom: -1px;
              padding: 4px;
            }
          }
        }
        .quack_action_nav {
          width: 50px;
          flex-shrink: 0;
          height: 100%;
          display: inline-flex;
          flex-direction: column;
          justify-content: space-between;
          .a_action {
            flex-grow: 1;
            position: relative;
            text-align: center;
            .step-line-nav {
              box-sizing: border-box;
              z-index: 1;
              background-color: #ffffff;
              /*position: absolute;*/
              &:after {
                content: '';
                position: absolute;
                height: ~"calc(100% - 48px)";
                bottom: 0;
                left: 50%;
                border-left: 1px solid #ddd;
              }
            }
            .round {
              width: 30px;
              height: 30px;
              margin: auto;
              line-height: 30px;
              border-radius: 50%;
              border: 1px solid #ddd;
              cursor: pointer;
              &.isActiveRound {
                background-color: #409EFF;
                color: white;
              }
              &.go-top {
                position: absolute;
                bottom: 5px;
                left: 50%;
                transform: translateX(-50%);
                /*left: 10px;*/
                background-color: #dddddd;
                i {
                  color: white;
                  &:hover {
                    color: #409EFF;
                  }
                }
              }
            }
            i {
              cursor: pointer;
            }
          }
        }
      }
      .search_condition {
        display: flex;
        .el-form-item {
          display: inline-block;
          .el-form-item__content {
            display: flex;
          }
          button {
            margin-left: 5px;
          }
        }
      }
      .collection_action_nav {
        height: 200px;
        width: 100%;
        border-top: 1px solid #dddddd;
        box-shadow: -2px -4px 6px #dddddd;
        border-radius: 4px;
        padding: 4px;
        .action_main_nav {
          align-items: stretch;
          .el-form-item {
            margin-bottom: 2px;
          }
          .editor_and_info {
            width: 100%;
            flex-grow: 1;
            .action_info {
              font-size: 12px;
              line-height: 24px;
            }
            textarea {
              width: 100%;
              height: 52px;
              overflow: hidden;
              resize: none;
              border-radius: 4px;
              padding: 0 6px;
            }
          }
          .submit {
            width: 70px;
            height: 80px;
            margin-left: 5px;
            display: inline-flex;
            align-items: center;
            button {
              width: 100%;
              height: 90%;
            }
          }
        }
      }
      .info_list {
        .el-col {
          height: 36px;
          line-height: 34px;
          font-size: 14px;
          padding: 4px;
        }
      }
    }
  }
</style>
