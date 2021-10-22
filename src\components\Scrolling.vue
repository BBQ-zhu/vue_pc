<template>
  <div>
    <el-carousel height="calc(50vh)" v-if="scroImgList">
      <el-carousel-item v-for="(item,index) in scroImgList" :key="index+'scro'">
        <img style="width:100%;height:auto;" :src="item.scroimg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroImgList:[]
    }
  },
  mounted() {
    this.findscroImg()
  },
  methods: {
    async findscroImg() {
      await this.$axios.post(this.$api.findScrollImg).then(res => {
        this.scroImgList = []
        let arr = res.data
        arr.map(item => {
          if (item.typeid == 'pcScroll') {
            this.scroImgList.push(item)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep .el-carousel__container{
//   width:100%;
//   margin:0 auto;
//   height:500px;
// }
</style>
