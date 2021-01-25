<template>
  <div id="material_echart3"></div>
</template>

<script>
var echarts = require("echarts");
require("../../utils/echarts-auto-tooltip");
var material_echart3 = "";
export default {
  data() {
    return {
      index: 0,
      todayChargingOrder: [],
      todayExchangeOrder: [],
      xData: [],
      y1Data: [],
      y2Data: [],
      ymax: 0,
    };
  },
  mounted() {
    this.$Event.$on("getBusinessRightTop", (res) => {
      if (res) {
        this.xData = [];
        this.y1Data = [];
        this.y2Data = [];
        this.todayChargingOrder = res.todayChargingOrder;
        this.todayExchangeOrder = res.todayExchangeOrder;
        this.todayChargingOrder.map((item) => {
          this.xData.push(this.handleXdata(item.timeUtil));
          this.y1Data.push(item.sumCount);
        });
        this.todayExchangeOrder.map((item) => {
          this.y2Data.push(item.sumCount);
        });
        let y1max = Math.max(...this.y1Data);
        let y2max = Math.max(...this.y2Data);
        this.ymax = y1max > y2max ? y1max : y2max;
        this.initData();
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getBusinessRightTop"); //销毁
  },
  methods: {
    // 处理x轴数据
    handleXdata(xdata) {
      return xdata + ":00";
    },
    initData() {
      if (material_echart3 != null && material_echart3 != "") {
        material_echart3.dispose();
      }
      material_echart3 = echarts.init(
        document.getElementById("material_echart3")
      );
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["充电", "换电"],
          selectedMode: false,
          textStyle: {
            color: "rgba(255,255,255,0.75)",
          },
        },
        grid: {
          left: "1%",
          y: "17%",
          right: "6%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          name: "时间",
          nameTextStyle: {
            color: "rgba(255,255,255,0.75)",
            padding: [5, 0, 0, 20],
            fontFamily: "#Arial",
            fontSize: 12,
          },
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
          name: "订单量",
          nameTextStyle: {
            color: "rgba(255,255,255,0.75)",
            fontFamily: "#Arial",
            fontSize: 12,
          },
          minInterval: 1,
          max: this.ymax,
          splitNumber: 3,
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255,255,255,0.75)", //刻度线标签颜色
          },
        },

        series: [
          {
            name: "充电",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#66FAFF",
            },
            data: this.y1Data,
          },
          {
            name: "换电",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#4B87FF",
            },
            data: this.y2Data,
          },
        ],
      };

      material_echart3.setOption(option);
      tools.loopShowTooltip(material_echart3, option, { loopSeries: true });
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart3 {
  width: 100%;
  height: 90%;
}
</style>
