<template>
  <div class="RightCenter">
    <div class="rightCenterTop">
      <div class="text">近7日电柜告警TOP5</div>
      <div
        class="alarmList"
        v-if="alarmCabinetList && alarmCabinetList.length > 0"
      >
        <vue-seamless-scroll
          :class-option="defaultOption"
          :data="alarmCabinetList"
          class="alarmList2"
        >
          <div
            class="alarItem"
            v-for="(item, index) in alarmCabinetList"
            :key="index"
          >
            <div class="left">
              <div class="icon">{{ index + 1 }}</div>
              <div class="val">{{ item.text }} {{ item.qrCodeDid }}</div>
            </div>

            <div class="foot">{{ item.proj }}项</div>
          </div>
        </vue-seamless-scroll>
      </div>
      <div
        class="alarmList"
        style="color:white;display: flex;justify-content: center;    align-items: center;font-size:18px;"
        v-else
      >
        暂无电柜告警
      </div>
    </div>
    <div class="rightCenterBottom">
      <div class="text" style="margin-top:7px;">近7日电池告警TOP5</div>
      <div
        class="alarmList"
        v-if="alarmBatteryList && alarmBatteryList.length > 0"
      >
        <vue-seamless-scroll
          :class-option="defaultOption"
          :data="alarmBatteryList"
          class="alarmList2"
        >
          <div
            class="alarItem"
            v-for="(item, index) in alarmBatteryList"
            :key="index"
          >
            <div class="left">
              <div class="icon">{{ index + 1 }}</div>
              <div class="val">
                <div>
                  {{ item.text }}
                </div>
                <div>
                  {{ item.sn }}
                </div>
              </div>
            </div>

            <div class="foot">{{ item.proj }}项</div>
          </div>
        </vue-seamless-scroll>
      </div>
      <div
        class="alarmList"
        style="color:white;display: flex;justify-content: center;    align-items: center;font-size:18px;"
        v-else
      >
        暂无电池告警
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alarmCabinetList: [],
      alarmBatteryList: [],
    };
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  mounted() {
    this.$Event.$on("getAlarmTopRightBottomCabinet", (res) => {
      if (res && res.length > 0) {
        this.alarmCabinetList = [];
        res.map((item) => {
          this.alarmCabinetList.push({
            text: item.cabinetAddress,
            proj: item.alarmNum,
            qrCodeDid: item.qrCodeDid,
          });
        });
      }
    });
    this.$Event.$on("getAlarmTopRightBottomBattery", (res) => {
      if (res && res.length > 0) {
        this.alarmBatteryList = [];
        res.map((item) => {
          this.alarmBatteryList.push({
            text: item.typeName,
            proj: item.alarmNum,
            sn: item.batterySN,
          });
        });
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getAlarmTopRightBottomCabinet"); //销毁
    this.$Event.$off("getAlarmTopRightBottomBattery"); //销毁
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.RightCenter {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .rightCenterTop,
  .rightCenterBottom {
    width: 100%;
    height: 50%;

    .text {
      font-size: 18px;
      color: #ffbb32;
      margin-bottom: 10px;
    }
    .alarmList2 {
      width: 100%;
      height: 100%;
    }
    .alarmList2::-webkit-scrollbar {
      display: none;
    }
    .alarmList {
      width: 100%;
      height: 70%;
      overflow-y: scroll;
      .alarItem {
        width: 100%;
        font-size: 15px;
        color: #ffffff;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          font-size: 15px;
          .icon {
            width: 16px;
            height: 16px;
            padding: 1px;
            background: rgba(102, 250, 255, 1);
            border-radius: 2px;
            color: black;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
            font-size: 14px;
          }
          .val {
            font-size: 15px;
            width: 75%;
          }
        }
        .foot {
          width: 25%;
          text-align: right;
          color: #66faff;
          font-size: 16px;
        }
      }
    }
    .alarmList::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
