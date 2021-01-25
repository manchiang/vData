<!-- 物资监控 -->
<template>
  <div class="main_container">
    <!-- 左边模块 -->
    <div class="left_chart_container">
      <div class="leftWrapT">
        <LeftTop />
      </div>
      <div class="leftWrapB">
        <LeftBottom />
      </div>
    </div>
    <!-- 中间模块 -->
    <div class="center_chart_container">
      <div class="centerWrapTop">
        <center-survey />
      </div>
      <div class="centerWrapBtm">
        <heat-map />
      </div>
      <div class="centerBottom">
        <div class="centerWrapBottomA">
          <CenterBottomA />
        </div>
        <div class="centerWrapBottomB">
          <CenterBottomB />
        </div>
      </div>
    </div>
    <!-- 右边模块 -->
    <div class="right_chart_container">
      <div class="rightWrapT">
        <RightTop />
      </div>
      <div class="rightWrapB">
        <RightCenter />
      </div>
      <div class="rightWrapC">
        <RightBottom />
      </div>
    </div>
  </div>
</template>

<script>
import CenterSurvey from "./CenterSurvey";
import CenterBottomA from "./CenterBottomA";
import CenterBottomB from "./CenterBottomB";
import HeatMap from "./HeatMap";
import LeftTop from "./LeftTop";
import RightBottom from "./RightBottom";
import RightTop from "./RightTop";
import RightCenter from "./RightCenter";
import LeftBottom from "./LeftBottom";
export default {
  data() {
    return {};
  },
  components: {
    CenterSurvey,
    CenterBottomA,
    CenterBottomB,
    HeatMap,
    LeftTop,
    LeftBottom,
    RightBottom,
    RightTop,
    RightCenter,
  },
};
</script>

<style lang="less" scoped>
.main_container {
  display: flex;
  align-items: flex-start;
  width: 97%;
  height: -moz-calc(100% -  125px);
  height: -webkit-calc(100% -  125px);
  height: calc(100% - 125px);
  margin: 0 auto;
  .left_chart_container {
    width: 22%;
    height: 95%;
    .leftWrapT {
      width: 100%;
      height: 55%;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 6px;
      border: 1px solid #1a66ff;
    }
    .leftWrapB {
      width: 100%;
      height: 42%;
      margin-top: 24px;
      border-radius: 6px;
      border: 1px solid #1a66ff;
      padding: 20px;
      box-sizing: border-box;
    }
  }
  .center_chart_container {
    width: 55%;
    height: 95%;
    margin-top: 16px;
    margin-left: 24px;
    margin-right: 24px;
    box-sizing: border-box;
    .centerWrapTop {
      width: 100%;
      height: 14%;
      margin-bottom: 10px;

      .border-box-content {
        flex-direction: column;
        padding: 0;
      }
    }
    .centerWrapBtm {
      width: 100%;
      overflow: hidden;
      height: 50%;
      margin: 0 auto;
      border: 1px solid #1A66FF;
      border-radius: 6px;
    }
    .centerBottom {
      width: 100%;
      height: 36%;
      display: flex;
      justify-content: space-between;
      .centerWrapBottomA {
        width: 48%;
        margin-top: 10px;
        padding: 15px;
        box-sizing: border-box;
        height: 85%;
        border: 1px solid #1a66ff;
        border-radius: 6px;
      }
      .centerWrapBottomB {
        width: 48%;
        margin-top: 10px;
        padding: 15px;
        box-sizing: border-box;
        height: 85%;
        border: 1px solid #1a66ff;
        border-radius: 6px;
      }
    }
  }
  .right_chart_container {
    width: 24%;
    height: 95%;
    .rightWrapT {
      width: 100%;
      height: 32%;
      padding: 15px;
      box-sizing: border-box;
      border-radius: 6px;
      border: 1px solid #1a66ff;
    }
    .rightWrapB {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      height: 32%;
      margin-top: 24px;
      border-radius: 6px;
      border: 1px solid #1a66ff;
    }
    .rightWrapC {
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      height: 30%;
      margin-top: 24px;
      border-radius: 6px;
      border: 1px solid #1a66ff;
    }
  }
}
</style>
