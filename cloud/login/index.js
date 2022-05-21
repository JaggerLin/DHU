// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const OPENID = wxContext.OPENID
  const countResult = await db.collection('user').where({openid: OPENID,}).count()
  const total = countResult.total

  return {
    openid: OPENID,
    countResult: total,
  }
}