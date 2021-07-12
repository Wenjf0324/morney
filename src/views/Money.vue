<template>
  <Layout class-prefix="layout" hide-nav="true">
    <div class="types">
      <Icon class="leftIcon" name="left" @click="$router.replace('/account')" />
      <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    </div>

    <Tags :type="record.type" @update:value="record.tag = $event" />

    <FormItem
      field-name="备注"
      placeholder="点我写备注..."
      :value.sync="record.notes"
    />
    <!-- :value="record.notes" @update:value="onUpdateNotes" -->

    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import { RecordItem } from "@/custom";
import recordTypeList from "@/constants/recordTypeList";
import { Dialog } from "vant";

@Component({
  components: { NumberPad, FormItem, Tags, Tabs },
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: { id: "", name: "", icon: "" },
    notes: "",
    type: "-",
    amount: 0,
  };

  recordTypeList = recordTypeList;

  get recordList() {
    //实时监听数据的变化
    return this.$store.state.recordList; //地址的赋值
  }

  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  //保存数据
  saveRecord() {
    if (!this.record.tag.name) {
      Dialog.alert({
        message: "请选择一个标签",
      });
      return;
      // return window.alert("请选择一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      this.record.notes = "";
      this.$router.replace("/account");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep {
  .layout-content {
    display: flex;
    flex-direction: column;
  }
  .tabs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.types {
  height: 64px;
  background: $color-main;
  position: relative;
  .leftIcon {
    width: 24px;
    height: 24px;
    color: #fff;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
