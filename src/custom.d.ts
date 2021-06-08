export type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型 object | string
  createdAt?: Date; // 类 / 构造函数  '?'表示可以为空
};

export type Tag = {
  id: string;
  name: string;
};

export type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //联合类型。success 表示成功，duplicated 表示name重复
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};
