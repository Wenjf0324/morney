import { RecordItem } from "@/custom";
import clone from "@/lib/clone";

const localStorageKeyName = "recordList";

const recordStore = {
  recordList: [] as RecordItem[],
  //获取数据
  fetchRecords() {
    this.recordList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[]; //强制指定为 RecordItem 类型
    return this.recordList;
  },
  //保存数据
  saveRecords() {
    //JSON.stringify()序列化，转化成数组
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.recordList)
    );
  },
  createRecord(record: RecordItem) {
    //深拷贝
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.recordList && this.recordList.push(record2); //可选链语法 ES 2020
    //this.recordList?.push(record2);
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();

export default recordStore;
