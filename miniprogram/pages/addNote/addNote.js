// miniprogram/pages/addNote/addNote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordNum:0,
    textInput:'',
    selectImgList:[],
    local:'不显示'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否获取用户授权
    let that = this;
    wx.getSetting({
      success(res){
        if(!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope:'scope.userLocation',
            success(res){
              wx.getLocation({
                type:'gcj02',
                isHighAccuracy:true,
                success(res){
                  // console.log(res,"res")
                  const latitude = res.latitude
                  const longitude = res.longitude;
                  wx.openLocation({
                    latitude,
                    longitude,
                    scale:18,
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  textInput(event){
    console.log(event)
    let value = event.detail.value
    this.setData({
      textInput:value,
      wordNum:value.length
    })
  },
  //选择用户
  selectUserPic(){
    wx.chooseImage({
      count:9,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:(res)=>{
        // console.log(res,"res")
        this.setData({
          selectImgList:res.tempFilePaths
        })
      }
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