// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
let res = ''
// 云函数入口函数deadline: _.gt(event.nowtime)
exports.main = async (event, context) => {
  switch(event.sign){
    case 2: res = await db.collection('event').where({status: "待完成"}).get(); break;
    case 3: res = await db.collection('event').where({status: "已完成"}).get(); break;
    case 4: res = await db.collection('event').where({status: "已取消"}).get(); break;
    default: res = await db.collection('event').get();
  }
  return {
    affair: res.data
  }
}