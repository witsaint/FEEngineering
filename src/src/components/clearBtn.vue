<template>
  <el-button size="mini" @click="clear(formObj, formRef)" class="search_nav_btn" id="clear">清空</el-button>
</template>

<script>
  export default {
    name: 'clearbtn',
    props: ['formObj', 'formRef'],
    data () {
      return {}
    },
    methods: {
      reset (formRef) {
        let id = this.$store.state.page.searchForm.$el.id
        if (formRef && id && id === formRef) {
          this.$store.state.page.searchForm.resetFields()
        } else {
          console.warn('请在当前form上设置ref\\id')
        }
      },
      clear (form, formRef) {
        for (let name in form) {
          form[name] = ''
        }
        this.reset(formRef)
      }
    }
  }
</script>

<style lang="less">

</style>
