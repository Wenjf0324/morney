import { TagListModel } from "@/custom";
import createId from "@/lib/createId";

const localStorageKeyName = "tagList";

const tagListModel: TagListModel = {
  data: [],

  //获取所有标签名
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },

  //添加新的标签
  create(name: string) {
    //this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
    const names = this.data.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      return "duplicated";
    }
    const id = createId().toString();
    this.data.push({ id, name: name });
    this.save();
    return "success";
  },

  //更新标签名
  update(id, name) {
    const idList = this.data.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      //id存在
      const names = this.data.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        //name标签名重复
        return "duplicated";
      } else {
        //更新标签名
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.name = name;
        this.save();
        return "success";
      }
    } else {
      //id不存在
      return "not found";
    }
  },

  //删除标签
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
      }
      break;
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },

  //保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default tagListModel;
