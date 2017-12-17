// 定义一个存在localstorge里面的名字
export var KEY = 'buygoods';
// 定义一个从本地存储中取值的方法
export function getItem() {
  var jsonStr = localStorage.getItem(KEY);
  // 假如原来没有数据，就放回一个空对象
  if (!jsonStr) {
    return {};
  }
  return JSON.parse(jsonStr);
}

// 重新设置本地存储的方法
export function setItem(goodObj) {
  // 获取数据
  var obj = getItem();
  if (obj[goodObj.gid]) {
    // 如果存在此数据，则在原来的基础上叠加
    obj[goodObj.gid] += goodObj.count;
  } else {
    // 如果没有此数据，则创建一个
    obj[goodObj.gid] = goodObj.count;
  }
  localStorage.setItem(KEY, JSON.stringify(obj));
}

// 替换数量
export function setItemReplace(gobj) {
  // 从localStorage中获取购买商品的对象
  var obj = getItem();
  obj[gobj.gid] = gobj.count;
  //将obj存储会loacalStorage中
  localStorage.setItem(KEY, JSON.stringify(obj));
}


// 删除
export function delItem(goodid) {
  var obj = getItem();
  // 删除对象中对应的属性
  delete obj[goodid];
  
  localStorage.setItem(KEY, JSON.stringify(obj));

}