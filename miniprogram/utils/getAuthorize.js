var promisify = require("./promisify.js").promisify
const wxGetSetting = promisify(wx.getSetting)
const wxAuthorize = promisify(wx.authorize)
function authorize(authSetting) {
    return new Promise((resolve, reject) => {
        wxGetSetting().then(res => {
            if (res.authSetting[authSetting]) {
                resolve("ok")
            } else {
                return wxAuthorize({
                    scope: authSetting
                }).then(res => {
                    resolve("ok")
                }).catch(err => {
                    reject("fail")
                })
            }
        })

    })

    // const {authSetting} = await wxGetSetting()
    // const isOk = authSetting[name]
    // if(isOk){
    //     return "ok"
    // }else{
    //     wxAuthorize({
    //         scope:name
    //     }).then(res=>{

    //     })
    // }
}
module.exports.getAuthorize = authorize