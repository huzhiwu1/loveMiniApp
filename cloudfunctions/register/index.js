// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event,"Event")

  const wxContext = cloud.getWXContext()
  let userInfo = {
    ...event,
    missyoutime:null,
    openid:wxContext.OPENID,
    birthday:null,
    companion:null,//伴侣的openid
    commonid:null//情侣关系id

  }
  return await db.collection('users').add({
    data:userInfo
  })
  
}