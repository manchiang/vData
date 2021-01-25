<template>
  <div style="width:100%;height:100%;background:rgba(0,0,0,.2);position:relative;">
    <div id="material_centermap" style="width:100%;height:100%;background:rgba(0,0,0,.2);"></div>
    <div v-if="!loading" class="positionIcon" @click="positionIconFun">
      <img src="http://ceshi.wondware.com/powerlongbkImg/boardPosition.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "centerMap",
  data() {
    return {
      loading: true,
      centerNone: {
        latitude: 29.553663,
        longitude: 114.065558
      },
      // 地图
      mapView: "",
      // 信息提示框
      mapInfoWindow: "",
      allChar: "",

      imgCharList: [],
      picList: [],
      cabinetDistributionData: [], //电柜分布数据
      shopBusinessDistributionData: [] //服务网点分布数据
    };
  },
  mounted() {
    this.$Event.$on("getMaterialCenterMap", res => {
      if (res) {
        let cabinetDistributionData = res.cabinetDistributionData;
        let shopBusinessDistributionData = res.shopBusinessDistributionData;
        if (this.mapView) {
          this.mapView = null;
        }
        this.initMap(cabinetDistributionData, shopBusinessDistributionData);
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getMaterialCenterMap"); //销毁
  },
  methods: {
    initMap(cabinetDistributionData, shopBusinessDistributionData) {
      var myLatlng;
      // 确定中心点
      myLatlng = new qq.maps.LatLng(
        this.centerNone.latitude,
        this.centerNone.longitude
      );
      // 地图实例
      this.mapView = new qq.maps.Map(
        document.getElementById("material_centermap"),
        {
          center: myLatlng,
          zoom: 4,
          mapStyleId: "style1",
          disableDefaultUI: true
        }
      );
      // 创建信息提示窗
      this.mapInfoWindow = new qq.maps.InfoWindow({
        map: this.mapView
      });

      // 遍历门店
      shopBusinessDistributionData.map((item, index) => {
        let anchor = new qq.maps.Point(32, 32),
          markerImg =
            "http://ceshi.wondware.com/powerlongbkImg/new_icon_store@2x.png",
          size = new qq.maps.Size(64 * 0.6, 64 * 0.6),
          origin = new qq.maps.Point(0, 0),
          scaleSize = new qq.maps.Size(64 * 0.3, 64 * 0.3),
          markerIcon = new qq.maps.MarkerImage(
            markerImg,
            size,
            origin,
            anchor,
            scaleSize
          );
        let marker1 = new qq.maps.Marker({
          position: new qq.maps.LatLng(item.latitude, item.longitude),
          map: this.mapView,
          data: item
        });

        marker1.setIcon(markerIcon);
        // 监听缩放
        qq.maps.event.addListener(this.mapView, "zoom_changed", function(e) {
          marker1.setIcon(null);
          let currZoom = e.target.zoom;
          if (currZoom >= 16) {
            size = new qq.maps.Size(64, 64);
            scaleSize = new qq.maps.Size(64 * 0.6, 64 * 0.6);
          } else if (13 <= currZoom && currZoom < 16) {
            scaleSize = new qq.maps.Size(64 * 0.5, 64 * 0.5);
          } else if (11 <= currZoom && currZoom < 13) {
            scaleSize = new qq.maps.Size(64 * 0.4, 64 * 0.4);
          } else if (7 <= currZoom && currZoom < 11) {
            scaleSize = new qq.maps.Size(64 * 0.3, 64 * 0.3);
          } else if (currZoom < 7) {
            scaleSize = new qq.maps.Size(64 * 0.3, 64 * 0.3);
          }
          markerIcon = new qq.maps.MarkerImage(
            markerImg,
            size,
            origin,
            anchor,
            scaleSize
          );
          marker1.setIcon(markerIcon);
        });
        // 监听点击
        qq.maps.event.addListener(marker1, "click", async e => {
          await this.createInfoWindowContent2(e.target.data);
          this.mapInfoWindow.open();
          this.mapInfoWindow.setPosition(marker1);
          this.mapInfoWindow.setContent(this.allChar);
        });
        // 窗口关闭监听
        qq.maps.event.addListener(this.mapInfoWindow, "closeclick", function() {
          this.allChar ? (this.allChar = "") : "";
        });
      });

      // 遍历机柜
      cabinetDistributionData.map((item, index) => {
        // 地图机柜标注
        let anchor = new qq.maps.Point(32, 32),
          size = new qq.maps.Size(64 * 0.6, 64 * 0.6),
          origin = new qq.maps.Point(0, 0),
          scaleSize = new qq.maps.Size(64 * 0.3, 64 * 0.3);

        let markerImg;
        if (item.line == 1) {
          if (item.exchangeNum == 0) {
            markerImg =
              "http://ceshi.wondware.com/powerlongbkImg/new_icon_hdc0@2x.png";
          } else if (item.exchangeNum == 1) {
            markerImg =
              "http://ceshi.wondware.com/powerlongbkImg/new_icon_hdc1@2x.png";
          } else if (item.exchangeNum == 2) {
            markerImg =
              "http://ceshi.wondware.com/powerlongbkImg/new_icon_hdc2@2x.png";
          } else if (item.exchangeNum == 3) {
            markerImg =
              "http://ceshi.wondware.com/powerlongbkImg/new_icon_hdc3@2x.png";
          }
        } else if (item.line == 0) {
          markerImg =
            "http://ceshi.wondware.com/powerlongbkImg/new_icon_hdclx@2x.png";
        }
        let markerIcon = new qq.maps.MarkerImage(
          markerImg,
          size,
          origin,
          anchor,
          scaleSize
        );

        let marker2 = new qq.maps.Marker({
          position: new qq.maps.LatLng(item.latitude, item.longitude),
          map: this.mapView,
          data: item
        });

        marker2.setIcon(markerIcon);
        // 监听缩放
        qq.maps.event.addListener(this.mapView, "zoom_changed", function(e) {
          marker2.setIcon(null);
          let currZoom = e.target.zoom;
          if (currZoom >= 16) {
            size = new qq.maps.Size(64, 64);
            scaleSize = new qq.maps.Size(64 * 0.6, 64 * 0.6);
          } else if (13 <= currZoom && currZoom < 16) {
            scaleSize = new qq.maps.Size(64 * 0.5, 64 * 0.5);
          } else if (11 <= currZoom && currZoom < 13) {
            scaleSize = new qq.maps.Size(64 * 0.4, 64 * 0.4);
          } else if (7 <= currZoom && currZoom < 11) {
            scaleSize = new qq.maps.Size(64 * 0.3, 64 * 0.3);
          } else if (currZoom < 7) {
            scaleSize = new qq.maps.Size(64 * 0.3, 64 * 0.3);
          }
          markerIcon = new qq.maps.MarkerImage(
            markerImg,
            size,
            origin,
            anchor,
            scaleSize
          );
          marker2.setIcon(markerIcon);
        });
        // 监听点击
        qq.maps.event.addListener(marker2, "click", async e => {
          await this.createInfoWindowContent(e.target.data);
          this.mapInfoWindow.open();
          this.mapInfoWindow.setPosition(marker2);
          this.mapInfoWindow.setContent(this.allChar);
        });
        // 窗口关闭监听
        qq.maps.event.addListener(this.mapInfoWindow, "closeclick", function() {
          this.allChar ? (this.allChar = "") : "";
        });
      });
    },

    async createInfoWindowContent(temp) {
      let [err, res] = await this.api_get(
        "suppliesMonitorController/select/getCabinetInfoById",
        {
          cabinetId: temp.id
        }
      );
      if (err != null) {
        return false;
      }
      let item = res.data.data;
      let that = this;
      that.picList = [];
      let picObj = item.nearbyPicUrl;
      if (picObj) {
        if (picObj.indexOf(",") != -1) {
          that.picList = picObj.split(",");
        } else {
          that.picList.push(picObj);
        }
      } else {
        that.picList = [];
      }

      that.imgCharList = "";
      if (that.picList.length > 0) {
        that.picList.forEach(item => {
          that.imgCharList =
            that.imgCharList +
            "<img src=" +
            item +
            ' style="height:120px;margin-right:10px;">';
        });
      } else {
        that.imgCharList = "<span></span>";
      }

      let imgAddr = "http://ceshi.wondware.com/powerlongbkImg/position_ban.png";
      that.allChar = `<div class="infoCont">
                <div class="title"><span>${item.name}</span></div>
      <div class="addrCont"><span> ID:  ${item.deviceId}</span> </div>
        <div class="addrCont"><img src=${imgAddr} /><span>${
        item.address
      }</span> </div>
      <div class="imageCont" style="display:flex;">${that.imgCharList} </div>
                   <div class="itemCont">
                   <div class="wrap">
                   <span>可用充电口：</span>
                   <span>${item.chargeNum} 个</span>
                   </div>
                    <div class="wrap">
                    <span>可换电池量：</span>
                    <span>${item.exchangeNum} 个</span>
                   </div>
                   </div>
            <div class="itemCont">
                   <div class="wrap">
                   <span>在线状态：</span>
                   <span style="color:${
                     item.line == 1 ? "#66FAFF;" : "#FF411B;"
                   }"> ${item.line == 0 ? "离线" : "在线"}</span>
                   </div>
                    <div class="wrap">
                   <span>启用状态：</span>
                   <span style="color:${
                     item.status == 0 ? "#66FAFF;" : "#FF411B;"
                   }">${item.status == 1 ? "禁用" : "启用"}</span>
                   </div>
                   </div>
                    <div class="itemCont">
                   
                   </div>
                    <div class="itemCont">
                  
                   </div>
            </div>`;
      return new Promise((res, rej) => {
        res(that.allChar);
      });
    },

    async createInfoWindowContent2(temp) {
      let [err, res] = await this.api_get(
        "suppliesMonitorController/select/getShopBusinessInfoById",
        {
          shopBusinessId: temp.id
        }
      );
      if (err != null) {
        return false;
      }
      let item = res.data.data;
      let that = this;
      let imgList = "";
      if (item.businessPicUrl) {
        item.businessPicUrl.split(",").map(img => {
          imgList += `<img  style="width:50%;height:120px;" src=${img}>`;
        });
      }
      let imgAddr = "http://ceshi.wondware.com/powerlongbkImg/position_ban.png";
      that.allChar = that.allChar = `<div class="infoCont">    
                        <div class="title"><span>${
                          item.busName
                        }</span><span></span></div> 
                        <div class="addrCont"><img src=${imgAddr} /><span>${
        item.busAddress
      }</span> </div>
                        <div style="width:100%;margin-top:20px;display:flex;margin-bottom:20px;margin-left:10px;">${imgList}</div>
                        <div style="display:flex;flex-wrap: wrap;width:100%;margin-left:10px;">
                          <div class="wrap" style="width:40%;margin-bottom:10px;display: flex;">
                              <span style="opacity: 0.8;min-width: 60px;">电池租还：</span>
                              <span>${
                                item.isServerBattery == 1 ? "支持" : "不支持"
                              }</span>
                            </div>
                            <div class="wrap"  style="width:40%;margin-bottom:10px;display: flex;">
                              <span style="opacity: 0.8;min-width: 60px;">负责人：</span>
                              <span>${item.busContactName}</span>
                            </div>
                            <div class="wrap"  style="width:40%;margin-bottom:10px;display: flex;">
                              <span style="opacity: 0.8;min-width: 60px;">售后服务：</span>
                              <span>${
                                item.isServerSale ? "支持" : "不支持"
                              }</span>
                            </div>
                            <div class="wrap"  style="width:40%;margin-bottom:10px;display: flex;">
                              <span style="opacity: 0.8;min-width: 60px;">联系电话：</span>
                              <span>${item.busMobile}</span>
                            </div>
                            <div class="wrap"  style="width:40%;margin-bottom:10px;display: flex;">
                              <span style="opacity: 0.8;min-width: 60px;">车辆出售：</span>
                              <span>${
                                item.isServeVehicle ? "支持" : "不支持"
                              }</span>
                            </div>
                            <div class="wrap"  style="width:40%;margin-bottom:10px;display: flex;">
                              <span style="opacity: 0.8;min-width: 60px;">营业时间：</span>
                              <span>${item.serviceTime}</span>
                            </div>
                        </div>
                          
                        </div>
                      </div>`;
      return new Promise((res, rej) => {
        res(that.allChar);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.positionIcon {
  position: absolute;
  right: 24px;
  bottom: 24px;
  z-index: 10000000;
  // width: 82px;
  // height: 82px;
  width: 72px;
  height: 72px;
  // background: #ffbb32;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
