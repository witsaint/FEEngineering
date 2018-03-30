<template>
  <section class="beachSearch">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>实时还款批量查询</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button size="mini" type="primary" class="search_nav_btn search_btn" @click="search" id="search">搜索</el-button>
        <clear-btn :formObj="form" :formRef="'beachSearchForm'"></clear-btn>
      </div>
    </el-row>
    <div class="search_nav">
      <el-form ref="beachSearchForm" id="beachSearchForm" :model="form" label-width="100px">
        <el-row class="comment-search-nav">
          <el-col :span="6">
            <el-form-item label="场景:">
              <el-select size="small" v-model="form.scene" placeholder="请选择">
                <el-option value="" label="">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品:">
              <el-select size="small" v-model="form.product" placeholder="请选择">
                <el-option value="" label="">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务中心:">
              <el-select size="small" v-model="form.businessCent" placeholder="请选择">
                <el-option value="" label="">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="用户名字:">
              <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户手机号:">
              <el-input size="small" v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户身份证:">
              <el-input size="small" v-model="form.idCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="rushStart" label="入催时间区间:">
              <el-date-picker
                size="small"
                :editable=false
                v-model="form.rushTime"
                type="daterange"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="案件等级:">
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
            <el-form-item label="案件状态:">
              <el-select size="small" v-model="form.caseStatus" placeholder="请选择">
                <el-option value="0" label="再催">
                </el-option>
                <el-option value="1" label="已出催">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="案件新旧:">
              <el-select size="small" v-model="form.caseIsOld" placeholder="请选择">
                <el-option value="0" label="新">
                </el-option>
                <el-option value="1" label="旧">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入催金额区间:">
              <el-col :span="11">
                <el-input size="small" v-model="moneyNumS"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input size="small" v-model="moneyNumE"></el-input>
              </el-col>
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
    name: 'beachSearch',
    data () {
      return {
        form: {
          scene: '',
          product: '',
          businessCent: '',
          name: '',
          phone: '',
          merchant: '',
          idCode: '',
          caseLevel: '',
          rushTime: '',
          CaseCode: '',
          caseStatus: ''
        },
        moneyNumS: '',
        moneyNumE: '',
        tableData: [],
        currentPage: 1,
        totalPage: 10,
        rule: {
          shouldReturnMoneyNumB: {
            shouldReturnMoneyNumB: [
              {type: 'number', message: '请输入数字'}
            ]
          }
        }
      }
    },
    components: {
      clearBtn
    },
    mounted () {
      this.$store.dispatch('initForm', this.$refs['beachSearchForm']) // 在store注册该查询的form，提供清楚功能操作的对象
      this.getSearchData()
    },
    methods: {
      reset (formName) {
        this.$refs[formName].resetFields()
      },
      clear (form, formName) {
        for (let name in form) {
          form[name] = ''
        }
        this.reset(formName)
      },
      search () {
        // validate the form data
        this.getSearchData()
      },
      getSearchData () {
        api.beachSearch(this.form).then(response => {
          let data = response.data
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
.line{
  text-align: center;
}
</style>
