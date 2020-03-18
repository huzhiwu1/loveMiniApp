// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const {_id,companion} =event;
  try{
   return await db.collection("lovers").aggregate()
    .match({
      _id
    })
    .lookup({
      from:"users",
      localField:"_id",
      foreignField:"commonid",
      as:"friend"
    })
    .end().then(res=>{
      let info = res.list[0]
      let friend = info.friend.filter(item=>{
        return item.openid==companion
      })
      info.friend= friend[0]
      console.log(info,"info")
      // const log = cloud.logger()
      // log.info({
      //   name:"info",
      //   cost:10,
      //   attributes:{
      //     width:100,
      //     height:100
      //   },
      //   msg:info,
      //   colors:['red','blue']
      // })
      // console.log(info,"info")
      // logger.log(info,"info"
      return info
    })
  }catch(err){
    // const log = cloud.logger()
    // log.warn({
    //   name:'info',
    //   cost:10,
    //   attributes:{
    //     width:100,
    //     height:100,
    //   },
    //   colors:['red','blue'],
    //   msg:err,
    // })
    console.log(err,"getLoverInfo")
  }
 
}