<script>
  export default {
    render (createElement) {
      if (this.row.status === 0) {
        return createElement('div', {}, [
          this.createButton(createElement, this.agree, '同意'),
          this.createButton(createElement, this.refuse, '拒绝')
        ])
      } else {
        return createElement('div', {
          style: {
            textAlign: 'center'
          },
          // DOM 属性
          domProps: {
            innerHTML: this.type[this.row.status]
          }
        })
      }
    },
    methods: {
      createButton (createElement, func, innerHtml) {
        return createElement('el-button', {
          props: {
            type: 'text',
            size: 'small'
          },
          domProps: {
            innerHTML: innerHtml
          },
          on: {
            click: func
          }
        })
      },
      agree (id) {
        console.info('同意')
      },
      refuse (id) {
        console.info('拒绝')
      }
    },
    data () {
      return {
        type: {
          '1': '已同意',
          '2': '未同意',
          '3': '扣款成功',
          '4': '扣款失败'
        }
      }
    },
    props: ['row']
  }
</script>

<style lang="less">

</style>
