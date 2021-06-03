<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource: string[] | undefined; //只读的属性
  selectedTags: string[] = [];

  //选中或取消 tag
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      //数组中已存在，取消选中
      this.selectedTags.splice(index, 1);
    } else {
      //选中
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }

  //新增标签
  create() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.alert("标签名不能为空");
    } else {
      if (this.dataSource) {
        // this.dataSource.push(name!); //不能改外部数据
        this.$emit("update:dataSource", [...this.dataSource, name]);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: #fff;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
