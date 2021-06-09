<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TagHelper } from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

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
.tags {
  font-size: 14px;
  background: #fff;
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
