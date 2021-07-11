<template>
  <Layout>
    <div class="navBar">
      <!-- <Icon class="leftIcon" name="left" @click="$router.replace('/money')" /> -->
      <span class="title">支出类别</span>
      <span class="add" @click="$router.replace('/labels/add')">+ 添加</span>
    </div>
    <div class="tags">
      <div class="tag" v-for="tag in tags" :key="tag.id">
        <!-- :to="`/labels/edit/${tag.id}`" -->
        <div class="label">
          <div class="icon-wrapper">
            <Icon :name="tag.icon" />
          </div>

          <span>{{ tag.name }}</span>
        </div>

        <Icon name="delete" @click="remove(tag.id)" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "../components/Button.vue";

@Component({
  components: { Button },
})
export default class Labels extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTags");
  }
  remove(id: string) {
    this.$store.commit("removeTag", id);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: $color-main;
  color: #fff;
  position: relative;
  > .add {
    display: block;
    position: absolute;
    top: 50%;
    right: 16px;
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
      color: rgba(255, 0, 0, 0.6);
      margin-right: 16px;
    }
  }
}
</style>
