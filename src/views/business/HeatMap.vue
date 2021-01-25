<template>
  <div class="hmap_containt">
    <div class="sprite">
      换电订单热力图
    </div>
    <div class="heatBiaoshi">
      <div class="baowai"></div>
      <div class="biaoshiitem" style="top:10%;">
        <div class="line" style="background-color:#DA2525;"></div>
        <div class="text">
          > 300
        </div>
      </div>
      <div class="biaoshiitem" style="top:30%;">
        <div class="line" style="background-color:#FCB834;"></div>
        <div class="text">
          > 100
        </div>
      </div>
      <div class="biaoshiitem" style="top:50%;">
        <div class="line" style="background-color:#34ECFC;"></div>
        <div class="text">
          > 50
        </div>
      </div>
      <div class="biaoshiitem" style="top:70%;">
        <div class="line" style="background-color:#1A6EFF;"></div>
        <div class="text">
          > 0
        </div>
      </div>
    </div>
    <div id="heat_container"></div>
  </div>
</template>

<script>
var mapView = "";
var heatView = "";
export default {
  data() {
    return {
      centerNone: [
        {
          lat: 22.553663,
          lng: 114.065558,
          count: 0,
        },
      ],
    };
  },
  mounted() {
    console.log(this.$Event._events);
    this.$Event.$on("getbusinessHotData", (res) => {
      if (res) {
        if (mapView) {
          mapView.destroy();
        }
        if (heatView) {
          heatView.destroy();
        }
        this.getHotData(res);
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getbusinessHotData"); //销毁
  },
  methods: {
    async getHotData(storeCurr) {
      let [err, res] = await this.api_post(
        "performanceMonitoring/select/selectCabinetExchangeCount",
        {
          organizationId: storeCurr,
        }
      );
      if (err != null) {
        return false;
      }
      let hotData = res.data.data;
      if (hotData && hotData.length > 0) {
        this.initMap(hotData);
      } else {
        this.initMap(this.centerNone); //默认经纬度
      }
    },
    initMap(hotData) {
      let firstData = hotData[0];
      let center = new TMap.LatLng(firstData.lat, firstData.lng);
      // //初始化地图
      mapView = new TMap.Map(document.getElementById("heat_container"), {
        zoom: 11.7, //设置地图缩放级别
        center: center, //设置地图中心点坐标
        mapStyleId: "style1", //个性化样式
      });

      //初始化热力图并添加至map图层
      heatView = new TMap.visualization.Heat({
        max: 300, // 热力最强阈值
        min: 0, // 热力最弱阈值
        height: 0, // 峰值高度
        gradientColor: {
          // 渐变颜色
          0.001: "#1A6EFF",
          0.16: "#34ECFC",
          0.33: "#FCB834",
          0.99: "#DA2525",
        },
        radius: 20, // 最大辐射半径
      }).addTo(mapView);
      heatView.setData(hotData); //设置数据
    },
  },
};
</script>

<style lang="less" scoped>
.sprite {
  position: absolute;
  z-index: 1000;
  width: 102px;
  height: 30px;
  background: rgba(26, 102, 255, 1);
  border-radius: 0px 0px 6px 0px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.heatBiaoshi {
  position: absolute;
  z-index: 10000000;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
  .baowai {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.7);
    border-top-left-radius: 5px;
  }
  .biaoshiitem {
    position: absolute;
    opacity: 1;
    display: flex;
    align-items: center;
    .line {
      width: 25px;
      height: 10px;
      margin-right: 10px;
    }
    .text {
      font-weight: bold;
    }
  }
}
.hmap_containt {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
#heat_container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
