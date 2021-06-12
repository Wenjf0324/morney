<template>
  <nav>
    <router-link to="/account" class="item" active-class="selected">
      <Icon name="account" />
      账单
    </router-link>

    <router-link to="/money" class="item">
      <Icon name="add" class="add" />
      <span>记账</span>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  font-size: 12px;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &:nth-child(2) {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      &::after {
        content: "";
        display: block;
        width: 40px;
        height: 40px;
        background: #fff;
        position: absolute;
        top: 6px;
        border-radius: 50%;
      }
    }
    .icon {
      width: 24px;
      height: 24px;
      &.add {
        color: $color-main;
        width: 48px;
        height: 48px;
        z-index: 1;
      }
    }
  }
  > .item.selected {
    color: $color-main;
  }
}
</style>
