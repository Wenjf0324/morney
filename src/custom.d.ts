export type RootState = {
  tagList: Tag[];
  recordList: RecordItem[];
  groupedList: [];
  currentTag?: Tag;
  createRecordError: Error | null;
  createTagError: Error | null;
};

export type RecordItem = {
  tag: Tag;
  notes: string;
  type: string;
  amount: number; //数据类型 object | string
  createdAt?: string; // 类 / 构造函数  '?'表示可以为空
};

export type Tag = {
  id: string;
  name: string;
  icon: string;
};

export type Result = {
  title: string;
  payTotal?: number;
  incomeTotal?: number;
  items: RecordItem[];
}[];

export type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //联合类型。success 表示成功，duplicated 表示name重复
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};
