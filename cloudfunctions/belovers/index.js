// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let {openid} = event
  
  const wxContext = cloud.getWXContext()
  const myopenid = wxContext.OPENID
  try{
    let {_id} = await db.collection('lovers').add({
      data:{
        loversid:[openid,myopenid],
        notenumm:0,
        starttime:new Date()
      }
    })
    // .then(res=>{
    //   const id = res._id
     
    // })
    await db.collection('users').where({
      openid,
    }).update({
      data:{
        commonid:_id,
        companion:myopenid
      }
      
    })
    return await db.collection('users').where({
      openid:myopenid
    }).update({
      data:{
        commonid:_id,
        companion:openid
      }
    })
    
  }catch(err){
    console.log(err,"belovers")
  }


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}