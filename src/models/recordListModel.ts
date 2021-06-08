import { RecordItem } from "@/custom";
import clone from "@/lib/clone";

const localStorageKeyName = "recordList";

const recordListModel = {
  data: [] as RecordItem[],

  create(record: RecordItem) {
    //深拷贝
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
    this.save();
  },
  //获取数据
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[]; //强制指定为 RecordItem 类型
    return this.data;
  },
  //保存数据
  save() {
    //JSON.stringify()序列化，转化成数组
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default recordListModel;
