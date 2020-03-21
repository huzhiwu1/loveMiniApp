// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth()+1
  let day = now.getDate()
  if(month<=9){
    montn="0"+month
  }
  if(day<=9){
    day="0"+day
  }
  now = JSON.parse(JSON.stringify(new Date(year+"-"+month+"-"+day)))
  // console.log(now,"now")
  // now = new Date(now.getTime())
  // now = now.toString()
  console.log(now,"now")
  const {data:sendMessageArray} =await db.collection("markDays").where(_.and([{
    sendMessageDay:now,
  },
  {
    remind:_.neq(-1)
  }
])).get()
  // .where(
  //   {
  //     data:{
  //       sendMessageDay:now,
  //       // remind:_.neq(-1)
  //     }
  //   }
  // ).
  // .get()
  // const arr = await db.collection("markDays").where({
  //   data:{
  //     sendMessageDay:_.eq(now)
  //   }
  // })
  // console.log(arr,"arr")
  // console.log(arr.data[0],"obj")
  // console.log(arr.data[0]["sendMessageDay"],"sen")
  // console.log(typeof arr.data[0]["sendMessageDay"],"arrmess" )
  // console.log(typeof now, "now")
  // console.log(typeof now+"","now + ")
  // console.log(now+"","now++")
  // console.log((arr.data[0]["sendMessageDay"])==(now),"===?")
  console.log(sendMessageArray,"arrays")
  // 发送订阅消息
  if(sendMessageArray.length>0){
    cloud.callFunction({
      name:"sendMarkDayMessage",
      data:{
        markDayArray:sendMessageArray
      }
    })
  }
}