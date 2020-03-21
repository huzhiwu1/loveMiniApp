// miniprogram/pages/markDay/markDay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:{

    },
    recentlyMarkDay:{},
    markDayList:[],
    lovers:{},
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = JSON.parse(wx.getStorageSync("userInfo"))
    let lovers = JSON.parse(wx.getStorageSync("lovers"))
    this.setData({
      userInfo,
      lovers
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  gotoAddMarkDay(){
    this.animationData = wx.createAnimation({
      duration:300,
      timingFunction:"ease-in-out"
    })
    this.animationData.rotateZ(90).step().rotateZ(0).step()
    this.setData({
      animationData:this.animationData.export()
    },()=>{
      setTimeout(()=>{
        wx.navigateTo({
          url:"../editDay/editDay"
        })
      },300)
     
    })
  },
  // 获取纪念日的信息
  getInfo(){
    let that = this
    wx.cloud.callFunction({
      name:"getMarkDayInfo",
      data:{
        loverId:that.data.lovers._id
      }
    }).then(res=>{
      console.log(res,"res")
      const markDayList=res.result.data
      const cacheMarkDayList = [...markDayList]
      cacheMarkDayList.sort((a,b)=>{
        return new Date(a.targetDay).getTime()-new Date(b.targetDay).getTime()

      })
      const recentlyMarkDay = cacheMarkDayList[0]
      that.setData({
        markDayList,
        recentlyMarkDay
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInfo()
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