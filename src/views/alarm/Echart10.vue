<template>
  <div id="material_echart10"></div>
</template>

<script>
var echarts = require("echarts");
var material_echart10 = "";
export default {
  data() {
    return {
      index: 0,
      dataTagList: [],
      dataValList: [],
    };
  },
  mounted() {
    this.$Event.$on("getAlarmBottomCenter", (res) => {
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
    this.$Event.$off("getAlarmBottomCenter"); //销毁
  },
  methods: {
    initData() {
      if (material_echart10 != null && material_echart10 != "") {
        material_echart10.dispose();
      }
      material_echart10 = echarts.init(
        document.getElementById("material_echart10")
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
      material_echart10.setOption(option);
      if (this.dataValList && this.dataValList.length > 1) {
        tools.loopShowTooltip(material_echart10, option, {
          interval: 5000,
          loopSeries: true,
        });
        if (this.$global.timer_pie_ten) {
          clearInterval(this.$global.timer_pie_ten);
        }
        const data = material_echart10.getOption().legend[0].data;
        if (data && data.length > 0) {
          let i = 0;
          this.$global.timer_pie_ten = setInterval(() => {
            i++;
            if (i >= data.length) {
              i = 0;
            }
            material_echart10.dispatchAction({
              type: "legendScroll",
              scrollDataIndex: i,
            });
          }, 5000);
        }
      }
    },
    // 饼图无数据时候渲染
    noDataChart() {
      if (material_echart10 != null && material_echart10 != "") {
        material_echart10.dispose();
      }
      material_echart10 = echarts.init(
        document.getElementById("material_echart10")
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
      material_echart10.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart10 {
  width: 100%;
  height: 100%;
}
</style>
