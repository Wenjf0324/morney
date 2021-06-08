<template>
  <Layout class-prefix="layout">
    <tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>

    <types :value.sync="record.type" />
    <number-pad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";
import { RecordItem } from "@/custom";

const recordList = recordListModel.fetch(); //获取数据
const tagList = tagListModel.fetch();

@Component({
  components: { NumberPad, Types, FormItem, Tags },
})
export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  //更新数据
  @Watch("recordList")
  onRecordListChaned() {
    recordListModel.save(this.recordList);
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
