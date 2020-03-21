// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { imgList,
    textInput,
    date, emojiImg, feeling, lng, lat, city, district, nation, province,
    street,
    street_number,
    address,
    isShowLocal,
    author,
    loversId,
    writeTime,} = event;
  return await db.collection("article").add({
    data:{
      imgList,
    textInput,
    date, emojiImg, feeling, lng, lat, city, district, nation, province,
    street,
    street_number,
    address,
    isShowLocal,
    author,
    loversId,
    writeTime,
    comment:[],
    like:[]
    }
  })
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}