// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const result = await db.collection('user').add({
    data: {
      openid: event.openid,
      identity: event.identity,
      name: event.name,
      sex: event.sex,
      birthday: event.birthday,
      joinDate: event.joinDate,
      createDate: event.createDate,
      phone: event.phone
    }
  })
    return result
}