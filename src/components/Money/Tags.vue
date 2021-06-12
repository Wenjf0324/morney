<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)">
        <div
          class="tag-icon"
          :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        >
          <Icon :name="tag.icon" />
        </div>
        <div class="tag-name">{{ tag.name }}</div>
      </li>

      <li id="last" class="new" @click="createTag">
        <div class="tag-icon"><Icon name="new" /></div>
        <div class="tag-name">新增</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TagHelper } from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit("fetchTags");
  }

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
    this.$emit("update:value", this.selectedTags); //通知外部
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 14px;
  background: #fff;
  padding: 0 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  > .current {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 24%;
      font-size: 13px;
      text-align: center;
      margin-top: 16px;
      &:not(:nth-child(4n)) {
        margin-right: calc(4% / 3);
      }
      > .tag-icon {
        $ts: 45px;
        width: $ts;
        height: $ts;
        border-radius: 50%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        background: #f5f5f5;
        &.selected {
          background: $color-main;
          color: #fff;
        }
        .icon {
          $is: 35px;
          width: $is;
          height: $is;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      > .tag-name {
        padding-top: 6px;
      }
    }
  }
  // > .new {
  //   padding-top: 16px;
  //   button {
  //     background: transparent;
  //     border: none;
  //     color: #999;
  //     border-bottom: 1px solid;
  //     padding: 0 4px;
  //   }
  // }
}
</style>
