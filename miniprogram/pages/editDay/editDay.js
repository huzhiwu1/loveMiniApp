// miniprogram/pages/editDay/editDay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime:"",
    date:"",
    isMoonDate:false,
    remindValue:0,
    isDownTime:true,
    remindArr:[
      {
        name:"不提醒",
        value:-1,
      },
      {
        name:"当天提醒",
        value:0,
      },
      {
        name:"提前一天提醒",
        value:1,
      }, {
        name:"提前两天提醒",
        value:2,
      },
      {
        name:"提前三天提醒",
        value:3,
      },
      {
        name:"提前四天提醒",
        value:4,
      },
      {
        name:"提前五天提醒",
        value:5,
      },
      {
        name:"提前六天提醒",
        value:6,
      },
      {
        name:"提前七天提醒",
        value:7,
      },
    ],
    dayName:"",
    array: [{
      name: '倒数日',
      value: 0,
    }, {
      name: '累计日',
      value: 1
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    this.setData({
      date:year+"-"+month+"-"+day,

      endTime:year+"-"+month+"-"+day
    })
  },
  triggerDateType(){
    this.setData({
      isMoonDate:!this.data.isMoonDate
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
  changeDayName(e){
    this.setData({
      dayName:e.detail.value
    })
  },
  selectRemindDay(e){
    this.setData({
      remindValue:e.detail.value-1
    })
  },
  handleOk(){

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  selectDownTime(e){
   
    this.setData({
      isDownTime:e.detail.value==0
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