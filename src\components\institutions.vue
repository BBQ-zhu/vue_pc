<template>
  <div>
    <!-- 合作伙伴logo -->
    <div class="flexStart mb10">
    <img
    v-for="(item,index) in swiperList"
    :key="index+'ins'"
    :src="item.image"
    mode="aspectFit"
    style="width:126px;height:54px;margin:10px 10px;"
    />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperList:[]
    }
  },
  mounted() {
    this.getImg()
  },
  methods: {
    getImg() {
      this.$axios.post(this.$api.findScrollImg).then(res => {
        this.swiperList = []
        let arr = res.data
        arr.map(item => {
          if (item.typeid == 'institutions') {
            var obj = { image: '', path: '' }
            obj.image = item.scroimg
            obj.path = item.link
            this.swiperList.push(obj)
          }
        })
      })

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
