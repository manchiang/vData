<template>
  <div class="LeftScroll">
    <div class="text">
      <div class="left">实时告警项</div>
    </div>
    <div class="scrollbox">
      <vue-seamless-scroll
        :class-option="defaultOption"
        :data="alarmScroll"
        class="alarmList2"
      >
        <div
          class="scrollitem"
          v-for="(item, index) in alarmScroll"
          :key="index"
        >
          <div class="itemtop">
            <div class="left">
              {{ item.title ? item.title : "--" }}
            </div>
            <div class="right">
              {{ item.time }}
            </div>
          </div>
          <div class="itembottom">
            {{ item.text }}
          </div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alarmScroll: [],
    };
  },
  computed: {
    defaultOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
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
    this.$Event.$on("getAlarmLeftTop", (res) => {
      if (res && res.length > 0) {
        this.alarmScroll = [];
        console.log("res", res);
        res.map((item) => {
          this.alarmScroll.push({
            title: item.warningMsg,
            time: this.formatTime(item.ctime),
            text: item.batterySN
              ? item.batterySN
              : item.cabinetAddress + `(${item.qrCodeDid})`,
          });
        });
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getAlarmLeftTop"); //销毁
  },
  methods: {
    formatTime(ctime) {
      let date = new Date(ctime);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      return (
        [year, month, day].map(this.formatNumber).join("/") +
        " " +
        [hour, minute, second].map(this.formatNumber).join(":")
      );
    },
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
  },
};
</script>

<style lang="less" scoped>
.LeftScroll {
  width: 100%;
  height: 100%;
  color: #ffbb32;
  font-size: 18px;
  .text {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .scrollbox {
    width: 100%;
    height: 95%;
    overflow-y: scroll;

    .scrollitem {
      width: 100%;
      padding: 20px 0;
      box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.2);
      .itemtop {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        .left {
          font-size: 16px;
          color: #ffffff;
        }
        .right {
          font-size: 16px;
          color: #ffffff;
          opacity: 0.75;
        }
      }
      .itembottom {
        font-size: 16px;
        color: #ffffff;
        opacity: 0.75;
      }
    }
  }
  .scrollbox::-webkit-scrollbar {
    display: none;
  }
}
</style>
