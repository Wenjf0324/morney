<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove" class="delete">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear" class="empty">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">ok</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent" class="point">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  output = "0";

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement; //强制将target指定为按钮，按钮一定会有内容
    const input = button.textContent!; //input不为空
    //长度为16位
    if (this.output.length === 16) {
      return;
    }
    //如果输入 0
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    //只能有一个小数点
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = "0";
  }

  ok() {
    const number = parseFloat(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 24px;
    font-family: Consolas, monospace;
    background: #fff;
    padding: 6px 16px;
    text-align: right;
  }
  .buttons {
    background: #f2f3f5;
    @extend %clearFix; //继承%clearFix,复制的是选择器 .buttons
    > button {
      $h: 56px;
      width: 25%;
      height: $h;
      float: left;
      background: transparent;
      border: none;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      &.ok {
        height: $h * 2;
        float: right;
        background: $color-main;
        border-right: none;
        border-bottom: none;
      }
      &.zero {
        width: 25 * 2%;
      }
      &.delete,
      &.empty {
        font-size: 14px;
        border-right: none;
      }
      &.zero,
      &.point {
        border-bottom: none;
      }
      // $bg: #fdf6e4;
      // &:nth-child(1) {
      //   background: $bg;
      // }
      // &:nth-child(2),
      // &:nth-child(5) {
      //   background: darken($bg, 2%);
      // }
      // &:nth-child(3),
      // &:nth-child(6),
      // &:nth-child(9) {
      //   background: darken($bg, 2 * 2%);
      // }
      // &:nth-child(4),
      // &:nth-child(7),
      // &:nth-child(10) {
      //   background: darken($bg, 2 * 3%);
      // }
      // &:nth-child(8),
      // &:nth-child(11),
      // &:nth-child(13) {
      //   background: darken($bg, 2 * 4%);
      // }
      // &:nth-child(14) {
      //   background: darken($bg, 2 * 5%);
      // }
      // &:nth-child(12) {
      //   background: $color-main;
      //   // background: $color-main;
      // }
    }
  }
}
</style>
