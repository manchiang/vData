<template>
  <div id="material_echart11"></div>
</template>

<script>
var echarts = require("echarts");
var material_echart11 = "";
export default {
  data() {
    return {
      index: 0,
      dataTagList: [],
      dataValList: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      if (material_echart11 != null && material_echart11 != "") {
        material_echart11.dispose();
      }
      material_echart11 = echarts.init(
        document.getElementById("material_echart11")
      );
      let option = {
        color: this.$global.RANDOMCOLOR,
        legend: {
          height: "90",
          type: "scroll",
          orient: "vertical",
          animation: true,
          selectedMode: false,
          x: "right",
          y: "center",
          textStyle: {
            color: "#adadad",
            fontSize: this.setFontSize(0.15)
          },
          data: ["暂无告警项"]
        },
        series: [
          {
            name: "暂无告警项",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["20%", "50%"],
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 1000,
                name: "暂无告警项"
              }
            ]
          }
        ]
      };
      material_echart11.setOption(option);
      if (this.$global.timer_pie_elev) {
        clearInterval(this.$global.timer_pie_elev);
      }
      const data = material_echart11.getOption().legend[0].data;
      let i = 0;
      this.$global.timer_pie_elev = setInterval(() => {
        i++;
        if (i >= data.length) {
          i = 0;
        }
        material_echart11.dispatchAction({
          type: "legendScroll",
          scrollDataIndex: i
        });
      }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
#material_echart11 {
  width: 100%;
  height: 100%;
}
</style>
