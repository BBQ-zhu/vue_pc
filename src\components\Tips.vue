<template>
  <div class=" color2 f13">
    <div class="flex mt10">
      {{ msg.address }}
      <span class="colorGreen f16 ml5 mr5">{{ msg.phone }}</span>
      购买了
      <span class="colorYellow fw600 f16 ml5 mr5">{{ msg.type }}</span>
      服务
      <div class="time f12 ml5" style="position:relative;top:-1px">
        {{time}}分钟以前
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time:0,
      msg: { address: '绵阳用户', phone: '135****0896', type: '商标注册' },
      dataList: [
        {
          address: '成都用户',
          phone: '135****0896',
          type: '商标注册',
        },
        {
          address: '绵阳用户',
          phone: '180****6872',
          type: '银行开户',
        },
        {
          address: '成都用户',
          phone: '137****1709',
          type: '代理记账',
        },
        {
          address: '绵阳用户',
          phone: '153****3634',
          type: '贷款服务',
        },
        {
          address: '成都用户',
          phone: '189****9938',
          type: '资质认证',
        },
        {
          address: '绵阳用户',
          phone: '158****5264',
          type: '抵押贷款',
        },
        {
          address: '成都用户',
          phone: '138****6056',
          type: '专家顾问',
        },
        {
          address: '绵阳用户',
          phone: '150****5526',
          type: '法律服务',
        },
        {
          address: '成都用户',
          phone: '138****8967',
          type: '专利注册',
        },
        {
          address: '绵阳用户',
          phone: '135****0848',
          type: '企业注销',
        },
      ],
    }
  },
  created() {
    this.changeMsg()
  },
  methods:{
    changeMsg(){
      setInterval(() => {
        let num = parseInt(Math.random()*10)
        this.msg = this.dataList[num]
        this.time = num
      }, 3000);
    }
  }
}
</script>

<style scoped lang="scss">
.time {
  width: 75px;
  height: 20px;
  line-height: 20px;
  margin-top:-3px;
  border-radius: 20px;
  border: 1px solid #11bbb8;
  text-align: center;
}
</style>



