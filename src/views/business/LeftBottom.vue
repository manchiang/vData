<template>
  <div class="LeftBottom">
    <div class="text">今日套餐购买量排名</div>
    <vue-seamless-scroll
      v-if="progressList && progressList.length"
      :data="progressList"
      class="blocks"
    >
      <div class="progress" v-for="(item, index) in progressList" :key="index">
        <div class="tiltle" style="color:white;">
          {{ item.packageName ? item.packageName : "--" }}
        </div>
        <el-progress
          class="progress-line"
          :stroke-width="7"
          :format="format"
          :percentage="item.percentage"
          :color="'#66FAFF'"
        ></el-progress>
      </div>
    </vue-seamless-scroll>
    <div class="extblocks" v-else>
      暂无排名
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progressList: [],
      total: 0,
    };
  },
  mounted() {
    this.$Event.$on("getBusinessLeftBottom", (res) => {
      if (res) {
        this.handleProgressList(res);
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getBusinessLeftBottom"); //销毁
  },
  methods: {
    format(percentage) {
      return parseInt(percentage * 0.01 * this.total) + "次";
    },
    handleProgressList(res) {
      let temp = res;
      this.total = 0;
      temp.map((item) => {
        this.total += item.cardNum ? Number(item.cardNum) : 0;
      });
      temp.map((item) => {
        let tempNum = item.cardNum ? Number(item.cardNum) : 0;
        item.percentage = Number(100 * (tempNum / this.total));
      });
      this.progressList = temp;
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
    overflow-y: scroll;
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
    padding-top: 20px;
    font-size: 18px;
    text-align: center;
    color: #999;
  }
  .blocks::-webkit-scrollbar {
    display: none;
  }
}
</style>
