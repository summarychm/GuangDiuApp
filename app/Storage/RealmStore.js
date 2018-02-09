/*
 * Realm模型类
 * @Author: Max.Liu 
 * @Date: 2018-02-07 11:55:03 
 * @Last Modified time: 2018-02-07 11:55:03 
 */
"use strict";

import Realm from "realm";

let RealmBase = {};

// 定义表结构
const HomeRealm = {
  name: "HomeRealm",
  properties: {
    id: "int",
    title: "string?",
    image: "string?",
    mall: "string?"
  }
};
const HaiTaoRealm = {
  name: "HaiTaoRealm",
  properties: {
    id: "int",
    title: "string?",
    image: "string?",
    mall: "string?"
  }
};

// 初始化realm对象
let realm = Realm.open({ schema: [HomeRealm, HaiTaoRealm] });

// 写入数据
RealmBase.create = (schema, data) => {
  realm.write(() => {
    for (let i = 0; i < data.length; i++) {
      let temp = data[i];
      realm.create(schema, {
        id: temp.id,
        title: temp.id,
        image: temp.image,
        mall: temp.image
      });
    }
  });
};

//查询全部数据
RealmBase.loadAll = schema => {
  return realm.objects(schema);
};
// 条件查询
RealmBase.filtered = (schema, filtered) => {
  let objects = realm.objects(schema);
  return objects.filtered(filtered);
};

//删除所有数据
RealmBase.removeAllData = schema => {
  realm.write(() => {
    let objects = realm.objects(schema);
    realm.delete(objects);
  });
};  

global.RealmBase = RealmBase;
