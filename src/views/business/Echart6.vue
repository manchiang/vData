<template>
  <div id="material_echart6"></div>
</template>

<script>
var echarts = require("echarts");
require("../../utils/echarts-auto-tooltip");
var material_echart6 = "";
export default {
  data() {
    return {
      index: 0,
      xData: [],
      y1Data: [],
      y2Data: [],
      y3Data: [],
      ymax: 0,
    };
  },
  mounted() {
    this.$Event.$on("getBusinessRightCenter", (res) => {
      if (res) {
        if (material_echart6 != null && material_echart6 != "") {
          material_echart6.dispose();
        }
        this.xData = [];
        this.y1Data = [];
        this.y2Data = [];
        this.y3Data = [];
        this.ymax = 0;
        res.OpenServiceUser.map((item) => {
          this.xData.push(this.handleXdata(item.timeUtil));
          this.y1Data.push(item.userNum);
        });
        res.UserConsume.map((item) => {
          this.y2Data.push(item.userNum);
        });
        res.newUserNum.map((item) => {
          this.y3Data.push(item.userNum);
        });
        let y1max = Math.max(...this.y1Data);
        let y2max = Math.max(...this.y2Data);
        let y3max = Math.max(...this.y3Data);
        this.ymax = Math.max(y1max, y2max, y3max);
        this.initData();
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getBusinessRightCenter"); //销毁
  },
  methods: {
    // 处理x轴数据
    handleXdata(xdata) {
      return xdata.split("-")[1] + "." + xdata.split("-")[2];
    },
    initData() {
      if (material_echart6 != null && material_echart6 != "") {
        material_echart6.dispose();
      }
      material_echart6 = echarts.init(
        document.getElementById("material_echart6")
      );
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["新增用户", "新增付费用户", "开通服务用户"],
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
            name: "新增用户",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#66FAFF",
            },
            data: this.y1Data,
          },
          {
            name: "新增付费用户",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#4B87FF",
            },
            data: this.y2Data,
          },
          {
            name: "开通服务用户",
            type: "line",
            smooth: true,
            itemStyle: {
              color: "#574BFF",
            },
            data: this.y3Data,
          },
        ],
      };

      material_echart6.setOption(option);
      tools.loopShowTooltip(material_echart6, option, { loopSeries: true });
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart6 {
  width: 100%;
  height: 90%;
}
</style>
