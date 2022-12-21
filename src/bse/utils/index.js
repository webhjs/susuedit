function trimNewlineSpace(str) {
  return JSON.stringify(str)
    .replace(/\\n+\s*/g, "")
    .slice(1, -1);
}
function trimSpace(str) {
  return str.replace(/\n+\s*/g, () => {
    return "";
  });
}
function deepClone(data, hash = new WeakMap()) {
  if (typeof data !== "object" || data === null) {
    throw new TypeError("传入参数不是对象");
  }
  // 判断传入的待拷贝对象的引用是否存在于hash中
  if (hash.has(data)) {
    return hash.get(data);
  }
  let newData = {};
  const dataKeys = Object.keys(data);
  dataKeys.forEach((value) => {
    const currentDataValue = data[value];
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== "object" || currentDataValue === null) {
      newData[value] = currentDataValue;
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue];
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue]);
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue]);
    } else {
      // 将这个待拷贝对象的引用存于hash中
      hash.set(data, data);
      // 普通对象则递归赋值
      newData[value] = deepClone(currentDataValue, hash);
    }
  });
  return newData;
}

// 唯一id
function guid() {
  return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(
    36
  );
}

// 解析json字符串
function jsonparse(jsonify) {
  try {
    return JSON.parse(jsonify)
  } catch{
    try {
      return JSON.parse(decodeURIComponent(jsonify));
    } catch {
      const str = decodeURIComponent(jsonify);
      const evalObj = eval("(" + str + ")");
      return evalObj;
    }
  }
}

// 原型链继承
function inherit(targetClass, sourceClass) {
  const proto = Object.create(sourceClass.prototype);
  Object.defineProperties(proto, {
    constructor: {
      value: targetClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  targetClass.prototype = proto;
  return targetClass;
}

function trim(str) {
  return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '')
}

function removeItem (array, item) {
  for (let i = 0, l = array.length; i < l; i++) {
    if (array[i] === item) {
      array.splice(i, 1)
      i--
    }
  }
}

function defObjectProtoValue(obj, key, val = undefined, enumerable = false) {
  return Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

export { trimNewlineSpace, deepClone, guid, jsonparse, inherit, trimSpace, trim, removeItem, defObjectProtoValue };
