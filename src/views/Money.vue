<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <notes @update:value="onUpdateNotes" />
    <types :value.sync="record.type" />
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";

//自定义类型
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型 object | string
  createdAt?: Date; // 类(构造函数)  '?'表示可以为空
};

@Component({
  components: { NumberPad, Types, Notes, Tags },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("recordList") || "[]"
  );
  record: Record = {
    tags: [],
    notes: "",
    type: "-", //'-'表示支出，’+‘表示收入
    amount: 0,
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  //保存数据
  saveRecord() {
    //深拷贝
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch("recordList")
  onRecordListChaned() {
    //JSON.stringify()序列化，转化成数组
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
