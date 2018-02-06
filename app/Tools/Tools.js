export const Tools = {};

/**
 * 返回Value的所属类型
 * @param {any} obj 任意类型
 */
Tools.GetValueType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

