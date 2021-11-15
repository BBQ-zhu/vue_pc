<template>
  <div class="box">
    <div class="flexStart">
      <div>
        <img :src="proDetails.productimg" style="width:283px;height:283px;" />
      </div>
      <div style="flex:1;margin-top:1px;padding-left:20px;">
        <div class="flex">
          <el-tag type="danger" effect="dark">热门</el-tag>
          <div class="f25 fw600 ml10">{{proDetails.name}}</div>
        </div>
        <div class="mt20 color2 f13 textOver2">{{proDetails.description}}</div>
        <div class="mt20 bgfff" style="padding:12px 10px;">
          <div class="color2">
            价格：
            <span class="f20 colorYellow ml10" style="margin-top:4px;">
              <span class="f16">￥</span>
              {{proDetails.newprice}}
            </span>
          </div>
          <div class="flexBetween">
            <div class="color2 mt15">
              原价：
              <span
                class="f16 color2 ml10"
                style="text-decoration: line-through;"
              >￥{{proDetails.oldprice}}</span>
            </div>
            <div class="color2 f13" style="padding-top:14px;">
              <i class="colorYellow el-icon-collection-tag mr5"></i>
              总计销量：{{proDetails.volume}}
            </div>
          </div>
        </div>
        <div class="flexStart mt30">
          <div class="btn1" style="background:#11BBB8;color:#fff;" @click="$common.gottkefu()">立即咨询</div>
          <div class="btn2 ml20" @click="submit()">立即办理</div>
        </div>
        <div class="color2 f13" style="margin-top:25px;">
          <i class="colorYellow el-icon-collection-tag mr5"></i>
          总计咨询：{{proDetails.consulting}}
        </div>
      </div>
    </div>
    <!-- 资质要求开关 -->
    <div class="mt20" v-if="proDetails.cation == 'true'">
      <div class="flex" style="width:100%;">
        <!-- 基本信息 -->
        <div class="bgfff" style="width:100%">
          <div class="flexBetween f13 p20">
            <div class="flex">
              <div class="f20 fw600">基本信息</div>
              <!-- <span class="color2 mt3 ml10">人气推荐，10万用户必选服务</span> -->
            </div>
            <i class="el-icon-guide mt3 color2 f18"></i>
          </div>
          <span class="color2 flexBetween" style="box-sizing:border-box;padding:0 20px;">
            <div v-if="proDetails.interest">
              月利息：
              <span class="colorYellow fw600 ml5">{{proDetails.interest}}%</span>
            </div>
            <span v-if="proDetails.minamount || proDetails.maxamount">
              最低额度：
              <span class="colorYellow fw600 ml5">{{proDetails.minamount || 0 }}万</span>— 最高额度:
              <span class="colorYellow fw600 ml5">{{ proDetails.maxamount || 0 }}万</span>
            </span>
            <div v-if="proDetails.minterm || proDetails.maxterm">
              最低贷款期限:
              <span class="colorYellow fw600 ml5">{{ proDetails.minterm }}月</span>
              — 最高贷款期限:
              <span class="colorYellow fw600 ml5">{{ proDetails.maxterm }}月</span>
            </div>
          </span>
        </div>
        <!-- 资质要求 -->
        <div class="bgfff" style="width:100%">
          <div class="flexBetween f13" style="padding:20px 20px 10px 20px;">
            <div class="flex">
              <div class="f20 fw600">资质要求</div>
              <span class="color2 mt3 ml10">
                <span
                  v-if="proDetails.key"
                  class="colorGreen ml5"
                >({{ proDetails.key.replace("选中的", "以下要求") }})</span>
              </span>
            </div>
            <!-- <i class="el-icon-guide mt3 color2 f18"></i> -->
          </div>
          <span class="f16 color2" style="box-sizing:border-box;display:block;padding:0 20px;">
            <div v-if="proDetails.age && proDetails.match.includes('age')" class="borderBom">
              年龄不超过：
              <span class="colorYellow fw600 ml5">{{ proDetails.age }}岁</span>
            </div>
            <div
              v-if="proDetails.revenue && proDetails.match.includes('revenue')"
              class="borderBom"
            >
              月收入不低于：
              <span class="colorYellow fw600 ml5">{{ proDetails.revenue }}元</span>
            </div>
            <div
              v-if="proDetails.address && proDetails.match.includes('address')"
              class="borderBom"
            >
              所在城市：
              <span
                class="colorYellow fw600 ml5"
              >{{ proDetails.address[0] }}-{{ proDetails.address[1] }}</span>
            </div>
            <div
              v-if="
            proDetails.social &&
            proDetails.social.length &&
            proDetails.match.includes('social')
          "
              class="borderBom"
            >
              <span>社保(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.social.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.provident &&
            proDetails.provident.length &&
            proDetails.match.includes('provident')
          "
              class="borderBom"
            >
              <span>公积金(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.provident.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.houses &&
            proDetails.houses.length &&
            proDetails.match.includes('houses')
          "
              class="borderBom"
            >
              <span>房屋(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.houses.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.car && proDetails.car.length && proDetails.match.includes('car')
          "
              class="borderBom"
            >
              <span>车辆(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.car.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.policy &&
            proDetails.policy.length &&
            proDetails.match.includes('policy')
          "
              class="borderBom"
            >
              <span>商业险(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.policy.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.sesame &&
            proDetails.sesame.length &&
            proDetails.match.includes('sesame')
          "
              class="borderBom"
            >
              <span>芝麻分(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.sesame.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.microcredit &&
            proDetails.microcredit.length &&
            proDetails.match.includes('microcredit')
          "
              class="borderBom"
            >
              <span>微粒贷(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.microcredit.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.credit &&
            proDetails.credit.length &&
            proDetails.match.includes('credit')
          "
              class="borderBom"
            >
              <span>信用卡(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.credit.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.tobacco &&
            proDetails.tobacco.length &&
            proDetails.match.includes('tobacco')
          "
              class="borderBom"
            >
              <span>烟草证(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.tobacco.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.enterprise &&
            proDetails.enterprise.length &&
            proDetails.match.includes('enterprise')
          "
              class="borderBom"
            >
              <span>企业税贷(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.enterprise.join("、")
                }}
              </span>
            </div>
            <div
              v-if="
            proDetails.ticket &&
            proDetails.ticket.length &&
            proDetails.match.includes('ticket')
          "
              class="borderBom"
            >
              <span>企业票贷(至少满足以下任意一项)：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.ticket.join("、")
                }}
              </span>
            </div>
            <div
              v-if="proDetails.othercomponents && proDetails.othercomponents.length"
              class="borderBom"
            >
              <span>其他要求：</span>
              <span class="colorYellow fw600 mt3">
                {{
                proDetails.othercomponents.join("、")
                }}
              </span>
            </div>
          </span>
        </div>
        <!-- 办理所需资料 -->
        <div class="bgfff" style="width:100%">
          <div class="flexBetween f13 p20">
            <div class="flex">
              <div class="f20 fw600">办理所需资料</div>
              <!-- <span class="color2 mt3 ml10">人气推荐，10万用户必选服务</span> -->
            </div>
            <!-- <i class="el-icon-guide mt3 color2 f18"></i> -->
          </div>
          <div class="color2" style="box-sizing:border-box;padding:0 20px 20px 20px;">
            <div>
              <el-tag
                v-for="item in proDetails.demand"
                :key="item"
                type=""
                class="mr10 mb10"
                size="medium"
              >{{item}}</el-tag>
            </div>
            <div v-if="proDetails.otherinformation" class="ml5 mt5" style="line-height: 20px">
              <span>其他资料:</span>
              <span class="colorYellow fw600 ml20">
                {{
                proDetails.otherinformation
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 产品详情 -->
    <div class="flexBetween mt20" style="width:100%;">
      <!-- 热门推荐 -->
      <div class="flex" style="width:29%;">
        <div class="bgfff" style="width:100%">
          <div class="flexBetween f13 p20">
            <div class="flex">
              <div class="f20 fw600">热门推荐</div>
              <!-- <span class="color2 mt3 ml10">人气推荐，10万用户必选服务</span> -->
            </div>
            <i class="el-icon-guide mt3 color2 f18"></i>
          </div>
          <div class="flexBetween" style="box-sizing:border-box;">
            <el-carousel indicator-position="none" height="800px" style="width:100%">
              <el-carousel-item v-for="(item,index) in recomList1" :key="index+'car'">
                <div class="flexBetween">
                  <div
                    class="probg"
                    style="background: #f0f5f5;margin-bottom:20px"
                    v-for="(val,ind) in item"
                    :key="ind+'rem1'"
                  >
                    <div class="flex">
                      <el-tag v-show="ind%2 == 0" class="mr10" type="info">快速高效</el-tag>
                      <el-tag v-show="ind%2 != 0" class="mr10" type="info">全程托管</el-tag>
                      <el-tag v-show="ind%2 == 0" class="mr10" type="info">专家顾问</el-tag>
                      <el-tag v-show="ind%2 != 0" class="mr10" type="info">精选服务</el-tag>
                    </div>
                    <div class="f20 fw600 mt10 ml5 flexBetween">
                      <div>{{val.name}}</div>
                      <div class="colorYellow">
                        ￥
                        <span v-text="$common.moneyFormat(val.newprice)"></span>
                      </div>
                    </div>
                    <div
                      class="f12 mt15 ml5 color2 textOver2"
                      style="height:30px;line-height:15px;"
                    >{{val.description}}</div>
                    <div class="flexStart mt15">
                      <div class="btn2" @click="toproDetails(val.name)">查看详情</div>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <!-- 产品详情 -->
      <div class="flex" style="width:39%;">
        <div class="bgfff" style="width:100%">
          <div class="flexBetween f13 p20">
            <div class="flex">
              <div class="f20 fw600">产品详情</div>
              <span class="color2 mt3 ml10"></span>
            </div>
            <i class="el-icon-guide mt3 color2 f18"></i>
          </div>
          <div class="flexBetween" style="height:800px;padding:0 20px 20px 20px;overflow-y:auto">
            <div
              id="editor"
              style="width:100%;box-sizing:border-box;"
              v-html="proDetails.proDetails"
            ></div>
          </div>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="flex" style="width:29%;">
        <div class="bgfff" style="width:100%">
          <div class="flexBetween f13 p20">
            <div class="flex">
              <div class="f20 fw600">猜你喜欢</div>
              <!-- <span class="color2 mt3 ml10">全网底价，用心甄选应你所需</span> -->
            </div>
            <i class="el-icon-guide mt3 color2 f18"></i>
          </div>
          <div class="flexBetween" style="box-sizing:border-box;">
            <el-carousel indicator-position="none" height="800px" style="width:100%">
              <el-carousel-item v-for="(item,index) in recomList2" :key="index+'car'">
                <div class="flexBetween">
                  <div
                    class="probg"
                    style="background: #f0f0f5;margin-bottom:20px"
                    v-for="(val,ind) in item"
                    :key="ind+'rem1'"
                  >
                    <div class="flex">
                      <el-tag v-show="ind%2 == 0" class="mr10" type="info">全程托管</el-tag>
                      <el-tag v-show="ind%2 != 0" class="mr10" type="info">专家顾问</el-tag>
                      <el-tag v-show="ind%2 == 0" class="mr10" type="info">精选服务</el-tag>
                      <el-tag v-show="ind%2 != 0" class="mr10" type="info">快速高效</el-tag>
                    </div>
                    <div class="f20 fw600 mt10 ml5 flexBetween">
                      <div>{{val.name}}</div>
                      <div class="colorYellow">
                        ￥
                        <span v-text="$common.moneyFormat(val.newprice)"></span>
                      </div>
                    </div>
                    <div
                      class="f12 mt15 ml5 color2 textOver2"
                      style="height:30px;line-height:15px;"
                    >{{val.description}}</div>
                    <div class="flexStart mt15">
                      <div class="btn2" @click="toproDetails(val.name)">查看详情</div>
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
    <!-- 新闻弹出框 -->
    <el-dialog title="立即办理" :visible.sync="dialogVisible" width="20%">
      <div>
        <el-input v-model="subName" placeholder="请输入姓名"></el-input>
        <el-input class="mt20" v-model="subPhone" placeholder="请输入手机号"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handling">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    proDetails: Object,
    defalute: {}
  },
  data() {
    return {
      recomList1: [],
      recomList2: [],
      subName: '',
      subPhone: '',
      dialogVisible: false
    }
  },
  async mounted() {
    await this.findProduct()
  },
  methods: {
    toproDetails(name) {
      this.$router.push({
        path: '/ProductDetail',
        query: { name: name }
      })
    },
    submit() {
      this.dialogVisible = true
    },
    //立即办理
    handling() {
      console.log(11)
      if (!this.subName) {
        this.$message.error('请输入您的姓名')
        return
      } else if (!this.subPhone) {
        this.$message.error('请输入您的手机号')
        return
      } else if (!/^1[3456789]\d{9}$/.test(this.subPhone)) {
        this.$message.error('请输入正确的手机号码')
        return
      }
      this.dialogVisible = false
      var finData = {
        skip: 0,
        limit: 9999,
        fuzz: 'phone',
        input: this.subPhone
      }
      this.$axios.post(this.$api.findAgent, finData).then(res => {
        let arr = res.data[0].data
        if (arr.length == 0) {
          this.createAgent()
        } else {
          let key = true
          arr.map(item => {
            if (this.proDetails._id == item.proid && item.read == 'false') {
              this.$message.error('您的该服务正在处理中')
              key = false
            }
          })
          if (key) {
            this.createAgent()
          }
        }
      })
    },
    createAgent() {
      let data = {
        proid: this.proDetails._id,
        type: this.proDetails.type + '-' + this.proDetails.name, // 数据来源
        name: this.subName, // 客户名称
        phone: this.subPhone, // 电话
        submitby: this.subName, // 提交人
        handler: 'all', // 处理人
        path: '/Integrate', // 跳转至综合服务
        read: 'false' // 是否已处理
      }
      this.$axios.post(this.$api.createAgent, data).then(res => {
        if (res.code == 200) {
          this.$message.success('业务经理稍后为您服务')
        }
      })
    },
    async findProduct() {
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: 'recommend',
        input: '推荐'
      }
      await this.$axios.post(this.$api.findProduct, data).then(res => {
        let arr = res.data[0].data
        arr = arr.concat(arr).concat(arr)

        let newArr1 = []
        let newArr2 = []
        arr.map((item, index) => {
          if (index % 2 == 0) {
            newArr1.push(item)
          } else {
            newArr2.push(item)
          }
        })
        for (let i = 0; i < newArr1.length; i += 4) {
          this.recomList1.push(newArr1.slice(i, i + 4))
        }
        for (let i = 0; i < newArr2.length; i += 4) {
          this.recomList2.push(newArr2.slice(i, i + 4))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.borderBom {
  line-height: 25px;
  padding: 7px 0;
}
::v-deep .el-dialog__header {
  border-bottom: 2px solid rgb(228, 231, 237);
}
.editor > p img {
  width: 100px;
}
.box {
  width: 70%;
  margin: 0 auto;
  padding: 25px;
  box-sizing: border-box;
  // background:red;
}
::-webkit-scrollbar {
  width: 0px;
  /* 纵向滚动条*/
  height: 0px;
  /* 横向滚动条 */
  background-color: #fff;
}
::v-deep .el-tag {
  padding: 0 10px;
  height: 25px;
  line-height: 25px;
}
.probg {
  width: 84%;
  min-width: 200px;
  margin-top: 4%;
  margin: 0 auto;
  height: 180px;
  padding: 16px;
  box-sizing: border-box;
}
</style>
