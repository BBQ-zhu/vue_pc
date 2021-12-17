<template>
  <div class="box">
    <div class="bgfff">
      <!-- 头部查询 -->
      <Header></Header>
      <!-- 产品分类 -->
      <Class class="mt10"></Class>
    </div>
    <!-- 产品详情 -->
    <div class="width90 flex " style="width:100%;">
      <Product :proDetails="proDetails"></Product>
    </div> 
 
    <!-- 咨询、顾问 -->
    <div class="width90 flex bgfff poRelative">
      <Sign></Sign>
      <Consultant style="position:absolute;top:20px;right:4%;"></Consultant>
    </div>
    <!-- 推荐产品 -->
    <div class="width90 flex">
      <Recommend></Recommend>
    </div>

    <!-- 照片墙 -->
    <div class="width90" style="width:100%;padding-bottom:60px;background:#1d1c24;margin-top:-20px;">
      <PhotoWall></PhotoWall>
    </div>
    <!-- 新闻列表 -->
    <div class="width90" style="margin-top:40px;">
      <div class="f25 fw600 textCenter">企业资讯</div>
      <div class="color2 mt20 textCenter">聚焦全行业，深度解析行业实时关注行业动态，呈现最新最全行业内容</div>
      <News class="mt40"></News>
    </div>
    <!-- 底部导航 -->
    <div class="width90" style="width:100%;">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Class from '@/components/Class'
import Scrolling from '@/components/Scrolling'
import Sign from '@/components/Sign'
import Consultant from '@/components/Consultant'
import Recommend from '@/components/Recommend'
import ProClass from '@/components/ProClass'
import PhotoWall from '@/components/PhotoWall'
import News from '@/components/News'
import Footer from '@/components/Footer'
import Product from '@/components/Product'
export default {
  components: {
    Header,
    Class,
    Consultant,
    Scrolling,
    Sign,
    Recommend,
    ProClass,
    Product,
    PhotoWall,
    News,
    Footer
  },
  data() {
    return {
      proDetails:{}
    }
  },
  mounted() {
    this.findProduct()
  },
  watch:{
    $route(to,from){
      this.findProduct()
    }
  },
  methods: {
    async findProduct() {
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: "name",
        input: this.$route.query.name,
      };
      let res = await this.$axios.post(this.$api.findProduct, data)
        this.proDetails = res.data[0].data[0];
        let str = this.proDetails.details
        this.proDetails.details = str.split('<img').join('<img style="width:100%;"')
    }
  }
}
</script>

<style lang="scss" scoped>
.width90 {
  width: 90%;
  min-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  box-sizing: border-box;
}
</style>
