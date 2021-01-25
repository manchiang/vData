<template>
  <div id="material_echart4"></div>
</template>

<script>
var echarts = require("echarts");
var material_echart4 = "";
export default {
  data() {
    return {
      index: 0,
      dataTagList: [],
      dataValList: [],
    };
  },
  mounted() {
    this.$Event.$on("getBusinessBottomLeft", (res) => {
      if (res && res.length > 0) {
        this.dataTagList = [];
        this.dataValList = [];
        res.map((item) => {
          this.dataTagList.push(item.name);
          this.dataValList.push({
            value: item.money,
            name: item.name,
          });
        });
        this.initData();
      } else {
        this.noDataChart();
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getBusinessBottomLeft"); //销毁
  },

  methods: {
    initData() {
      if (material_echart4 != null && material_echart4 != "") {
        material_echart4.dispose();
      }
      material_echart4 = echarts.init(
        document.getElementById("material_echart4")
      );
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} ({d}%)",
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
          selectedMode: false,
          animation: true,
          x: "right",
          y: "center",
          textStyle: {
            color: "#adadad",
            fontSize: this.setFontSize(0.18),
          },
          data: this.dataTagList,
        },
        series: [
          {
            name: "收益来源",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["30%", "50%"],
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
      material_echart4.setOption(option);
      tools.loopShowTooltip(material_echart4, option, {
        interval: 5000,
        loopSeries: true,
      });
      if (this.$global.timer_pie_four) {
        clearInterval(this.$global.timer_pie_four);
      }
      const data = material_echart4.getOption().legend[0].data;
      if (data && data.length > 0) {
        let i = 0;
        this.$global.timer_pie_four = setInterval(() => {
          i++;
          if (i >= data.length) {
            i = 0;
          }
          material_echart4.dispatchAction({
            type: "legendScroll",
            scrollDataIndex: i,
          });
        }, 5000);
      }
    },
    // 饼图无数据时候渲染
    noDataChart() {
      if (material_echart4 != null && material_echart4 != "") {
        material_echart4.dispose();
      }
      material_echart4 = echarts.init(
        document.getElementById("material_echart4")
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
                name: "暂无数据",
              },
            ],
          },
        ],
      };
      material_echart4.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#material_echart4 {
  width: 100%;
  height: 100%;
}
</style>
