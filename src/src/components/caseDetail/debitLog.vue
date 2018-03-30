<template>
  <section class="debit-log-comp">
    <el-row class="debit-log-table">
      <el-table
        ref="actionHistoryTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="扣款类型"
          width="150">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作员"
          width="150">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="relation"
          label="执行结果"
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="扣款时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="callsNum"
          label="通道" >
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <el-pagination
          @current-change="currentChangeFunc"
          layout="total,prev, pager, next"
          :size="10"
          :page-size="20"
          :current-page.sync="currentPage"
          :total="totalPage">
        </el-pagination>
      </el-row>
    </el-row>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1,
        totalPage: 0,
        tableData: []
      }
    },
    methods: {
      currentChangeFunc (page) {
        console.info(page)
      }
    }
  }
</script>

<style lang="less">
.debit-log-comp{
  .debit-log-table{
    width: 800px;
  }
}
</style>
