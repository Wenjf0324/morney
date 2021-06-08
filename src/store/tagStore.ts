import { Tag } from "@/custom";
import createId from "@/lib/createId";

const localStorageKeyName = "tagList";

const tagStore = {
  tagList: [] as Tag[],

  fetchTags() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.tagList;
  },

  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },

  createTag(name: string) {
    //this.tagList = [{id:'1', name:'1'}, {id:'2', name:'2'}]
    const names = this.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert("标签名重复");
      return "duplicated";
    }
    const id = createId().toString();
    this.tagList.push({ id, name: name });
    this.saveTags();
    window.alert("添加成功");
    return "success";
  },

  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
      }
      break;
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },

  updateTag(id: string, name: string) {
    const idList = this.tagList.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      //id存在
      const names = this.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        //name标签名重复
        return "duplicated";
      } else {
        //更新标签名
        const tag = this.tagList.filter((item) => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return "success";
      }
    } else {
      //id不存在
      return "not found";
    }
  },

  //保存数据
  saveTags() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.tagList)
    );
  },
};

tagStore.fetchTags();

export default tagStore;
