<template>
  <Layout>
    <header>
      <h3>记账本</h3>
      <div class="summary">
        <!-- 时间 -->
        <div class="currentTime" @click="showTimePicker = true">
          <span class="year">{{ currentYear }}年</span>
          <div class="month">
            {{ currentMonth }}<span style="font-size:12px;"> 月</span
            ><Icon name="zhankai" />
          </div>
        </div>

        <!-- 总计 -->
        <dl class="total">
          <div class="item">
            <dt>收入</dt>
            <dd>
              {{ totalIncome[0] }}.<span style="font-size:12px;">{{
                totalIncome[1]
              }}</span>
            </dd>
          </div>
          <div class="item">
            <dt>支出</dt>
            <dd>
              {{ totalPay[0] }}.<span style="font-size:12px;">{{
                totalPay[1]
              }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </header>

    <div class="wrapper" v-if="showTimePicker" @click="handleCancel"></div>
    <van-popup v-model="showTimePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择月份"
        @cancel="handleCancel"
        @confirm="handleConform"
      />
    </van-popup>

    <ol class="account" v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <div class="title">
          <h3>{{ beautify(group.title) }}</h3>
          <div>
            <span v-if="group.payTotal > 0"
              >支出:<span>{{ group.payTotal.toFixed(2) }}</span></span
            >
            <span
              v-if="group.incomeTotal > 0"
              style="display:inline-block; margin-left:16px;"
              >收入:<span>{{ group.incomeTotal.toFixed(2) }}</span></span
            >
          </div>
        </div>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <div class="left">
              <div class="icon-wrapper">
                <Icon :name="item.tag.icon" />
              </div>
              <div>
                <p>{{ item.tag.name }}</p>
                <p class="notes">
                  {{ item.notes }}
                </p>
              </div>
            </div>
            <span
              style="margin-left:auto"
              :class="{ income: item.type === '+' }"
              >{{ moneyFormat(item.type, item.amount) }}</span
            >
            <Icon name="right" />
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import { Result, RootState, Tag } from "@/custom";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import { DatetimePicker, Popup } from "vant";

Vue.use(DatetimePicker);
Vue.use(Popup);

const oneDay = 86400 * 1000; //一天有 86400*1000ms

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;

  showTimePicker = false;
  currentDate = new Date();
  currentYear = dayjs().format("YYYY");
  currentMonth = dayjs().format("MM");

  //获取数据
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;
    //将数据按 新到旧的时间 排序，sort()会改变原来的数组，返回一个新的数组
    const newList = clone(recordList).sort(
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
      group.payTotal = group.items
        .filter((g) => g.type === "-")
        .reduce((sum, item) => sum + item.amount, 0);
      group.incomeTotal = group.items
        .filter((g) => g.type === "+")
        .reduce((sum, item) => sum + item.amount, 0);
    });

    const currentTime = this.currentYear + "-" + this.currentMonth;
    const finalList = [];
    for (let i = 0; i < result.length; i++) {
      const current = result[i];
      if (current.title.indexOf(currentTime) === 0) {
        finalList.push(current);
      }
    }
    window.localStorage.setItem("groupedList", JSON.stringify(finalList));
    return finalList;
  }

  get totalPay() {
    let sum = 0;
    for (let i = 0; i < this.groupedList.length; i++) {
      let current = this.groupedList[i];
      if (!current.payTotal) {
        sum += 0;
      } else {
        sum += current.payTotal;
      }
    }
    return sum
      .toFixed(2)
      .toString()
      .split(".");
  }

  get totalIncome() {
    let sum = 0;
    for (let i = 0; i < this.groupedList.length; i++) {
      let current = this.groupedList[i];
      if (!current.incomeTotal) {
        sum += 0;
      } else {
        sum += current.incomeTotal;
      }
    }
    return sum
      .toFixed(2)
      .toString()
      .split(".");
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  //隐藏月份选择器
  handleCancel() {
    this.showTimePicker = false;
  }
  handleConform(val: any) {
    this.showTimePicker = false;
    let month = dayjs(val).format("MM");
    this.currentMonth = month;
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

  moneyFormat(type: string, amount: number) {
    if (type === "-") {
      return "-" + amount.toFixed(2);
    } else if (type === "+") {
      return "+" + amount.toFixed(2);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
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
  .van-picker__toolbar {
    border-bottom: 1px solid #e6e6e6;
  }
  .van-picker__title {
    font-size: 14px;
  }
  .van-picker__confirm {
    color: $color-main;
  }
}
%summaryTitle {
  font-size: 12px;
  padding-bottom: 8px;
}
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
}
header {
  background: $color-main;
  padding: 6px 12px 12px;
  color: #fff;
  h3 {
    text-align: center;
  }
  .summary {
    margin-top: 12px;
    display: flex;
    .currentTime {
      padding-right: 16px;
      position: relative;
      &::after {
        content: "";
        display: block;
        width: 1px;
        height: 55%;
        background: #fff;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .year {
        display: block;
        @extend %summaryTitle;
      }
      .icon {
        width: 24px;
        height: 18px;
      }
    }
    .total {
      flex: 1;
      margin-left: 24px;
      display: flex;
      .item {
        flex: 1;
        dt {
          @extend %summaryTitle;
        }
      }
    }
  }
}
%item {
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.account {
  .title {
    @extend %item;
    font-size: 12px;
    padding: 8px 16px;
    color: #999;
  }
  .record {
    @extend %item;
    font-size: 14px;
    padding: 12px 8px;
    background: #fff;
    .left {
      display: flex;
      align-items: center;
      .icon-wrapper {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        display: inline-block;
        background: #fbfbf1;
        border-radius: 50%;
        position: relative;
        .icon {
          color: $color-main;
          width: 25px;
          height: 25px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .notes {
        color: #999;
        font-size: 12px;
        line-height: 1.2;
      }
    }
    .income {
      color: rgba(255, 0, 0, 0.8);
    }
    > .icon {
      width: 18px;
      height: 18px;
      margin-left: 4px;
      color: #999;
    }
  }
}
.noResult {
  padding: 16px;
  text-align: center;
}
</style>
