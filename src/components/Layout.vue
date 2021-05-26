<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1; //将剩余空间尽量分配给content容器，实现导航栏始终在底部
}
</style>
