<template>
  <div id="material_echart8"></div>
</template>

<script>
var echarts = require("echarts");
require("../../utils/echarts-auto-tooltip");
var material_echart8 = "";
export default {
  data() {
    return {
      index: 0,
      xData: [],
      y1Data: [],
      y2Data: [],
      ymax: 0,
    };
  },
  mounted() {
    this.$Event.$on("getAlarmTopRightTop", (res) => {
      if (res) {
        this.xData = [];
        this.y1Data = [];
        this.y2Data = [];
        res.batteryWarningLineChart.map((item) => {
          this.xData.push(this.handleXdata(item.timeUtil));
          this.y1Data.push(item.userNum);
        });
        res.cabinetWarningLineChart.map((item) => {
          this.y2Data.push(item.userNum);
        });
        let y1max = Math.max(...this.y1Data);
        let y2max = Math.max(...this.y2Data);
        this.ymax = Math.max(y1max, y2max);
        this.initData();
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getAlarmTopRightTop"); //销毁
  },
  methods: {
    // 处理x轴数据
    handleXdata(xdata) {
      return xdata.split("-")[1] + "." + xdata.split("-")[2];
    },
    initData() {
      if (material_echart8 != null && material_echart8 != "") {
        material_echart8.dispose();
      }
      material_echart8 = echarts.init(
        document.getElementById("material_echart8")
      );
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["电池", "电柜"],
          selectedMode: false,
          textStyle: {
            color: "rgba(255,255,255,0.75)",
          },
        },
        grid: {
          left: "1%",
          y: "20%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            color: "rgba(255,255,255,0.75)", //刻度线标签颜色
          },
          splitLine: {
            show: false,
          },
          data: this.xData,
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          name: "次",
          nameTextStyle: {
            color: "rgba(255,255,255,0.75)",
            fontFamily: "#Arial",
            fontSize: 12,
          },
          max: this.ymax,
          splitNumber: 5,
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255,255,255,0.75)", //刻度线标签颜色
          },
        },

        series: [
          {
            name: "电池",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#66FAFF",
            },
            data: this.y1Data,
          },
          {
            name: "电柜",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#4B87FF",
            },
            data: this.y2Data,
          },
        ],
      };

      material_echart8.setOption(option);
      tools.loopShowTooltip(material_echart8, option, { loopSeries: true });
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart8 {
  width: 100%;
  height: 90%;
}
</style>
