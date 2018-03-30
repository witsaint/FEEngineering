<template>
  <section class="personSearch">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人员查询</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button size="mini" type="primary" class="search_nav_btn search_btn" id="search">搜索</el-button>
        <clear-btn :formObj="form" :formRef="'personSearchForm'"></clear-btn>
      </div>
    </el-row>
    <div class="search_nav">
      <el-form ref="personSearchForm" id="personSearchForm" label-width="100px">
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
            <el-form-item label="催收公司:">
              <el-select size="small" v-model="form.collectCompany" placeholder="请选择">
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
            <el-form-item label="员工号:">
              <el-input size="small" v-model="form.staffCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="坐席号:">
              <el-input size="small" v-model="form.seatCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否在线:">
              <el-select size="small" v-model="form.isOnline" placeholder="请选择">
                <el-option value="0" label="不在线">
                </el-option>
                <el-option value="1" label="在线">
                </el-option>
              </el-select>
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
          prop="collectCompany"
          label="催收公司"
          width="180">
        </el-table-column>
        <el-table-column
          prop="stallCode"
          label="员工号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="seatCode"
          label="坐席号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="inputTIme"
          label="录入时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="isOnline"
          label="在线">
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
    name: 'personSearch',
    data () {
      return {
        form: {
          name: '',
          phone: '',
          collectCompany: '',
          staffCode: '',
          seatCode: '',
          isOnline: ''
        },
        tableData: [],
        currentPage: 1,
        totalPage: 10
      }
    },
    components: {
      clearBtn
    },
    methods: {
      handlePageChange (val) {
        this.getSearchData(val)
      },
      search () {
        // validate the form data
        this.getSearchData()
      },
      getSearchData (page) {
        api.personSearch({
          form: page,
          data: this.form
        }).then(response => {
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

</style>
