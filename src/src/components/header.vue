<template>
  <header>
    <div class="system-title">
      <strong>聚泛统一催收系统</strong>
    </div>
    <span class="head-content">
      <tabs></tabs>
      <span class="controller-nav">欢迎 {{userName}}<el-button type="text" @click="logout">退出</el-button></span>
    </span>
  </header>
</template>

<script>
  import Vue from 'vue'
  import tabs from '@/components/tab-main'
  import {Button} from 'element-ui'

  Vue.use(Button)

  export default {
    data () {
      return {
        userName: localStorage.getItem('username'),
        stopWork: '暂停工作',
        workStatus: true
      }
    },
    methods: {
      logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('password')
        this.$router.push('/login')
      },
      pause () {
        if (this.workStatus) {
          localStorage.setItem('pause', +new Date())
          this.stopWork = '此单完成暂停工作'
          this.workStatus = false
        } else {
          localStorage.removeItem('pause')
          this.stopWork = '暂停工作'
          this.workStatus = true
        }
      }
    },
    components: {
      tabs
    }
  }
</script>

<style lang="less">
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    /*padding: 5px 15px;*/
    line-height: 39px;
    background: #FFFFFF;
    color: rgba(0, 0, 0, 0.6);
    .system-title{
      width: 180px;
      box-sizing: border-box;
      color: white;
      height: 100%;
      background-color: #282d33;
    }
    .head-content{
      width: ~'calc(100% - 180px)';
      text-align: justify;
      border-bottom: 1px solid #cfd8dc;
      .controller-nav{
        float: right;
      }
    }
    strong {
      padding: 0 10px;
      font-size: 20px;
    }
    span {
      padding: 0 10px;
      font-size: 15px;
    }
    a {
      text-decoration: none;
      color: white;
    }
  }
</style>
