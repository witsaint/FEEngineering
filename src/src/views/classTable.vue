<template>
  <section class="classTable">
    <el-row class="breadcrumb_nav" type="flex" justify="space-between">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >班表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-tabs v-model="tab" type="card" @tab-click="handleClick">
        <el-tab-pane :key="index" v-for="(value, index) in tabLists" :label="value.label" :name="value.name">
          <classTable :lists="value.classLists"></classTable>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </section>
</template>

<script>
  import classTable from '@/components/classTable'
  import api from '@/utils/api'
  export default {
    name: 'classTable',
    data () {
      return {
        tabLists: [{
          label: '第一组',
          name: '1',
          classLists: {
            gao: {
              '2017-06-20': {
                status: 'blue'
              },
              '2017-06-21': {
                status: 'yellow'
              }
            },
            ding: {
              '2017-06-02': {
                status: 'blue'
              },
              '2017-06-04': {
                status: 'yellow'
              }
            }
          }
        }, {
          label: '第二组',
          name: '2',
          classLists: {
            gao: {
              '2017-06-20': {
                status: 'blue'
              },
              '2017-06-21': {
                status: 'yellow'
              }
            },
            ding: {
              '2017-06-02': {
                status: 'blue'
              },
              '2017-06-03': {
                status: 'yellow'
              }
            }
          }
        }],
        tab: '1'
      }
    },
    components: {
      classTable
    },
    methods: {
      handleClick () {
        return
      },
      searchClasstable () {
        api.classTableSearch(this.form).then(response => {
          let data = response
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
