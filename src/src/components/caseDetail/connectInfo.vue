<template>
  <section>
    <Tabs :value="connectTab">
      <TabPane label="系统电话" name="systemPhone">
        <el-table
          ref="multipleTable"
          :data="systemPhoneData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="systemPhoneSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="relation"
            label="关系"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话号码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="通话次数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="SMSNum"
            label="短信次数"
            width="120">
          </el-table-column>
          <el-table-column label="操作">
            <template v-if="isDisabledForAction" scope="scope">
              <el-button
                size="small"
                @click="sendMSM(scope.$index, scope.row)">发短信
              </el-button>
              <el-popover
                ref="remarkPopover"
                placement="right"
                width="400"
                trigger="click"
                v-model="marksVisible">
                <div class="marks_model">
                  <el-row>
                    <el-col :span="4">
                      <div class="mini_label">电话码</div>
                    </el-col>
                    <el-col :span="20">
                      <el-select size="mini" v-model="phoneCode" placeholder="请选择">
                        <el-option value="aa" label="ss">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>电话备注</el-col>
                    <el-col>
                      <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="marks">
                      </el-input>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-button size="small" @click="marksVisible = false">取消</el-button>
                    <el-button size="small">提交</el-button>
                  </el-row>
                </div>
              </el-popover>
              <el-button
                size="small"
                v-popover:remarkPopover
              >填写备注
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleSystemPhoneChange"
            layout="total,prev, pager, next"
            :size="10"
            :page-size="20"
            :current-page.sync="SystemPhoneCurrentPage"
            :total="SystemPhoneTotalPage">
          </el-pagination>
        </el-row>
      </TabPane>
      <tabPane label="通讯录" name="mailList">
        <el-table
          ref="multipleTable"
          :data="mailListData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleMailListSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="组别"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="relation"
            label="通讯录名字"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="通讯频次"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="电话号码"
            width="120">
          </el-table-column>
          <el-table-column label="操作">
            <template v-if="isDisabledForAction" scope="scope">
              <el-button
                size="small"
                @click="sendMSM(scope.$index, scope.row)">发短信
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleMailListChange"
            layout="total,prev, pager, next"
            :size="10"
            :page-size="20"
            :current-page.sync="MailListCurrentPage"
            :total="MailListTotalPage">
          </el-pagination>
        </el-row>
      </tabPane>
      <TabPane label="通话记录" name="callLog">
        <el-row>
          <el-col :span="4">
            <el-form>
              <el-input
                size="small"
                placeholder="请输入手机号码"
                icon="search"
                v-model="searchCallLogMobile"
                @keyup.enter="searchCallLogByMobile"
                :on-icon-click="searchCallLogByMobile">
              </el-input>
            </el-form>
          </el-col>
        </el-row>
        <!--  -->
        <el-table
          ref="contactTable"
          :data="CallLogData"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="relation"
            label="关系"
            width="120">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="通讯频次"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="发送模板"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="发送时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callsNum"
            label="备注"
            width="120">
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            @current-change="handleCallLogChange"
            layout="total,prev, pager, next"
            :size="10"
            :page-size="20"
            :current-page.sync="CallLogCurrentPage"
            :total="CallLogTotalPage">
          </el-pagination>
        </el-row>
      </TabPane>
      <el-row slot="extra">
        <el-input
          class="plane-search-nav"
          size="mini"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchMobile"
          @keyup.enter="searchContactByMobile"
          :on-icon-click="searchContactByMobile">
        </el-input>

      </el-row>
    </Tabs>
    <!--联系方式操作区域-->
    <el-button size="mini">批量发短信</el-button>
    <el-button size="mini" @click="addContactsShowModel">增加联系人</el-button>
    <el-dialog :close-on-click-modal=false :modal=false size="mini" title="新增联系人"
               :visible.sync="addContactsModelVisible">
      <el-form label-position="left" ref="form" :model="Contacts" label-width="100px">
        <el-form-item prop="ContactsName" :rules="[{
          required: true, message: '姓名不能为空', trigger: 'blur'
        }]" label="名字">
          <el-input size="small" v-model="Contacts.name"></el-input>
        </el-form-item>
        <el-form-item label="与借款人关系">
          <el-input size="small" v-model="Contacts.relationWithBorrower"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input size="small" v-model="Contacts.phone">
          </el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" class="dialog-footer">
        <el-button @click="addContactsModelVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContracts">添加</el-button>
      </el-row>
    </el-dialog>
  </section>
</template>

<script>
  import api from '@/utils/api'
  import connectInfoApi from '@/api/connectInfo'
  import {Tabs} from 'iview'
  export default {
    components: {
      Tabs
    },
    data () {
      return {
        connectTab: 'systemPhone',
        searchMobile: '',
        searchCallLogMobile: '', // 通过该手机号码查询通话记录
        systemPhoneData: [{
          name: 'gaoda',
          relation: '兄弟',
          phone: '15656214578',
          callsNum: '12',
          SMSNum: '4'
        }],
        mailListData: [],
        contactData: [],
        isDisabledForAction: true,
        MailListCurrentPage: 1,
        MailListTotalPage: 10,
        SystemPhoneCurrentPage: 1,
        SystemPhoneTotalPage: 10,
        CallLogCurrentPage: 1,
        CallLogTotalPage: 1,
        SMSLogData: [],
        CallLogData: [],
        Contacts: {
          name: '',
          relationWithBorrower: '',
          phone: ''
        }, // 新增联系人
        addContactsModelVisible: false,
        marks: '',
        marksVisible: false, // 备注弹出框
        phoneCode: ''
      }
    },
    methods: {
      systemPhoneSelectionChange (val) {
        this.selectedSystemPhoneData = val
      },
      handleMailListChange (val) {
        console.log(`当前页: ${val}`) // 处理变换页数的函数
      },
      handleSystemPhoneChange (val) {
        console.log(`系统电话当前页: ${val}`) // 处理变换页数的函数
      },
      handleMailListSelectionChange (val) {
        this.selectedMailListData = val
      },
      handleCallLogChange (val) {
        console.info(val)
      },
      addContactsShowModel () {
        this.addContactsModelVisible = true
      },
      searchContactByMobile () { // 查询通讯录
        connectInfoApi.findDebtorContactByMobile({
          mobile: this.searchMobile
        }).then(res => {
          let data = res.data
          if (data.code === '1000') {
            console.info(data)
          }
        }).catch(() => {
          this.$message.error('查询失败')
        })
      },
      searchCallLogByMobile () {
        connectInfoApi.findDebtorCallLogByMobile({
          mobile: this.searchCallLogMobile
        }).then(res => {
          let data = res.data
          if (data.code === '1000') {
            console.info(data)
          }
        }).catch(() => {
          this.$message.error('查询失败')
        })
      },
      sendMSM () { // 发短信
        api.sendMSM(this.form).then(response => {
          let data = response
          console.info(data)
        }).catch(error => {
          if (error) {
          }
        })
      },
      addContracts () {
        return
      }
    }
  }
</script>

<style lang="less">
.plane-search-nav{
  right: 15px;
}
</style>
