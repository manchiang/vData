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
      <div class="sub_bottom">
        <div class="sub_text">累计</div>
        <div style="color:#66FAFF;">
          <countTo
            :startVal="0"
            :endVal="isNaN(item.total) ? 0 : Number(item.total)"
            :duration="1000"
          ></countTo>
        </div>
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
          uniq: "userSum",
          text: "今日新增用户",
          val: 0,
          total: 0,
        },
        {
          uniq: "walletUseLogList",
          text: "今日新增付费用户",
          val: 0,
          total: 0,
        },
        {
          uniq: "serveUserNum",
          text: "今日开通服务用户",
          val: 0,
          total: 0,
        },
        {
          uniq: "returnDeposit",
          text: "今日退电用户",
          val: 0,
          total: 0,
        },
        {
          uniq: "userPlanBuy",
          text: "今日套餐购买量",
          val: 0,
          total: 0,
        },
        {
          uniq: "vehiclesSold",
          text: "今日车辆出售量",
          val: 0,
          total: 0,
        },
      ],
    };
  },
  components: {
    countTo,
  },
  mounted() {
    this.$Event.$on("getBusinessLeftTop", (res) => {
      if (res) {
        this.matchUniq(this.cabinetList, res);
      }
    });
  },
  beforeDestroy() {
    this.$Event.$off("getBusinessLeftTop"); //销毁
  },
  methods: {
    matchUniq(cabinetList, res) {
      cabinetList.map((item) => {
        switch (item.uniq) {
          case "userSum":
            item.val = res.userSum;
            item.total = res.userSumAll;
            break;
          case "walletUseLogList":
            item.val = res.walletUseLogList;
            item.total = res.walletUseLogListAll;
            break;
          case "serveUserNum":
            item.val = res.serveUserNum;
            item.total = res.serveUserNumAll;
            break;
          case "returnDeposit":
            item.val = res.returnDeposit;
            item.total = res.returnDepositAll;
            break;
          case "userPlanBuy":
            item.val = res.userPlanBuy;
            item.total = res.userPlanBuyAll;
            break;
          case "vehiclesSold":
            item.val = res.vehiclesSold;
            item.total = res.vehiclesSoldAll;
            break;

          default:
            break;
        }
      });
    },
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
    height: 30%;
    margin-bottom: 10px;
    background-color: #1d192e;
    opacity: 1;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      font-size: 14px;
      color: white;
    }
    .bottom {
      font-size: 24px;
      color: #66faff;
      font-weight: bold;
    }
    .sub_bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      font-size: 14px;
    }
  }
}
</style>
