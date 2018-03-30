<template>
  <section>
    <el-radio class="radio" v-model="dateChooseType" label="0">今日</el-radio>
    <el-radio class="radio" v-model="dateChooseType" label="1">本周</el-radio>
    <el-radio class="radio" v-model="dateChooseType" label="2">本月</el-radio>
    <!--<el-radio class="radio" v-model="dateChooseType" label="3">本季度</el-radio>-->
    <el-radio class="radio" v-model="dateChooseType" label="4">本年度</el-radio>
    <el-date-picker
      size="mini"
      v-model="dateRange"
      type="daterange"
      @change="dateChangeFunc"
      placeholder="选择时间范围">
    </el-date-picker>
  </section>
</template>

<script>
  import Time from '@/utils/timetool'
  export default {
    props: ['value'],
    data () {
      return {
        formatDateSet: {
          '0': [new Date(), new Date()],
          '1': [Time.getCurrentWeekFirstDay(new Date()), Time.getCurrentWeekLastDay(new Date())],
          '2': [Time.getCurrentMonthFirstDay(new Date()), Time.getCurrentMonthLastDay(new Date())],
          '3': [Time.getCurrentQuarterFirstDay(new Date()), Time.getCurrentQuarterLastDay(new Date())],
          '4': [Time.getCurrentYearFirstDay(new Date()), Time.getCurrentYearLastDay(new Date())]
        },
        dateRange: '',
        dateChooseType: ''
      }
    },
    mounted () {
      if (this.value) {
        this.dateRange = this.value
      }
    },
    watch: {
      value (val) {
        this.dateRange = val
      },
      dateChooseType (type) {
        if (type) {
          this.dateRange = this.formatDateSet[type]
          this.$emit('input', this.dateRange)
          this.$emit('change', this.dateRange)
        }
      }
    },
    methods: {
      dateChangeFunc (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
</script>

<style lang="less">

</style>
