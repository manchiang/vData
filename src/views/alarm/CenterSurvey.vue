<template>
  <div class="pageCont">
    <div class="pageWrap">
      <div class="wrap">
        <div class="item">
          <div class="text">
            今日待处理工单
          </div>
          <div class="val">
            <countTo
              :startVal="0"
              :endVal="
                isNaN(centerData.todayPendingOrder)
                  ? 0
                  : Number(centerData.todayPendingOrder)
              "
              :duration="1000"
            ></countTo>
          </div>
          <div class="sub">
            <span
              >昨日：<countTo
                :startVal="0"
                :endVal="
                  isNaN(centerData.yesterdayPendingOrder)
                    ? 0
                    : Number(centerData.yesterdayPendingOrder)
                "
                :duration="1000"
              ></countTo
            ></span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            今日已处理工单
          </div>
          <div class="val">
            <countTo
              :startVal="0"
              :endVal="
                isNaN(centerData.todayProcessedOrder)
                  ? 0
                  : Number(centerData.todayProcessedOrder)
              "
              :duration="1000"
            ></countTo>
          </div>
          <div class="sub">
            <span
              >昨日：<countTo
                :startVal="0"
                :endVal="
                  isNaN(centerData.yesterdayProcessedOrder)
                    ? 0
                    : Number(centerData.yesterdayProcessedOrder)
                "
                :duration="1000"
              ></countTo
            ></span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            今日电柜告警量
          </div>
          <div class="val">
            <countTo
              :startVal="0"
              :endVal="
                isNaN(centerData.todayCabinetWarningCount)
                  ? 0
                  : Number(centerData.todayCabinetWarningCount)
              "
              :duration="1000"
            ></countTo>
          </div>
          <div class="sub">
            <span
              >昨日：<countTo
                :startVal="0"
                :endVal="
                  isNaN(centerData.yesterdayCabinetWarningCount)
                    ? 0
                    : Number(centerData.yesterdayCabinetWarningCount)
                "
                :duration="1000"
              ></countTo
            ></span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            今日电池告警量
          </div>
          <div class="val">
            <countTo
              :startVal="0"
              :endVal="
                isNaN(centerData.todayBatteryWarningCount)
                  ? 0
                  : Number(centerData.todayBatteryWarningCount)
              "
              :duration="1000"
            ></countTo>
          </div>
          <div class="sub">
            <span
              >昨日：<countTo
                :startVal="0"
                :endVal="
                  isNaN(centerData.yesterdayBatteryWarningCount)
                    ? 0
                    : Number(centerData.yesterdayBatteryWarningCount)
                "
                :duration="1000"
              ></countTo
            ></span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            今日业务告警量
          </div>
          <div class="val">
            <countTo
              :startVal="0"
              :endVal="
                isNaN(centerData.todayBusinessAlarm)
                  ? 0
                  : Number(centerData.todayBusinessAlarm)
              "
              :duration="1000"
            ></countTo>
          </div>
          <div class="sub">
            <span
              >昨日：<countTo
                :startVal="0"
                :endVal="
                  isNaN(centerData.yesterdayBusinessAlarm)
                    ? 0
                    : Number(centerData.yesterdayBusinessAlarm)
                "
                :duration="1000"
              ></countTo
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "LeftPutIn",
  data() {
    return {
      loading: true,
      centerData: {
        todayBatteryWarningCount: 0,
        todayBusinessAlarm: 0,
        todayCabinetWarningCount: 0,
        todayPendingOrder: 0,
        todayProcessedOrder: 0,
        yesterdayBatteryWarningCount: 0,
        yesterdayBusinessAlarm: 0,
        yesterdayCabinetWarningCount: 0,
        yesterdayPendingOrder: 0,
        yesterdayProcessedOrder: 0,
      },
    };
  },
  mounted() {
    this.$Event.$on("getAlarmTopCenter", (res) => {
      if (res) {
        this.centerData = Object.assign(this.centerData, res);
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getAlarmTopCenter"); //销毁
  },
  components: {
    countTo,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.pageCont {
  width: 100%;
  height: 99%;
  margin: auto;
  overflow: hidden;
  background: #000317;
  border: 0.005208rem solid #1a66ff;
  border-radius: 6px;
  margin-top: 10px;
  .pageWrap {
    width: 100%;
    height: 100%;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        width: 20%;
        height: 75%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .text {
          font-size: 16px;
          color: #ffffff;
        }
        .val {
          color: #66faff;
          font-size: 32px;
          font-weight: bold;
        }
        .sub {
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
