import { RecordItem } from "@/custom";
import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
  },

  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },

    createRecord(state, record) {
      //深拷贝
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2); //可选链语法 ES 2020
      //this.recordList?.push(record2);
      store.commit("saveRecords");
    },

    //保存数据
    saveRecords(state) {
      //JSON.stringify()序列化，转化成数组
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
  },
  actions: {},
  modules: {},
});

export default store;
