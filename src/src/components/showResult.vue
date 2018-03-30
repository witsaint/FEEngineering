<template>
  <div id="showResult">
      <!-- card-box -->
    <el-card class="baseTab">
      <table  v-loading="!(content && jsonKey)" border="0" width="100%" class="Data-table" cellpadding="0">
        <caption class="title">{{productName}}</caption>
        <tr>
          <th width="30%">项目</th>
          <th width="30%">分数</th>
          <th width="30%">描述</th>
        </tr>
        <tbody v-if="content && jsonKey">
          <tr v-for="(item, key, index) in jsonKey" v-if="!item.data">
                  <td v-if="showTr(item.display, content[key])" width="30%">{{item.cname}}</td>
                  <td v-if="showTr(item.display, content[key])" width="30%">{{content[key]}}</td>
                  <td v-if="showTr(item.display, content[key])" width="30%" v-html="item.desc"></td>
          </tr>
          <tr v-else class="records">
            <td colspan="3">
                <table width="100%" border="0" class="Data-table" cellpadding="0">
                  <th class="queryInfo" @click="showDetails($event)">
                    <i class="el-icon-arrow-down"></i>{{item.cname}}</th>
                  <tbody v-show="true" class="hideInfo" border="0">
                    <el-card class="">
                      <div class="row" v-for="(ele, index2) in item.data">
                      <div class="row" v-for="(thing, key3, index3) in ele">
                        <table v-loading="loading" border="0" width="100%" class="Data-table" cellpadding="0">
                          <tbody class="nestedHideInfo">
                            <tr class="row" v-if="!thing.data">
                              <td width="33%">{{thing.cname}}</td>
                              <td width="33%">{{content[key][index2][key3]}}</td>
                              <td width="33%" v-html="thing.desc"></td>
                            </tr>
                            <tr v-for="(unit, index4) in thing.data">
                              <td v-show="true" class="details hideInfo" colspan="3">
                                <p class="nestedQueryInfo" @click="showNestedDetails($event)"><i class="el-icon-arrow-down"></i>{{thing.cname}}</p>
                                <table v-loading="loading"width="100%" class="Data-table" cellpadding="0">
                                  <tbody class="nestedHideInfo">
                                      <tr class="row" v-for="(value, key5, index5) in unit">
                                      <td width="30%">{{value.cname}}</td>
                                      <td width="30%">{{content[key][index2][key3][index4][key5]}}</td>
                                      <td width="30%"v-html="value.desc"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </el-card>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </el-card>
    <!-- <el-col :span="24">
        <el-button class="goBack" type="primary" @click="goBack()">
          返回上一页
        </el-button>
      </el-card>
    </el-col> -->
  </div>
</template>
<script>
// import api from '@/utils/api'
export default {
  name: 'test',
  props: ['content', 'jsonKey', 'productName'],
  components: {},
  data () {
    return {
      // jsonKey: null,
      // content: null,
      loading: false,
      isActive: false,
      isFold: true
    }
  },
  methods: {
    // getName (index) {
    //   if (this.$route.query.cName) {
    //     return this.$route.query.cName
    //   } else {
    //     let productId = this.$route.query.productId[index]
    //     // 如果是组合批量就在baseList中查找productId对应的productName
    //     for (let i = 0; i < this.baseList.length; i++) {
    //       for (let j = 0; j < this.baseList[i].content.length; j++) {
    //         if (this.baseList[i].content[j].id === productId) {
    //           return this.baseList[i].content[j].productName
    //         }
    //       }
    //     }
    //   }
    // },
    // 根据display与value是否存在控制显示
    showTr (display, value) {
      return display && (!!value)
    },
    showDetails (event) {
      if (event.currentTarget.parentNode.querySelector('.hideInfo').style.display !== 'none') {
        event.currentTarget.parentNode.querySelector('.hideInfo').style.display = 'none'
        // this.isActive = false
      } else {
        event.currentTarget.parentNode.querySelector('.hideInfo').style.display = ''
        // this.isActive = true
      }
      if (event.currentTarget.getElementsByTagName('i')[0].className === 'el-icon-arrow-down') {
        event.currentTarget.getElementsByTagName('i')[0].className = 'el-icon-arrow-right'
      } else {
        event.currentTarget.getElementsByTagName('i')[0].className = 'el-icon-arrow-down'
      }
    },
    showNestedDetails (event) {
      // console.log(event.currentTarget.parentNode)
      if (event.currentTarget.parentNode.querySelector('.nestedHideInfo').style.display !== 'none') {
        event.currentTarget.parentNode.querySelector('.nestedHideInfo').style.display = 'none'
        // this.isActive = false
      } else {
        event.currentTarget.parentNode.querySelector('.nestedHideInfo').style.display = ''
        // this.isActive = true
      }
      if (event.currentTarget.getElementsByTagName('i')[0].className === 'el-icon-arrow-down') {
        event.currentTarget.getElementsByTagName('i')[0].className = 'el-icon-arrow-right'
      } else {
        event.currentTarget.getElementsByTagName('i')[0].className = 'el-icon-arrow-down'
      }
    }
  }
}
</script>
<style lang="less">
  .baseTab {
    margin: 20px;
    text-align: center;
  }
  .Data-table {
    border-collapse: collapse;
    border: 1px solid #dfe6ec;
    .title {
      margin: 20px auto;
    }
    td {
      border: 1px solid #dfe6ec;
      padding: 10px;
    }
    // td:nth-child(3) {
    //   text-align: left;
    // }
    th {
      border: 1px solid #dfe6ec;
      background-color: #eef1f6;
    }
    tr {
      padding: 10px;
    }
    tr:hover {
      padding: 5px 0;
      background-color: #eef1f6;
    }
    .details {
      // margin: ;
      // padding: 0;
      table {
        border: none;
      }
      .nestedHideInfo {
        tr {
          border: 1px solid #dfe6ec;
        }
      }
    }
    .records {
      // text-align: left;
      i {
        margin: 10px;
      }
      td:nth-child(1) {
        padding: 0;
        border: none;
      }
      .queryInfo {
        border: 2px solid #58B7FF;
        // background: #c9e5f5;
        height: 50px;
        line-height: 50px;
        font-weight: normal;
        background: #58B7FF;
        opacity: 0.7;
        color: #000;
      }
    }
    .row {
      border: none;
      // position: absolute;
      width: 100%;
    }
    .hideInfo {
      //  background: #c9e5f5;
       border: 2px solid #58B7FF;
       .nestedHideInfo {
         .nestedQueryInfo {
           margin: 0;
           height: 50px;
           line-height: 50px;
           font-weight: normal;
           background: #13CE66;
           opacity: 0.7;
           border: 2px solid #13CE66;
         }
         .hideInfo {
           border: 2px solid #13CE66;
         }
        //  border: 2px solid #58B7FF;
       }
    }
  }
  .goBack, .pagination {
    text-align: center;
    margin: 20px auto;
  }
</style>
