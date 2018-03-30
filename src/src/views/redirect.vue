<template>
  <section class="refresh" v-loading="loading">
  </section>
</template>

<script>
  export default {
    data () {
      return {
        loading: true
      }
    },
    activated () {
      this.$router.go(-1)
    }
  }
</script>

<style lang="less">
.refresh{
  height: 50%;
}
</style>
