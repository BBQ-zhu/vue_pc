<template>
  <div class="flexCenter">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-submenu index="0" style="margin-right:20px">
        <template slot="title">全部分类</template>
        <el-menu-item
          class="allMen"
          :index="'0-'+(index)"
          v-for="(item,index) in navList"
          :key="index+'-0'"
        >
          <div class="flexBetween">
            <div>{{item.name}}</div>
            <i class="el-icon-arrow-right f12" style="padding-top:13px"></i>
          </div>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="1" @click="toIndex">首页</el-menu-item>
      <el-menu-item
        :index="'2-'+(index)"
        v-for="(item,index) in classList"
        :key="index+'-2'"
      >{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classList: [], //展示分类
      navList: [], //所有分类
      activeIndex: '1' //默认选中分类
    }
  },
  mounted() {
    this.findClass()
  },
  methods: {
    //首页
    toIndex() {
      this.$router.push('/')
    },
    findClass() {
      this.$axios.post(this.$api.findProductClass).then(res => {
        if (res.code == 200) {
          let arr = res.data
          let isTrue = []
          arr.map(item => {
            if (item.super == '是') {
              isTrue.push(item)
            }
          })
          this.classList = this.$common.bubbleSort(isTrue, 'number')
          this.navList = this.$common.bubbleSort(arr, 'number')
        }
      })
    },
    handleSelect(key, keyPath) {
      let arr = key.split('-')
      if (arr[0] == 0) {
        //全部分类
        this.$router.push({
          path: '/ProOneClass',
          query: this.navList[arr[1]]
        })
      } else if (arr[0] == 1) {
        //首页
        this.$router.push('/')
      } else if (arr[0] == 2) {
        //推荐分类
        this.$router.push({
          path: '/ProOneClass',
          query: this.classList[arr[1]]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #3cc8c9;
  color: #3cc8c9;
}
::v-deep .el-menu.el-menu--horizontal {
  border: none;
}
::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title {
  background: linear-gradient(to top, #46e3c4, #3cc8c9);
  background: #3cc8c9;
  border-bottom: none;
  height: 50px;
  line-height: 50px;
  margin-top: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
}
::v-deep .el-icon-arrow-down {
  color: #fff;
  font-size: 15px;
  font-weight: 800;
}
</style>
