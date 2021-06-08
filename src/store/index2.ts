import recordStore from "./recordStore";
import tagStore from "./tagStore";

const store = {
  //浅拷贝
  ...recordStore,
  ...tagStore,
};

export default store;
