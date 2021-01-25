<template>
  <div class="RightCenter">
    <div class="text">近7日用户增长趋势</div>
    <div class="echarts">
      <Echart6 />
    </div>
  </div>
</template>

<script>
import Echart6 from "./Echart6";
export default {
  components: {
    Echart6,
  },
};
</script>

<style lang="less" scoped>
.RightCenter {
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
