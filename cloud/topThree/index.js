// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数deadline: _.gt(event.nowtime)
exports.main = async (event, context) => {
  const res = await db.collection('event').where({status: "待完成"}).get()

  return {
    recent: res.data
  }
}