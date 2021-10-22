<template>
  <div class="box">
    <div class="flexBetween bgfff pj">
      <div class="flex" style="align-items:center">
        <div class="circle f25 fw600">专</div>
        <div class="ml10">
          <div class="f20 fw600">专属服务</div>
          <div class="mt5 f13 color3">服务顾问一对一服务</div>
        </div>
      </div>
      <div class="flex" style="align-items:center">
        <div class="circle f25 fw600">极</div>
        <div class="ml10">
          <div class="f20 fw600">极速响应</div>
          <div class="mt5 f13 color3">第一时间响应需求</div>
        </div>
      </div>
      <div class="flex" style="align-items:center">
        <div class="circle f25 fw600">退</div>
        <div class="ml10">
          <div class="f20 fw600">无理由退款</div>
          <div class="mt5 f13 color3">未服务，30天退款</div>
        </div>
      </div>
      <div class="flex" style="align-items:center">
        <div class="circle f25 fw600">明</div>
        <div class="ml10">
          <div class="f20 fw600">服务透明</div>
          <div class="mt5 f13 color3">线上随时查服务进度</div>
        </div>
      </div>
    </div>
    <!-- 底部信息 -->
    <div class="flexBetween phoneTitle f16 color0">
      <div class="flexBetween">
        <div class="title pointer" @click="toIndex">首页</div>
        <div class="title pointer" @click="ofOus">关于我们</div>
      </div>
      <div>
        <i class="el-icon-service"></i>
        服务热线：
        <span class="colorGreen f25">400-110-9939</span>
      </div>
    </div>
    <div class="lastFonter flexBetween">
      <div style="padding-top:65px;">
        <div>举报电话：189-8929-9938</div>
        <div class="mt30">Copyright 2000-2021 四川铸力金融服务外包有限公司 备案号：蜀ICP备20004812号-1</div>
      </div>
      <div class="textCenter">
        <img v-if="erweimaList[0]" :src="erweimaList[0].scroimg" style="width:100px;height:100px;" />
        <div class="f12 mt10">扫一扫，关注公众号</div>
      </div>
    </div>
  </div>
</template>

<script>
import UserImg from '@/components/UserImg'
export default {
  components: {
    UserImg
  },
  data() {
    return {
      consultantList: [],
      erweimaList: []
    }
  },
  mounted() {
    this.findUser()
    this.findscroImg()
  },
  methods: {
    async findscroImg() {
      await this.$axios.post(this.$api.findScrollImg).then(res => {
        this.erweimaList = []
        let arr = res.data
        arr.map(item => {
          if (item.typeid == 'erweima') {
            this.erweimaList.push(item)
          }
        })
      })
    },
    async findUser() {
      var data = {
        skip: 0,
        limit: 999999,
        fuzz: 'isrecomed',
        input: '是'
      }
      await this.$axios.post(this.$api.findUser, data).then(res => {
        if (res.code == 200) {
          this.consultantList = []
          let arr = res.data[0].data
          arr = arr.concat(arr).concat(arr)
          arr = arr.concat(arr)

          this.consultantList = arr
        }
      })
    },
    //关于我们
    ofOus() {
      window.location.href = 'http://zhulif.com/company/index.html'
    },
    //首页
    toIndex() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 325px;
  background: #1d1c24;
}
.pj {
  height: 100px;
  padding: 0 5%;
  align-items: center;
}
.lastFonter {
  width: 90%;
  margin: 0 auto;
  margin-top: 22px;
  color: #fff;
}
.circle {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #11bbb8;
  color: #11bbb8;
  text-align: center;
  border-radius: 50%;
}
.phoneTitle {
  width: 100%;
  padding: 0 5%;
  height: 60px;
  line-height: 60px;
  align-items: center;
  border-bottom: 1px solid #909399;
  box-sizing: border-box;
}
.title {
  width: 100px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-left: 1px solid #909399;
}
.title:first-of-type {
  border-left: none;
}
</style>
