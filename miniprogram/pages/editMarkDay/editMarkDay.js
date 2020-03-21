// miniprogram/pages/editMarkDay/editMarkDay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // dayName:"在一起",
    // isDownTime:false,
    // dayNum:100,
    // targetDay:'2020年04月10日',
    markDay:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {_id}= options
    this.setData({
      _id
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  gotoEdit(){
    wx.navigateTo({
      url:"/pages/editDay/editDay?_id="+this.data.markDay._id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    const {_id} = this.data
    wx.cloud.callFunction({
      name:"getOneMarkDay",
      data:{
        _id
      }
    }).then(res=>{
      const data = res.result.data[0]
      that.setData({
        markDay:data
      })
    })
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