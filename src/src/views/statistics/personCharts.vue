<template>
  <section class="person-chart-comp">
    <div class="sub_title">回款图表</div>
    <el-row>
      <el-col :span="19">
        <div ref="chartNav" class="charts">
          <div ref="paymentChart" class="eCharts"></div>
        </div>
      </el-col>
    </el-row>
    <div class="sub_title">业务对比</div>
    <el-row>
      <el-col :span="12">
        <div>人均回款金额</div>
        <div ref="chartNav" class=" miniChart">
          <div ref="perPaymentNumChart" class="eCharts"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div>人均回款率</div>
        <div ref="chartNav" class="miniChart">
          <div ref="perPaymentRateChart" class="eCharts"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div>人均拨打量</div>
        <div ref="chartNav" class=" miniChart">
          <div ref="perCallNumChart" class="eCharts"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div>人均单次接通回款金额（元）</div>
        <div ref="chartNav" class="miniChart">
          <div ref="perPaySucOnceChart" class="eCharts"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div>组内拨打-回款分布情况（周）</div>
        <div ref="chartNav" class=" miniChart">
          <div ref="payDistributionGrowthWeekChart" class="eCharts"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div>组内拨打-回款分布情况（月）</div>
        <div ref="chartNav" class="miniChart">
          <div ref="payDistributionGrowthMonthChart" class="eCharts"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div>回款金额</div>
        <div ref="chartNav" class="miniChart">
          <div ref="payNumChart" class="eCharts"></div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import ECharts from 'echarts'
  export default {
    name: 'personCharts',
    data () {
      return {
        baseColor: '#409EFF',
        violetColor: 'rgba(221,215,251, 1)',
        blueColor: 'rgba(115,209,61, 1)',
        cyanColor: 'rgba(84,224,221, 1)',
        greenColor: 'rgba(129,207,132, 1)',
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
              show: true,
              alignWithLabel: false
            },
            data: []
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
          series: []
        }
      }
    },
    mounted () {
      this.paymentChartInit()
      this.perPaymentNumChartInit()
      this.perPaymentRateChartInit()
      this.perCallNumChartInit()
      this.perPaySucOnceChartInit()
      this.payNumChartInit()
    },
    methods: {
      paymentChartInit () {
        let options = this.getOptions()
        const chart = ECharts.init(this.$refs.paymentChart)
        options.xAxis.boundaryGap = true
        options.xAxis.axisTick.show = false
        options.xAxis.data = ['10-23周日', '10-24周一', '10-25周二', '10-26周三', '10-27周四']
        options.series = [{
          name: '回款一',
          type: 'line',
          smooth: true,
          label: {
            normal: {
              position: 'top',
              show: true   // 节点是否会有标注数目
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: this.greenColor,
              borderWidth: 1,
              borderColor: this.greenColor
            }
          },
          data: [56, 78, 46, 95, 50]
        }, {
          name: '回款2',
          type: 'bar',
          label: {
            normal: {
              position: 'top',
              show: true   // 节点是否会有标注数目
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: this.cyanColor,
              borderWidth: 1,
              borderColor: this.cyanColor
            }
          },
          barMaxWidth: '50',
          data: [32, 46, 56, 25, 42]
        }, {
          name: '回款3',
          type: 'bar',
          label: {
            normal: {
              position: 'top',
              show: true   // 节点是否会有标注数目
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: this.violetColor,
              borderWidth: 1,
              borderColor: this.violetColor
            }
          },
          barMaxWidth: '50',
          data: [36, 72, 49, 48, 57]
        }]
        chart.setOption(options)
      },
      perPaymentNumChartInit () {
        let name = ['回款一', '回款二']
        let xAxis = ['10:00', '11:00', '12:00', '13:00', '14:00']
        let data = [
          [56, 78, 46, 95, 50],
          [32, 46, 56, 25, 42]
        ]
        this.lineChartInit(name, xAxis, data, this.$refs.perPaymentNumChart)
      },
      perPaymentRateChartInit () {
        let name = ['回款一', '回款二']
        let xAxis = ['10:00', '11:00', '12:00', '13:00', '14:00']
        let data = [
          [56, 78, 46, 95, 50],
          [32, 46, 56, 25, 42]
        ]
        this.lineChartInit(name, xAxis, data, this.$refs.perPaymentRateChart, true)
      },
      perCallNumChartInit () {
        let name = ['回款一', '回款二']
        let xAxis = ['10:00', '11:00', '12:00', '13:00', '14:00']
        let data = [
          [56, 78, 46, 95, 50],
          [32, 46, 56, 25, 42]
        ]
        this.lineChartInit(name, xAxis, data, this.$refs.perCallNumChart)
      },
      perPaySucOnceChartInit () {
        let name = ['回款一', '回款二']
        let xAxis = ['10:00', '11:00', '12:00', '13:00', '14:00']
        let data = [
          [56, 78, 46, 95, 50],
          [32, 46, 56, 25, 42]
        ]
        this.lineChartInit(name, xAxis, data, this.$refs.perPaySucOnceChart)
      },
      lineChartInit (names, xDAta, data, ref, isRate) {
        let options = this.getOptions()
        const chart = ECharts.init(ref)
        if (isRate) {
          options.yAxis.axisLabel = {
            formatter: '{value} %'
          }
          options.tooltip = {
            formatter: '{b}<br/>{a0}:{c0}<br/>{a1}:{c1}',
            trigger: 'axis'
          }
        }
        options.legend.data = names
        options.xAxis.data = xDAta
        options.series = [{
          name: names[0],
          type: 'line',
          smooth: true,
          label: {
            normal: {
              position: 'top',
              formatter: isRate ? '{c}%' : '{c}',
              show: true   // 节点是否会有标注数目
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: this.baseColor,
              borderWidth: 1,
              borderColor: this.baseColor
            }
          },
          data: data[0]
        }, {
          name: names[1],
          type: 'line',
          label: {
            normal: {
              position: 'top',
              formatter: isRate ? '{c}%' : '{c}',
              show: true   // 节点是否会有标注数目
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: this.blueColor,
              borderWidth: 1,
              borderColor: this.blueColor
            }
          },
          barMaxWidth: '50',
          data: data[1]
        }]
        chart.setOption(options)
      },
      payDistributionGrowthWeekChartInit () {
      },
      payDistributionGrowthMonthChartInit () {
      },
      payNumChartInit () {
        let ops = {
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
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            scale: true,
            boundaryGap: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#B0B3B6'
              }
            },
            axisLabel: {
              interval: 0
            },
            axisTick: {
              show: false,
              alignWithLabel: false
            },
            data: []
          },
          series: []
        }
        ops.yAxis.data = ['A', 'B', 'C', 'D', 'F']
        ops.series = [{
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: [100, 100, 100, 100, 100],
          animation: false
        }, {
          name: '回款一',
          type: 'bar',
          smooth: true,
          label: {
            normal: {
              position: 'right',
              show: true   // 节点是否会有标注数目
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: this.greenColor,
              borderWidth: 1,
              borderColor: this.greenColor
            }
          },
          data: [56, 78, 46, 95, 50]
        }]
        const chart = ECharts.init(this.$refs.payNumChart)
        chart.setOption(ops)
      },
      getOptions () {
        return JSON.parse(JSON.stringify(this.baseOptions))
      }
    }
  }
</script>

<style lang="less">
  .person-chart-comp {
    .charts, .miniChart {
      width: 100%;
      position: relative;
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
    .charts {
      padding-top: 30%;
    }
    .miniChart {
      padding-top: 45%;
    }
  }
</style>
