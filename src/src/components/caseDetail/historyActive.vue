<template>
  <section class="historyActive">
    <Tabs :value="historyFlowTab" >
      <TabPane label="行动历史" name="actionHistory">
        <el-table
          ref="actionHistoryTable"
          :data="actionHistoryData"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="行动时间"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="行动码"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="relation"
            label="催收员号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="复核日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="所在队列"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="备注">
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleHistoryCurrentChange"
            layout="total,prev, pager, next"
            :size="10"
            :page-size="20"
            :current-page.sync="ActionHistoryCurrentPage"
            :total="ActionHistoryTotalPage">
          </el-pagination>
        </el-row>
      </TabPane>
      <TabPane label="拨打历史" name="callHistory">
        <el-table
          ref="actionHistoryTable"
          :data="actionHistoryData"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="行动时间"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="电话编码"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="relation"
            label="催收员号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="拨打对象"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="来电/去电"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="备注">
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleHistoryCurrentChange"
            layout="total,prev, pager, next"
            :size="10"
            :page-size="20"
            :current-page.sync="ActionHistoryCurrentPage"
            :total="ActionHistoryTotalPage">
          </el-pagination>
        </el-row>
      </TabPane>
      <TabPane label="流转历史" name="circulationHistory">
        <el-table
          ref="circulationHistoryTable"
          :data="circulationHistoryData"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="案件号"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="队列流水号"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="relation"
            label="上一催收中心"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="转出队列"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="转入队列"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="队列流转总结代码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="转出队列催收员"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="记录日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="备注">
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleCirculationHistoryChange"
            layout="total,prev, pager, next"
            :size="10"
            :page-size="20"
            :current-page.sync="circulationHistoryCurrentPage"
            :total="circulationHistoryTotalPage">
          </el-pagination>
        </el-row>
      </TabPane>
      <el-row slot="extra">
        <el-date-picker
          size="mini"
          v-model="timeParams"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-row>
    </Tabs>
  </section>
</template>

<script>
  import api from '@/utils/api'
  export default {
    data () {
      return {
        circulationHistoryData: [],
        actionHistoryData: [],
        historyFlowTab: 'actionHistory',
        circulationHistoryCurrentPage: 1,
        circulationHistoryTotalPage: 0,
        ActionHistoryCurrentPage: 1,
        ActionHistoryTotalPage: 0,
        timeParams: ''
      }
    },
    methods: {
      handleCirculationHistoryChange (page) {
        console.info(page)
      },
      handleHistoryCurrentChange (val) {
        console.info(val)
      },
      searchActionHistoryDataByBtn () {
        this.searchActionHistoryData()
      },
      searchCirculationHistoryData () { // 查询流转历史请求
        api.searchCirculationHistoryData(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      searchIndependentRepaymentRecord () { // 自主还款记录
        api.searchIndependentRepaymentRecord(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      }
    }
  }
</script>

<style lang="less">

</style>
