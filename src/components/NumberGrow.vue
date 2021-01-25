<template>
  <div class="box">
    <div class="box-item">
      <div class="numberItem" ref="numberItem"><span>0123456789</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datanum: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.changeNum(this.datanum);
  },
  data() {
    return {};
  },
  methods: {
    changeNum(val) {
      const numberItems = this.$refs.numberItem;
      numberItems.style.transform = `translate(-50%, -${this.datanum * 10}%)`;
    },
  },
  watch: {
    datanum(val, oldVal) {
      if (val != oldVal) {
        console.log("val", val);
        this.changeNum(val);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-item {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 20px;
  margin: 0;
  writing-mode: vertical-lr;
  text-orientation: upright;
  overflow: hidden;
  .numberItem {
    position: absolute;
    top: 20%;
    left: 50%;
    font-size: 32px;
    transform: translate(-50%, -50%);
    transition: transform 1.5s ease-in-out;
    letter-spacing: 48px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
</style>
