<template>
  <div class="LeftTop">
    <div class="item" v-for="(item, index) in cabinetList" :key="index">
      <div class="top">
        {{ item.text }}
      </div>
      <div class="bottom">
        <countTo
          :startVal="0"
          :endVal="isNaN(item.val) ? 0 : Number(item.val)"
          :duration="1000"
        ></countTo>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  data() {
    return {
      cabinetList: [
        {
          uniq: "onlineCabinet",
          text: "在线电柜",
          val: 0,
        },
        {
          uniq: "offlineCabinet",
          text: "离线电柜",
          val: 0,
        },
        {
          uniq: "disableCabinet",
          text: "禁用电柜",
          val: 0,
        },
        {
          uniq: "batteryTotalDelivery",
          text: "电池投放总量",
          val: 0,
        },
        {
          uniq: "numberOfBatteryInCabinet",
          text: "电柜中电池",
          val: 0,
        },
        {
          uniq: "usingBatteryNum",
          text: "使用中电池",
          val: 0,
        },
        {
          uniq: "vehicleDeliveryTotalNum",
          text: "车辆投放总量",
          val: 0,
        },
        {
          uniq: "forSaleVehicle",
          text: "待售车辆",
          val: 0,
        },
      ],
    };
  },
  components: {
    countTo,
  },
  mounted() {
    this.$Event.$on("getMaterialLeftTop", (res) => {
      if (res) {
        this.cabinetList.map((item) => {
          switch (item.uniq) {
            case "onlineCabinet":
              item.val = res.onlineCabinet;
              break;
            case "offlineCabinet":
              item.val = res.offlineCabinet;
              break;
            case "disableCabinet":
              item.val = res.disableCabinet;
              break;
            case "batteryTotalDelivery":
              item.val = res.batteryTotalDelivery;
              break;
            case "numberOfBatteryInCabinet":
              item.val = res.numberOfBatteryInCabinet;
              break;
            case "usingBatteryNum":
              item.val = res.usingBatteryNum;
              break;
            case "vehicleDeliveryTotalNum":
              item.val = res.vehicleDeliveryTotalNum;
              break;
            case "forSaleVehicle":
              item.val = res.forSaleVehicle;
              break;

            default:
              break;
          }
        });
      }
    });
  },
   beforeDestroy() {
    this.$Event.$off("getMaterialLeftTop"); //销毁
  },
};
</script>

<style lang="less" scoped>
.LeftTop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 44%;
    height: 23%;
    margin-bottom: 10px;
    background-color: #1d192e;
    opacity: 1;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-size: 16px;
      color: white;
    }
    .bottom {
      font-size: 24px;
      color: #66faff;
      font-weight: bold;
    }
  }
}
</style>
