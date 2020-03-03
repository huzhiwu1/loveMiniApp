// miniprogram/pages/time /time.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarHeight:0,
    menuWidth:0,
    animationData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    let animation= wx.createAnimation({
      duration:500,
      timingFunction:'ease-in-out'
    })
    this.animation=animation
    this.setData({
      
      navigationBarHeight:app.globalData.navigationBarHeight,
      menuWidth:app.globalData.menuWidth
    })
  },

  addNote(){
    console.log('增加文章')
   
    this.animation.rotateZ(90).step().rotateZ(-90).step()
    this.setData({
      animationData:this.animation.export()
    },()=>{
      wx.navigateTo({
        url:'/pages/addNote/addNote'
      })
    })
    
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