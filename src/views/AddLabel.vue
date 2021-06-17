<template>
  <div class="addLabel">
    <div class="navBar">
      <span @click="$router.replace('/labels')">取消</span>
      <span class="title">添加分类</span>
      <span @click="createTag">保存</span>
    </div>

    <label class="formItem">
      <div class="icon-wrapper">
        <Icon :name="selectedIcon" />
      </div>
      <input v-model="value" type="text" placeholder="请输入分类名称" />
    </label>

    <div class="labels">
      <div v-for="(labelItem, index) in labelList" :key="index">
        <div class="title">{{ labelItem.title }}</div>
        <ol>
          <li
            v-for="(tag, index) in labelItem.labels"
            :key="index"
            @click="select(tag)"
          >
            <div
              class="icon-wrapper"
              :class="{ selected: selectedIcons.indexOf(tag) >= 0 }"
            >
              <Icon :name="tag" />
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import labelList from "@/constants/labelList";
import { Component } from "vue-property-decorator";
import LabelItem from "@/components/LabelItem.vue";

@Component({
  components: { LabelItem },
})
export default class AddLabel extends Vue {
  value = "";
  selectedIcon = "mifan";
  labelList = labelList;
  selectedIcons: string[] = [labelList[0].labels[0]];

  createTag() {
    if (!this.value) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", {
      name: this.value,
      icon: this.selectedIcon,
    });
    if (this.$store.state.createTagError) {
      window.alert("标签名重复了" || "未知错误");
    } else {
      window.alert("添加成功");
    }
  }

  select(tag: string) {
    this.selectedIcons = [];
    this.selectedIcons.push(tag); //选中
    this.selectedIcon = this.selectedIcons[0];
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.addLabel {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 14px;
  background: #fff;
}
.navBar {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: $color-main;
  color: #fff;
  font-size: 16px;
}
.formItem {
  display: block;
  padding: 10px 0 10px 16px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  .icon-wrapper {
    width: 40px;
    height: 40px;
    background: $color-main;
    border-radius: 50%;
    display: inline-block;
    margin-right: 12px;
    position: relative;
    .icon {
      width: 25px;
      height: 25px;
      color: #fff;
      margin-right: 8px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    &::placeholder {
      color: #999;
    }
  }
}
.labels {
  padding: 16px;
  flex-grow: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
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
}
</style>
