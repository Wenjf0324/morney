<template>
  <Layout class-prefix="layout">
    <Tags />
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Types :value.sync="record.type" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import { RecordItem } from "@/custom";
import store from "@/store/index2";

@Component({
  components: { NumberPad, Types, FormItem, Tags },
  computed: {
    recordList() {
      //实时监听数据的变化
      return store.recordList; //地址的赋值
    },
  },
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  //保存数据
  saveRecord() {
    store.createRecord(this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
.notes {
  padding: 12px 0;
}
</style>
