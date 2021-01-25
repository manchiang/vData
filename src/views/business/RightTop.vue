<template>
  <div class="RightTop">
    <div class="text">今日充换电订单趋势</div>
    <div class="echarts">
      <Echart3 />
    </div>
  </div>
</template>

<script>
import Echart3 from "./Echart3";
export default {
  data() {
    return {};
  },
  components: {
    Echart3,
  },
};
</script>

<style lang="less" scoped>
.RightTop {
  width: 100%;
  height: 100%;
  .text {
    font-size: 20px;
    color: #ffbb32;
    margin-bottom: 5px;
  }
  .echarts {
    width: 100%;
    height: 95%;
  }
}
</style>
