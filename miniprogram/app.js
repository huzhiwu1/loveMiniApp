//app.js
var promisify = require("/utils/promisify.js").promisify
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: 'mr-hu-bc6fa9'

        ,
      })
    }

    this.globalData = {}
    this.getNaviagtionBarHeight()
    // 获取胶囊的宽度
    this.getMenuWidth()
    // 用户登录

  },
  onShow() {
    this.getUserInfo()
  },
  getNaviagtionBarHeight() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.navigationBarHeight = res.statusBarHeight
      }
    })
  },
  getMenuWidth() {
    let obj = wx.getMenuButtonBoundingClientRect()
    console.log(obj, "obj")
    this.globalData.menuWidth = obj.width
  },
  // 获取openId
  getUserInfo() {
    let that = this
    let userInfo = wx.getStorageSync("userInfo")
    if (!userInfo) {
      wx.cloud.callFunction({
        name: "login"
      }).then(res => {

        userInfo = res.result.data[0]
        if (userInfo) {
          wx.setStorageSync("userInfo", JSON.stringify(userInfo))
          that.globalData.userInfo = userInfo
        } else {
          // 主动获取用户信息
          // that.getUserOptions()
          wx.showToast({
            title:"亲，您还未登录",
            icon:"none"
          })
        }
      })
    } else {
      that.globalData.userInfo = userInfo
    }
  },
  //  主动获取用户的头像，手机号，姓名等
  // getUserOptions() {
  //   // console.log(promisify,"pro")
  //   let that = this
  //   const getUserInfo = promisify(wx.getUserInfo)
  //   const getSetting = promisify(wx.getSetting)
  //   const authorize = promisify(wx.authorize)
  //   const openSetting = promisify(wx.openSetting)
  //   getSetting().then(res => {
  //     if (res.authSetting["scope.userInfo"]) {
  //       // console.log(getUserInfo({}),"get")
  //       getUserInfo().then(res => {
  //         console.log(res, "用户信息")
  //       })
  //     }else{
  //       authorize({
  //         scope:"scope.userInfo",
  //       }).then(res=>{
  //         getUserInfo().then(res=>{
  //           console.log(res,"res")
  //         })
  //       }).catch(err=>{
         
  //         wx.showToast({
  //           title:"亲，您还未登录！",
  //           icon:"none"
  //         })
  //         // console.log(err,"err")
  //         // 用户有点击才能使用openSetting
  //         // openSetting().then(res=>{
  //         //   that.getUserOptions()
  //         // })
  //       })
  //     }
  //   })

  // }
})
