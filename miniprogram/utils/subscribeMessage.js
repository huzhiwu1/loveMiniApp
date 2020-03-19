var promisify = require("./promisify").promisify
const wxRequestSubscribeMessage = promisify(wx.requestSubscribeMessage)
const wxGetSetting = promisify(wx.getSetting)
module.exports.subscribeMessage = function(tmplIds=[]){
    return new Promise((resolve,reject)=>{
        wxGetSetting({
            withSubscriptions:true
        }).then(res=>{
            // res.subscriptionsSetting = {
    //   mainSwitch: true, // 订阅消息总开关
    //   itemSettings: {   // 每一项开关
    //     SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
    //     SYS_MSG_TYPE_RANK: 'accept'
    //     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject', // 普通一次性订阅消息
    //     ke_OZC_66gZxALLcsuI7ilCJSP2OJ2vWo2ooUPpkWrw: 'ban',
    //   }
    // }    
            // if(res.subscriptionsSetting)
            console.log(res,"模版消息")
            const isOk = tmplIds.every(item=>{
                return res.itemSettings&&res.itemSettings[item]==="accept"
            })
            if(isOk){
                resolve("ok")
            }else{
                wxRequestSubscribeMessage({
                    tmplIds
                }).then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            }
            
        })
    })
}