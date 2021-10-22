<template>
  <div class="flexBetween" style="width:100%;">
    <!-- 推荐服务 -->
    <div class="flex" style="width:49.5%;">
      <div class="bgfff p20" style="width:100%">
        <div class="flexBetween f13">
          <div class="flex">
            <div class="f20 fw600">推荐服务</div>
            <span class="color2 mt3 ml10">人气推荐，10万用户必选服务</span>
          </div>
          <i class="el-icon-guide mt3 color2 f18"></i>
        </div>
        <div class="flexBetween mt10" style="box-sizing:border-box;">
          <el-carousel indicator-position="none" height="380px" style="width:100%">
            <el-carousel-item  v-for="(item,index) in recomList1" :key="index+'car'">
              <div class="flexBetween">
                <div class="probg" style="background: #f0f5f5;" v-for="(val,ind) in item" :key="ind+'rem1'">
                  <div class="flex">
                    <el-tag v-show="ind%2 == 0" class="mr10" type="info">无隐形费用</el-tag>
                    <el-tag v-show="ind%2 != 0" class="mr10" type="info">全程托管</el-tag>
                    <el-tag v-show="ind%2 == 0" class="mr10" type="info">专家顾问</el-tag>
                    <el-tag v-show="ind%2 != 0" class="mr10" type="info">精选服务</el-tag>
                    <el-tag v-show="ind%2 == 0" class="mr10" type="info">快速高效</el-tag>
                  </div>
                  <div class="f20 fw600 mt10 ml5 flexBetween">
                    <div>{{val.name}}</div>
                    <div class="colorYellow">￥<span v-text="$common.moneyFormat(val.newprice)"></span></div>
                  </div>
                  <div class="f12 mt15 ml5 color2 textOver2" style="height:30px;line-height:15px;">{{val.description}}</div>
                  <div class="flexAround mt15">
                    <div class="btn1" @click="$common.gottkefu()">立即咨询</div>
                    <div class="btn2" @click="toDetails(val.name)">查看详情</div>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="flex" style="width:49.5%;">
      <div class="bgfff p20" style="width:100%">
        <div class="flexBetween f13">
          <div class="flex">
            <div class="f20 fw600">猜你喜欢</div>
            <span class="color2 mt3 ml10">全网底价，用心甄选应你所需</span>
          </div>
          <i class="el-icon-guide mt3 color2 f18"></i>
        </div>
        <div class="flexBetween mt10" style="box-sizing:border-box;">
          <el-carousel indicator-position="none" height="380px" style="width:100%">
            <el-carousel-item  v-for="(item,index) in recomList2" :key="index+'car'">
              <div class="flexBetween">
                <div class="probg" style="background: #f0f0f5;" v-for="(val,ind) in item" :key="ind+'rem1'">
                  <div class="flex">
                    <el-tag v-show="ind%2 != 0" class="mr10" type="info">无隐形费用</el-tag>
                    <el-tag v-show="ind%2 == 0" class="mr10" type="info">全程托管</el-tag>
                    <el-tag v-show="ind%2 != 0" class="mr10" type="info">专家顾问</el-tag>
                    <el-tag v-show="ind%2 == 0" class="mr10" type="info">精选服务</el-tag>
                    <el-tag v-show="ind%2 != 0" class="mr10" type="info">快速高效</el-tag>
                  </div>
                  <div class="f20 fw600 mt10 ml5 flexBetween">
                    <div>{{val.name}}</div>
                    <div class="colorYellow">￥<span v-text="$common.moneyFormat(val.newprice)"></span></div>
                  </div>
                  <div class="f12 mt15 ml5 color2 textOver2" style="height:30px;line-height:15px;">{{val.description}}</div>
                  <div class="flexAround mt15">
                    <div class="btn2" @click="toDetails(val.name)">查看详情</div>
                    <div class="btn1" @click="$common.gottkefu()">立即咨询</div>
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
  data() {
    return {
      recomList1:[],
      recomList2:[]
    }
  },
  async mounted() {
    await this.findProduct()
  },
  methods: {
    toDetails(name){
      this.$router.push({
        path:'/ProductDetail',
        query:{name:name}
      })
    },
    async findProduct() {
      var data = {
        skip: 0,
        limit: 9999999,
        fuzz: "recommend",
        input: "推荐",
      };
      await this.$axios.post(this.$api.findProduct, data).then((res) => {
        let arr = res.data[0].data;
        arr = arr.concat(arr).concat(arr)

        let newArr1 = []
        let newArr2 = []
        arr.map((item,index)=>{
          if(index%2 == 0){
            newArr1.push(item)
          }else{
            newArr2.push(item)
          }
        })
        for(let i=0;i<newArr1.length;i+=4){
          this.recomList1.push(newArr1.slice(i,i+4))
        }
        for(let i=0;i<newArr2.length;i+=4){
          this.recomList2.push(newArr2.slice(i,i+4))
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.probg{
  width:49.5%;
  margin-top:1%;
  height:180px;
  padding:16px;
  box-sizing: border-box;
  
}
::v-deep .el-tag{
  height:29px;
  line-height: 29px;
  padding:0 5px;
}

</style>
