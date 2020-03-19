// miniprogram/pages/share/friend/friend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let {openid} = options
    wx.cloud.callFunction({
      name:"findPeople",
      data:{
        openid
      }
    }).then(res=>{
      let userInfo = res.result.data[0]
      //如果这个人有情侣了，就不在显示邀请内容
      if(userInfo.commonid){
        wx.showToast({
          title:(userInfo.gender==1?"他":"她")+"已经有"+userInfo.gender==1?"女朋友了":"男朋友了",
          icon:"none",
          success(){
            wx.switchTab({
              url:"../../mine/mine"
            })
          }
        })
        
      }
      this.setData({
        userInfo,
      })
      // console.log(res,"renih")
    })
  },
  // 用户登录
  login(){
    wx.showLoading(
      {
        title:"加载中"
      }
    )
    let that = this
    // that.getUserInfo()
    let app = getApp()
    let userInfo = null;
    wx.cloud.callFunction({
      name:"login"
    }).then(res=>{
     
      userInfo = res.result.data[0]
      // 如果用户本身是有情侣的，也自动跳转到我到那一页
      if(userInfo.commonid){
        wx.switchTab({
          url:"../../mine/mine"
        })
      }
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
            console.log(res,"Rse")
            wx.setStorageSync("lovers",JSON.stringify(res.result))
            app.globalData.lovers = res.result 
            // 跳转主页
            wx.hideLoading()
            wx.switchTab({
              url:"/pages/mine/mine",
            })
          })
        }else{
          wx.hideLoading()
          wx.switchTab({
            url:"/pages/mine/mine"
          })
        }
      } 
    })
  },
  getUserInfo(res){
    wx.showLoading({title:"加载中"})
    // 用户之前是否登录过
    let that= this
    wx.cloud.callFunction({
      name:"login"
    }).then(loginRes=>{
      let myInfo = loginRes.result.data[0]
      if(!myInfo){
        myInfo = JSON.parse(res.detail.rawData)
        wx.cloud.callFunction({
          name:"register",
          data:myInfo
        }).then(res=>{
          // 注册成为情侣
          wx.cloud.callFunction({
            name:"belovers",
            data:{openid:that.data.userInfo.openid}
          }).then(res=>{
            // 再次去服务端获取自己的信息
            that.login()
          })
          // // console.log(res,"Res")
          // that.login()
          wx.hideLoading()
        })
      }else{
        //之前注册过。就生成情侣信息
        wx.cloud.callFunction({
          name:"belovers",
          data:{openid:that.data.userInfo.openid}
        }).then(res=>{
          // 再次去服务端获取自己的信息
          that.login()
        })
        wx.hideLoading()
      }
    })
    
    // console.log(res,"Res")
   //  "{"nickName":"胡志武(小程序，pc管理后台页面)","gender":1,"language":"zh_TW","city":"Shantou","province":"Guangdong","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/iatj9Nz5vy7rFniblU58kYkosia3jJQ4ARDNR10GcoCdOsAw9xDibBSicApP35picCROkMdCy3NmNAUqwa2WD8N3La1Q/132"}"
     // const app = getApp()
    //  const userInfo = JSON.parse(res.detail.rawData)
     // app.globalData.userInfo = userInfo
     // wx.setStorageSync("userInfo",res.detail.rawData)
     
     // 登录，看
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