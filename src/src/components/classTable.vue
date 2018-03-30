<template>
  <section class="classTableComponent">
    <template v-for="(value, index) in classTables">
      <el-row class="classTable" :key="index">
        <el-row>
          <el-col :span="3">
            <div class="table_head_name">名字</div>
          </el-col>
          <el-col :span="3" :key="index" v-for="(value, index) in value.title">
            <div class="table_cell">星期{{weekStr[index]}}</div>
            <div class="table_cell">{{value.dayNum}}号</div>
          </el-col>
          <template :span="3" v-for="(contents, key) in value.con">
            <el-col :span="3" :key="key">
              <div class="table_cell">{{key}}</div>
            </el-col>
            <el-col :span="3" :key="index" v-for="(content, index) in contents">
              <div class="table_cell" :data-day="content.dayStr" :class="content.status"></div>
            </el-col>
          </template>
        </el-row>
      </el-row>
    </template>
  </section>
</template>

<script>
  export default {
    name: 'class-table',
    props: ['lists'],
    data () {
      return {
        tableTitles: [],
        classTables: [],
        contentTables: [],
        currentDay: new Date(),
        currentMonth: '',
        lastMonth: '',
        nextMonth: '',
        currentMonthFirstDay: '',
        currentMonthLastDay: '',
        chartsFirstDay: '',
        chartsLastDay: '',
        currentWeekDay: '',
        oneDayMilliSeconds: 86400000,
        weekStr: ['一', '二', '三', '四', '五', '六', '天']
      }
    },
    mounted () {
      var now = new Date()
      this.init(now)
      if ((this.chartsLastDay - this.chartsFirstDay) < 36 * this.oneDayMilliSeconds) {
        this.getChartsTableDateLists() // 把当天应该展示的时间日历算出来
        var AWeekClassTable = {}
        var titleLists = []
        var contentLists = {}
        var data = []
        for (var i = 0; i < this.tableTitles.length; i++) {
          if (i % 7 === 0) {
            titleLists = []
            contentLists = {}
            AWeekClassTable = {}
            AWeekClassTable.title = titleLists
            AWeekClassTable.con = contentLists
            data.push(AWeekClassTable)
          }
          var dateInfo = this.tableTitles[i] // cell存储的信息
          var dateStr = dateInfo.dateStr // cell存储的信息
          titleLists.push(this.tableTitles[i])
          for (var name in this.lists) {
            if (!contentLists[name]) {
              contentLists[name] = []
            }
            var status = 'gray'
            if (this.currentMonthFirstDay - dateInfo.date <= 0 && dateInfo.date - this.currentMonthLastDay <= 0) {
              status = this.lists[name][dateStr] ? this.lists[name][dateStr].status : ''
            }
            var dateInfoForSomeone = { // 对于某个人的某天的cell信息
              day: dateInfo,
              dayStr: dateStr,
              status: status
            }
            contentLists[name].push(dateInfoForSomeone)
          }
        }
        this.classTables = data
      }
    },
    watch: {
      classTables () {
        console.info(this.classTables[0].con)
      }
    },
    methods: {
      init (now) {
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        this.currentMonthFirstDay = this.getCurrentMonthFirstDay(now)
        this.currentMonthLastDay = this.getCurrentMonthLastDay(now)
        this.chartsFirstDay = this.getCurrentWeekFirstDay(this.currentMonthFirstDay)
        this.chartsLastDay = this.getCurrentWeekLastDay(this.currentMonthLastDay)
      },
      getCurrentMonthFirstDay (date) {
        date = date || new Date()
        date.setDate(1)
        return date
      },
      getCurrentMonthLastDay (date) {
        this.currentMonth = date.getMonth()
        this.nextMonth = this.currentMonth + 1
        var firstDayForNextMonth = new Date(date.getFullYear(), this.nextMonth, 1)
        return new Date(firstDayForNextMonth - this.oneDayMilliSeconds)
      },
      getCurrentWeekFirstDay (date) {
        let currentWeekDay = date.getDay()
        return (new Date(date - ((currentWeekDay - 1) * this.oneDayMilliSeconds)))
      },
      getCurrentWeekLastDay (date) {
        let currentWeekDay = date.getDay()
        return (new Date(date.getTime() + (7 - currentWeekDay) * this.oneDayMilliSeconds))
      },
      getChartsTableDateLists () {
        var dateLists = []
        var time = this.chartsFirstDay
        var stop = false
        do {
          var dateInfo = {}
          dateInfo.date = new Date(time) // title中的时间属性
          dateInfo.dateStr = this.formatDate(time) // title中的时间格式化后的属性
          dateInfo.dayNum = time.getDate() // title中当月的号数
          dateInfo.week = this.weekStr[time.getDay()] // title中当前星期的星期几
          time.setDate(time.getDate() + 1)
          dateLists.push(dateInfo)
          if ((this.chartsLastDay - time) < 0) {
            stop = true
          }
        } while (!stop)
        this.tableTitles = dateLists
      },
      formatDate (date) {
        var month = date.getMonth() + 1
        month = month > 9 ? month : '0' + month
        var day = date.getDate()
        day = day > 9 ? day : '0' + day
        return date.getFullYear() + '-' + month + '-' + day
      }
    }
  }
</script>

<style lang="less">
  .classTableComponent {
    .table_head_name {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .table_cell {
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
    .blue {
      background: RGB(102, 255, 0);
    }
    .yellow {
      background: RGB(255, 255, 102);
    }
    .red {
      background: RGB(255, 0, 0);
    }
    .gray {
      background: RGB(204, 204, 204);
    }
    .classTable {
      margin-bottom: 20px;
      .el-col {
        border: 1px solid #d9d9d9;
        margin-bottom: -1px;
        margin-right: -1px;
      }
    }
  }
</style>
