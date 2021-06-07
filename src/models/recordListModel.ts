import { RecordItem } from "../custom";

const localStorageKeyName = "recordList";

const recordListModel = {
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  //获取数据
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[]; //强制指定为 RecordItem 类型
  },
  //保存数据
  save(data: RecordItem[]) {
    //JSON.stringify()序列化，转化成数组
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
};

export default recordListModel;
