<template>
  <section class="workQualitySearch">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>作业质量查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="table_nav">
      <el-table
        :data="tableData"
        max-height="600"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="collectionCompany"
          label="催收公司"
          width="180">
        </el-table-column>
        <el-table-column
          prop="staffCode"
          label="员工号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="seatCode"
          label="坐席号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="actionCodeOTHOrPTPNum"
          label="行动码OTH/PTP数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="effectivePhoneNum"
          label="电话码有效数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="notTouchNum"
          label="未触碰量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dengesCallDuration"
          label="当日通话时长"
          width="180">
        </el-table-column>
        <el-table-column
          prop="freeTime"
          label="空闲时长"
          width="150">
        </el-table-column>
        <el-table-column
          prop="busyTime"
          label="示忙时长"
          width="150">
        </el-table-column>
      </el-table>
      <div class="jfPagination">
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handlePageChange"
            layout="total,prev, pager, next"
            :size="10"
            :page-size="20"
            :current-page.sync="currentPage"
            :total="totalPage">
          </el-pagination>
        </el-row>
      </div>
    </el-row>
  </section>
</template>

<script>
  import api from '@/utils/api'
  export default {
    name: 'workQualitySearch',
    data () {
      return {
        currentPage: 2,
        totalPage: 100,
        tableData: [{
          check: true,
          name: '黄志斌',
          phone: '13917379649',
          idCode: '350303********1510',
          seatCode: '06',
          staffCode: '12',
          actionCodeOTHOrPTPNum: '350',
          effectivePhoneNum: '35',
          notTouchNum: '10',
          dengesCallDuration: '300',
          freeTime: '100',
          busyTime: 20
        }],
        selectedOption: []
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.selectedOption = val
      },
      handlePageChange (page) {
        this.search(page)
      },
      searchDate (page) {
        api.workQualitySearch({
          form: page
        }).then(response => {
          let date = response.date
          console.info(date)
        }).catch(error => {
          if (error) {
            console.info(error)
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="less">

</style>
