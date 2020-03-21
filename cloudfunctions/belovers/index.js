// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ =db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let now = new Date()
 
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let day = now.getDate()
  if (day <= 9) {
    day = "0" + day
  }
  if (month <= 9) {
    month = "0" + month
  }
  let { openid } = event

  const wxContext = cloud.getWXContext()
  const myopenid = wxContext.OPENID
  try {
    let { _id } = await db.collection('lovers').add({
      data: {
        loversid: [openid, myopenid],
        notenum: 0,
        honeyNum: 0,
        starttime: null
      }
    })
    console.log(_id,"_id")
    // const starttimeid="12"
    const {result:{_id:starttimeid}} =  await cloud.callFunction({
      name: "addMarkDay",
      data: {
        name: "彼此陪伴",
        isDownTime: false,
        remind: 7,
        beginTime: year + "-" + month + "-" + day,
        targetDay: year + "-" + month + "-" + day,
        sendMessageDay: JSON.parse(JSON.stringify(new Date(new Date(now).getTime() - 7 * 24 * 60 * 60 * 1000))),
        loverId: _id,
        remindPeople: [myopenid, openid],
        remindPeopleVal:2
      }
    })
    // console.log(a,"a")
    console.log(starttimeid,"start")
    const a = await db.collection("lovers").where({
      _id
    }).update({
      data:{
        starttime:starttimeid
      }
    })
    console.log(a,"A")
    
    // .then(res=>{
    //   const id = res._id

    // })
    await db.collection('users').where({
      openid,
    }).update({
      data: {
        commonid: _id,
        companion: myopenid
      }

    })
   
    return await db.collection('users').where({
      openid: myopenid
    }).update({
      data: {
        commonid: _id,
        companion: openid
      }
    })
  } catch (err) {
    console.log(err, "belovers")
  }
}