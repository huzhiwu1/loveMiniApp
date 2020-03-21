// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const {
    name,
    isDownTime,
    remind,
    beginTime,
    targetDay,
    sendMessageDay,
    loverId,
    remindPeople,
    remindPeopleVal
  } = event
  return await db.collection("markDays").add({
    data:{
      name,
    isDownTime,
    remind,
    beginTime,
    targetDay,
    sendMessageDay,
    loverId,
    remindPeople,
    remindPeopleVal
    }
  })
  // "name":"纪念日",
  // "isDownTime":"倒数日？true:false",
  // "remind":"提醒时间，-1，0，1，2，",
  // "beginTime":"其实日",
  // "targetDay":"目标日",
  // "sendMessageDay":"发送消息的时间",
  // "loverId":"情侣id",
  // "remindPeople":"[提醒人openid]"
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}