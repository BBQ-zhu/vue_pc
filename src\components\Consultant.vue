<template>
  <div class="box bgColor2">
    <div class="f20 fw600 textCenter">金牌顾问</div>
    <el-carousel indicator-position="none" class="mt30">
      <el-carousel-item v-for="(item,index) in consultantList" :key="index+'user'" >
        <div class="flexAlignCenter p10" >
          <el-image :src="item.imgurl" class="userImg">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="f12 colorGreen mt20 userText" >
            <i class="el-icon-user f14"></i>
            {{item.username.substring(0,1)}}经理
          </div>
          <div class="f12 color3 mt20 userText textOver2" style="line-height:18px">
            {{item.intro}}
          </div>
          <div class="mt30">
            <div class="btn2" @click="$common.gottkefu()">在线咨询</div>
            <!-- <div class="btn1 mt30" @click="$common.toPhone()">电话咨询</div> -->
          </div>
        </div>
        
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
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
          this.consultantList = arr.slice(0,4)
        }
      });
    },
    
  },
}
</script>

<style lang="scss" scoped>
.box{
  width:200px;
  height:320px;
  // border:1px solid #11BBB8;
  background:#fff;
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

</style>
