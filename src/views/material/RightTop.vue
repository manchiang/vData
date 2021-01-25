<template>
  <div class="RightTop">
    <div class="material_top">
      <div class="text">
        近7日用户租用电池类型占比
      </div>
      <div class="echarts">
        <Echart1 />
      </div>
    </div>
    <div class="material_bottom">
      <div class="text">
        存量用户电池类型占比
      </div>
      <div class="echarts">
        <Echart2 />
      </div>
    </div>
  </div>
</template>

<script>
import Echart1 from "./Echart1";
import Echart2 from "./Echart2";
export default {
  data() {
    return {};
  },
  components: {
    Echart1,
    Echart2,
  },
};
</script>

<style lang="less" scoped>
.RightTop {
  width: 100%;
  height: 100%;
  .material_top {
    width: 100%;
    height:50%;
    margin-bottom: 8px;
    .text {
      color: #ffbb32;
      font-size: 20px;
    }
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
  .material_bottom {
    width: 100%;
    height: 50%;
    .text {
      color: #ffbb32;
      font-size: 20px;
    }
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
