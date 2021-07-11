<template>
  <Layout>
    <div class="navBar">
      <span class="title">支出</span>&nbsp;
      <span class="title">收入</span>
      <Tabs
        class-prefix="interval"
        :data-source="intervalList"
        :value.sync="interval"
      />
    </div>

    <div class="currentInterval">
      <span v-if="interval === 'week'">本周</span>
      <span v-if="interval === 'month'">本月</span>
      <span v-if="interval === 'year'">今年</span>
    </div>

    <div class="trend">
      支出统计
      <div id="main" class="lineChart"></div>
    </div>

    <div class="ranking">支出排行磅</div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import Tabs from "@/components/Tabs.vue";
import dayjs from "dayjs";
import { Result } from "@/custom";
import echarts from "echarts";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "week";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  get groupedList() {
    return JSON.parse(
      window.localStorage.getItem("groupedList") || "[]"
    ) as Result;
  }

  get currentWeekData() {
    let currentWeek: {
      title: string;
      totalPay?: number;
      totalIncome?: number;
    }[] = [];
    const startWeek = dayjs().startOf("week");
    let weekArr = [];
    for (let i = 0; i < 7; i++) {
      weekArr.push(startWeek.add(i, "day").format("YYYY-MM-DD"));
    }
    const titleArr = this.groupedList.map((item) => item.title);
    for (let i = 0; i < weekArr.length; i++) {
      if (titleArr.indexOf(weekArr[i]) > -1) {
        for (let j = 0; j < this.groupedList.length; j++) {
          let current = this.groupedList[j];
          if (weekArr[i] === this.groupedList[j].title) {
            currentWeek.push({
              title: current.title,
              totalPay: current.payTotal,
              totalIncome: current.incomeTotal,
            });
          }
        }
      } else {
        currentWeek.push({
          title: weekArr[i],
          totalPay: 0,
          totalIncome: 0,
        });
      }
    }
    return currentWeek;
  }

  get theWeek() {
    const startWeek = dayjs().startOf("week");
    let weekArr = [];
    for (let i = 0; i < 7; i++) {
      weekArr.push(startWeek.add(i, "day").format("MM-DD"));
    }
    return weekArr;
  }

  get currentWeekPay() {
    return this.currentWeekData.map((item) => item.totalPay);
  }

  mounted() {
    this.echartsInit();
  }
  echartsInit() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("main") as HTMLElement);

    // 指定图表的配置项和数据
    let option = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.theWeek,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.currentWeekPay,
          type: "line",
          areaStyle: {},
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep {
  .interval-tabs {
    font-size: 14px;
    width: 100%;
    margin-top: 4px;
    &-item {
      border-right: 1px solid;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: $color-main;
  color: #fff;
}
.currentInterval {
  font-size: 14px;
  padding: 16px 8px 4px;
  > span {
    display: inline-block;
    border-bottom: 2px solid;
  }
}
.trend {
  border: 1px solid red;
  height: 200px;
  position: relative;
  .lineChart {
    width: 100%;
    height: 175px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
