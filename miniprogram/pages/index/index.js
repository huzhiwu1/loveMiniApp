// miniprogram/pages/index/index.js
var promisify = require("../../utils/promisify").promisify
// var subscribeMessage = require("../../utils/subscribeMessage").subscribeMessage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight:0,
    menuWidth:0,
    userInfo:{},
    lovers:{},
    animationData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const app = getApp()
    console.log(app)
    this.setData({
      navigationBarHeight:app.globalData.navigationBarHeight,
      menuWidth:app.globalData.menuWidth,
      userInfo:app.globalData.userInfo,
      lovers:app.globalData.lovers
    })
  },
  getUserInfo(){
    let app = getApp()
    let that = this
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
        if(userInfo.commonid){//是否有情侣id
          // 获取情侣资料
          wx.cloud.callFunction({
            name:"getLoverInfo",
            data:{
              companion:userInfo.companion,
              _id:userInfo.commonid
            }
          }).then(res=>{
            wx.setStorageSync("lovers",JSON.stringify(res.result))
            that.setData({
              lovers:res.result
            })
            app.globalData.lovers = res.result 
            // 跳转主页
            // wx.hideLoading()
            // wx.hideLoading()
            // wx.redirect({
            //   url:"/mine/mine"
            // })
          })
          // .finally(res=>{
          //   wx.stopPullDownRefresh()
          //   wx.hideLoading()
          // })
        }
        // else{
        //   wx.hideLoading()
        // }
      }
      // else{
      //   wx.hideLoading()
      // } 
    })
    // .finally(res=>{
    //   wx.stopPullDownRefresh()
    //   wx.hideLoading()
    // })
  },
  sendMiss(){
    const {openid,commonid,companion,nickName} = this.data.userInfo
    if(!openid||!commonid) return;
    let that = this
    wx.requestSubscribeMessage({
      tmplIds:["lbl-AVfCPL1Q-DP_mkp4mJEn5ZUTgaIwpEejZVKNecU"],
      success(res){
        if(res["lbl-AVfCPL1Q-DP_mkp4mJEn5ZUTgaIwpEejZVKNecU"]==="accept"){
          wx.cloud.callFunction({
            name:"missyou",
            data:{
              openid,
              commonid,
              companion,
              nickName
            }
          }).then(res=>{
            wx.hideLoading()
            // 
            wx.showToast({
              title:"已告知"+(that.data.lovers.friend.nickName)+"你想"+(that.data.lovers.friend.gender==1?"他":"她"),
              icon:"none",
              duration:2000,
            })
           /* that.setData({
              "userInfo.missyoutime":new Date(),
              "lovers.honeyNum":that.data.lovers.honeyNum+5
            },()=>{
              wx.setStorageSync("userInfo",that.data.userInfo)
              wx.setStorageSync("lovers",that.data.lovers)
              var app = getAPP()
              app.globalData.userInfo=that.data.userInfo
              app.globalData.lovers=that.data.lovers
            })*/
          }).catch(err=>{
            console.log(err,"Err")
            wx.hideLoading()
           
              wx.showToast({
                title:"对方未订阅消息，不能将信息传达",
                icon:"none"
              })
            
          }).finally(res=>{
            that.getUserInfo()
          })
        }
      },
      fail(err){
        wx.showToast({
          title:"请点右上角三个小点开启消息订阅",
          icon:"none"
        })
      }
    })
  },
  missyou(){
    wx.showLoading({
      title:"传送消息给她中...",
      icon:"none"
    })
   
  //   this.setData({
  //     showHeart:false
  //   },()=>{
  //     // subscribeMessage([
  //     //   "lbl-AVfCPL1Q-DP_mkp4mJEn5ZUTgaIwpEejZVKNecU"
  //     // ]).then(res=>{
  //     //   console.log(res,"res")
  //     // })
      
  //   })
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