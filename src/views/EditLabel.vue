<template>
  <Layout>
    编辑标签
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel";

@Component
export default class EditLabel extends Vue {
  created() {
    //获取标签的id
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0]; //filter返回一个数组
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404"); //replace 页面可以回退
    }
  }
}
</script>

<style scoped></style>
