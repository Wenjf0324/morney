<template>
  <div class="labels">
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="$router.replace('/money')" />
      <span class="title">支出分类</span>
    </div>
    <div class="tags">
      <router-link
        class="tag"
        :to="`/labels/edit/${tag.id}`"
        v-for="tag in tags"
        :key="tag.id"
      >
        <div class="label">
          <div class="icon-wrapper">
            <Icon :name="tag.icon" />
          </div>

          <span>{{ tag.name }}</span>
        </div>

        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag" @click="$router.replace('/labels/add')">
      + 添加分类
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
import Button from "../components/Button.vue";
import { TagHelper } from "../mixins/TagHelper";

@Component({
  components: { Button },
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.labels {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: $color-main;
  color: #fff;
  position: relative;
  > .leftIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.tags {
  background: white;
  font-size: 16px;
  padding: 0 0 6px 16px;
  flex: 1;
  overflow: auto;
  z-index: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  > .tag {
    padding: 8px 0;
    font-size: 13px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    &:last-child {
      border-bottom: none;
    }
    > .label {
      display: flex;
      align-items: center;
      .icon-wrapper {
        width: 35px;
        height: 35px;
        background: #f5f5f5;
        border-radius: 50%;
        display: inline-block;
        margin-right: 12px;
        position: relative;
        .icon {
          width: 24px;
          height: 24px;
          color: #333;
          margin-right: 8px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  @extend %outerShadow;
  background: #f0f0f0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  z-index: 1;
}
</style>
