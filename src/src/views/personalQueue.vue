<template>
  <section class="personalQueue">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人队列</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button size="mini" type="primary" class="search_nav_btn search_btn" id="search">搜索</el-button>
        <clear-btn :formObj="form" :formRef="'personalQueueForm'"></clear-btn>
      </div>
    </el-row>
    <div class="search_nav">
      <el-form ref="personalQueueForm" id="personalQueueForm" v-model="form" label-width="100px">
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
            <el-form-item label="并案数量:">
              <el-select size="small" v-model="form.mergeCaseNum" placeholder="请选择">
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
        </el-row>
      </el-form>
    </div>
    <el-row class="table_nav">
      <el-table
        v-loading.body="loading"
        :data="tableData"
        max-height="600"
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column
          prop="check"
          label="勾选"
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
          prop="mergeNum"
          label="并案数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="rushTime"
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
    name: 'personalQueue',
    data () {
      return {
        form: {
          name: '',
          scene: '', // 场景
          product: '', // 产品
          businessCent: '',
          phone: '',
          idCode: '',
          caseLevel: '',
          rushTime: [], // 入催时间
          rushEndTim: '',
          caseStatus: '', // 案件状态
          mergeCaseNum: ''
        },
        caseIsOld: '1',
        currentPage: 2,
        totalPage: 100,
        loading: true,
        tableData: [{
          check: true,
          customerName: '黄志斌',
          phone: '13917379649',
          idCode: '350303********1510',
          merchant: '小象优品',
          mergeNum: '12',
          rushTime: '2017-12-25',
          caseLevel: 'M6+',
          collectionCompany: '聚泛催收',
          collectPerson: '李亚',
          caseStatus: '',
          isAssist: true
        }]
      }
    },
    components: {
      clearBtn
    },
    created () {
      this.searchDate()
    },
    methods: {
      detail (id) {
        this.$router.push({path: '/caseDetail', query: {id: id}})
      },
      tableRowClassName (row, index) {
        if (row.caseStatus === 0) {
          return 'handled_background'
        }
      },
      handlePageChange (val) {
        this.searchDate(val)
      },
      searchDate (page) {
        api.searchPersonQueue({
          form: page,
          data: this.form
        }).then(response => {
          let date = response.date
          console.info(date)
        }).catch(error => {
          if (error) {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .breadcrumb_nav {
    border-bottom: 1px solid #dddddd;
    padding: 3px 15px;
    height: 35px;
    margin-bottom: 8px;
    .el-breadcrumb {
      font-size: 14px;
      line-height: 32px;
    }
    .search_nav_btn {
      margin-left: 10px;
    }
    .search_btn {
      width: 80px;
    }
  }


  /*公共的查询部分的样式*/
  .search_nav {
    font-size: 0;
    width: 90%;
    /*padding-right: 150px;*/
    -webkit-text-size-adjust: none;
    letter-spacing: -3px;
    .el-form>.el-row>.el-col{
      min-width: 330px;
    }
    .comment-search-nav {
      /*background-color: #FAFAFA;*/
    }
    .el-form-item {
      /*display: inline-block;*/
      word-spacing: 0;
      letter-spacing: 0;
      margin-bottom: 15px;
      label {
        /*width: 90px !important;*/
      }
      .el-form-item__content {
        /*margin-left: 90px !important;*/
        width: 216px;
      }
      input {
        /*width: 190px;*/
      }
    }
  }

  .personalQueue {
    .handled_background {
      background: #dddddd;
    }
    .jfPagination {
      margin-top: 15px;
    }
    .table_nav {
      .assistPerson {
        display: block;
        width: 100%;
        height: 100%;
        background: #00ff00;
      }
    }
  }
</style>
