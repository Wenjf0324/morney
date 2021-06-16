<template>
  <Layout>
    <header>
      <h3>记账本</h3>
      <div class="summary">
        <div class="date">
          <div class="year">2021年</div>
          <div><span class="month">06</span>月</div>
        </div>
        <dl class="details">
          <div class="item">
            <dt>收入</dt>
            <dd>100.<span style="font-size:12px;">00</span></dd>
          </div>
          <div class="item">
            <dt>支出</dt>
            <dd>41.<span style="font-size:12px;">00</span></dd>
          </div>
        </dl>
      </div>
    </header>
    <!-- <Tabs class-prefix="type" :dataSource="recordTypeList" :value.sync="type" /> -->
    <!-- <Tabs
      class-prefix="interval"
      :dataSource="intervalList"
      :value.sync="interval"
    /> -->
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes" :style="{ marginRight: 'auto' }">{{
              item.notes
            }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
$c: #fff;
$f: 12px;
$pb: 8px;
header {
  background: $color-main;
  padding: 6px 12px 12px;
  color: $c;
  h3 {
    text-align: center;
  }
  > .summary {
    margin-top: 12px;
    display: flex;
    > .date {
      padding-right: 16px;
      position: relative;
      &::after {
        content: "";
        display: block;
        width: 1px;
        height: 55%;
        background: $c;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      > .year {
        font-size: $f;
        padding-bottom: $pb;
      }
    }
    > .details {
      flex: 1;
      margin-left: 24px;
      display: flex;
      > .item {
        flex: 1;
        dt {
          font-size: $f;
          padding-bottom: $pb;
        }
      }
    }
  }
}
// deep 深度作用选择器
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: #fff;
      &::after {
        display: none;
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: #fff;
}
.notes {
  margin-right: auto;
  margin-left: 8px;
  color: #999;
}
.noResult {
  padding: 16px;
  text-align: center;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import { RecordItem, RootState, Tag } from "@/custom";
import dayjs from "dayjs";
import clone from "@/lib/clone";

const oneDay = 86400 * 1000; //一天有 86400*1000ms

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  //获取数据
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const { recordList } = this;
    //排序，sort()会改变原来的数组，返回一个新的数组
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("，");
  }
}
</script>
