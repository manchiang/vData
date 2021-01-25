<template>
  <div id="material_echart2"></div>
</template>

<script>
var echarts = require("echarts");
var material_echart2 = "";
export default {
  data() {
    return {
      index: 0,
      dataTagList: [],
      dataValList: [],
    };
  },
  mounted() {
    this.$Event.$on("getMaterialRightTop2", (res) => {
      if (
        res &&
        res.userBatteryTypeProportion &&
        res.userBatteryTypeProportion.length > 0
      ) {
        this.dataTagList = [];
        this.dataValList = [];
        res.userBatteryTypeProportion.map((item) => {
          this.dataTagList.push(item.typeName);
          this.dataValList.push({
            value: item.typeNum,
            name: item.typeName,
          });
        });
        this.initData();
      } else {
        this.noDataChart();
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getMaterialRightTop2"); //销毁
  },
  methods: {
    initData() {
      if (material_echart2 != null && material_echart2 != "") {
        material_echart2.dispose();
      }
      material_echart2 = echarts.init(
        document.getElementById("material_echart2")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}: {c} ({d}%)",
          transitionDuration: 0,
          textStyle: {
            fontStyle: "normal",
            fontSize: 12,
          },
        },
        color: this.$global.RANDOMCOLOR,
        legend: {
          height: "70",
          type: "scroll",
          orient: "vertical",
          animation: true,
          x: "right",
          selectedMode: false,
          y: "center",
          textStyle: {
            color: "#adadad",
            fontSize: this.setFontSize(0.15),
          },
          data: this.dataTagList,
        },
        series: [
          {
            name: "电池类型",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["25%", "40%"],
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
      material_echart2.setOption(option);

      tools.loopShowTooltip(material_echart2, option, {
        interval: 5000,
        loopSeries: true,
      });
      if (this.dataValList && this.dataValList.length > 1) {
        if (this.$global.timer_pie_two) {
          clearInterval(this.$global.timer_pie_two);
        }
        const data = material_echart2.getOption().legend[0].data;

        if (data && data.length > 0) {
          let i = 0;
          this.$global.timer_pie_two = setInterval(() => {
            i++;
            if (i >= data.length) {
              i = 0;
            }
            material_echart2.dispatchAction({
              type: "legendScroll",
              scrollDataIndex: i,
            });
          }, 5000);
        }
      }
    },
    // 饼图无数据时候渲染
    noDataChart() {
      if (material_echart2 != null && material_echart2 != "") {
        material_echart2.dispose();
      }
      material_echart2 = echarts.init(
        document.getElementById("material_echart2")
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
          data: ["暂无数据"],
        },
        series: [
          {
            name: "暂无数据",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["25%", "40%"],
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
                name: "暂无数据",
              },
            ],
          },
        ],
      };
      material_echart2.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart2 {
  width: 100%;
  height: 100%;
}
</style>
