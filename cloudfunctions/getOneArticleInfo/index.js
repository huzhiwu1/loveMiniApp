// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const {_id} = event;
  return await db.collection("article").aggregate().match({_id}).lookup({
    from:"users",
    localField:"author",
    foreignField:"openid",
    as:"userList"
  }).end()
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}