<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
    <Nav :class="{ hide: hideNav === 'true' }" />
  </div>
</template>

<script lang="ts">
export default {
  props: ["classPrefix", "hideNav"],
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1; //将剩余空间尽量分配给content容器，实现导航栏始终在底部
}
.hide {
  display: none;
}
</style>
