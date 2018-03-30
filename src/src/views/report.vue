<template>
  <section class="report">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>报表系统</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <div class="content_main">
      <el-row class="check_group">
        <el-row class="check_row">
          <el-col :sm="6" :md="3" class="search_label">队列选择：</el-col>
          <el-col :sm="18" :md="21">
            <el-checkbox-group v-model="Queue">
              <el-checkbox v-for="(queue,index) in queueLists" :label="queue.id" :key="index">{{queue.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row class="check_row">
          <el-col :sm="6" :md="3" class="search_label">平台选择：</el-col>
          <el-col :sm="18" :md="21">
            <el-checkbox-group v-model="platform">
              <el-checkbox v-for="(platform,index) in platformLists" :label="platform.id" :key="index">{{platform.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row class="check_row">
          <el-col :sm="6" :md="3" class="search_label">催收中心选择：</el-col>
          <el-col :sm="18" :md="21">
            <template v-for="(value, index) in collectionLists">
              <el-row type="flex">
                <el-checkbox :indeterminate="value.indeterminate" v-model="value.checkAll"
                             @change="handleCheckAllChange(index)">{{value.name}} >>
                </el-checkbox>
                <el-checkbox-group v-model="value.checkedList"
                                   @change="handleCheckedCitiesChange(value.checkedList, index)">
                  <el-checkbox v-for="person in value.person" :label="person.id" :key="person.id">{{person.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-row>
            </template>
          </el-col>
        </el-row>
        <el-row class="check_row">
          <el-col :sm="6" :md="3" class="search_label">如催时间范围：</el-col>
          <el-col :sm="18" :md="21">
            <el-date-picker
              size="mini"
              v-model="rushDateRange"
              type="daterange"
              @change="rushDateChangeFunc"
              placeholder="选择时间范围">
            </el-date-picker>
            <el-radio class="radio" v-model="rushDateChooseType" label="1">本周</el-radio>
            <el-radio class="radio" v-model="rushDateChooseType" label="2">本月</el-radio>
            <el-radio class="radio" v-model="rushDateChooseType" label="3">本季度</el-radio>
            <el-radio class="radio" v-model="rushDateChooseType" label="4">本年度</el-radio>
            <el-radio class="radio" v-model="rushDateChooseType" label="5">全部</el-radio>
          </el-col>
        </el-row>
        <el-row class="check_row">
          <el-col :sm="6" :md="3" class="search_label">统计维度：</el-col>
          <el-col :sm="18" :md="21">
            <el-radio class="radio" v-model="countDimension" label="1">日</el-radio>
            <el-radio class="radio" v-model="countDimension" label="2">周</el-radio>
            <el-radio class="radio" v-model="countDimension" label="3">月</el-radio>
            <el-radio class="radio" v-model="countDimension" label="4">季</el-radio>
            <el-radio class="radio" v-model="countDimension" label="5">年</el-radio>
          </el-col>
        </el-row>
        <el-row>
          <el-button size="small" class="" @click="createDate" id="generateData">生成数据</el-button>
        </el-row>
      </el-row>
      <!--<el-row class="show_data_nav">-->
      <el-tabs class="show_data_nav" v-model="chartsOrData" @tab-click="handleClick">
        <el-tab-pane label="图表" name="charts">
          <div class="show_main">
            <div id="perCycleRecoverNum" style="width: 900px;height:400px;"></div>
            <div id="perCycleMoneyRecoverNum" style="width: 900px;height:400px;"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据" name="data">
          <div class="">
            <el-row class="table_nav">
              <div class="data_nav_title">周期数据</div>
              <el-table
                :data="periodData"
                max-height="600"
                style="width: 100%">
                <el-table-column
                  prop="rushTime"
                  label="入催时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="customerName"
                  label="期初总量"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="期末总量"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="idCode"
                  label="期初金额"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="merchant"
                  label="期末金额"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="amountDue"
                  label="数据回收率"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="alreadyPaidAmound"
                  label="金额回收率"
                >
                </el-table-column>
              </el-table>
              <div class="jfPagination">
                <el-row type="flex" justify="end">
                  <el-pagination
                    layout="total,prev, pager, next"
                    :size="10"
                    :page-size="20"
                    :current-page.sync="periodDataCurrentPage"
                    :total="periodDataTotalPage">
                  </el-pagination>
                </el-row>
              </div>
            </el-row>
            <!-- 每日新增数据表格-->
            <el-row class="table_nav">
              <div class="data_nav_title">每日新增数据</div>
              <el-table
                :data="addDataDailyData"
                max-height="600"
                style="width: 100%">
                <el-table-column
                  prop="rushTime"
                  label="入催时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="customerName"
                  label="当日新增量"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="当日新增金额"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="idCode"
                  label="当日回收量"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="merchant"
                  label="当日回收总金额"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="amountDue"
                  label="当日新增案件回收率"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="alreadyPaidAmound"
                  label="当日新增金额回收率"
                >
                </el-table-column>
              </el-table>
              <div class="jfPagination">
                <el-row type="flex" justify="end">
                  <el-pagination
                    layout="total,prev, pager, next"
                    :size="10"
                    :page-size="20"
                    :current-page.sync="addDataDailyCurrentPage"
                    :total="addDataDailyTotalPage">
                  </el-pagination>
                </el-row>
              </div>
            </el-row>
            <!-- 每日追踪数据件-->
            <el-row class="table_nav">
              <div class="data_nav_title">每日追踪数据件</div>
              <el-table
                :data="traceCaseDailyData"
                max-height="600"
                style="width: 100%">
                <el-table-column
                  prop="rushTime"
                  label="入催时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="customerName"
                  label="当日新增量"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="7天回收率"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="idCode"
                  label="15天回收率"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="merchant"
                  label="22天回收率"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="amountDue"
                  label="30天回收率"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="alreadyPaidAmound"
                  label="当前回收率"
                >
                </el-table-column>
              </el-table>
              <div class="jfPagination">
                <el-row type="flex" justify="end">
                  <el-pagination
                    layout="total,prev, pager, next"
                    :size="10"
                    :page-size="20"
                    :current-page.sync="traceCaseDailyCurrentPage"
                    :total="traceCaseDailyTotalPage">
                  </el-pagination>
                </el-row>
              </div>
            </el-row>
            <!-- 每日追踪数据金额-->
            <el-row class="table_nav">
              <div class="data_nav_title">每日追踪数据金额</div>
              <el-table
                :data="traceMoneyDailyData"
                max-height="600"
                style="width: 100%">
                <el-table-column
                  prop="rushTime"
                  label="入催时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="customerName"
                  label="当日新增量"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="7天回收率"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="idCode"
                  label="15天回收率"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="merchant"
                  label="22天回收率"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="amountDue"
                  label="30天回收率"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="alreadyPaidAmound"
                  label="当前回收率"
                >
                </el-table-column>
              </el-table>
              <div class="jfPagination">
                <el-row type="flex" justify="end">
                  <el-pagination
                    layout="total,prev, pager, next"
                    :size="10"
                    :page-size="20"
                    :current-page.sync="traceMoneyDailyCurrentPage"
                    :total="traceMoneyDailyTotalPage">
                  </el-pagination>
                </el-row>
              </div>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!--</el-row>-->
    </div>
  </section>
</template>

<script>
  import ECharts from 'echarts'
  import api from '@/utils/api'
  import Time from '@/utils/timetool'
  export default {
    name: 'report',
    data () {
      return {
        formatDateSet: {
          '1': [Time.getCurrentWeekFirstDay(new Date()), Time.getCurrentWeekLastDay(new Date())],
          '2': [Time.getCurrentMonthFirstDay(new Date()), Time.getCurrentMonthLastDay(new Date())],
          '3': [Time.getCurrentQuarterFirstDay(new Date()), Time.getCurrentQuarterLastDay(new Date())],
          '4': [Time.getCurrentYearFirstDay(new Date()), Time.getCurrentYearLastDay(new Date())]
        },
        Queue: [],
        platform: [],
        rushDateRange: [],
        rushDateChooseType: '5',
        countDimension: '',
        queueLists: [{
          id: 1,
          name: 'm0'
        }, {
          id: 2,
          name: 'm2'
        }, {
          id: 3,
          name: 'm3'
        }],
        platformLists: [{
          id: 1,
          name: '乔融金服'
        }, {
          id: 2,
          name: '小象优品'
        }, {
          id: 3,
          name: '顺网贷93'
        }, {
          id: 4,
          name: '现金贷'
        }],
        collectionLists: [{
          name: '聚泛催收',
          checkAll: false,
          checkedList: [],
          indeterminate: false,
          person: [{
            id: 1,
            name: '人员1'
          }, {
            id: 2,
            name: '人员2'
          }, {
            id: 3,
            name: '人员3'
          }],
          personWithoutName: [1, 2, 3]
        }, {
          name: '小象催收',
          checkAll: false,
          checkedList: [],
          indeterminate: false,
          person: [{
            id: 1,
            name: '人员1'
          }, {
            id: 2,
            name: '人员2'
          }, {
            id: 3,
            name: '人员3'
          }],
          personWithoutName: [1, 2, 3]
        }],
        chartsOrData: 'charts',
        periodData: [],
        periodDataCurrentPage: 2,
        periodDataTotalPage: 10,
        addDataDailyData: [],
        addDataDailyCurrentPage: 2,
        addDataDailyTotalPage: 10,
        traceCaseDailyData: [],
        traceCaseDailyCurrentPage: 2,
        traceCaseDailyTotalPage: 10,
        traceMoneyDailyData: [],
        traceMoneyDailyCurrentPage: 2,
        traceMoneyDailyTotalPage: 10
      }
    },
    mounted () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = ECharts.init(document.getElementById('perCycleRecoverNum'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '每周期数量回收数量图',
          x: 'left'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['期初', '期末', '数量回收率']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '期初',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '期末',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '数量回收率',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      })

      // 基于准备好的dom，初始化echarts实例
      var myChart2 = ECharts.init(document.getElementById('perCycleMoneyRecoverNum'))
      // 绘制图表
      myChart2.setOption({
        title: {
          text: '每周期金额回收数量图',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['意向', '预购', '成交']
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {show: true, type: ['stack', 'tiled']},
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '成交',
          type: 'line',
          smooth: true,
          data: [10, 12, 21, 54, 260, 830, 710]
        },
        {
          name: '预购',
          type: 'line',
          smooth: true,
          data: [30, 182, 434, 791, 390, 30, 10]
        },
        {
          name: '意向',
          type: 'line',
          smooth: true,
          data: [1320, 1132, 601, 234, 120, 90, 20]
        }]
      })
      return
    },
    watch: {
      rushDateChooseType () {
        if (this.rushDateChooseType) {
          this.rushDateRange = this.formatDateSet[this.rushDateChooseType]
        }
      }
    },
    methods: {
      handleCheckedQueueChange () {
        return
      },
      handleCheckAllChange (index) {
        var collectCenter = this.collectionLists[index]
        collectCenter.checkedList = collectCenter.checkAll ? collectCenter.personWithoutName : []
        collectCenter.indeterminate = false
      },
      handleCheckedCitiesChange (lists, index) {
        console.info(lists)
        var checkedCount = lists.length
        var collectCenter = this.collectionLists[index]
        collectCenter.checkAll = checkedCount === collectCenter.person.length
        collectCenter.isIndeterminate = checkedCount > 0 && checkedCount < collectCenter.person.length
      },
      handleClick () {
        return
      },
      rushDateChangeFunc () {
        console.info(this.rushDateRange)
        if (this.rushDateRange && this.rushDateRange[0] && this.rushDateRange[1]) {
          for (let type in this.formatDateSet) {
            let formatDateRange = this.formatDateSet[type]
            let rushDateRange = this.rushDateRange
            if (formatDateRange[0].getTime() - rushDateRange[0].getTime() === 0 && formatDateRange[1].getTime() - rushDateRange[1].getTime() === 0) {
              this.rushDateChooseType = type
              return
            }
          }
          this.rushDateChooseType = ''
        } else {
          this.rushDateChooseType = '5'
        }
      },
      createDate () {
        console.info('生成数据')
      },
      SearchData () {
        api.reportDataSearch().then(response => {
          let date = response.date
          console.info(date)
        }).catch(error => {
          if (error) {
            console.info(error)
          }
        })
      },
      SearchAddDataDailyData () { // 周期表数据
        api.SearchAddDataDailyData().then(response => {
          let date = response.date
          console.info(date)
        }).catch(error => {
          if (error) {
            console.info(error)
          }
        })
      },
      SearchPeriodData () { // 每日新增数据表数据
        api.SearchPeriodData().then(response => {
          let date = response.date
          console.info(date)
        }).catch(error => {
          if (error) {
            console.info(error)
          }
        })
      },
      SearchtraceCaseDailyData () { // 每日追踪件表数据
        api.SearchtraceCaseDailyData().then(response => {
          let date = response.date
          console.info(date)
        }).catch(error => {
          if (error) {
            console.info(error)
          }
        })
      },
      SearchTraceMoneyDailyData () { // 每日追踪件表数据
        api.SearchTraceMoneyDailyData().then(response => {
          let date = response.date
          console.info(date)
        }).catch(error => {
          if (error) {
            console.info(error)
          }
        })
      }
    }

  }
</script>

<style lang="less">
  .report {
    height: 100%;
    position: relative;
    .content_main {
      height: ~"calc(100% - 43px)";
      display: flex;
      flex-direction: column;
      /*justify-content: space-between;*/
      .check_group {
        .check_row {
          margin-bottom: 4px;
          .search_label {
            width: 90px;
            line-height: 22px;
            font-weight: bold;
          }
        }
      }
      /*.show_data_nav {*/
      /*flex-grow: 1;*/
      .show_data_nav {
        flex-grow: 1;
        height: 100%;
        overflow-y: auto;
        .el-tabs__content {
          height: ~"calc(100% - 57px)";
          overflow-y: auto;
        }
        .show_main {
          height: 2000px;
          .main {
            height: 200px;
            width: 800px;
          }
        }
      }
      /*}*/
    }
  }
</style>
