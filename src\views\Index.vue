<template>
  <div class="box">
    <div class="bgfff">
      <!-- 头部查询 -->
      <Header></Header>
      <!-- 产品分配 -->
      <Class class="mt10"></Class>
      <!-- 轮播图 -->
      <Scrolling class="mt20"></Scrolling>
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
    <!-- 推荐分类 -->
    <div class="width90" style="margin-top:40px;">
      <div class="f25 fw600 textCenter">热门服务</div>
      <div class="color2 mt20 textCenter">公司、商标、记账、专利、法律等全类目一应俱全</div>
      <div v-for="(item,index) in proclass" :key="index+'class'">
        <ProClass class="mt30" :nowClass="item"></ProClass>
      </div>
    </div>
    <!-- 照片墙 background-image:radial-gradient(at center top,#fff,#1d1c24); -->
    <div class="width90" style="width:100%;padding-bottom:60px;background:#1d1c24;">
      <PhotoWall></PhotoWall>
    </div>
    <!-- 咨询 -->
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
export default {
  components: {
    Header,
    Class,
    Consultant,
    Scrolling,
    Sign,
    Recommend,
    ProClass,
    PhotoWall,
    News,
    Footer
  },
  data() {
    return {
      proclass: [],
      logoList:[], //LOGO
      scroImgList:[], //轮播图
      erweimaList:[], //二维码
    }
  },
  async mounted() {
    await this.findClass();
  },
  methods: {
    async findClass() {
      this.$axios.post(this.$api.findProductClass).then(res => {
        if (res.code == 200) {
          let arr = res.data
          let isTrue = []
          arr.map(item => {
            if (item.super == '是') {
              isTrue.push(item)
            }
          })
          this.proclass = this.$common.bubbleSort(isTrue, 'number')
        }
      })
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
