<template>
  <div class="LeftBottom">
    <div class="text">近7日车辆销售排行TOP5</div>
    <div class="blocks" v-if="progressList && progressList.length > 0">
      <div class="progress" v-for="(item, index) in progressList" :key="index">
        <div class="tiltle" style="color:white;">
          {{ item.text }}
        </div>
        <el-progress
          class="progress-line"
          :stroke-width="7"
          :format="format"
          :percentage="item.percentage"
          :color="'#66FAFF'"
        ></el-progress>
      </div>
    </div>
    <div class="extblocks" v-else>暂无排行</div>
  </div>
</template>

<script>
var getMaterialLeftBottom = "";
export default {
  data() {
    return {
      progressList: [],
      total: 0,
      test: 1,
    };
  },
  mounted() {
    console.log("this.$Event", this.$Event._events);
    this.$Event.$on("getMaterialLeftBottom", (res) => {
      getMaterialLeftBottom = res;
      if (getMaterialLeftBottom) {
        this.progressList = [];
        this.total = 0;
        getMaterialLeftBottom.map((item) => {
          this.total += Number(item.typeNum);
          this.progressList.push({
            text: item.typeName ? item.typeName : "--",
            val: item.typeNum,
            percentage: Number(item.typeProportion),
          });
        });
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getMaterialLeftBottom"); //销毁
  },
  methods: {
    format(percentage) {
      return parseInt((percentage / 100) * this.total) + "辆";
    },
  },
};
</script>

<style lang="less" scoped>
.LeftBottom {
  width: 100%;
  height: 100%;
  .text {
    font-size: 20px;
    color: #ffbb32;
    padding-bottom: 20px;
  }
  .blocks {
    width: 100%;
    height: 80%;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    .progress {
      margin-bottom: 20px;
      .tiltle {
        margin-bottom: 3px;
        font-size: 13px;
      }
    }
  }
  .extblocks {
    width: 100%;
    font-size: 18px;
    padding-top: 20px;
    text-align: center;
    color: #999;
  }
  .blocks::-webkit-scrollbar {
    display: none;
  }
}
</style>
