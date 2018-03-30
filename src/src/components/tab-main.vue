<template>
  <span class="tab-base">
    <template v-for="(tab, index) in tabs">
        <el-button @contextmenu.native="menu($event, tab)" class="tab" @click.native="redirect(tab.url, tab.name)" size="mini" :key="index" :type="tab.url === currentUrl ? 'primary' : ''"
                   round>{{tab.name}}</el-button>
    </template>
    <div :style="{left: offsetX + 'px'}" v-show="isAct" class="el-popover el-popper">
      <div class="pro-menu el-row">
        <div @click="refresh" class="menu-item el-col el-col-24">刷新</div>
        <div @click="close" class="menu-item el-col el-col-24">关闭</div>
      </div>
    </div>
  </span>
</template>

<script>
  export default {
    data () {
      return {
        offsetX: 0,
        curTab: ''
      }
    },
    computed: {
      tabs () {
        return this.$store.state.tabs.tabs
      },
      currentUrl () {
        return this.$store.state.tabs.currentTab.url
      },
      isAct () {
        return this.$store.state.menu
      }
    },
    mounted () {
      // this.$refs.tabNav.oncontextmenu = (e) => {
      //   e.preventDefault()
      //   e.stopPropagation()
      // }
    },
    methods: {
      redirect (url, name) {
        this.$router.push(url)
      },
      menu (e, tab) {
        e.preventDefault()
        e.stopPropagation()
        this.curTab = tab
        this.offsetX = e.target.offsetLeft
        this.$store.commit('SET_MENU', true)
        // this.isAct = true
      },
      refresh () {
        // this.$router.push({
        //   path: 'refresh'
        // })
        this.$store.commit('SET_KEEP', false)
        this.$router.replace(this.curTab.url)
      },
      close () {
        let tabs = this.$store.state.tabs.tabs.slice(0)
        if (tabs.length === 1) {
          return false
        } else {
          console.info(this.curTab)
          let index = tabs.findIndex(val => { return val.url === this.curTab.url })
          let extab = tabs.splice(index, 1)
          this.$store.commit('ADD_EX_TAB', extab[0])
          this.$store.commit('SET_TABS', tabs)
          if (index < tabs.length) {
            let curTab = tabs[index]
            this.$store.commit('SET_CURRENT_TAB', curTab)
            this.$router.replace({
              path: curTab.url
            })
          } else {
            let curTab = tabs[index - 1]
            this.$store.commit('SET_CURRENT_TAB', curTab)
            this.$router.replace({
              path: curTab.url
            })
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-button--mini {
    padding: 5px;
    border-right: none;
    border-left: none;
    margin: 0;
  }

  .tab-base{
    position: relative;
    .tab{
      transform: translateX(-5px);
    }
    .el-popper {
      width: 100px;
      transition: all 0.5s;
      transform-origin: left center 0px;
      z-index: 2004;
      &:hover{
        display: block;
      }
    }
  }

  .pro-menu {
    text-align: center;
    .menu-item {
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      border-bottom: 1px solid #ccc;
      &:hover {
        background: #ccc;
        color: #fff;
      }
    }
  }
</style>
