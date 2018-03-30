<template>
  <div class="info_table">
    <el-row>
      <el-col :span="5">商户：<span>{{}}</span></el-col>
      <el-col :span="5">案件总额：<span>{{}}</span></el-col>
      <el-col :span="5">案件级别：<span>{{}}</span></el-col>
      <el-col :span="5">案件编号：<span>{{}}</span></el-col>
      <el-col :span="4"><span><span>&nbsp;</span></span></el-col>
    </el-row>
    <el-row>
      <el-col :span="5">姓名：<span>{{baseInfo.debtor_eduction}}</span></el-col>
      <el-col :span="5">性别：<span>{{baseInfo.debtor_gender}}</span></el-col>
      <el-col :span="5">证件号码：<span>{{baseInfo.debtor_cert_type + ':' + baseInfo.debtor_cert_number}}</span></el-col>
      <el-col :span="9">户籍地址：<span>{{baseInfo.debtor_permanent_addresses}}</span> <i @click="updatePermanent" class="jf-icon el-icon-edit"></i></el-col>
    </el-row>
    <el-row>
      <el-col :span="5">个人身份：<span>{{baseInfo.debtor_permanent_addresses}}</span></el-col>
      <el-col :span="5">婚姻：<span>{{baseInfo.debtor_marital_status}}</span></el-col>
      <el-col :span="5">学历：<span>{{baseInfo.debtor_eduction}}</span></el-col>
      <el-col :span="9">常住地址：<span>{{baseInfo.debtor_residence_addresses}}</span> <i @click="updateResidence" class="jf-icon el-icon-edit"></i></el-col>
    </el-row>
    <el-row>
      <el-col :span="5">公司名称/收入来源：<span>{{baseInfo.debtor_residence_addresses}}</span></el-col>
      <el-col :span="5">所属行业：<span>{{baseInfo.debtor_industry}}</span></el-col>
      <el-col :span="5">月收入：<span>{{baseInfo.debtor_onthly_income}}</span></el-col>
      <el-col :span="9">公司/学校地址：<span>{{baseInfo.debtor_company_addresses}}</span> <i @click="updateCompany" class="jf-icon el-icon-edit"></i></el-col>
    </el-row>
    <el-row class="mul-row">
      <el-col :class="{'mul-col': baseInfo.debtor_bank_account_vo_list.debtor_bank_account.length > 1}" :span="12">
        <el-row type="flex">
          <div class="info-label">银行卡号：</div>
          <div class="info-detail">
            <div v-for="(bank, index) in baseInfo.debtor_bank_account_vo_list.debtor_bank_account">{{bank}}
              <el-button @click="updateBank(index)" type="text">修改银行账号</el-button>
            </div>
            <div class="flex-row">
              <el-button size="small" type="primary" @click="addBank">添加
              </el-button>
            </div>
          </div>
        </el-row>
      </el-col>
      <el-col :class="{'mul-col': baseInfo.debtor_mobile_vo_list.length > 1}" :span="12">
        <el-row type="flex">
          <div>手机号：</div>
          <div>
            <div v-for="(mobile, index) in baseInfo.debtor_mobile_vo_list">{{mobile.debtor_mobile}}
              <el-tag type="primary">{{mobile.status | mobileFilter}}</el-tag>
              <el-button @click="deleteMobile(index)" type="text">删除</el-button>
              <el-button @click="updateMobile(index)" type="text">修改号码</el-button>
              <el-button @click="updateStatus(index)" type="text">修改状态</el-button>
            </div>
            <div class="flex-row">
              <el-input v-show="showMobileInput" size="small" type="text" v-model="debtorMobileNum"></el-input>
              <el-button v-if="!showMobileInput" size="small" type="primary" @click="showMobileInput = true">添加
              </el-button>
              <el-button size="small" type="primary" @click="addMobile" v-else>提交</el-button>
            </div>
          </div>
        </el-row>
      </el-col>
      <!--<el-col :span="5">发卡行：<span>{{baseInfo.debtor_industry}}</span></el-col>-->
      <!--<el-col :span="4"><span>&nbsp;</span></el-col>-->
    </el-row>
    <el-dialog title="修改号码状态" size="tiny" :modal-append-to-body="false" :modal="false" :visible.sync="mobileVisible">
      <el-form>
        <el-form-item>
          <el-select v-model="mobileStatus" placeholder="修改号码状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mobileVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import debtor from '@/api/debtor'
  export default {
    props: ['debtorId', 'contactId'],
    data () {
      return {
        baseInfo: {
          debtor_name: '',
          debtor_gender: '',
          debtor_eduction: '',
          debtor_graduate: '',
          debtor_marital_status: '',
          debtor_revenue_source: '',
          debtor_industry: '',
          debtor_onthly_income: '',
          debtor_cert_type: '',
          debtor_cert_number: '',
          debtor_permanent_addresses: '',
          debtor_company_addresses: '',
          debtor_residence_addresses: '',
          debtor_bank_account_vo_list: {
            debtor_bank_account: ['6221887021016084238', '6221887021016084239', '6221887021016084237']
          },
          debtor_bank_account: '',
          debtor_mobile_vo_list: [
            {status: 0, debtor_mobile: 18756230700},
            {status: 0, debtor_mobile: 18756230700}
          ],
          state: '',
          debtor_mobile: ''
        },
        showMobileInput: false,
        debtorMobileNum: '', // 债务人的手机号码
        mobileStatus: '', // 债务人的手机号码状态
        updatedMobileIdx: '',
        mobileVisible: false
      }
    },
    methods: {
      showBasicDebtorInfo () {
        debtor.showBasicDebtorInfo({
          debtorId: '',
          contactId: ''
        }).then(res => {
          let data = res.data
          if (data.code === 1000) {

          }
        }).catch()
      },
      deleteMobile (index) {
        this.$confirm('此操作将删除该号码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.baseInfo.debtor_mobile_vo_list.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      addMobile () {
        debtor.addDebtorMobile({
          debtorId: this.debtorId,
          contractId: this.contractId,
          debtorMobileNum: this.debtorMobileNum
        }).then(res => {
          this.baseInfo.debtor_mobile_vo_list.push({status: 0, debtor_mobile: this.debtorMobileNum})
          this.debtorMobileNum = ''
          this.showMobileInput = false
        }).catch()
      },
      updateMobile (index) {
        this.$prompt('修改电话', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^1[3|4|5|7|8][0-9]{9}$/,
          inputErrorMessage: '手机格式不正确'
        }).then(({value}) => {
          // 修改手机号码
          debtor.addDebtorMobile({
            debtorId: this.debtorId,
            contractId: this.contractId,
            oldDebtorMobile: this.baseInfo.debtor_mobile_vo_list[index].debtor_mobile,
            newDebtorMobile: value
          }).then(res => {
            let data = res.data
            if (data.code === '1000') {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              console.info(data)
            }
          }).catch(() => {
            this.$message.error('修改失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
      },
      updateStatus (idx) {
        this.updatedMobileIdx = idx
        this.mobileStatus = this.baseInfo.debtor_mobile_vo_list[idx].status
        this.mobileVisible = true
      },
      updateStatusSubmit () {
        debtor.modifyDebtorMobileState({
          debtorId: this.debtorId,
          contractId: this.contractId,
          debtorMobileNum: this.baseInfo.debtor_mobile_vo_list[this.updatedMobileIdx].debtor_mobile,
          state: this.mobileStatus
        }).then(res => {
          let data = res.data
          if (data.code === '1000') {
            console.info(data)
          }
        }).catch(() => {
          this.$message.error('修改失败')
        })
      },
      addBank () {
        this.arouBank(true, '')
      },
      updateBank (idx) {
        this.arouBank(false, this.baseInfo.debtor_bank_account_vo_list.debtor_bank_account[idx])
      },
      arouBank (isAdd, oldDebtorBankAccount) {
        let arouInfo = isAdd ? '新增' : '修改'
        this.$prompt(oldDebtorBankAccount ? '旧账户：' + oldDebtorBankAccount : '新账户', arouInfo + '银行账户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(\d{16}|\d{19})$/,
          inputErrorMessage: '银行卡格式不正确'
        }).then(({value}) => {
          // 银行账号
          let res = ''
          let params = {
            debtorId: this.debtorId,
            contractId: this.contractId,
            newDebtorBankAccount: value
          }
          if (isAdd) {
            res = debtor.addDebtorBankAccount()
          } else {
            res = debtor.modifyDebtorBankAccount()
            params.oldDebtorBankAccount = oldDebtorBankAccount
          }
          res.then(res => {
            let data = res.data
            if (data.code === '1000') {
              this.$message({
                type: 'success',
                message: arouInfo + '成功'
              })
              console.info(data)
            }
          }).catch(() => {
            this.$message.error(arouInfo + '失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: `取消${arouInfo}`
          })
        })
      },
      updatePermanent () {
        this.$prompt('修改债务人地址', '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          // 修改户籍地址
          debtor.modifyDebtorPermanentAddress({
            debtorId: this.debtorId,
            contractId: this.contractId,
            newDebtorAddresses: value
          }).then(res => {
            let data = res.data
            if (data.code === '1000') {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              console.info(data)
            }
          }).catch(() => {
            this.$message.error('修改失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
      },
      updateCompany () {
        this.$prompt('修改公司地址', '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          // 修改公司地址
          debtor.modifyDebtorCompanyAddress({
            debtorId: this.debtorId,
            contractId: this.contractId,
            newDebtorAddresses: value
          }).then(res => {
            let data = res.data
            if (data.code === '1000') {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              console.info(data)
            }
          }).catch(() => {
            this.$message.error('修改失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
      },
      updateResidence () {
        this.$prompt('修改居住地址', '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          // 修改居住地址
          debtor.modifyDebtorResidenceAddress({
            debtorId: this.debtorId,
            contractId: this.contractId,
            newDebtorAddresses: value
          }).then(res => {
            let data = res.data
            if (data.code === '1000') {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              console.info(data)
            }
          }).catch(() => {
            this.$message.error('修改失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
      }
    },
    filters: {
      mobileFilter (val) {
        switch (val) {
          case 0:
            return '正常'
          case 1:
            return '锁住'
        }
        return val
      }
    }
  }
</script>

<style lang="less" scoped>
  .mul-col {
    height: auto !important;
    border: 0px !important;
  }

  .flex-row {
    display: flex;
  }

  .info-label {
    width: 70px;
  }

  .info-detail {
    width: ~"calc(100% - 70px)";
  }
  .jf-icon{
    float: right;
    line-height: 24px;
    cursor: pointer;
  }

  .input__inner {
    width: 237px;
  }
</style>
