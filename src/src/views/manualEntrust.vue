<template>
  <section class="manualEntrust">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>手工委托</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button size="mini" class="search_nav_btn search_btn" @click="search" id="search">搜索</el-button>
        <clear-btn :formObj="form" :formRef="'manualEntrustForm'"></clear-btn>
      </div>
    </el-row>
    <div class="search_nav">
      <el-form ref="manualEntrustForm" id="manualEntrustForm" v-model="form" label-width="100px">
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
        :data="tableData"
        max-height="600"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
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
            <el-button type="text" size="small" @click="entrust(scope.row.id)">委托</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <div class="entrust_btn_group">
          <el-button>自动批量委托</el-button>
          <el-button>批量委托</el-button>
        </div>
      </el-row>
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
    <el-dialog :modal="needBack" size="mini" title="" :visible.sync="entrustModelVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="催收公司">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人员">
          <el-select v-model="form.person" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="永久分配" value="shanghai"></el-option>
            <el-option label="临时分配" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收时间">
          <el-select v-model="form.time" placeholder="请选择">
            <el-option label="1天" value="0"></el-option>
            <el-option label="2天" value="1"></el-option>
            <el-option label="3天" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" class="dialog-footer">
        <el-button @click="entrustModelVisible = false">取 消</el-button>
        <el-button type="primary" @click="entrustModelVisible = false">分配</el-button>
      </el-row>
    </el-dialog>
  </section>
</template>

<script>
  import clearBtn from '@/components/clearBtn'
  import api from '@/utils/api'
  export default {
    data () {
      return {
        form: {
          name: '',
          scene: '', // 场景
          phone: '',
          idCode: '',
          caseLevel: '',
          rushStartTime: '', // 入催开始时间
          rushEndTime: '',
          rushEndTim: '',
          caseStatus: '', // 案件状态
          collectionCompany: '', // 催收公司
          collectionPerson: '', // 催收人员
          mergeCaseNum: ''
        },
        caseIsOld: '1',
        currentPage: 2,
        totalPage: 100,
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
        }],
        selectedOption: [],
        entrustModelVisible: false,
        needBack: false
      }
    },
    components: {
      clearBtn
    },
    mounted () {
      this.$store.dispatch('initForm', this.$refs['manualEntrustForm']) // 在store注册该查询的form，提供清楚功能操作的对象
      this.getSearchData()
    },
    methods: {
      handlePageChange (val) {
        this.getSearchData(val)
      },
      handleSelectionChange (val) {
        console.info(val)
      },
      entrust (id, name) {
        this.entrustModelVisible = true
      },
      detail () {
        this.$router.push({path: '/personalQueue'})
      },
      search () {
        // validate the form data
        this.getSearchData()
      },
      getSearchData (page) {
        api.manualEntrustSearch({
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
  .manualEntrust {
    .entrust_btn_group {
      margin: 4px 0;
    }
  }
</style>
