<template>
  <div class="flexBetween" style="width:100%;">
    <!-- 行业新闻 -->
    <div class="flex" style="width:69.5%;box-sizing:border-box;">
      <div class="bgfff p20" style="width:100%">
        <div class="flexBetween f13">
          <div class="flex">
            <div class="f20 fw600">行业新闻</div>
            <span class="color2 mt3 ml10">最新行业动态、企业公告</span>
          </div>
          <i class="el-icon-collection-tag mt3 color2 f18"></i>
        </div>
        <div class="flexBetween mt20">
          <el-carousel indicator-position="none" height="330px" style="width:100%">
            <el-carousel-item v-for="(item,index) in recomList1" :key="index+'news'">
              <div class="flexBetween">
                <div
                  @click="toNewsDetails(val)"
                  class="probg_new flexBetween"
                  style="box-sizing:border-box"
                  v-for="(val,ind) in item"
                  :key="ind+'news1'"
                >
                  <div class="flex textOver1" style="width:69%">
                    <i class="el-icon-s-help color2" style="line-height:55px;font-size:4px;"></i>
                    <div class="f16 ml10 textOver1 pointer" style="width:90%;c">{{val.newsname}}</div>
                  </div>
                  <div
                    class="f14 color2 ml10"
                    style="width:25%;text-align:right"
                  >{{val.time.split(' ')[0]}}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 企业招聘 -->
    <div class="flex" style="width:29.5%;">
      <div class="bgfff p20" style="width:100%">
        <div class="flexBetween f13">
          <div class="flex">
            <div class="f20 fw600">企业招聘</div>
            <span class="color2 mt3 ml10"></span>
          </div>
          <i class="el-icon-collection-tag mt3 color2 f18"></i>
        </div>
        <div class="flexBetween mt15" style="box-sizing:border-box;">
          <el-carousel indicator-position="none" height="330px" style="width:100%">
            <el-carousel-item v-for="(item,index) in recomList2" :key="index+'car'">
              <div class="flexBetween">
                <div
                  class="probg"
                  style="background: #f0f0f5;"
                  v-for="(val,ind) in item"
                  :key="ind+'rec1'"
                >
                  <div class="flexBetween">
                    <el-tag v-show="ind%2 != 0" class="mr10" type="danger">急聘</el-tag>
                    <el-tag v-show="ind%2 == 0" class="mr10" type="success">热门</el-tag>
                    <div class="colorYellow mt5">{{val.salary}}</div>
                  </div>
                  <div class="f20 fw600 mt10 ml5">
                    <div>{{val.name}}</div>
                  </div>
                  <div class="f12 mt15 ml5 color2 textOver1" style="height:20px;">{{val.address}}</div>
                  <div class="flexBetween mt5 ml5" style="align-items:center">
                    <div class="color3 f12 fw600">.{{val.education}}.</div>
                    <div class="btn1 pointer" @click="toRecDetails(val)">招聘详情</div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 新闻弹出框 -->
    <el-dialog title="新闻详情" :visible.sync="dialogVisible" width="30%">
      <div class="f18 fw600">{{newsDetails.newsname}}</div>
      <div class="f13 mt20" id="editor_new" v-html="newsDetails.content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 招聘弹出框 -->
    <el-dialog title="招聘详情" :visible.sync="dialogVisible2" width="30%">
      <div class="f18 fw600 mb20">{{educatDetails.companyname}}</div>
      <div class="flexBetween f18 fw600">
        <span>{{educatDetails.name}}</span>
        <span class="colorYellow">{{educatDetails.salary}}</span>
      </div>
      <div class="f14 fw600 mt10">工作地点：{{educatDetails.address}}</div>
      <div class="f14 fw600 mt10">学历：{{educatDetails.education}}</div>
      <div class="f13 mt20" id="editor_new" v-html="educatDetails.details"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recomList1: [],
      recomList2: [],
      newsDetails: {},
      educatDetails: {},
      dialogVisible: false,
      dialogVisible2: false
    }
  },
  async mounted() {
    await this.getNewsList()
    await this.recmList()
  },
  methods: {
    //跳转新闻详情
    toNewsDetails(val) {
      this.dialogVisible = true
      this.newsDetails = val
      let res = this.newsDetails.content
      this.newsDetails.content = res
        .split('<img')
        .join('<img style="width:100%;"')
    },
    //跳转招聘详情
    toRecDetails(val) {
      this.dialogVisible2 = true
      this.educatDetails = val
      let res = this.educatDetails.details
      this.educatDetails.details = res
        .split('<img')
        .join('<img style="width:100%;"')
    },
    async getNewsList() {
      var data = {
        skip: 0,
        limit: 9999999
      }
      await this.$axios.post(this.$api.findNews, data).then(res => {
        let arr = res.data[0].data
        for (let i = 0; i < arr.length; i += 12) {
          this.recomList1.push(arr.slice(i, i + 12))
        }
      })
    },
    async recmList() {
      var data = {
        skip: 0,
        limit: 9999999
      }
      await this.$axios.post(this.$api.findRecruiting, data).then(res => {
        let arr = res.data[0].data
        for (let i = 0; i < arr.length; i += 12) {
          this.recomList2.push(arr.slice(i, i + 4))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button--primary {
  color: #fff;
  background-color: #11bbb8;
  border-color: #11bbb8;
}
::v-deep .el-dialog__header {
  border-bottom: 2px solid rgb(228, 231, 237);
}
.probg_new {
  width: 48%;
  // margin-top:1%;
  border-bottom: 1px dashed #8699ad;
  height: 55px;
  line-height: 55px;
  // padding:0 15px;
  box-sizing: border-box;
}
.probg_new:nth-child(-n + 2) {
  border-top: 1px dashed #8699ad;
}
.probg {
  width: 49.5%;
  margin-top: 1%;
  height: 161px;
  padding: 15px;
  box-sizing: border-box;
}
::v-deep .el-tag {
  height: 29px;
  line-height: 29px;
  padding: 0 5px;
}
</style>
