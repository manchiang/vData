<!-- 告警监控 -->
<template>
  <div class="main_container">
    <!-- 整个上部 -->
    <div class="top_table">
      <div class="left_chart_container">
        <LeftScroll />
      </div>
      <div class="center_container">
        <div class="centerWrapTop">
          <center-survey />
        </div>

        <div class="centerWrapBtm">
          <HeatMap />
        </div>
      </div>
      <div class="right_chart_container">
        <div class="rightWrapT">
          <RightTop />
        </div>
        <div class="rightWrapB">
          <RightCenter />
        </div>
      </div>
    </div>
    <!-- 整个下部 -->
    <div class="bottom_table">
      <BottomTable />
    </div>
  </div>
</template>

<script>
import CenterSurvey from "./CenterSurvey";
import HeatMap from "./HeatMap";
import RightTop from "./RightTop";
import RightCenter from "./RightCenter";
import LeftScroll from "./LeftScroll";
import BottomTable from "./BottomTable";

export default {
  data() {
    return {};
  },
  components: {
    CenterSurvey,
    HeatMap,
    RightTop,
    RightCenter,
    BottomTable,
    LeftScroll,
  },
};
</script>

<style lang="less" scoped>
.main_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 97%;
  height: -moz-calc(100% - 165px);
  height: -webkit-calc(100% - 165px);
  height: calc(100% - 165px);
  margin: 0 auto;
  .top_table {
    width: 100%;
    height: 72%;
    display: flex;
    align-items: flex-start;
    .left_chart_container {
      width: 22%;
      height: 100%;
      border: 1px solid #1a66ff;
      border-radius: 6px;
      padding: 15px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .center_container {
      width: 55%;
      height: 100%;
      margin-top: 16px;
      margin-left: 24px;
      margin-right: 24px;
      box-sizing: border-box;
      .centerWrapTop {
        width: 100%;
        height: 20%;
        margin-bottom: 10px;

        .border-box-content {
          flex-direction: column;
          padding: 0;
        }
      }
      .centerWrapBtm {
        width: 100%;
        height: 73%;
        border: 1px solid #1a66ff;
        border-radius: 6px;
        overflow: hidden;
      }
    }
    .right_chart_container {
      width: 24%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .rightWrapT {
        width: 100%;
        height: 48%;
        padding: 15px;
        box-sizing: border-box;
        border-radius: 6px;
        border: 1px solid #1a66ff;
      }
      .rightWrapB {
        width: 100%;
        height: 48%;
        overflow: hidden;
        padding: 15px;
        box-sizing: border-box;
        margin-top: 24px;
        border-radius: 6px;
        border: 1px solid #1a66ff;
      }
    }
  }
  .bottom_table {
    width: 100%;
    height: 26%;
  }
}
</style>
