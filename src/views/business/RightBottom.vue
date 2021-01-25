<template>
  <div class="RightBottom">
    <div class="text">近7日用户活跃度</div>
    <div class="echarts">
      <Echart7 />
    </div>
  </div>
</template>

<script>
import Echart7 from "./Echart7";
export default {
  components: {
    Echart7,
  },
};
</script>

<style lang="less" scoped>
.RightBottom {
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
