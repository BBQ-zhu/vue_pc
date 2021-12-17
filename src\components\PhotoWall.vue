<template>
  <div class="box">
    <div class="f25 fw600 color0 textCenter " style="padding-top:40px">资深顾问</div>
    <div class="color0 textCenter pt20">3000+专业顾问团队,实时为您提供最专业的免费咨询服务</div>
    <div class="photoWall bgfff flexBetween mt40">
      <div v-for="(item,index) in consultantList" :key="index+'img'">
        <UserImg :userInfo="item"></UserImg>
      </div>
    </div>
    <div class="flexBetween bgfff pj mt10">
      <div class="textCenter ">
        <div class="f25 fw600">148+</div>
        <div class="mt5 f13">
          服务客户次数<span class="colorGreen">(万次)</span>
        </div>
      </div>
      <div class="textCenter">
        <div class="f25 fw600 ">18</div>
        <div class="mt5 f13">
          业务覆盖城市<span class="colorGreen">(个)</span>
        </div>
      </div>
      <div class="textCenter">
        <div class="f25 fw600">3600+</div>
        <div class="mt5 f13">
          专业顾问<span class="colorGreen">(位)</span>
        </div>
      </div>
      <div class="textCenter">
        <div class="f25 fw600 textCenter">98.6</div>
        <div class="mt5 f13">
          好评率<span class="colorGreen">(%)</span>
        </div>
      </div>
      <div class="textCenter">
        <div class="f25 fw600 textCenter">0.8</div>
        <div class="mt5 f13">
          平均服务响应<span class="colorGreen">(秒)</span>
        </div>
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
      consultantList:[]
    }
  },
  mounted() {
    this.findUser()
  },
  methods: {
    async findUser() {
      var data = {
        skip: 0,
        limit: 999999,
        fuzz: "isrecomed",
        input: "是",
      };
      await this.$axios.post(this.$api.findUser, data).then((res) => {
        if (res.code == 200) {
          this.consultantList = [];
          let arr = res.data[0].data
          this.consultantList = arr
        }
      });
    },
    
  },
}
</script>

<style lang="scss" scoped>
.box{
  width:90%;
  margin:0 auto;
  margin-top:40px;
  height:auto;
  // background:#1d1c24;
  // background-image:radial-gradient(at center top,yellow,blue);
}
.photoWall{
  padding:20px 20px 0 24px;
  box-sizing: border-box;
}
.userImg{
  width:80px;
  height:80px;
  line-height:80px;
  border:1px solid #909399;
  background:#fff;
  border-radius:50%;
  text-align:center;
}
.userText{
  width:100%;
  text-align:center;
}
.pj{
  height:80px;
  padding:0 30px;
  align-items:center
}

</style>
