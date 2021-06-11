import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import { RecordItem, RootState } from "@/custom";
import createId from "@/lib/createId";
import router from "@/router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  //data
  state: {
    recordList: [],
    createRecordError: null,
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

    createRecord(state, record: RecordItem) {
      //深拷贝
      const record2 = clone(record);
      record2.createdAt = new Date().toISOString();
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
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", "衣");
        store.commit("createTag", "食");
        store.commit("createTag", "住");
        store.commit("createTag", "行");
      }
    },

    createTag(state, name: string) {
      //this.tagList = [{id:'1', name:'1'}, {id:'2', name:'2'}]
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复");
      }
      const id = createId().toString(); //创建 id
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
      window.alert("添加成功");
    },

    //保存数据
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },

    //获取当前 tag
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },

    //只接受一个参数
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        //id存在
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          //name标签名重复
          window.alert("标签名重复");
        } else {
          //更新标签名
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },

    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back(); //页面回退
      } else {
        window.alert("删除失败");
      }
    },
  },

  actions: {},
  modules: {},
});

export default store;
