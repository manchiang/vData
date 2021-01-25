<template>
  <div id="material_echart5"></div>
</template>

<script>
var echarts = require("echarts");
require("../../utils/echarts-auto-tooltip");
var material_echart5 = "";
export default {
  data() {
    return {
      index: 0,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      if (material_echart5 != null && material_echart5 != "") {
        material_echart5.dispose();
      }
      material_echart5 = echarts.init(
        document.getElementById("material_echart5")
      );
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["出售车辆"],
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
          name: "辆",
          nameTextStyle: {
            color: "rgba(255,255,255,0.75)",
            fontFamily: "#Arial",
            fontSize: 12,
          },
          max: 100,
          splitNumber: 3,
          minInterval: 1,
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255,255,255,0.75)", //刻度线标签颜色
          },
        },

        series: [
          {
            name: "出售车辆",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#66FAFF",
            },
            data: [55, 58, 69, 50, 45, 59, 70],
          },
        ],
      };

      material_echart5.setOption(option);
      tools.loopShowTooltip(material_echart5, option, { loopSeries: true });
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart5 {
  width: 100%;
  height: 90%;
}
</style>
