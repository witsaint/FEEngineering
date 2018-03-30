<template>
  <section>
    <el-table
      ref="actionHistoryTable"
      :data="actionHistoryData"
      border
      tooltip-effect="dark"
      style="width: 610px">
      <el-table-column
        prop="name"
        label="产品名称"
        width="120">
        <template scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="借款金额"
        width="120">
        <template scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="relation"
        label="借款时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="relation"
        label="借款周期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="relation"
        label="最大预期天数" >
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
  </section>
</template>

<script>
  export default {
    data () {
      return {
        ActionHistoryCurrentPage: 1,
        ActionHistoryTotalPage: 0,
        actionHistoryData: []
      }
    },
    methods: {
      handleHistoryCurrentChange (page) {

      }
    }
  }
</script>

<style lang="less">

</style>
