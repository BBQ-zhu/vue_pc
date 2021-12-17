<template>
  <div class="box">
    <div class="flex">
      <div class="f20 fw600 mt3">快速预约顾问</div>
      <div class="color2 ml20">
        已累计为<span class="fw600 f25 colorGreen" style="padding: 0 5px"
          >6,965,000+</span
        >位用户提供预约服务
      </div>
    </div>
    <div class="flex mt30 zixun">
      <el-form :model="ruleForm" ref="ruleForm" class="flex">
        <el-form-item label="" class="mr20" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入您的需求"
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="mr20" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入您的手机号码"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm()" style="height: 40px"
          >免费咨询</el-button
        >
      </el-form>
    </div>
    <div class="flexBetween" style="margin-top:40px;">
      <div class="f20 fw600 mt10">交易数据</div>
      <div class="textCenter">
        <div class="f25 fw600">{{nums[0]}}</div>
        <div class="mt5 f12">
          浏览量<span class="colorGreen"></span>
        </div>
      </div>
      <div class="textCenter">
        <div class="f25 fw600">{{nums[1]}}</div>
        <div class="mt5 f12">
          实时交易额<span class="colorGreen">(元)</span>
        </div>
      </div>
      <div class="textCenter">
        <div class="f25 fw600 textCenter">{{nums[2]}}</div>
        <div class="mt5 f12">
          实时申请订单<span class="colorGreen">(单)</span>
        </div>
      </div>
      <div class="textCenter">
        <div class="f25 fw600 textCenter">{{nums[3]}}</div>
        <div class="mt5 f12">
          实时咨询人数<span class="colorGreen"></span>
        </div>
      </div>
    </div>
    <div class="flexBetween" style="align-items: center;margin-top:50px;">
      <div class="flex">
        <div class="f20 fw600 mt5">
          服务<span class="f20 fw600 colorGreen">快报：</span>
        </div>
        <Tips class="" style="position:relative;top:-1px"></Tips>
      </div>
      <div class="flex">
        <div class="f20 fw600 mt5">
          服务<span class="f20 fw600 colorGreen">快报：</span>
        </div>
        <Tips style="position:relative;top:-1px"></Tips>
      </div>
    </div>
</div>
</template>

<script>
import Tips from '@/components/Tips'
export default {
  components: {
    Tips,
  },
  data() {
    return {
      ruleForm: {
        name: '',
        phone: ''
      },
      nums:[]
    }
  },
  mounted() {
    this.nums.push(this.$common.random(100000))
    this.nums.push(this.$common.random(100))
    this.nums.push(this.$common.random(100))
    this.nums.push(this.$common.random(100))
  },
  methods: {
    submitForm() {
      if (!this.ruleForm.name) {
        this.$message.error('请输入您的需求')
      } else if (!this.ruleForm.phone) {
        this.$message.error('请输入您的手机号码')
      } else if (!/^1[3456789]\d{9}$/.test(this.ruleForm.phone)) {
        this.$message.error('请输入正确的手机号码')
      } else {
        let obj = {
        type: '专业顾问', // 分类
        proname: this.ruleForm.name, // 产品名称
        name: '电脑端客户', // 姓名
        phone: this.ruleForm.phone, // 电话
        remarks: ''
        }
        this.$axios.post(this.$api.createIntegrate, obj).then(res => {
          if (res.code == 200) {
            let data = {
              proid: '',
              type: '专业顾问', // 数据来源
              name: '电脑端预约咨询', // 客户名称
              phone: this.ruleForm.phone, // 电话
              submitby: this.ruleForm.phone, // 提交人
              handler: 'all', // 处理人
              path: '/Integrate', // 跳转至综合服务
              read: 'false' // 是否已处理
            } 
            this.$axios.post(this.$api.createAgent, data).then(res => {
              if (res.code == 200) {
                this.$message.success("提交成功");
                this.ruleForm = {
                  name: "",
                  phone: "",
                };
              }
            })
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  box-sizing: border-box;
  width:80%;
  height: 310px;
  margin: 25px 0;
  padding: 0 25px;
  background: #fff;
  border-right:1px dashed #909399;
}
::v-deep .el-button--primary {
  background-color: #11bbb8;
  border-color: #11bbb8;
}
.zixun {
  border-bottom: 1px dashed #909399;
  padding-bottom: 10px;
}
// .line{
//   width:1px;
// }
</style>
