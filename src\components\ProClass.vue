<template>
  <div>
    <!-- 推荐服务 -->
    <div class="flex">
      <div class style="width:100%">
        <div class="f13">
          <div class="flexBetween pl10" :style="'border-left:6px solid'+ styleList[bgId].color">
            <div class="f20 fw600 mt5">{{nowClass.name}}</div>
            <div class="color2 mt3 ml20 flex">
              <div v-for="(item,index) in recomList[0]" :key="index+'tag'" class="tags f12">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <!-- 产品区域 :style="{background: 'linear-gradient(to bottom, ' + styleList[bgId].bgcolor + ')'}" -->
        <div class="bgfff flex mt10" :style="'box-sizing:border-box;border-top:2px solid'+ styleList[bgId].color">
          <div class="typeLeft p10 poRelative" :style="{background: 'linear-gradient(-135deg, ' + styleList[bgId].bgcolor + ')'}">
            <div class="f20 fw600 ml5 mt20 color0">{{nowClass.name}}</div>
            <div class="f13 color0 ml5 mt30" style="line-height:20px;">{{nowClass.remaks}}</div>
            <div class="flex color0 ml5 mt30">
              <i class="el-icon-user-solid"></i>
              <div class="ml10 ">专业顾问</div>
            </div>
            <div class="flex color0 ml5 mt30">
              <i class="el-icon-s-promotion"></i>
              <div class="ml10 ">快速高效</div>
            </div>
            <div class="flex color0 ml5 mt30">
              <i class="el-icon-s-claim"></i>
              <div class="ml10 ">定制方案</div>
            </div>
            <div class="flex color0 ml5 mt30">
              <i class="el-icon-success"></i>
              <div class="ml10 ">无隐形费用</div>
            </div>
            <i class="el-icon-right f20 color0" style="position:absolute;bottom:8px;right:8px;"></i>
          </div>
          <el-carousel indicator-position="none" height="390px" style="flex:1;" class="mt10">
            <el-carousel-item
              v-for="(item,index) in recomList"
              :key="index+'car'"
              style="margin-left:1.5%;"
            >
              <div class="flexStart">
                <div class="probg huiBtn" v-for="(val,ind) in item" :key="ind+'rem1'">
                  <div class="flex">
                    <el-tag v-show="ind%2 != 0" class="mr10" type="danger">爆款推荐</el-tag>
                    <el-tag v-show="ind%2 == 0" class="mr10" type="danger">热门服务</el-tag>
                    <el-tag v-show="ind%2 == 0" class="mr10" type="info">全网甄选</el-tag>
                    <el-tag v-show="ind%2 != 0" class="mr10" type="info">精品服务</el-tag>
                  </div>
                  <div class="mt10 ml5 flexBetween">
                    <div class="f20 fw600">{{val.name}}</div>
                  </div>
                  <div
                    class="f12 mt15 ml5 color2 textOver2"
                    style="height:30px;line-height:15px;"
                  >{{val.description}}</div>
                  <div class="flexBetween mt15">
                    <div class="flex">
                    <div class="colorYellow f20 fw600 mt6">
                      ￥<span v-text="$common.moneyFormat(val.newprice)"></span>
                    </div>
                    <!-- <div class="color2 f13 mt8 ml10" style=" text-decoration:line-through">
                      ￥<span v-text="$common.moneyFormat(val.oldprice)"></span>
                    </div> -->
                    </div>
                    <div class="btn2" @click="toDetails(val.name)">查看详情</div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nowClass: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      recomList: [],
      bgId:0,
      styleList:[
        {
          color:'#ff8b00',
          bgcolor:'#ff8b00 0%, #fe5e01 50%,#ff8b00 10%,#fe5e01 100%'
        },
        {
          color:'#46e3c4',
          bgcolor:'#46e3c4 0%, #3cc8c9 50%,#46e3c4 10%, #3cc8c9 100%'
        },
        {
          color:'#12b0cb',
          bgcolor:'#12b0cb 0%, #1f91e9 50%,#12b0cb 10%, #1f91e9 100%'
        },
        {
          color:'#ff9000',
          bgcolor:'#ff9000 0%, #ff464e 50%,#ff9000 10%, #ff464e 100%'
        },
        {
          color:'#13ca9a',
          bgcolor:'#13ca9a 0%, #089b91 50%,#13ca9a 10%, #089b91 100%'
        }
      ],
    }
  },
  async mounted() {
    await this.findProduct()
  },
  watch: {
    $route(to,from){
        this.findProduct()
    }
  },
  methods: {
    //跳转招聘详情
    toDetails(name) {
      this.$router.push({
        path: '/ProductDetail',
        query: { name: name }
      })
    },
    findProduct() {
      this.bgId = parseInt(Math.random()*5)
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: 'type',
        input: this.nowClass.name
      }
      this.$axios.post(this.$api.findProduct, data).then(res => {
        this.recomList = []
        let arr = res.data[0].data
        arr = arr.concat(arr).concat(arr)
        arr = arr.concat(arr).concat(arr)
        for (let i = 0; i < arr.length; i += 8) {
          this.recomList.push(arr.slice(i, i + 8))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.probg {
  width: 23%;
  min-width:255px;
  margin-top: 1%;
  margin-left: 1%;
  height: 180px;
  padding: 16px;
  box-sizing: border-box;
}
.typeLeft {
  width: 178px;
  height: 400px;
}
::v-deep .el-tag {
  height: 25px;
  line-height: 25px;
}
::v-deep .el-tag.el-tag--danger{
  background-color: #fff;
  // border-color: #82dfc8;
  // color: #11BBB8;
  border-color:#ff6600;
  color: #ff6600;
}
.tags{
  padding:3px 15px;
  height:20px;
  line-height: 20px;
  background:rgb(228, 231, 237);
  border-radius: 18px;
  margin-left:10px;
}
</style>
