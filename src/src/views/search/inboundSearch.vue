<template>
  <section class="inboundSearch">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>inbound查询</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button size="mini" type="primary" class="search_nav_btn search_btn" @click="search" id="search">搜索</el-button>
        <clear-btn :formObj="form" :formRef="'inboundSearchForm'"></clear-btn>
      </div>
    </el-row>
    <div class="search_nav">
      <el-form ref="inboundSearchForm" id="inboundSearchForm" v-model="form" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="名字:">
              <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号:">
              <el-input size="small" v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="身份证号:">
              <el-input size="small" v-model="form.idCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row class="table_nav">
      <el-table
        :data="tableData"
        max-height="600"
        style="width: 100%">
        <el-table-column
          prop="caseCode"
          label="案件号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户名字"
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="idCode"
          label="身份证号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="merchant"
          label="商户"
          width="150">
        </el-table-column>
        <el-table-column
          prop="amountDue"
          label="应还金额"
          width="150">
        </el-table-column>
        <el-table-column
          prop="alreadyPaidAmound"
          label="已还金额"
          width="180">
        </el-table-column>
        <el-table-column
          prop="rushTIme"
          label="入催时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="caseLevel"
          label="案件等级"
          width="150">
        </el-table-column>
        <el-table-column
          prop="collectionCompany"
          label="催收公司"
          width="180">
        </el-table-column>
        <el-table-column
          prop="collectPerson"
          label="催收人员"
          width="150">
          <template scope="scope">
            <span :class="{assistPerson : scope.row.isAssist}">{{scope.row.collectPerson}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="caseStatus"
          label="案件状态"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template scope="scope">
            <el-button type="text" size="small" @click="detail(scope.row.id)">查看</el-button>
          </template>
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
  import clearBtn from '@/components/clearBtn'
  import api from '@/utils/api'
  export default {
    name: 'inboundSearch',
    data () {
//      var validatePhone = (rule, value, callback) => {
//        if (/^1[0-9]{10}$/.test(value)) {
//          callback()
//        } else {
//          callback(new Error('请输入正确格式的电话号码'))
//        }
//      }

      return {
        form: {
          name: '',
          phone: '',
          idCode: ''
        },
        tableData: [],
        currentPage: 1,
        totalPage: 10,
        rules: {}
      }
    },
    components: {
      clearBtn
    },
    mounted () {
      this.$store.dispatch('initForm', this.$refs['inboundSearchForm']) // 在store注册该查询的form，提供清楚功能操作的对象
      this.searchData()
    },
    methods: {
      handleSelectionChange (val) {
        this.selectedOption = val
      },
      search () {
        this.searchData(this.currentPage)
      },
      searchData (page) {
        api.inboundSearch(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      handlePageChange (page) {
        this.searchData(page)
      }
    }
  }
</script>

<style lang="less">

</style>
