// miniprogram/pages/mine/mine.js
var promisify = require("../../utils/promisify.js").promisify
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight:0,
    menuWidth:0,
    userInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    this.setData({
      navigationBarHeight:app.globalData.navigationBarHeight,
      menuWidth:app.globalData.menuWidth,
      userInfo:app.globalData.userInfo&&JSON.parse(app.globalData.userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 用户登录
  login(){
    wx.showLoading()
    let that = this
    that.getUserInfo()
    let app = getApp()
    let userInfo = null;
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
      
      userInfo = res.result.data[0]
      if (userInfo) {
        wx.setStorageSync("userInfo", JSON.stringify(userInfo))
        app.globalData.userInfo = userInfo
        that.setData({
          userInfo,
        })
      } 
    })
  },
  //  主动获取用户的头像，手机号，姓名等
  getUserInfo(res) {
    wx.showLoading()
  //  console.log(res,"Res")
  //  "{"nickName":"胡志武(小程序，pc管理后台页面)","gender":1,"language":"zh_TW","city":"Shantou","province":"Guangdong","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/iatj9Nz5vy7rFniblU58kYkosia3jJQ4ARDNR10GcoCdOsAw9xDibBSicApP35picCROkMdCy3NmNAUqwa2WD8N3La1Q/132"}"
    const app = getApp()
    const userInfo = JSON.parse(res.detail.rawData)
    // app.globalData.userInfo = userInfo
    // wx.setStorageSync("userInfo",res.detail.rawData)
    wx.cloud.callFunction({
      name:"register",
      data:userInfo
    }).then(res=>{
      console.log(res,"Res")
      wx.hideLoading()
    })
    // 登录，看
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})