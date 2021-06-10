//T 表示data和返回值的类型保持一致
function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export default clone;
