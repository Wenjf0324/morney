<template>
  <div>
    <div class="title">{{ title }}</div>
    <ol>
      <li v-for="(tag, index) in labelList" :key="index" @click="toggle(tag)">
        <div
          class="icon-wrapper"
          :class="{ selected: selectedIcon.indexOf(tag) >= 0 }"
        >
          <Icon :name="tag" />
        </div>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class LabelItem extends Vue {
  selectedIcon: string[] = [];

  @Prop(String) title!: string;
  @Prop(Array) labelList!: [];

  toggle(tag: string) {
    this.selectedIcon = [];
    this.selectedIcon.push(tag); //选中
    this.$emit("update:value", this.selectedIcon[0]); //通知外部
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.title {
  text-align: center;
}
ol {
  padding-top: 16px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 19%;
    text-align: center;
    margin-bottom: 32px;
    &:not(:nth-child(5n)) {
      margin-right: calc(5% / 4);
    }
    > .icon-wrapper {
      width: 40px;
      height: 40px;
      background: #f5f5f5;
      border-radius: 50%;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      &.selected {
        background: $color-main;
        color: #fff;
      }
      .icon {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
