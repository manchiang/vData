<template>
  <div class="CenterBottomB">
    <div class="text">近7日车辆出售趋势</div>
    <div class="echarts">
      <Echart5 />
    </div>
  </div>
</template>

<script>
import Echart5 from "./Echart5";
export default {
  components: {
    Echart5,
  },
};
</script>

<style lang="less" scoped>
.CenterBottomB {
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
