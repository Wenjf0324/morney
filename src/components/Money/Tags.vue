<template>
  <div class="tags">
    <ul class="current" v-if="type === '-'">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)">
        <div
          class="tag-icon"
          :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        >
          <Icon :name="tag.icon" />
        </div>
        <div class="tag-name">{{ tag.name }}</div>
      </li>

      <li id="last" class="new" @click="$router.replace('/labels')">
        <div class="tag-icon"><Icon name="edit" /></div>
        <div class="tag-name">管理</div>
      </li>
    </ul>

    <ul class="current" v-if="type === '+'">
      <li
        v-for="(tag, index) in incomeTagList"
        :key="index"
        @click="toggle(tag)"
      >
        <div
          class="tag-icon"
          :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        >
          <Icon :name="tag.icon" />
        </div>
        <div class="tag-name">{{ tag.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import incomeTags from "@/constants/incomeTags";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  selectedTags: string[] = [];

  @Prop(String) type!: string;

  get tagList() {
    return this.$store.state.tagList;
  }

  get incomeTagList() {
    return incomeTags;
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
      this.selectedTags = [];
      //选中
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags[0]); //通知外部
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  overflow: hidden;
  background: #fff;
  padding: 0 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  > .current {
    padding-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    > li {
      width: 24%;
      font-size: 13px;
      text-align: center;
      margin-top: 16px;
      &:not(:nth-child(4n)) {
        margin-right: calc(4% / 3);
      }
      > .tag-icon {
        width: 45px;
        height: 45px;
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
          width: 30px;
          height: 30px;
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
}
</style>
