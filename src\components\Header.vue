<template>
  <div>
    <div class="flexBetween phoneTitle">
      <div class="flexBetween">
        <div class="pointer"><i class="el-icon-location-outline"></i>绵阳</div>
        <div class="line"></div>
        <div class="pointer"><router-link to="/"><span class="color2">首页</span></router-link></div>
      </div>
      <div>
        <i class="el-icon-service"></i>
        服务热线：<span class="colorGreen f20">400-110-9939</span>
      </div>
    </div>
    <div class="flexBetween box">
      <img v-if="logoList[0]" :src="logoList[0].scroimg" />
      <div class="search flex">
        <el-autocomplete
          style="width: 500px"
          class="inline-input"
          v-model="search"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <el-button @click="searchBtn" slot="append" icon="el-icon-search"
            >搜索</el-button
          >
        </el-autocomplete>
        <div class="mt5">
          <span class="serveBtn">工商注册</span>
          <span class="serveBtn">商标</span>
          <span class="serveBtn">代理记账</span>
          <span class="serveBtn">法律</span>
        </div>
      </div>
      <img v-if="logoList[1]" :src="logoList[1].scroimg" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      proItem: {},
      restaurants: '',
      logoList:[]
    }
  },
  mounted() {
    this.loadAll()
    this.findscroImg()
  },
  methods: {
    async findscroImg() {
      await this.$axios.post(this.$api.findScrollImg).then(res => {
        this.logoList = []
        let arr = res.data
        arr.map(item => {
          if (item.typeid == 'logo') {
            this.logoList.push(item)
          }
        })
      })
    },
    async loadAll() {
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: 'name',
        input: this.search,
      }
      let res = await this.$axios.post(this.$api.findProduct, data)

      if (res.code == 200) {
        let data = []
        let arr = res.data[0].data
        arr.map((item) => {
          let obj = { value: item.name, id: item._id }
          data.push(obj)
        })
        this.restaurants = data
      } else {
        this.restaurants = []
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect(item) {
      this.proItem = item
      this.searchBtn()
    },
    searchBtn() {
      // 跳转至产品详情
      this.restaurants.map((item) => {
        if (item.value == this.search) {
          this.$router.push({
            path: '/productDetail',
            query: {
              id: this.proItem.id,
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.box{
  width:80%;
  min-height:75px;
  margin:0 auto;
  padding-top:30px;
}
.phoneTitle{
  width:100%;
  height:35px;
  line-height: 35px;
  padding:0 10%;
  font-size: 14px;
  box-sizing: border-box;
  background: #f4f4f4;
  color:#989fa1;
}
.line{
  width:1px;
  height:12px;
  margin:11px;
  background:#989fa1;
}
.search {
  width: 500px;
  height: 40px;
}
.serveBtn {
  padding-right: 10px;
  color: #ccc;
  font-size: 13px;
}
::v-deep .el-input-group__append,
.el-input-group__prepend {
  background-color: #11bbb8;
  color: #fff;
  border: 1px solid #11bbb8;
}
::v-deep .el-input__inner {
  height:45px;
  border: 2px solid #11bbb8;
}
</style>
