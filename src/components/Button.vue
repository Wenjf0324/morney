<template>
  <button class="button" @click="$emit('click', $event)"><slot /></button>
  <!-- @click="$emit('click', $event)" 表示小button被点击了就触发大Button的点击事件 -->
</template>

<script lang="ts">
import Vue from "vue";

export default class Button extends Vue {}
</script>

<style scoped>
.button {
  background: #767676;
  color: #fff;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
}
</style>
