<template>
  <div id="material_echart9"></div>
</template>

<script>
var echarts = require("echarts");
var material_echart9 = "";
export default {
  data() {
    return {
      index: 0,
      dataTagList: [],
      dataValList: [],
    };
  },
  mounted() {
    this.$Event.$on("getAlarmBottomLeft", (res) => {
      if (res && res.length > 0) {
        this.dataTagList = [];
        this.dataValList = [];
        res.map((item) => {
          this.dataTagList.push(item.alarm_value);
          this.dataValList.push({
            value: item.num,
            name: item.alarm_value,
          });
        });
        this.initData();
      } else {
        this.noDataChart();
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getAlarmBottomLeft"); //销毁
  },
  methods: {
    initData() {
      if (material_echart9 != null && material_echart9 != "") {
        material_echart9.dispose();
      }
      material_echart9 = echarts.init(
        document.getElementById("material_echart9")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}({d}%)",
          transitionDuration: 0,
          textStyle: {
            fontStyle: "normal",
            fontSize: 12,
          },
        },
        color: this.$global.RANDOMCOLOR,
        legend: {
          height: "90",
          type: "scroll",
          selectedMode: false,
          orient: "vertical",
          animation: true,
          x: "right",
          y: "center",
          textStyle: {
            color: "#adadad",
            fontSize: this.setFontSize(0.15),
          },
          data: this.dataTagList,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["20%", "50%"],
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: this.dataValList,
          },
        ],
      };
      material_echart9.setOption(option);
      if (this.dataValList && this.dataValList.length > 1) {
        tools.loopShowTooltip(material_echart9, option, {
          interval: 5000,
          loopSeries: true,
        });
        if (this.$global.timer_pie_nine) {
          clearInterval(this.$global.timer_pie_nine);
        }
        const data = material_echart9.getOption().legend[0].data;
        if (data && data.length > 0) {
          let i = 0;
          this.$global.timer_pie_nine = setInterval(() => {
            i++;
            if (i >= data.length) {
              i = 0;
            }
            material_echart9.dispatchAction({
              type: "legendScroll",
              scrollDataIndex: i,
            });
          }, 5000);
        }
      }
    },
    // 饼图无数据时候渲染
    noDataChart() {
      if (material_echart9 != null && material_echart9 != "") {
        material_echart9.dispose();
      }
      material_echart9 = echarts.init(
        document.getElementById("material_echart9")
      );
      let option = {
        color: "#4B88FF",
        legend: {
          height: "70",
          selectedMode: false,
          type: "scroll",
          selectedMode: false,
          orient: "vertical",
          animation: true,
          x: "right",
          y: "center",
          textStyle: {
            color: "#adadad",
            fontSize: this.setFontSize(0.15),
          },
          data: ["暂无告警项"],
        },
        series: [
          {
            name: "暂无告警项",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["19%", "40%"],
            label: {
              show: false,
              position: "center",
            },

            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1000,
                name: "暂无告警项",
              },
            ],
          },
        ],
      };
      material_echart9.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart9 {
  width: 100%;
  height: 100%;
}
</style>
