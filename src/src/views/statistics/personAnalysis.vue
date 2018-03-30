<template>
  <section class="per-analysis">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>人员分析</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button size="mini" type="primary" class="search_nav_btn search_btn" @click="search" id="search">搜索
        </el-button>
        <clear-btn :formObj="form" :formRef="'personAnalysisForm'"></clear-btn>
      </div>
    </el-row>
    <div class="search_nav">
      <el-form ref="personAnalysisForm" id="personAnalysisForm" v-model="form" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="案件级别:">
              <el-select size="small" v-model="form.caseLevel" placeholder="请选择">
                <el-option value="0" label="M0">
                </el-option>
                <el-option value="1" label="M1">
                </el-option>
                <el-option value="2" label="M2">
                </el-option>
                <el-option value="3" label="M3">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="时间选择:">
              <el-select size="small" v-model="form.time" placeholder="请选择">
                <el-option value="0" label="M0">
                </el-option>
                <el-option value="1" label="M1">
                </el-option>
                <el-option value="2" label="M2">
                </el-option>
                <el-option value="3" label="M3">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务小组:">
              <el-select size="small" v-model="form.group" placeholder="请选择">
                <el-option value="0" label="M0">
                </el-option>
                <el-option value="1" label="M1">
                </el-option>
                <el-option value="2" label="M2">
                </el-option>
                <el-option value="3" label="M3">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="content-base">
      <div class="sub_title">回款情况</div>
      <el-row v-for="(row, index) in paymentInfo" :key="index" class="payment-row" type="flex" justify="space-between">
        <el-col v-for="(item, key) in row" :key="key" class="info-item">
          <p>{{item.title}}</p>
          <p class="num">{{item.num}}</p>
          <p class="tr">{{index | charFilter}}环比
            <i v-if="item.isUp" class="iconfont icon-xiangshangjiantou-copy-copy-copy up"></i>
            <i class="iconfont icon-jiantou down" v-else></i>
            {{item.upNum}}
          </p>
        </el-col>
      </el-row>
      <person-charts></person-charts>
    </el-row>
  </section>
</template>

<script>
  import clearBtn from '@/components/clearBtn'
  import personCharts from '@/views/statistics/personCharts'
  export default {
    name: 'personAnalysis',
    data () {
      return {
        form: {
          caseLevel: '',
          time: '',
          group: ''
        },
        rules: {},
        paymentInfo: [
          {
            payment: {
              title: '今日回款金额',
              num: '43200.00',
              isUp: true,
              upNum: '12%'
            },
            paymentRate: {
              title: '今日回款率',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            },
            callNum: {
              title: '今日拨打量（次）',
              num: '430',
              isUp: true,
              upNum: '12%'
            },
            callRate: {
              title: '今日接通率',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            },
            collectNum: {
              title: '今日新增入催（元）',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            }
          }, {
            payment: {
              title: '本周回款金额',
              num: '43200.00',
              isUp: true,
              upNum: '12%'
            },
            paymentRate: {
              title: '本周回款率',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            },
            callNum: {
              title: '本周拨打量（次）',
              num: '430',
              isUp: true,
              upNum: '12%'
            },
            callRate: {
              title: '本周接通率',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            },
            collectNum: {
              title: '本周新增入催（元）',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            }
          }, {
            payment: {
              title: '本月回款金额',
              num: '43200.00',
              isUp: true,
              upNum: '12%'
            },
            paymentRate: {
              title: '本月回款率',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            },
            callNum: {
              title: '本月拨打量（次）',
              num: '430',
              isUp: true,
              upNum: '12%'
            },
            callRate: {
              title: '本月接通率',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            },
            collectNum: {
              title: '本月新增入催（元）',
              num: '43.5%',
              isUp: true,
              upNum: '12%'
            }
          }
        ]
      }
    },
    methods: {
      search () {
      }
    },
    components: {
      clearBtn,
      personCharts
    },
    filters: {
      charFilter (val) {
        switch (val) {
          case 0:
            return '日'
          case 1:
            return '周'
          case 2:
            return '月'
        }
      }
    }
  }
</script>

<style lang="less">
  .per-analysis {
    .content-base {
      font-size: 14px;
      padding: 0 10px;
      width: 90%;
      .payment-row{
        padding: 5px 0px;
        border-bottom: 1px solid #DDDDDD;
      }
      .info-item {
        p {
          padding-left: 15px;
        }
        .num {
          font-size: 24px;
          color: #111;
        }
        .tr {
          padding-left: 100px;
          .up {
            color: #01A854;
          }
          .down {
            color: #F14035;
          }
        }
      }
    }
  }
</style>
