<template>
  <div class="BottomTable">
    <div class="one">
      <div class="title">
        近7日电柜告警类型占比
      </div>
      <Echart9 />
    </div>
    <div class="two">
      <div class="title">
        近7日电池告警类型占比
      </div>
      <Echart10 />
    </div>
    <div class="three">
      <div class="title">
        近7日业务告警类型占比
      </div>
      <Echart11 />
    </div>
  </div>
</template>

<script>
import Echart9 from "./Echart9";
import Echart10 from "./Echart10";
import Echart11 from "./Echart11";
export default {
  data() {
    return {};
  },
  components: {
    Echart9,
    Echart10,
    Echart11,
  },
};
</script>

<style lang="less" scoped>
.BottomTable {
  width: 100%;
  height: 100%;
  border: 1px solid #1a66ff;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  padding: 15px 25px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    color: #ffbb32;
  }
  .one,
  .two,
  .three {
    width: 25%;
    height: 95%;
  }
}
</style>
