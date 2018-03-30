<template>
  <section class="dataStatistics">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
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
    <div class="sub_title">回款情况</div>
    <el-row type="flex" justify="space-between">
      <el-col class="info-base">
        <div class="total">
          <p>累计分按量</p>
          <p class="num">4320</p>
        </div>
        <div class="thisWeek">
          <p>本周新增分案量</p>
          <p><span class="num">432</span> 周环比<i v-if="splitIsUp"
                                                class="iconfont icon-xiangshangjiantou-copy-copy-copy up"></i>
            <i class="iconfont icon-jiantou down" v-else></i>
            10%
          </p>
        </div>
      </el-col>
      <el-col class="info-chart-nav">
        <el-row type="flex" justify="space-between">
          <el-col :sm="5">近一周分案量</el-col>
          <el-col>
            <time-range v-model="form.splitDateRange"></time-range>
          </el-col>
        </el-row>
        <div ref="chartNav" class="charts">
          <div ref="splitChart" class="eCharts"></div>
        </div>
      </el-col>
    </el-row>
    <div class="sub_title">拨打量</div>
    <el-row type="flex" justify="space-between">
      <el-col class="info-base">
        <div class="total">
          <p>累计拨打量</p>
          <p class="num">4320</p>
        </div>
        <div class="thisWeek">
          <p>本周新增拨打量</p>
          <p><span class="num">432</span> 周环比<i v-if="callIsUp"
                                                class="iconfont icon-xiangshangjiantou-copy-copy-copy up"></i>
            <i class="iconfont icon-jiantou down" v-else></i>
            10%
          </p>
        </div>
      </el-col>
      <el-col class="info-chart-nav">
        <el-row type="flex" justify="space-between">
          <el-col :sm="5">近一周分案量</el-col>
          <el-col>
            <time-range v-model="form.callDateRange"></time-range>
          </el-col>
        </el-row>
        <div ref="chartNav" class="charts">
          <div ref="callChart" class="eCharts"></div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import clearBtn from '@/components/clearBtn'
  import timeRange from '@/components/timeRange'
  import Time from '@/utils/timetool'
  import ECharts from 'echarts'
  export default {
    name: 'dataStatistics',
    data () {
      return {
        formatDateSet: {
          '0': [new Date(), new Date()],
          '1': [Time.getCurrentWeekFirstDay(new Date()), Time.getCurrentWeekLastDay(new Date())],
          '2': [Time.getCurrentMonthFirstDay(new Date()), Time.getCurrentMonthLastDay(new Date())],
          '3': [Time.getCurrentQuarterFirstDay(new Date()), Time.getCurrentQuarterLastDay(new Date())],
          '4': [Time.getCurrentYearFirstDay(new Date()), Time.getCurrentYearLastDay(new Date())]
        },
        form: {
          caseLevel: '',
          group: '',
          splitDateRange: [],
          callDateRange: []
        },
        splitIsUp: false,
        callIsUp: true,
        dateChooseType: '',
        rules: {},
        sevenColor: '#ddd7fb',
        baseColor: '#409EFF',
        totalColor: '#4dccc9',
        baseOptions: {
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: []
          },
          xAxis: {
            type: 'category',
            scale: true,
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            axisTick: {
              show: false,
              alignWithLabel: false
            },
            data: ['10-23周日', '10-24周一', '10-25周二', '10-26周三', '10-27周四']
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#B0B3B6'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted'
              }
            },
            axisLabel: {
//            formatter: '{value} °C'
            }
          },
          series: [{
            name: '老户批核率',
            type: 'line',
            smooth: true,
//            showSymbol: false,
            symbol: 'circle',
            label: {
              normal: {
                position: 'top',
                formatter: '{c}%',
                show: true   // 节点是否会有标注数目
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(64, 158, 255, 0.2)'
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: '#409EFF',
                borderWidth: 1,
                borderColor: '#409EFF'
              }
            },
            data: [56, 78, 46, 95, 50]
          }]
        }
      }
    },
    mounted () {
      const growthChart = ECharts.init(this.$refs.splitChart)
      growthChart.setOption(this.baseOptions)
      this.callChartInit()
    },
    components: {
      clearBtn,
      timeRange
    },
    watch: {
      dateChooseType () {
        if (this.dateChooseType) {
          this.form.dateRange = this.formatDateSet[this.dateChooseType]
        }
      }
    },
    methods: {
      search () {
        console.info('search')
      },
      dateChangeFunc () {
      },
      callChartInit () {
        const growthChart = ECharts.init(this.$refs.callChart)
        growthChart.setOption(this.baseOptions)
      }
    }
  }
</script>

<style lang="less">
  .dataStatistics {
    font-size: 14px;
    .info-base {
      padding-left: 30px;
      flex-basis: 240px;
      flex-shrink: 0;
      flex-grow: 0;
      .total {
        height: 78px;
      }
    }
    .info-chart-nav {
      flex-shrink: 1;
      flex-grow: 1;
    }
    .num {
      font-size: 24px;
      color: #111;
    }
    .up {
      color: #01A854;
    }
    .down {
      color: #F14035;
    }
    .charts {
      width: 100%;
      position: relative;
      padding-top: 30%;
      margin: auto;
      &:after {
        content: '';
        display: block;
        /*margin-top: 100%; //margin 百分比相对父元素宽度计算*/
      }
      & .eCharts {
        position: absolute;
        top: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
