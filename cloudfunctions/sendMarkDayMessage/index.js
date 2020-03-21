// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let date = new Date()
  const { markDayArray } = event
  console.log(markDayArray, "mark")
  try {
    for (let i = 0; i < markDayArray.length; i++) {
      let item = markDayArray[i]
      for (let y = 0; y < item.remindPeople.length; y++) {
        let people = item.remindPeople[y]

        const result = await cloud.openapi.subscribeMessage.send({
          touser: people,
          templateId: "eUJ8Y3rSDHCetdZiBI-oL7zNnbbgWxcFkUKW0u0Uwtk",
          data: {
            thing1: {
              value: item.name
            },
            time5: {
              value: item.targetDay
            }
          },

        })
        console.log(result, "result")
        item.targetDay = date.getFullYear() + 1 + "-" + item.beginTime.substring(5)
        item.sendMessageDay = JSON.parse(JSON.stringify(new Date(new Date(item.targetDay).getTime() - item.remind * 24 * 60 * 60 * 1000)))
        const one = await cloud.callFunction({
          name: "updateOneMarkDay",
          data: {
            ...item
          }
        })
        console.log(one, "one")
      }
    }
    // markDayArray.forEach(async item => {
    //   //   // if(item.)
    //   console.log(item, "item")
    //   markDayArray[0].remindPeople.forEach(async people => {

    //     console.log(people, "peopele")

    //     const result = await cloud.openapi.subscribeMessage.send({
    //       touser: people,
    //       templateId: "eUJ8Y3rSDHCetdZiBI-oL7zNnbbgWxcFkUKW0u0Uwtk",
    //       data: {
    //         thing1: {
    //           value: item.name
    //         },
    //         time5: {
    //           value: item.targetDay
    //         }
    //       },

    //     })
    //     console.log(result, "result")
    //     item.targetDay = date.getFullYear() + 1 + "-" + item.beginTime.substring(5)
    //     item.sendMessageDay = JSON.parse(JSON.stringify(new Date(new Date(item.targetDay).getTime() - item.remind * 24 * 60 * 60 * 1000)))
    //    const one =  await cloud.callFunction({
    //       name: "updateOneMarkDay",
    //       data: {
    //         ...item
    //       }
    //     })
    //     console.log(one,"one")

    //     // })
    //     //   // cloud.openapi.subscribeMessage.send({

    //   })
    // })
  } catch (err) {
    console.log(err, "sendMarkDayMessage")
  }
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}