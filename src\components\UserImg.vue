<template>
  <div style="position:relative;" class="userImg2">
    <el-image
      style="width: 160px; height: 160px;"
      class="mb20 mr10 "
      :src="userInfo.imgurl">
      </el-image>
    <div class="userPhone">
      <div class="flexAlignCenter mt30">
          <div class="btn1 mt10 f16" style="color:#fff;border:none;">{{userInfo.username.charAt(0)}}经理</div>
          <div class="btn2 mt20 " @click="$common.gottkefu()">立即咨询</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    userInfo:{
      type:Object,
      defalut:{}
    }
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods:{
  }
}
</script>

<style scoped lang="scss">
.userImg2:hover .userPhone{
  display:block;
}
.userPhone{
  width:100%;
  height:160px;
  border-radius:2px;
  background:#000;
  position:absolute;
  top:0;
  opacity:0.7;
  display:none;
}
</style>



