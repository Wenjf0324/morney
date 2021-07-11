<template>
  <div>
    <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
      <!-- :class="value === '-' && 'selected'" -->
      <li
        class="tabs-item"
        v-for="item in dataSource"
        :key="item.value"
        :class="liClass(item)"
        @click="select(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tags extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];

  @Prop(String)
  readonly value!: string; //'!' 不可能是undefined

  @Prop(String)
  classPrefix?: string; // '?' 可能是 undefined , 精确控制类

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs {
  width: 200px;
  font-size: 16px;
  color: #fff;
  background: $color-main;
  border: 1px solid #fff;
  border-radius: 6px;
  display: flex;
  &-item {
    width: 50%;
    text-align: center;
    padding: 4px 0;
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    &.selected {
      background: #fff;
      color: $color-main;
    }
    // &.selected::after {
    //   content: "";
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 4px;
    //   background: #333;
    // }
  }
}
</style>
