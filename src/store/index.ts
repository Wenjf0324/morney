import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import { Tag, RecordItem } from "@/custom";
import createId from "@/lib/createId";

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
};

const store = new Vuex.Store({
  //data
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,

  //methods
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

    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
    },

    createTag(state, name: string) {
      //this.tagList = [{id:'1', name:'1'}, {id:'2', name:'2'}]
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复");
      }
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
      window.alert("添加成功");
    },

    //保存数据
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },

    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
  },
  actions: {},
  modules: {},
});

export default store;
