// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const {nickName,openid,commonid,companion}=event
  let missyou =await db.collection("missyou").where({
    openid,
  }).get()
  console.log(missyou,"missyou")
  if(missyou.data.length==0){
    await db.collection("missyou").add({
      data:{
        openid,
        commonid,
        time:[new Date()]
      }
    })
  }else{
    await db.collection("missyou").where({
      openid
    }).update({
      data:{
        time:_.push(new Date())
      }
    })
  }
  await db.collection("lovers").where({
    _id:commonid
  }).update({
    data:{
      honeyNum:_.inc(5)
    }
  })
  await db.collection("users").where({
    openid
  }).update({
    data:{
      missyoutime:new Date()
    }
  })
  console.log(nickName,"nicknAME")
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if(day<=9){
    day="0"+day
  }
  if(month<=9){
    month="0"+month
  }
  if(hour<=9){
    hour="0"+hour
  }
  if(minute<=9){
    minute="0"+minute
  }
  if(second<=9){
    second="0"+second
  }
  let time = year+"-"+month+ "-"+day+" "+hour+":"+minute+":"+second
  console.log(time,"time")
  return await cloud.openapi.subscribeMessage.send({
    touser:companion,
    templateId:"lbl-AVfCPL1Q-DP_mkp4mJEn5ZUTgaIwpEejZVKNecU",
    data:{
      thing1:{
        value:nickName+"想你了"
      },
      name3:{value:nickName.length>4?nickName.substring(0,4)+"...":nickName},
      date2:{value:time}
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