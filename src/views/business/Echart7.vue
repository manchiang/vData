<template>
  <div id="material_echart7"></div>
</template>

<script>
var echarts = require("echarts");
require("../../utils/echarts-auto-tooltip");
var material_echart7 = "";
export default {
  data() {
    return {
      index: 0,
      xData: [],
      yData: [],
      ymax: 0,
    };
  },
  mounted() {
    this.$Event.$on("getBusinessRightBottom", (res) => {
      if (res) {
        this.xData = [];
        this.yData = [];
        this.ymax = 0;
        res.map((item) => {
          this.xData.push(this.handleXdata(item.timeUtil));
          this.yData.push(item.userNum);
        });
        this.ymax = Math.max(...this.yData);
        this.initData();
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getBusinessRightBottom"); //销毁
  },
  methods: {
    // 处理x轴数据
    handleXdata(xdata) {
      return xdata.split("-")[1] + "." + xdata.split("-")[2];
    },
    initData() {
      if (material_echart7 != null && material_echart7 != "") {
        material_echart7.dispose();
      }
      material_echart7 = echarts.init(
        document.getElementById("material_echart7")
      );
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["活跃用户"],
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
          name: "人",
          nameTextStyle: {
            color: "rgba(255,255,255,0.75)",
            fontFamily: "#Arial",
            fontSize: 12,
          },
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
            name: "活跃用户",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#66FAFF",
            },
            data: this.yData,
          },
        ],
      };

      material_echart7.setOption(option);
      tools.loopShowTooltip(material_echart7, option, { loopSeries: true });
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart7 {
  width: 100%;
  height: 90%;
}
</style>
