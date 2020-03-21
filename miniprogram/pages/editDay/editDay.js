// miniprogram/pages/editDay/editDay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remindPeopleArr: [
      {
        name: "我",
        value: 0
      },
      {
        name: "他",
        value: 1
      },
      {
        name: "我们",
        value: 2
      }
    ],
    remindPeople: 2,
    endTime: "",
    date: "",
    userInfo: {},
    lovers: {},
    isMoonDate: false,
    remindValue: 0,
    isDownTime: true,
    remindArr: [
      {
        name: "不提醒",
        value: -1,
      },
      {
        name: "当天提醒",
        value: 0,
      },
      {
        name: "提前一天提醒",
        value: 1,
      }, {
        name: "提前两天提醒",
        value: 2,
      },
      {
        name: "提前三天提醒",
        value: 3,
      },
      {
        name: "提前四天提醒",
        value: 4,
      },
      {
        name: "提前五天提醒",
        value: 5,
      },
      {
        name: "提前六天提醒",
        value: 6,
      },
      {
        name: "提前七天提醒",
        value: 7,
      },
    ],
    dayName: "",
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
    const { _id } = options
    const app = getApp()
    console.log(app.globalData, "globalData")
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(day<=9){
      day="0"+day
    }
    if(month<=9){
      month="0"+month
    }
    this.setData({
      userInfo: JSON.parse(wx.getStorageSync("userInfo")),
      lovers: JSON.parse(wx.getStorageSync("lovers")),
      date: year + "-" + month + "-" + day,
      _id,
      endTime: year + "-" + month + "-" + day
    })
    if(_id) this.getMarkDayInfo()
   
  },
  getMarkDayInfo() {
    let that = this
    wx.cloud.callFunction({
      name: "getOneMarkDay",
      data: {
        _id: that.data._id
      }
    }).then(res => {
      const data = res.result.data[0]
      that.setData({
        remindValue: data.remind,
        isDownTime: data.isDownTime,
        date: data.beginTime,
        remindPeople: data.remindPeopleVal,
        dayName: data.name,

      })
    })
  },
  triggerDateType() {
    this.setData({
      isMoonDate: !this.data.isMoonDate
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  changeDayName(e) {
    this.setData({
      dayName: e.detail.value
    })
  },
  selectPeople(e) {
    this.setData({
      remindPeople: e.detail.value
    })
  },
  selectRemindDay(e) {
    this.setData({
      remindValue: e.detail.value - 1
    })
  },
  handleOk() {
    wx.showLoading()
    const name = this.data.dayName
    const isDownTime = this.data.isDownTime
    const remind = this.data.remindValue
    const beginTime = this.data.date
    // let dateTime = new Date(beginTime).getTime()+
    let nowMonth = new Date().getMonth() + 1
    let nowDay = new Date().getDate()
    let beginMonth = new Date(beginTime).getMonth() + 1
    let beginDay = new Date(beginTime).getDate()
    let targetDay = null;
    if (nowMonth < beginMonth || (nowMonth == beginMonth && beginDay <= nowDay)) {
      // 纪念日在今年
      // }else  if(){
      // 纪念日在今年
      //       const target = moment(beginTime.substring(5,-1),"MM-DD")
      // let year = moment(target).get('year');
      // let month = moment(target).get('month')+1;  // 0 至 11
      // let day = moment(target).get('date');
      let year = new Date().getFullYear()
      targetDay = year + "-" + beginTime.substring(5)
    } else {
      //纪念日在明年
      // const target = moment(beginTime.substring(5,"MM-DD")
      let year = new Date().getFullYear() + 1
      targetDay = year + "-" + beginTime.substring(5)
    }

    const sendMessageDay = JSON.parse(JSON.stringify(new Date(new Date(targetDay).getTime() - remind * 24 * 60 * 60 * 1000)))
    const loverId = this.data.lovers._id
    const remindPeople = this.data.remindPeople == 2 ? [this.data.userInfo.openid, this.data.userInfo.companion] : (this.data.remindPeople == 1 ? [this.data.userInfo.companion] : [this.data.userInfo.openid])
    const remindPeopleVal = this.data.remindPeople
    const _id = this.data._id
    console.log(typeof sendMessageDay,"sendMessageDay")
    if (_id) {
      wx.cloud.callFunction({
        name:"updateOneMarkDay",
        data:{
          _id,
          name,
          isDownTime,
          remind,
          beginTime,
          targetDay,
          sendMessageDay,
          loverId,
          remindPeople,
          remindPeopleVal,
        }
      }).then(res=>{
        wx.showToast({
          title:"编辑成功",
          icon:"none"
        })
        wx.navigateBack()
      }).catch(err=>{
        wx.showToast({
          title: "编辑失败",
          icon: "none"
        })
      }).finally(res=>{
        wx.hideLoading()
      })
    } else {
      wx.cloud.callFunction({
        name: "addMarkDay",
        data: {
          name,
          isDownTime,
          remind,
          beginTime,
          targetDay,
          sendMessageDay,
          loverId,
          remindPeople,
          remindPeopleVal,
        }
      }).then(res => {
        // console.log(res, "res")
        wx.showToast({
          title: "编辑成功",
          icon: "none"
        })
        const app = getApp()
        let markDayNum = app.globalData.markDayNum
        app.globalData.markDayNum=markDayNum+1
        wx.setStorageSync("markDayNum",markDayNum)
        wx.navigateBack()
      }).catch(err => {
        wx.showToast({
          title: "编辑失败",
          icon: "none"
        })
      }).finally(res=>{
        wx.hideLoading()
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  selectDownTime(e) {

    this.setData({
      isDownTime: e.detail.value == 0
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