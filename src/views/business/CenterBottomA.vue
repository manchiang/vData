<template>
  <div class="CenterBottomA">
    <div class="text">今日收益来源</div>
    <div class="echarts">
      <Echart4 />
    </div>
  </div>
</template>

<script>
import Echart4 from "./Echart4";
export default {
  components: {
    Echart4,
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.CenterBottomA {
  width: 100%;
  height: 100%;
  .text {
    font-size: 20px;
    color: #ffbb32;
  }
  .echarts {
    width: 100%;
    height: 95%;
  }
}
</style>
