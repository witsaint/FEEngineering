<template>
<div id='showResult'>
  <div>
    <!-- tabList -->
    <el-tabs value='0' @tab-click='clickBigTab'>
      <el-tab-pane :label='list.name' :name='index + ""' v-for='(list, index) in tabList'>
        <el-tabs @tab-click='clickTab' :value='tabList[index].item[0].prodId'>
          <el-tab-pane :label='item.name' :name='item.prodId' v-for='(item, index1) in list.item' :id='item.name' v-loading='loading1'>
            <!-- {{item.prodId}} -->
            <div class='' v-for='items in item.data' v-if='item.data'>
              <showResult :content='JSON.parse(items.json)' :jsonKey='JSON.parse(items.jsonKey)' :productName='items.productName'></showResult>
            </div>
            <p class='showResult_p' v-if='!item.data'>
              <el-button type='primary' @click='findThroughApi(item.prodId)' :loading='loading'>获取数据</el-button>
            </p>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script>
import api from '@/utils/api'
import showResult from '@/components/showResult'
export default {
  name: 'dataReport',
  props: ['applyId'],
  components: {
    showResult
  },
  data () {
    return {
      loading1: false,
      loading: false,
      tabList: [{
        'item': [{
          'name': '360数据获取',
          'prodId': 'P1041,P1045'
        }],
        'name': '综合'
      }, {
        'item': [{
          'name': '常贷客',
          'prodId': 'P1042'
        }, {
          'name': '银行卡评分',
          'prodId': 'P1069'
        }, {
          'name': '聚泛好信度',
          'prodId': 'P1075'
        }, {
          'name': '好信银行卡资迅',
          'prodId': 'P1045'
        }],
        'name': '前海'
      }],
      // 同盾 P1068
      // 前海
      //  P1069 银行卡评分
      //  P1075 聚泛好信度
      //  P1042 常贷用户查询
      //  P1041 风险度查询
      //  P1045 银行卡资讯查询
      // 百融
      //  P1047 多次申请核查
      //  特殊名单
      //  收支等级
      //
      // 安融
      // 上海资信
      // 蜜罐
      Datacontent: []
    }
  },
  mounted () {
    // this.logCreditData()
    this.getDataConfig()
    // this.findThroughApi()
  },
  methods: {
    getDataConfig () {
      api.getDataConfig().then(response => {
        this.tabList = response.data.data
        // alert(response.data.data[0].item[0].prodId)
        let Obj = {
          name: response.data.data[0].item[0].prodId
        }
        this.clickTab(Obj, event)
      }).catch()
    },
    logCreditData (index) {
      let result = {
        applyId: this.applyId,
        codeNumberString: index
      }
      // alert(index)
      api.logCreditData(result).then(response => {
        if (response.data.data) {
          this.Datacontent = response.data.data.resp
          for (let i = 0; i < this.Datacontent.length; i++) {
            // this.dataP1068 = this.Datacontent[i].name
            // this.('data' + this.Datacontent[i].name)
            for (let k = 0; k < this.tabList.length; k++) {
              for (let j = 0; j < this.tabList[k].item.length; j++) {
                if (this.tabList[k].item[j].prodId === this.Datacontent[i].product) {
                  console.log(this.Datacontent[i].product)
                  this.$set(this.tabList[k].item[j], 'data', this.Datacontent[i])
                  // this.$set(this.changeContact1, 'name', response.data.data.creditData.applyInfo.contactList[0].contactName)
                }
                console.log(this.tabList)
              }
            }
            this['data' + this.Datacontent[i].product] = this.Datacontent[i]
          }
        }
      }).catch()
    },
    findThroughApi (index) {
      this.loading = true
      let result = {
        applyId: this.applyId,
        codeNumberString: index
      }
      api.findThroughApi(result).then(response => {
        this.loading = false
        if (response.data.code === 200) {
          if (response.data.data) {
            for (let k = 0; k < this.tabList.length; k++) {
              for (let j = 0; j < this.tabList[k].item.length; j++) {
                if (this.tabList[k].item[j].prodId === index) {
                  this.$set(this.tabList[k].item[j], 'data', response.data.data.resp)
                }
                console.log(this.tabList)
              }
            }
          }
        } else {
          this.$message(response.data.message)
        }
      }).catch()
    },
    clickTab (tab, event) {
      this.loading1 = true
      console.log(tab, event)
      console.log(tab.name)
      let result = {
        applyId: this.applyId,
        codeNumberString: tab.name
      }
      api.logCreditData(result).then(response => {
        this.loading1 = false
        if (response.data.data) {
          for (let k = 0; k < this.tabList.length; k++) {
            for (let j = 0; j < this.tabList[k].item.length; j++) {
              if (this.tabList[k].item[j].prodId === tab.name) {
                this.$set(this.tabList[k].item[j], 'data', response.data.data.resp)
              }
              console.log(this.tabList)
            }
          }
        }
      }).catch()
    },
    clickBigTab (tab, event) {
      this.loading1 = true
      console.log(tab, event)
      let result = {
        applyId: this.applyId,
        codeNumberString: this.tabList[tab.index].item[0].prodId
      }
      api.logCreditData(result).then(response => {
        this.loading1 = false
        if (response.data.data) {
          for (let k = 0; k < this.tabList.length; k++) {
            for (let j = 0; j < this.tabList[k].item.length; j++) {
              if (this.tabList[k].item[j].prodId === tab.name) {
                this.$set(this.tabList[k].item[j], 'data', response.data.data.resp)
              }
              console.log(this.tabList)
            }
          }
        }
      }).catch()
    }
  }
}
</script>

<style lang='less'>
.showResult_p {
    padding: 30px 0;
    text-align: center;
}
</style>
