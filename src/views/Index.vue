<template>
  <div id="data_view">
    <div class="header" :style="
        selectedBar == 'material'
          ? `background-image:url(${header_1})`
          : selectedBar == 'business'
          ? `background-image:url(${header_2})`
          : `background-image:url(${header_3})`
      ">
      <div class="left">
        <img class="logo" :src="logoio" alt="" />
        <div class="selectItem" v-if="operatorList.length > 0">
          <el-select @change="changeStoreCurr" v-model="storeCurr" placeholder="请选择">
            <el-option v-for="item in operatorList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="center">
        <div class="log_text">
          运营数据中心
        </div>
        <div class="sub_bottom_img">
          <div class="bottom_q" v-if="selectedBar == 'material'"></div>
          <div class="bottom_q" v-else @click="selectBorder('material')"></div>
          <div class="bottom_q" v-if="selectedBar == 'business'"></div>
          <div class="bottom_q" v-else @click="selectBorder('business')"></div>
          <div class="bottom_q" v-if="selectedBar == 'alarm'"></div>
          <div class="bottom_q" v-else @click="selectBorder('alarm')"></div>
        </div>
      </div>

      <div class="right">
        <img @click="changeAutoFlag('auto_on')" v-if="autoFlag == 'auto_on'" class="autoicon"
          src="../assets/img/icon_banner_auto01@2x .png" alt="关闭轮播" title="关闭轮播" />
        <img @click="changeAutoFlag('auto_off')" v-else-if="autoFlag == 'auto_off'" class="autoicon"
          src="../assets/img/icon_banner_auto02@2x .png" alt="开启轮播" title="开启轮播" />
        <img class="icon_time" src="../assets/img/icon_time@2x.png" alt="" />
        <div class="text">
          {{ nowTime }}
        </div>
      </div>
    </div>
    <!-- 物资监控 -->
    <MaterialMonitoring class="bodyMonitoring animated bounceInDown" v-if="selectedBar == 'material'" />
    <BusinessMonitoring class="bodyMonitoring" v-if="selectedBar == 'business'" />
    <AlarmMonitoring class="bodyMonitoring" v-if="selectedBar == 'alarm'" />
  </div>
</template>

<script>
  import MaterialMonitoring from "./material/MaterialMonitoring";
  import BusinessMonitoring from "./business/BusinessMonitoring";
  import AlarmMonitoring from "./alarm/AlarmMonitoring";
  const header1 = require("../assets/img/navbar01@2x.png");
  const header2 = require("../assets/img/navbar02@2x.png");
  const header3 = require("../assets/img/navbar03@2x.png");
  export default {
    data() {
      return {
        storeCurr: 1,
        selectedBar: "material",
        barArr: ["material", "business", "alarm"],
        nowTime: "",
        autoFlag: "auto_off",
        organId: "",
        operatorList: [],
        storeList: [],
        header_1: header1,
        header_2: header2,
        header_3: header3,
        logoio: ""
      };
    },
    components: {
      MaterialMonitoring,
      BusinessMonitoring,
      AlarmMonitoring,
    },
    mounted() {
      if (this.$global.timer_secons) {
        clearInterval(this.$global.timer_secons);
      }
      // 设置时钟
      this.$global.timer_secons = setInterval(() => {
        this.getNowTime();
      }, 1000);
      // 判断是否登录
      let loginInfo = sessionStorage.getItem("loginInfo");
      if (!loginInfo) {
        window.location.href =
          window.location.origin + "/powerlongback/dashboardbusiness/?#/signin";
      } else {
        this.logoio = JSON.parse(sessionStorage.getItem("loginInfo")).photoUrl;
        //动态设置标题log
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = JSON.parse(sessionStorage.getItem("loginInfo")).photoIcoUrl;
        document.getElementsByTagName('head')[0].appendChild(link);


        this.organId = JSON.parse(loginInfo).organId;
        if (this.organId == 1) {
          // 如果是超级管理员
          // 获取运营商下拉框
          this.getAllOperator();
        } else {
          // 如果是普通运营商
          this.storeCurr = this.organId;
          this.getData();
          this.getMaterialDataCabinetMap();
        }
        let autoFlag = sessionStorage.getItem("autoFlag");
        if (autoFlag) {
          this.autoFlag = autoFlag;
          if (this.autoFlag == "auto_on") {
            this.loopViews();
          }
        } else {
          this.autoFlag = "auto_off";
        }

        // 全局定时
        if (this.$global.timer_single) {
          clearInterval(this.$global.timer_single);
        }
        setInterval(() => {
          this.getData();
        }, this.$global.timer_single_secons);
      }
    },
    methods: {
      async getAllOperator() {
        let [err, res] = await this.api_post("index/getAllOperator");
        if (err != null) {
          return false;
        }
        this.operatorList = res.data.data;
        if (this.operatorList) {
          // 说明是超级管理员
          this.operatorList.unshift({
            id: "1",
            name: "全部",
          });
          this.storeCurr = this.operatorList[0].id;
          this.getData();
          this.getMaterialDataCabinetMap();
        }
      },
      // 切换运营商
      changeStoreCurr(val) {
        this.storeCurr = val;
        this.getData();
        if (this.selectedBar == "material") {
          this.getMaterialDataCabinetMap();
        }
      },

      //监控轮播切换
      loopViews() {
        if (this.$global.timer_views) {
          clearInterval(this.$global.timer_views);
        }
        let loop_index = 0;
        this.$global.timer_views = setInterval(() => {
          this.selectedBar = this.barArr[loop_index];
          this.getData();
          if (this.selectedBar == "material") {
            this.getMaterialDataCabinetMap();
          }

          loop_index++;
          if (loop_index >= 3) {
            loop_index = 0;
          }
        }, this.$global.timer_views_secons);
      },

      // 获取数据
      getData() {
        let selectedBar = this.selectedBar;
        switch (selectedBar) {
          case "material":
            this.getMaterialData();
            this.getMaterialDataRightTop();
            this.getMaterialLeftBottom();
            this.getMaterialRightBottom();
            break;
          case "business":
            this.getBusinessData();
            break;
          case "alarm":
            this.getAlarmData();
            break;

          default:
            break;
        }
      },
      changeAutoFlag(str) {
        if (str == "auto_on") {
          this.autoFlag = "auto_off";
          sessionStorage.setItem("autoFlag", "auto_off");
          clearInterval(this.$global.timer_views);
        } else if (str == "auto_off") {
          this.autoFlag = "auto_on";
          sessionStorage.setItem("autoFlag", "auto_on");
          this.loopViews();
        }
      },

      // 获取业务监控数据
      getBusinessData() {
        // 中上
        this.getBusinessCenterTop();
        // 左上
        this.getBusinessLeftTop();
        // 左下
        this.getBusinessLeftBottom();
        // // 下左
        this.getBusinessBottomLeft();
        // // 下右
        this.getBusinessBottomRight();
        // // 右上
        this.getBusinessRightTop();
        // // 右中
        this.getBusinessRightCenter();
        // // 右下
        this.getBusinessRightBottom();
        this.sleep(100).then(() => {
          // 业务热力图
          this.getbusinessHotData();
        });
      },
      // 获取告警监控数据
      getAlarmData() {
        // 上左
        this.getAlarmLeftTop();
        // 上中
        this.getAlarmTopCenter();
        // 上右上
        this.getAlarmTopRightTop();
        // 上右下(7日电柜告警)
        this.getAlarmTopRightBottomCabinet();
        // 上右下(7日电池告警)
        this.getAlarmTopRightBottomBattery();
        // // 下左
        this.getAlarmBottomLeft();
        // // 下中
        this.getAlarmBottomCenter();
        // // 下右
        // this.getAlarmBottomRight();
        this.sleep(100).then(() => {
          // 告警热力图
          this.getalarmHotData();
        });
      },
      sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      },

      // 告警热力图
      getalarmHotData() {
        this.$Event.$emit("getalarmHotData", this.storeCurr);
      },
      // 业务热力图
      getbusinessHotData() {
        this.$Event.$emit("getbusinessHotData", this.storeCurr);
      },

      // 物资左下排行
      async getMaterialLeftBottom() {
        let [err, res] = await this.api_post(
          "suppliesMonitorController/select/getVehicleSaleRank", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getMaterialLeftBottom", res.data.data);
      },
      // 物资右下排行
      async getMaterialRightBottom() {
        let [err, res] = await this.api_post(
          "suppliesMonitorController/select/getNewUsersInStoreRank", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getMaterialRightBottom", res.data.data);
      },

      // 机柜地图接口
      async getMaterialDataCabinetMap() {
        let [err, res] = await this.api_post(
          "suppliesMonitorController/select/getMaterialStatisticMapData", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getMaterialCenterMap", res.data.data);
      },

      // 物资监控函数
      async getMaterialData() {
        let [err, res] = await this.api_post(
          "suppliesMonitorController/select/getMaterialStatisticData", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }

        this.$Event.$emit("getMaterialLeftTop", res.data.data);
        this.$Event.$emit("getMaterialCenterTop", res.data.data);
      },
      // 物资监控-右上函数
      async getMaterialDataRightTop() {
        let [err, res] = await this.api_post(
          "/suppliesMonitorController/select/getBatteryTypeProportion", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getMaterialRightTop1", res.data.data);
        this.$Event.$emit("getMaterialRightTop2", res.data.data);
      },

      //告警监控函数
      async getAlarmLeftTop() {
        let [err, res] = await this.api_post(
          "warningMonitoring/select/selectRealTimeAlarmWarning", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getAlarmLeftTop", res.data.data);
      },
      async getAlarmTopCenter() {
        let [err, res] = await this.api_post(
          "warningMonitoring/select/selectAlarmMonitoring", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getAlarmTopCenter", res.data.data);
      },
      async getAlarmTopRightTop() {
        let [err, res] = await this.api_post(
          "warningMonitoring/select/selectAlarmTrendLineChart", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getAlarmTopRightTop", res.data.data);
      },
      async getAlarmTopRightBottomCabinet() {
        let [err, res] = await this.api_post(
          "warningMonitoring/select/selectAlarmCabinetTop", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getAlarmTopRightBottomCabinet", res.data.data);
      },
      async getAlarmTopRightBottomBattery() {
        let [err, res] = await this.api_post(
          "warningMonitoring/select/selectAlarmBatteryTop", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getAlarmTopRightBottomBattery", res.data.data);
      },
      async getAlarmBottomLeft() {
        let [err, res] = await this.api_post(
          "warningMonitoring/select/selectAlarmCabuinetPieChart", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getAlarmBottomLeft", res.data.data);
      },
      async getAlarmBottomCenter() {
        let [err, res] = await this.api_post(
          "warningMonitoring/select/selectAlarmBatteryPieChart", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getAlarmBottomCenter", res.data.data);
      },

      // 业务监控函数
      async getBusinessCenterTop() {
        let [err, res] = await this.api_post(
          "performanceMonitoring/select/selectCumulativeQuantity", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getBusinessCenterTop", res.data.data);
      },

      async getBusinessLeftTop() {
        let [err, res] = await this.api_post(
          "performanceMonitoring/select/selectUserStatisticsProfession", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getBusinessLeftTop", res.data.data);
      },
      async getBusinessLeftBottom() {
        let [err, res] = await this.api_post(
          "performanceMonitoring/select/selectPackageNumber", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getBusinessLeftBottom", res.data.data);
      },
      async getBusinessBottomLeft() {
        let [err, res] = await this.api_post(
          "performanceMonitoring/select/selectEarningsPieChart", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getBusinessBottomLeft", res.data.data);
      },
      async getBusinessBottomRight() {},
      async getBusinessRightTop() {
        let [err, res] = await this.api_post(
          "performanceMonitoring/select/selectTodayPurgingOrderLineChart", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getBusinessRightTop", res.data.data);
      },
      async getBusinessRightCenter() {
        let [err, res] = await this.api_post(
          "performanceMonitoring/select/selectUserGrowthLineChart", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getBusinessRightCenter", res.data.data);
      },
      async getBusinessRightBottom() {
        let [err, res] = await this.api_post(
          "performanceMonitoring/select/selectActiveUserLoginLineChart", {
            organizationId: this.storeCurr,
          }
        );
        if (err != null) {
          return false;
        }
        this.$Event.$emit("getBusinessRightBottom", res.data.data);
      },

      selectBorder(str) {
        this.selectedBar = str;
        this.getData();
        if (this.selectedBar == "material") {
          this.getMaterialDataCabinetMap();
        }
      },
      getNowTime() {
        var date = new Date();
        var mytime = date.toLocaleString("chinese", {
          hour12: false
        });
        var week = date.getDay();
        this.nowTime = mytime + "  " + this.checkWeek(week);
      },
      checkWeek(week) {
        switch (week) {
          case 0:
            return "星期天";

            break;
          case 1:
            return "星期一";

            break;
          case 2:
            return "星期二";

            break;
          case 3:
            return "星期三";

            break;
          case 4:
            return "星期四";

            break;
          case 5:
            return "星期五";

            break;
          case 6:
            return "星期六";

            break;

          default:
            break;
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  #data_view {
    width: 100%;
    height: 100vh;

    .header {
      position: relative;
      width: 100%;
      height: 115px;

      background-size: 100% 100%;
      margin-bottom: 10px;
      background-repeat: no-repeat;
      display: flex;
      align-items: flex-start;

      .left {
        width: 650px;
        height: 93px;
        display: flex;
        align-items: center;
        margin-left: 24px;

        .logo {
          width: 130px;
        }

        .selectItem {
          margin-left: 40px;
          width: 300px;
          height: 40px;

          .el-input__inner {
            text-align: center;
          }
        }

        .checksbar {
          width: 172px;
          margin-left: 40px;
          height: 40px;
          border: 1px solid #ffbb32;
          border-radius: 6px;
          display: flex;
          justify-content: flex-start;

          .left {
            width: 50%;
            margin-left: 3px;
            height: 98%;
            background-color: #000;
            color: #ffbb32;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 14px;
          }

          .right2 {
            width: 50%;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            height: 99%;
            background-color: #ffbb32;
            color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 14px;
          }
        }
      }

      .center {
        width: 590px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;

        .log_text {
          width: 100%;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: #1a6eff;
          font-weight: bold;
        }

        .sub_bottom_img {
          width: 96%;
          display: flex;
          padding-bottom: 5px;

          .bottom_q {
            width: 33%;
            height: 38px;
            position: relative;
            cursor: pointer;

            img {
              width: 100%;
              height: 100%;
            }

            .text {
              width: 100%;
              font-size: 15px;
              text-align: center;
              position: absolute;
              font-weight: bold;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: white;
            }
          }
        }
      }

      .right {
        position: absolute;
        top: 40%;
        right: 32px;
        transform: translate(0%, -50%);
        display: flex;
        align-items: center;

        .autoicon {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: -50px;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }

        .icon_time {
          width: 230px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text {
          position: absolute;
          color: white;
          font-size: 12px;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
          width: 100%;
          text-align: center;
        }
      }

      @media screen and (max-width: 1400px) {
        .right {
          .icon_time {
            width: 300px;
            height: 45px;
          }
        }
      }

      @media screen and (max-width: 1200px) {
        .right {
          .icon_time {
            width: 350px;
            height: 50px;
          }
        }
      }

      @media screen and (max-width: 1050px) {
        .right {
          .icon_time {
            width: 380px;
            height: 55px;
          }
        }
      }
    }
  }

  // .bodyMonitoring.fade-enter-active {
  //   transition: all 0.7s linear;
  //   opacity: 1;
  // }
  // .bodyMonitoring.fade-leave-active {
  //   transition: all 0.7s linear;
  // }
  // .bodyMonitoring.fade-enter,
  // .bodyMonitoring.fade-leave-active {
  //   opacity: 0.2;
  // }
</style>