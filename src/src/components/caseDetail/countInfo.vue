<template>
  <section class="count-info-comp">
    <div class="info_list">
      <el-row>
        <el-col :span="8">产品名称：<span>{{}}</span></el-col>
        <el-col :span="8">永久催收员：<span>{{}}</span></el-col>
        <el-col :span="8">当前催收员：<span>{{}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">应还总额：<span>{{}}</span></el-col>
        <el-col :span="8">案件级别：<span>{{}}</span></el-col>
        <el-col :span="8">案件编号：<span>{{}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">逾期本金：<span>{{}}</span></el-col>
        <el-col :span="8">逾期利息：<span>{{}}</span></el-col>
        <el-col :span="8">逾期罚息：<span>{{}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">借款本金：<span>{{}}</span></el-col>
        <el-col :span="8">借款利息：<span>{{}}</span></el-col>
        <el-col :span="8">前置收费：<span>{{}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">已还金额：<span>{{}}</span></el-col>
        <el-col :span="8">未还金额：<span>{{}}</span></el-col>
        <el-col :span="8">当前期数：<span>{{}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">最后还款时间：<span>{{}}</span></el-col>
        <el-col :span="8">最后还款金额：<span>{{}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">逾期天数：<span>{{}}</span></el-col>
        <el-col :span="8">入催日期：<span>{{}}</span></el-col>
        <el-col :span="8">分案日期：<span>{{}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">催收中心：<span>{{}}</span></el-col>
        <el-col :span="8">流转标志：<span>{{}}</span></el-col>
        <el-col :span="8">罚息减免：
          <el-input size="small" class="inline-input" v-model="input" placeholder="请输入内容"></el-input>
          <el-button size="mini" type="primary" plain>提交</el-button>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        input: ''
      }
    }
  }
</script>

<style lang="less">
  .count-info-comp {
    .inline-input {
      display: inline-block;
      width: 180px;
      border: none;
      input {
        border: none;
      }
    }
  }
</style>
