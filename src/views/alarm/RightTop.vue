<template>
  <div class="RightTop">
    <div class="text">近7日告警量趋势</div>
    <div class="echarts">
      <Echart8 />
    </div>
  </div>
</template>

<script>
import Echart8 from "./Echart8";
export default {
  data() {
    return {};
  },
  components: {
    Echart8,
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
    height: 100%;
  }
}
</style>
